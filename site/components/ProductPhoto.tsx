// A product photo that fills its box. Photos uploaded through the Studio are
// turned 90 degrees clockwise here, so every piece matches (rotate=false is for
// the bundled fallback photos, which are already turned).
export default function ProductPhoto({
  src,
  alt,
  rotate = false,
}: {
  src: string;
  alt: string;
  rotate?: boolean;
}) {
  if (!rotate) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="product-img" src={src} alt={alt} />;
  }
  return (
    <span className="product-rot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="product-rot-img" src={src} alt={alt} />
    </span>
  );
}
