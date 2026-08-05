import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import type { Session } from "@supabase/supabase-js";
import { disabledTutorPlugin } from "../../lib/tutor-plugin";
import {
  clearLocalProgress,
  loadAnswers,
  loadMockSessions,
  loadSavedQuestions,
  loadSyncQueue
} from "../../lib/local-store";
import { getMobileSupabase, getRedirectUrl } from "../../lib/supabase";
import { syncLocalProgress } from "../../lib/sync";
import { Card, Field, PillButton, PrimaryButton, Screen, Stat, useThemeColors } from "../../ui/kit";
import { spacing } from "../../theme";
import { usePreferences } from "../preferences/PreferencesContext";

export function ProfileScreen() {
  const c = useThemeColors();
  const { copy, state, lang } = usePreferences();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ answers: 0, mocks: 0, queue: 0 });
  const supabase = getMobileSupabase();

  async function refreshStats() {
    const [answers, mocks, queue] = await Promise.all([
      loadAnswers(),
      loadMockSessions(),
      loadSyncQueue()
    ]);
    setStats({ answers: Object.keys(answers).length, mocks: mocks.length, queue: queue.length });
  }

  useEffect(() => {
    void refreshStats();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function signIn() {
    if (!supabase) {
      Alert.alert(
        "Supabase not configured",
        "Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    setLoading(false);
    if (error) Alert.alert(copy.signIn, error.message);
    else if (data.session) void syncNow(data.session);
  }

  async function signUp() {
    if (!supabase) {
      Alert.alert(
        "Supabase not configured",
        "Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: getRedirectUrl() }
    });
    setLoading(false);
    if (error) Alert.alert(copy.signUp, error.message);
    else Alert.alert(copy.signUp, "Check your email to confirm the account.");
  }

  async function signOut() {
    await supabase?.auth.signOut();
  }

  async function syncNow(currentSession = session) {
    if (!currentSession || !supabase) {
      Alert.alert(copy.syncPending, "Sign in to sync local progress.");
      return;
    }
    const queue = await loadSyncQueue();
    // Saved questions are full-pushed by syncLocalProgress even with an empty
    // queue (migration path for users who saved before sync existed).
    const savedCount = (await loadSavedQuestions()).length;
    if (!queue.length && savedCount === 0) {
      Alert.alert(copy.synced, "There is no pending local progress.");
      return;
    }
    setLoading(true);
    try {
      const result = await syncLocalProgress(supabase, currentSession.user.id);
      await refreshStats();
      Alert.alert(
        copy.synced,
        `${result.attemptsSynced} attempt(s), ${result.mockSessionsSynced} mock session(s). ${result.remaining} pending.`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sync failed. Try again later.";
      Alert.alert(copy.syncPending, message);
    } finally {
      setLoading(false);
    }
  }

  function resetDeviceProgress() {
    Alert.alert(copy.reset, "This clears local mobile answers, saved questions and mock history.", [
      { text: "Cancel", style: "cancel" },
      {
        text: copy.reset,
        style: "destructive",
        onPress: async () => {
          await clearLocalProgress();
          await refreshStats();
        }
      }
    ]);
  }

  return (
    <Screen title={copy.profile} subtitle="Account, sync status and mobile preferences.">
      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 20 }}>
          {session ? session.user.email : copy.guest}
        </Text>
        <Text selectable style={{ color: c.muted, lineHeight: 23 }}>
          {session
            ? "You are signed in. Local progress is preserved and ready for sync."
            : "Practice works offline. Create an account when you want to sync across devices."}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          <Stat label="Answers" value={String(stats.answers)} />
          <Stat label="Mock tests" value={String(stats.mocks)} />
          <Stat label="Sync queue" value={String(stats.queue)} />
        </View>
        <PrimaryButton onPress={() => void syncNow()}>
          {stats.queue ? copy.syncPending : copy.synced}
        </PrimaryButton>
      </Card>

      {!session ? (
        <Card>
          <Field
            label={copy.email}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Field
            label={copy.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <PrimaryButton loading={loading} onPress={signIn}>
            {copy.signIn}
          </PrimaryButton>
          <PillButton onPress={signUp}>{copy.signUp}</PillButton>
        </Card>
      ) : (
        <Card>
          <PillButton onPress={signOut}>{copy.signOut}</PillButton>
        </Card>
      )}

      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>Preferences</Text>
        <Text selectable style={{ color: c.muted }}>
          State: {state} - Language: {lang}
        </Text>
      </Card>

      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>Future AI tutor</Text>
        <Text selectable style={{ color: c.muted, lineHeight: 22 }}>
          {copy.tutorLater} Plugin: {disabledTutorPlugin.id}
        </Text>
      </Card>

      <Card>
        <PillButton onPress={resetDeviceProgress}>{copy.reset}</PillButton>
      </Card>
    </Screen>
  );
}
