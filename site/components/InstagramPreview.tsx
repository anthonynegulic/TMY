import { INSTAGRAM_HANDLE } from "@/lib/site";

// An animated copy of the real Instagram profile for the contact page, in the
// style of the launch stories: the profile scrolls through the latest posts,
// "Message" is tapped and a DM is answered. The posts, highlights and bio
// come from the profile itself (images in public/instagram/, cut from a
// screenshot of the account), so refresh them when the grid has moved on.
// Follower counts are left out on purpose: they'd go stale.
// Purely decorative (the real link is the button below it), and it holds
// still for anyone who prefers reduced motion.
const HANDLE = INSTAGRAM_HANDLE.replace(/^@/, "");
const BIO = ["Theirs once. Mine briefly. Yours now.", "All available pieces are waiting for their next person - DM if it’s you ✨"];
const HIGHLIGHTS = ["Available", "Collection", "Yours", "Reviews", "Shop"];
const POSTS = 12;

export default function InstagramPreview() {
  return (
    <div className="igp" aria-hidden="true">
      <div className="igp-phone">
        <div className="igp-screen">
          <div className="igp-status">
            <span>9:41</span>
            <svg viewBox="0 0 66 13" className="igp-status-icons">
              <g fill="currentColor">
                <rect x="0" y="8" width="3" height="5" rx="1" />
                <rect x="5" y="6" width="3" height="7" rx="1" />
                <rect x="10" y="3" width="3" height="10" rx="1" />
                <rect x="15" y="0" width="3" height="13" rx="1" />
                <rect x="38" y="0.5" width="24" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity=".5" />
                <rect x="40" y="2.5" width="18" height="8" rx="2" />
              </g>
            </svg>
          </div>
          <div className="igp-topbar">
            <svg viewBox="0 0 24 24" className="igp-icon"><path d="M15 4 7 12l8 8" /></svg>
            <span className="igp-topbar-handle">{HANDLE}</span>
            <svg viewBox="0 0 24 24" className="igp-icon"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0" /></svg>
            <svg viewBox="0 0 24 24" className="igp-icon igp-icon-fill"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
          </div>

          <div className="igp-viewport">
            <div className="igp-page">
              <div className="igp-head">
                <span className="igp-avatar">
                  <img src="/instagram/avatar.jpg" alt="" />
                </span>
                <span className="igp-name">Theirs Mine Yours</span>
              </div>
              <div className="igp-bio">
                {BIO[0]}
                <br />
                {BIO[1]}
              </div>
              <div className="igp-buttons">
                <span className="igp-btn igp-btn-follow">Follow</span>
                <span className="igp-btn">
                  Message
                  <span className="igp-tap" />
                </span>
                <span className="igp-btn igp-btn-icon">
                  <svg viewBox="0 0 24 24" className="igp-icon"><circle cx="10" cy="8" r="3.5" /><path d="M3.5 19a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6" /></svg>
                </span>
              </div>
              <div className="igp-highlights">
                {HIGHLIGHTS.map((label, i) => (
                  <span key={label} className="igp-highlight">
                    <span className="igp-highlight-img">
                      <img src={`/instagram/highlight-${i + 1}.jpg`} alt="" />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
              <div className="igp-tabs">
                <svg viewBox="0 0 24 24" className="igp-icon igp-tab-on"><path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z" /></svg>
                <svg viewBox="0 0 24 24" className="igp-icon"><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><path d="m10 9 5 3-5 3z" /></svg>
                <svg viewBox="0 0 24 24" className="igp-icon"><path d="M7 7h11l-3-3M17 17H6l3 3" /></svg>
                <svg viewBox="0 0 24 24" className="igp-icon"><rect x="3.5" y="5" width="17" height="15" rx="3" /><circle cx="12" cy="11" r="2.8" /><path d="M7 20a5 5 0 0 1 10 0M9 5l1-1.5h4L15 5" /></svg>
              </div>
              <div className="igp-grid">
                {Array.from({ length: POSTS }, (_, i) => (
                  <img key={i} src={`/instagram/post-${i + 1}.jpg`} alt="" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* the DM: someone shares a post and asks, the girls reply */}
          <div className="igp-dm">
            <div className="igp-topbar igp-dm-bar">
              <svg viewBox="0 0 24 24" className="igp-icon"><path d="M15 4 7 12l8 8" /></svg>
              <span className="igp-dm-avatar">
                <img src="/instagram/avatar.jpg" alt="" />
              </span>
              <span className="igp-topbar-handle">{HANDLE}</span>
            </div>
            <div className="igp-dm-body">
              <div className="igp-shared igp-out">
                <img src="/instagram/post-5.jpg" alt="" />
                <span>{HANDLE}</span>
              </div>
              <div className="igp-msg igp-msg-out igp-out">Hi! Is this one still available? 😍</div>
              <div className="igp-typing">
                <i />
                <i />
                <i />
              </div>
              <div className="igp-msg igp-msg-in">Yes! Want us to hold it for you? ✨</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
