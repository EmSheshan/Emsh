"""Sharp, web-sized environment photos for the redesigned region pages.

    python3 tools/build-scenes.py andela [hero-environment]

The blurred backdrops (tools/build-backdrops.mjs) sit behind card pages; these
are the crisp versions shown in the homepage hero and the grid tiles. Writes
<region>/data/scenes/<environment>.jpg (720px wide) for every photo the region
uses (per data/backdrops/index.json), and scenes/hero.jpg (1920px) from the
hero environment (default: bamboo).
"""
import json, sys
from pathlib import Path
from PIL import Image

region = sys.argv[1]
hero_env = sys.argv[2] if len(sys.argv) > 2 else "bamboo"
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
        made.append(name)
hero = photo(hero_env)
if hero:
    save(hero, out / "hero.jpg", 1920, 72)
total = sum(f.stat().st_size for f in out.glob("*.jpg"))
print(f"{region}: {len(made)} scenes ({', '.join(made)}) + hero from {hero_env}, {total/1e6:.1f} MB")
