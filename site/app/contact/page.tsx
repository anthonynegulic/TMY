import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · Theirs. Mine. Yours.",
  description:
    "DM us on Instagram or send an enquiry. We reply within one business day. Fully online, for now.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="container page-hero">
        <h1 className="page-title">
          Say <em className="accent">hello</em>.
        </h1>
        <div className="page-hero-grid">
          <p className="page-lede">
            We&#39;re fully online, for now. No showroom, no storefront, just
            two phones that light up every time you write to us.
          </p>
          <p className="page-lede">
            After a specific piece? Ask away. After something we don&#39;t
            have? Even better: send a wish list. The hunt is the fun part.
          </p>
        </div>
      </section>

      <section className="container page-section page-section-last">
        <div className="contact-grid">
          <div className="contact-card" style={{ background: "#BBC471" }}>
            <div className="hatch" />
            <div className="lot-chip">
              <span className="lot-hole" />
              FASTEST WAY
            </div>
            <div className="contact-card-body">
              <div className="contact-card-title">DM us on Instagram</div>
              <p>
                It&#39;s where the drops happen first, and where we&#39;re
                quickest to reply.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            <h2 className="page-h2 contact-form-title">Send an enquiry.</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
