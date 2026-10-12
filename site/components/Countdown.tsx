"use client";

import { useEffect, useState } from "react";

// Days / hours / minutes / seconds until launch. When it reaches zero the
// page reloads, and the proxy (which has switched over by then) serves the
// real shop at the same address.
export default function Countdown({ launchAt }: { launchAt: string }) {
  const target = Date.parse(launchAt);
  // Starts empty so the server and browser render the same thing; the
  // numbers appear as soon as the page is running in the browser.
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const ms = target - Date.now();
      setLeft(Math.max(0, ms));
      if (ms <= 0) {
        clearInterval(timer);
        // a moment's grace so the server's clock has definitely passed it too
        setTimeout(() => window.location.reload(), 1500);
      }
    };
    const timer = setInterval(tick, 1000);
    tick();
    return () => clearInterval(timer);
  }, [target]);

  const s = Math.floor((left ?? 0) / 1000);
  const parts = [
    { n: Math.floor(s / 86400), label: "days" },
    { n: Math.floor((s % 86400) / 3600), label: "hrs" },
    { n: Math.floor((s % 3600) / 60), label: "min" },
    { n: s % 60, label: "sec" },
  ];

  return (
    <div className="countdown" role="timer" aria-label="Time until the shop opens">
      {parts.map((p) => (
        <div key={p.label} className="countdown-cell">
          <span className="countdown-num">
            {left === null ? "··" : String(p.n).padStart(2, "0")}
          </span>
          <span className="countdown-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
