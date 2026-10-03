"""Builds the web-sized, 45-degree-rotated product crops in public/products
from the originals in photos-raw/. Run from site/: python3 scripts/build-photos.py
Needs Pillow. Rotation is baked in so every product photo is consistent."""
import os
from PIL import Image

# output name -> (source file, ring centre x, centre y, crop size in px before rotating)
CX, CY = 930, 533
PHOTOS = {
    "lattice-dome-ring": ("Ring03_01_USABLE_orig3076.JPG", CX, CY, 720),
    "ruby-wave-ring": ("Ring05_01_USABLE_orig3091.JPG", CX, CY, 720),
    "triple-band-gold-ring": ("Ring06_01_USABLE_orig3098.JPG", CX, CY, 720),
    "ruby-gypsy-ring": ("Ring07_01_USABLE_orig3114.JPG", CX, CY, 640),
    "pave-block-ring": ("Ring08_01_USABLE_orig3129.JPG", CX, CY, 720),
    "panther-head-ring": ("Ring10_01_USABLE_orig3145.JPG", CX, CY, 720),
    "knot-ring": ("Ring11_01_USABLE_orig3150.JPG", CX, CY, 720),
    "sapphire-halo-ring": ("Ring14_05_USABLE_orig3167.JPG", CX, CY, 640),
    # story page
    "story-1": ("Ring04_07_USABLE_orig3124.JPG", CX, CY, 760),
    "story-2": ("Ring09_01_USABLE_orig3137.JPG", CX, CY, 760),
    "story-3": ("Ring13_03_USABLE_orig3159.JPG", CX, CY, 760),
    "story-4": ("Ring16_02_USABLE_orig3179.JPG", CX, CY, 760),
}
OUT = 720
os.makedirs("public/products", exist_ok=True)
for name, (src, cx, cy, size) in PHOTOS.items():
    im = Image.open(f"photos-raw/{src}").convert("RGB")
    # take a larger square, rotate 45 degrees clockwise, then trim the corners
    big = int(size * 1.5)
    im = im.crop((cx - big // 2, cy - big // 2, cx + big // 2, cy + big // 2))
    im = im.rotate(-45, resample=Image.BICUBIC)
    m = (big - size) // 2
    im = im.crop((m, m, m + size, m + size)).resize((OUT, OUT), Image.LANCZOS)
    im.save(f"public/products/{name}.jpg", quality=82)
