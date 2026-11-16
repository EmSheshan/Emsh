"""Sharp, web-sized environment photos for the redesigned region pages.

    python3 tools/build-scenes.py andela

The blurred backdrops (tools/build-backdrops.mjs) sit behind card pages; these
are the crisp versions for the redesigned homepage. For every photo the region
uses (per data/backdrops/index.json) it writes:
  <region>/data/scenes/<environment>.jpg        720px, for the grid tiles
  <region>/data/scenes/hero-<environment>.jpg   1920px, for the hero, which
                                                shows a random Pokémon in its
                                                own habitat on each visit
"""
import json, sys
from pathlib import Path
from PIL import Image

region = sys.argv[1]
data = Path(region) / "data"
out = data / "scenes"
out.mkdir(exist_ok=True)

def photo(name):
    for ext in ("jpg", "jpeg", "png"):
        p = Path("environments") / f"{name}.{ext}"
        if p.exists():
            return p
    return None

def save(src, dst, width, quality):
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)

index = json.loads((data / "backdrops" / "index.json").read_text())
names = sorted({f.rsplit(".", 1)[0] for f in index.values()})
made = []
for name in names:
    src = photo(name)
    if src:  # painted stand-ins have no photo; tiles fall back to the backdrop
        save(src, out / f"{name}.jpg", 720, 76)
        save(src, out / f"hero-{name}.jpg", 1920, 70)
        made.append(name)
(out / "hero.jpg").unlink(missing_ok=True)   # replaced by per-environment heroes
total = sum(f.stat().st_size for f in out.glob("*.jpg"))
print(f"{region}: {len(made)} environments ({', '.join(made)}), tile + hero each, {total/1e6:.1f} MB")
