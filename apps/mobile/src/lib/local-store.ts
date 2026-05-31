import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import type { AuStateCode } from "@kanga/core";
import type { Lang } from "./i18n";
import type { AnswerRecord, MockSessionRecord } from "./questions";
import { upsertQueueItem, type SyncQueueItem } from "./sync-logic";

export type { SyncQueueItem };

const keys = {
  prefs: "kanga.mobile.preferences.v1",
  answers: "kanga.mobile.answers.v1",
  saved: "kanga.mobile.saved.v1",
  mockSessions: "kanga.mobile.mockSessions.v1",
  syncQueue: "kanga.mobile.syncQueue.v1",
  deviceId: "kanga.mobile.deviceId.v1"
};

export type MobilePreferences = {
  state: AuStateCode;
  lang: Lang;
};

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(keys.deviceId);
  if (existing) return existing;
  const generated =
    typeof Crypto.randomUUID === "function"
      ? Crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  await AsyncStorage.setItem(keys.deviceId, generated);
  return generated;
}

export function loadPreferences(): Promise<MobilePreferences> {
  return readJson(keys.prefs, { state: "WA", lang: "en" });
}

export function savePreferences(prefs: MobilePreferences): Promise<void> {
  return writeJson(keys.prefs, prefs);
}

export function loadAnswers(): Promise<Record<string, AnswerRecord>> {
  return readJson(keys.answers, {});
}

export function saveAnswers(answers: Record<string, AnswerRecord>): Promise<void> {
  return writeJson(keys.answers, answers);
}

export function loadSavedQuestions(): Promise<string[]> {
  return readJson(keys.saved, []);
}

export function saveSavedQuestions(ids: string[]): Promise<void> {
  return writeJson(keys.saved, ids);
}

export function loadMockSessions(): Promise<MockSessionRecord[]> {
  return readJson(keys.mockSessions, []);
}

export function saveMockSessions(sessions: MockSessionRecord[]): Promise<void> {
  return writeJson(keys.mockSessions, sessions);
}

export function loadSyncQueue(): Promise<SyncQueueItem[]> {
  return readJson(keys.syncQueue, []);
}

export function saveSyncQueue(queue: SyncQueueItem[]): Promise<void> {
  return writeJson(keys.syncQueue, queue);
}

export async function enqueueSync(item: SyncQueueItem): Promise<void> {
  const queue = await loadSyncQueue();
  await saveSyncQueue(upsertQueueItem(queue, item));
}

export async function clearLocalProgress(): Promise<void> {
  await Promise.all(
    [keys.answers, keys.saved, keys.mockSessions, keys.syncQueue].map((key) =>
      AsyncStorage.removeItem(key)
    )
  );
}
