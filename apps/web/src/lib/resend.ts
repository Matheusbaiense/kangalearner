import { Resend } from "resend";

export const FROM_ADDRESS = "KangaLearner <noreply@kangalearner.com.au>";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://kangalearner.com.au";

// Lazy singleton — instantiated only when actually called (not at import/build time).
// This prevents Next.js from throwing during "Collecting page data" if the env var
// is not available in the build environment.
let _client: Resend | null = null;

function getClient(): Resend {
  if (!_client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _client = new Resend(apiKey);
  }
  return _client;
}

export const resend = {
  emails: {
    send: (...args: Parameters<Resend["emails"]["send"]>) => getClient().emails.send(...args)
  }
};
