import Logo from "@/components/Logo";
import ProductPhoto from "@/components/ProductPhoto";
import type { Product } from "@/lib/products";
import { INSTAGRAM_HANDLE } from "@/lib/site";

// A little animated take on the Instagram profile for the contact page: the
// TMY avatar in a turning ring, the latest pieces popping into the grid, and
// a DM being answered. Purely decorative (the real link is the button next to
// it), and it holds still for anyone who prefers reduced motion.
export default function InstagramPreview({ pieces }: { pieces: Product[] }) {
  const tiles = pieces.filter((p) => p.image).slice(0, 6);
  const asked = tiles[0]?.name;
  return (
    <div className="ig" aria-hidden="true">
      <div className="ig-head">
        <span className="ig-avatar">
          <span className="ig-ring" />
          <span className="ig-avatar-inner">
            <Logo className="ig-logo" />
          </span>
        </span>
        <span className="ig-id">
          <span className="ig-handle">{INSTAGRAM_HANDLE.replace(/^@/, "")}</span>
          <span className="ig-name">Theirs. Mine. Yours.</span>
        </span>
        <span className="ig-follow">Follow</span>
      </div>
      <p className="ig-bio">Pre-loved solid gold, one of one. First dibs drop here.</p>

      {tiles.length > 0 && (
        <div className="ig-grid">
          {tiles.map((p, i) => (
            <span
              key={p.slug}
              className="ig-tile"
              style={{ "--i": i } as React.CSSProperties}
            >
              <ProductPhoto photo={p.image!} alt="" sizes="110px" />
              {i === 0 && <span className="ig-new">New drop</span>}
              {i === 1 && <span className="ig-heart">♥</span>}
            </span>
          ))}
        </div>
      )}

      <div className="ig-dm">
        <span className="ig-bubble ig-bubble-in">
          {asked ? `Is ${asked} still available?` : "Is this one still available?"}
        </span>
        <span className="ig-reply">
          <span className="ig-typing">
            <i />
            <i />
            <i />
          </span>
          <span className="ig-bubble ig-bubble-out">Yes! Want us to hold it for you? 💛</span>
        </span>
      </div>
    </div>
  );
}
