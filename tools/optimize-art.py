"""Shrink full-size Pokemon art into web-sized WebP for the site.

    python3 tools/optimize-art.py <source folder of PNGs> <region>/data/pokemonArt [id ...]

With ids, only those Pokemon (and their _shiny art) are converted.

Keeps transparency, caps the long edge at 800px (the card page never shows
art bigger than that), and skips files that are already up to date.
"""
import sys
from pathlib import Path
from PIL import Image

MAX = 800
src, dst = Path(sys.argv[1]), Path(sys.argv[2])
only = set(sys.argv[3:])
dst.mkdir(parents=True, exist_ok=True)
built = skipped = 0
for png in sorted(src.glob("*.png")):
    if only and png.stem.removesuffix("_shiny") not in only:
        continue
    out = dst / (png.stem + ".webp")
    if out.exists() and out.stat().st_mtime >= png.stat().st_mtime:
        skipped += 1
        continue
    im = Image.open(png).convert("RGBA")
    im.thumbnail((MAX, MAX), Image.LANCZOS)
    im.save(out, "WEBP", quality=84, method=6)
    built += 1
total = sum(f.stat().st_size for f in dst.glob("*.webp"))
print(f"{dst}: built {built}, skipped {skipped}, {total/1e6:.1f} MB")
