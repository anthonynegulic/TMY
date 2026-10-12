"use client";

import { useState } from "react";
import { FORMSPREE_ID, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

// `reserve` turns it into a request to hold `piece` (from "I want this one").
export default function EnquiryForm({ piece, reserve = false }: { piece?: string; reserve?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done">
        <div className="form-done-title">Got it. Thank you!</div>
        <p>
          {reserve
            ? "We'll be in touch within one business day to sort payment and postage."
            : "We'll get back to you within one business day."}{" "}
          If it&#39;s urgent,
          DM us on{" "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="tmy-link">
            Instagram
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="_subject"
        value={
          piece
            ? `TMY ${reserve ? "reservation" : "enquiry"} — ${piece}`
            : "TMY enquiry — via the website"
        }
      />
      {reserve && <input type="hidden" name="request" value="Reserve this piece" />}
      {piece && <input type="hidden" name="piece" value={piece} />}
      <div className="form-row">
        <label className="form-field">
          <span className="form-label">Name</span>
          <input name="name" type="text" required autoComplete="name" autoFocus={reserve} />
        </label>
        <label className="form-field">
          <span className="form-label">Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      {!piece && (
        <label className="form-field">
          <span className="form-label">Piece (if it&#39;s about one)</span>
          <input name="piece" type="text" placeholder="e.g. Sapphire halo ring" />
        </label>
      )}
      <label className="form-field">
        <span className="form-label">Message</span>
        <textarea
          name="message"
          rows={4}
          required
          defaultValue={reserve && piece ? `Hi! I'd love to reserve ${piece}.` : undefined}
          placeholder={
            piece
              ? "Ask us anything about this piece: sizing, condition, extra photos, holds."
              : "Wish lists welcome. The hunt is the fun part."
          }
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn-dark form-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : reserve ? "Reserve it" : "Send enquiry"}
        </button>
        <span className="form-note">We reply within one business day.</span>
      </div>
      {status === "error" && (
        <p className="form-error">
          That didn&#39;t send. DM us on{" "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="tmy-link">
            Instagram {INSTAGRAM_HANDLE}
          </a>{" "}
          and we&#39;ll sort you out.
        </p>
      )}
    </form>
  );
}
