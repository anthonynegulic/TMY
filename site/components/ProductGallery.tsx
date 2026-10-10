"use client";

import { useEffect, useRef, useState } from "react";
import ProductPhoto from "@/components/ProductPhoto";
import type { Photo } from "@/lib/products";

// Main photo plus thumbnails on the product page. Tapping a thumbnail swaps
// the main photo; tapping the main photo opens it full screen.
export default function ProductGallery({
  photos,
  name,
  color,
  era,
  sold,
}: {
  photos: Photo[];
  name: string;
  color: string;
  era: string;
  sold: boolean;
}) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = photos[index];
  const many = photos.length > 1;

  const step = (by: number) =>
    setIndex((i) => (i + by + photos.length) % photos.length);

  // arrow keys flick through photos while zoomed in (Escape is built in)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !many) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
    }
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [many, photos.length]);

  const tags = (
    <>
      <div className="tag-chip">
        <span className="tag-hole" />
        {era}
      </div>
      {sold && <span className="product-sold-chip">SOLD</span>}
    </>
  );

  if (!current) {
    return (
      <div className="product-page-photo" style={{ background: color }}>
        <div className="hatch product-hatch">
          <span>product shot coming soon</span>
        </div>
        {tags}
      </div>
    );
  }

  const label = (i: number) => `${name}, photo ${i + 1} of ${photos.length}`;

  return (
    <div>
      <button
        type="button"
        className="product-page-photo product-zoom"
        style={{ background: color }}
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Zoom in: ${label(index)}`}
      >
        <ProductPhoto
          photo={current}
          alt={label(index)}
          sizes="(max-width: 900px) 100vw, 640px"
          eager
        />
        {tags}
        <span className="zoom-hint" aria-hidden="true">
          Zoom
        </span>
      </button>

      {many && (
        <div className="product-more">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={`product-more-item${i === index ? " product-more-active" : ""}`}
              style={{ background: color }}
              onClick={() => setIndex(i)}
              aria-label={`Show ${label(i)}`}
              aria-pressed={i === index}
            >
              <ProductPhoto photo={photo} alt="" sizes="160px" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${name} photos`}
        onClick={(e) => {
          // a tap anywhere but the controls closes it
          if (!(e.target as HTMLElement).closest("button")) dialogRef.current?.close();
        }}
      >
        <div className="lightbox-frame">
          <ProductPhoto photo={current} alt={label(index)} fit="contain" sizes="100vw" />
        </div>
        <button
          type="button"
          className="lightbox-btn lightbox-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
        >
          ×
        </button>
        {many && (
          <>
            <button
              type="button"
              className="lightbox-btn lightbox-prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              ←
            </button>
            <button
              type="button"
              className="lightbox-btn lightbox-next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              →
            </button>
            <div className="lightbox-count">
              {index + 1} / {photos.length}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
