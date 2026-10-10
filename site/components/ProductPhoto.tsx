import type { Photo } from "@/lib/products";

// A product photo that fills its box, turned by the quarter turns set on it in
// the Studio. Quarter turns (90/270) swap the photo's width and height so it
// still covers the box after turning.
export default function ProductPhoto({ photo, alt }: { photo: Photo; alt: string }) {
  const rotation = photo.rotation ?? 0;
  const label = photo.alt || alt;
  if (rotation === 0 || rotation === 180) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`product-img${rotation === 180 ? " product-img-flip" : ""}`}
        src={photo.src}
        alt={label}
      />
    );
  }
  return (
    <span className="product-rot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="product-rot-img"
        style={{ "--rot": `${rotation}deg` } as React.CSSProperties}
        src={photo.src}
        alt={label}
      />
    </span>
  );
}
