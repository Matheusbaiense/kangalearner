"use client";

import { useEffect, useState } from "react";
import type { Question } from "@kanga/core";

const QUESTIONS_VERSION = "v1";
const CACHE_KEY = `kl-questions-${QUESTIONS_VERSION}`;

let _inFlight: Promise<Question[]> | null = null;
let _resolved: Question[] | null = null;

export async function loadQuestions(): Promise<Question[]> {
  if (_resolved !== null) return _resolved;
  if (_inFlight !== null) return _inFlight;

  _inFlight = (async () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Question[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          _resolved = parsed;
          return parsed;
        }
      }
    } catch {
      /* ignore */
    }

    const res = await fetch("/data/questions.json");
    if (!res.ok) throw new Error(`Failed to load questions: ${res.status}`);
    const data = (await res.json()) as Question[];

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      /* localStorage full */
    }

    _resolved = data;
    return data;
  })();

  return _inFlight;
}

export function useQuestions(): { questions: Question[]; loading: boolean } {
  const [questions, setQuestions] = useState<Question[]>(_resolved ?? []);
  const [loading, setLoading] = useState(_resolved === null);

  useEffect(() => {
    if (_resolved !== null) return;
    let cancelled = false;
    loadQuestions()
      .then((data) => {
        if (!cancelled) {
          setQuestions(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { questions, loading };
}
