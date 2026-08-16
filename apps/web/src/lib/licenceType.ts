import { SK } from "@/lib/storageKeys";

export type LicenceType = "car" | "motorcycle";

/** Fired on `window` whenever the licence type changes, so every mounted
 * component (nav, Practice, mock-test setup) stays in sync without prop
 * drilling — mirrors the existing `kanga:state-changed` event. */
export const LICENCE_CHANGED_EVENT = "kanga:licence-changed";

export function readStoredLicenceType(): LicenceType {
  try {
    const raw = localStorage.getItem(SK.licenceType);
    return raw === "motorcycle" ? "motorcycle" : "car";
  } catch {
    return "car";
  }
}

export function persistLicenceType(value: LicenceType): void {
  try {
    localStorage.setItem(SK.licenceType, value);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent(LICENCE_CHANGED_EVENT, { detail: value }));
}
