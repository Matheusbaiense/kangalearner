"use client";

import { useEffect, useState } from "react";
import type { Question } from "@kanga/core";

const QUESTIONS_VERSION = "v10";
const CACHE_KEY = `kl-questions-${QUESTIONS_VERSION}`;

let _inFlight: Promise<Question[]> | null = null;
let _resolved: Question[] | null = null;

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

function getFromDB(key: string): Promise<any> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

function saveToDB(key: string, data: any): Promise<void> {
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

export async function loadQuestions(): Promise<Question[]> {
  if (_resolved !== null) return _resolved;
  if (_inFlight !== null) return _inFlight;

  _inFlight = (async () => {
    try {
      const cached = await getFromDB(CACHE_KEY);
      if (Array.isArray(cached) && cached.length > 0) {
        _resolved = cached;
        return cached;
      }
    } catch {
      /* ignore */
    }

    const res = await fetch("/data/questions.json");
    if (!res.ok) throw new Error(`Failed to load questions: ${res.status}`);
    const data = (await res.json()) as Question[];

    try {
      await saveToDB(CACHE_KEY, data);
    } catch {
      /* ignore storage failure */
    }

    _resolved = data;
    return data;
  })();

  return _inFlight;
}

export function useQuestions(): {
  questions: Question[];
  loading: boolean;
  error: string | null;
} {
  const [questions, setQuestions] = useState<Question[]>(_resolved ?? []);
  const [loading, setLoading] = useState(_resolved === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_resolved !== null) return;
    let cancelled = false;
    loadQuestions()
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
  }, []);

  return { questions, loading, error };
}
