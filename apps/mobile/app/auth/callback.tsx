import type { EmailOtpType } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { getMobileSupabase } from "../../src/lib/supabase";
import { Card, PrimaryButton, Screen, useThemeColors } from "../../src/ui/kit";

// Supabase can deliver credentials in the query (?token_hash=...) or, with the
// implicit flow this client uses, in the fragment (#access_token=...).
function extractAuthParams(url: string): Record<string, string> {
  const [, query = "", fragment = ""] = url.match(/^[^?#]*(?:\?([^#]*))?(?:#(.*))?$/) ?? [];
  const params: Record<string, string> = {};
  new URLSearchParams(`${query}&${fragment}`).forEach((value, key) => {
    if (value) params[key] = value;
  });
  return params;
}

async function completeSignIn(url: string): Promise<void> {
  const supabase = getMobileSupabase();
  if (!supabase) throw new Error("Sign-in is not available right now.");

  const params = extractAuthParams(url);
  if (params.error_description || params.error) {
    throw new Error(params.error_description ?? params.error);
  }

  if (params.token_hash && params.type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: params.token_hash,
      type: params.type as EmailOtpType
    });
    if (error) throw error;
    return;
  }

  if (params.access_token && params.refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token: params.access_token,
      refresh_token: params.refresh_token
    });
    if (error) throw error;
    return;
  }

  throw new Error("This sign-in link is invalid or has expired.");
}

export default function AuthCallbackScreen() {
  const c = useThemeColors();
  const url = Linking.useURL();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    completeSignIn(url)
      .then(() => {
        if (!cancelled) router.replace("/");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setErrorMessage(
          error instanceof Error ? error.message : "This sign-in link is invalid or has expired."
        );
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (errorMessage) {
    return (
      <Screen title="Sign in" subtitle="Something went wrong">
        <Card>
          <Text style={{ color: c.ink, lineHeight: 23 }}>{errorMessage}</Text>
          <PrimaryButton onPress={() => router.replace("/")}>Back to the app</PrimaryButton>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen title="Sign in" subtitle="Confirming your account...">
      <Card>
        <ActivityIndicator />
        <Text style={{ color: c.muted, lineHeight: 23 }}>Just a moment.</Text>
      </Card>
    </Screen>
  );
}
