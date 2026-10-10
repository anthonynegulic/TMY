import type { Photo } from "@/lib/products";

// A product photo that fills its box ("cover") or fits inside it ("contain",
// for the zoom view), turned by the quarter turns set on it in the Studio.
// Quarter turns (90/270) swap the photo's width and height so it still lines
// up with the box after turning.
export default function ProductPhoto({
  photo,
  alt,
  sizes,
  fit = "cover",
  eager = false,
}: {
  photo: Photo;
  alt: string;
  // how wide the photo shows, so the browser picks the right file from srcSet
  sizes?: string;
  fit?: "cover" | "contain";
  // load straight away (the main photo on a page) rather than when scrolled to
  eager?: boolean;
}) {
  const rotation = photo.rotation ?? 0;
  const imgProps = {
    src: photo.src,
    srcSet: photo.srcSet,
    sizes: photo.srcSet ? sizes : undefined,
    alt: photo.alt || alt,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    fetchPriority: eager ? ("high" as const) : undefined,
  };
  const fitClass = fit === "contain" ? " photo-contain" : "";
  if (rotation === 0 || rotation === 180) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`product-img${rotation === 180 ? " product-img-flip" : ""}${fitClass}`}
        {...imgProps}
      />
    );
  }
  return (
    <span className="product-rot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`product-rot-img${fitClass}`}
        style={{ "--rot": `${rotation}deg` } as React.CSSProperties}
        {...imgProps}
      />
    </span>
  );
}
