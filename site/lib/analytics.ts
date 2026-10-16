import { sendGAEvent } from "@next/third-parties/google";

// Sends a Google Analytics event. Does nothing where the tag isn't loaded
// (local dev, preview deployments), so call it freely.
export function track(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  sendGAEvent("event", name, params);
}
