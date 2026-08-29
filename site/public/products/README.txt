Product photos.

Drop a photo here as lot-NN.jpg (matching the `lot` in lib/products.ts) and
set `image: "/products/lot-NN.jpg"` on that product. Cards without `image`
fall back to the striped hatch placeholder.

Use the original full-size export — do NOT hand-convert to WebP. The cards
render through next/image with `fill`, so Next resizes to the widths in the
`sizes` hint and serves WebP/AVIF automatically at request time. A ~1600px
master is plenty; anything wider is just repo weight.

The photos are cropped with object-fit: cover, so framing matters more than
aspect ratio — keep the piece centred and leave a little margin. Lot 01 is
the "big" card (2x2), lot 09 is also big, and lots 06 and 13 are "wide"
(2x1); the rest are 1x1.

(Don't hotlink Instagram or Drive URLs — they're signed and expire.)

Which source shot each lot came from is recorded in the commit that added
it. Selection rule: the front-on box shot the filenames marked USABLE,
falling back to a NEEDSEDIT frame only where a ring had no usable one.

Gotcha when replacing a photo: next/image caches optimised output under
site/.next/cache/images, and reusing a filename can serve the OLD image
even after a rebuild. Delete .next (or that cache dir) when you swap a
file in place.
