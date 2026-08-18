"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, filterByState, validateQuestionsDataset, type Question } from "@kanga/core";
import { readStoredState, useStateCode } from "@/lib/stateSelection";

const QUESTIONS_VERSION = "v15";

function cacheKey(state: string): string {
  return `kl-questions-${QUESTIONS_VERSION}-${state}`;
}

const _resolved = new Map<string, Question[]>();
const _inFlight = new Map<string, Promise<Question[]>>();

const DB_NAME = "kl-db";
const STORE_NAME = "questions";

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getFromDB(key: string): Promise<Question[] | undefined> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result as Question[] | undefined);
      req.onerror = () => reject(req.error);
    });
  });
}

function saveToDB(key: string, data: Question[]): Promise<void> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

function assertValidQuestions(data: unknown): Question[] {
  if (!Array.isArray(data)) throw new Error("Invalid questions payload");
  const issues = validateQuestionsDataset({ QUESTIONS: data, CATEGORIES });
  if (issues.length > 0) {
    throw new Error(`Invalid questions dataset: ${issues[0]?.msg ?? "unknown"}`);
  }
  return data as Question[];
}

async function fetchQuestionsForState(state: string): Promise<Question[]> {
  const sliceRes = await fetch(`/data/questions-${state}.json`);
  if (sliceRes.ok) {
    return assertValidQuestions(await sliceRes.json());
  }
  const allRes = await fetch("/data/questions.json");
  if (!allRes.ok) throw new Error(`Failed to load questions: ${allRes.status}`);
  return filterByState(assertValidQuestions(await allRes.json()), state);
}

export function questionsDataUrl(state: string): string {
  return `/data/questions-${state}.json`;
}

export async function loadQuestions(state = readStoredState()): Promise<Question[]> {
  const cached = _resolved.get(state);
  if (cached) return cached;
  const pending = _inFlight.get(state);
  if (pending) return pending;

  const request = (async () => {
    const key = cacheKey(state);
    try {
      const fromDb = await getFromDB(key);
      if (Array.isArray(fromDb) && fromDb.length > 0) {
        _resolved.set(state, fromDb);
        return fromDb;
      }
    } catch {
      /* ignore */
    }

    const data = await fetchQuestionsForState(state);
    try {
      await saveToDB(key, data);
    } catch {
      /* ignore storage failure */
    }
    _resolved.set(state, data);
    return data;
  })();

  _inFlight.set(state, request);
  try {
    return await request;
  } finally {
    _inFlight.delete(state);
  }
}

export function prefetchQuestions(state?: string): void {
  void loadQuestions(state).catch(() => {
    /* prefetch is best-effort */
  });
}

export function useQuestions(): {
  questions: Question[];
  loading: boolean;
  error: string | null;
} {
  const state = useStateCode();
  const [questions, setQuestions] = useState<Question[]>(() => _resolved.get(state) ?? []);
  const [loading, setLoading] = useState(!_resolved.has(state));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = _resolved.get(state);
    if (existing) {
      setQuestions(existing);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    loadQuestions(state)
      .then((data) => {
        if (!cancelled) {
          setQuestions(data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoading(false);
          setError(err instanceof Error ? err.message : "Failed to load questions");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [state]);

  return { questions, loading, error };
}
