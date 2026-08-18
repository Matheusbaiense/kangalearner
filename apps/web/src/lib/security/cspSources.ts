export const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
export const TURNSTILE_SCRIPT_SRC = `${TURNSTILE_ORIGIN}/turnstile/v0/api.js?render=explicit`;

export function withTurnstileCsp(csp: {
  scriptSrc: string;
  connectSrc: string;
  frameSrc: string;
}): { scriptSrc: string; connectSrc: string; frameSrc: string } {
  return {
    scriptSrc: `${csp.scriptSrc} ${TURNSTILE_ORIGIN}`,
    connectSrc: `${csp.connectSrc} ${TURNSTILE_ORIGIN}`,
    frameSrc: `${csp.frameSrc} ${TURNSTILE_ORIGIN}`
  };
}
