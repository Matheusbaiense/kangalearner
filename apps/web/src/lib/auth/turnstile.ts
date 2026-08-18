export function turnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

export function isTurnstileConfigured(): boolean {
  return turnstileSiteKey().length > 0;
}

/** Options fragment for GoTrue captchaToken. Empty when no token (dev / widget off). */
export function captchaAuthOptions(token: string): { captchaToken?: string } {
  const trimmed = token.trim();
  return trimmed ? { captchaToken: trimmed } : {};
}
