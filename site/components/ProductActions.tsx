"use client";

import { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";

type Open = "reserve" | "question" | null;

// The buying step on a product page: one clear "I want this one" (a
// reservation request through the enquiry form) with general questions
// tucked underneath.
export default function ProductActions({ piece }: { piece: string }) {
  const [open, setOpen] = useState<Open>(null);
  const toggle = (which: Exclude<Open, null>) => setOpen(open === which ? null : which);

  return (
    <div className="product-actions">
      <button
        type="button"
        className="btn-dark product-buy"
        aria-expanded={open === "reserve"}
        aria-controls="reserve-form"
        onClick={() => toggle("reserve")}
      >
        I want this one
      </button>
      <p className="product-buy-note">
        Tap to reserve it. Leave your name and email and we&#39;ll hold it for
        you, then be in touch within one business day to sort payment and
        postage.
      </p>
      {open === "reserve" && (
        <div id="reserve-form" className="product-enquiry">
          <EnquiryForm piece={piece} reserve />
        </div>
      )}
      <div className="product-trust">
        <span>Solid gold</span>
        <span>Cleaned &amp; checked by us</span>
        <span>One of one</span>
      </div>

      <button
        type="button"
        className="product-ask"
        aria-expanded={open === "question"}
        aria-controls="question-form"
        onClick={() => toggle("question")}
      >
        <span>
          Got a question first?
          <small>Sizing, condition, extra photos, holds: ask us anything.</small>
        </span>
        <span className="product-ask-icon" aria-hidden="true">
          {open === "question" ? "−" : "+"}
        </span>
      </button>
      {open === "question" && (
        <div id="question-form" className="product-enquiry">
          <EnquiryForm piece={piece} />
        </div>
      )}
    </div>
  );
}
