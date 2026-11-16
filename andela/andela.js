// andela.js — the Andela 2.0 homepage additions (see andela.css):
//   - the A–Z encyclopedia index
//   - each grid tile's habitat photo (--scene)
// The grid itself, search and filters are still built by shared/index.js.

import { loadDex } from "../shared/pokeData.js";

// This page has no light/dark toggle; drop the class the old site may have set.
document.documentElement.classList.remove("dark-mode");
document.addEventListener("DOMContentLoaded", () => document.body.classList.remove("dark-mode"));

const pad = (n) => String(n).padStart(3, "0");
const displayName = (p) => p.name.split("-")[0];

// ---------------------------------------------------------------- A–Z index

const { pokedex, megadex } = await loadDex();
const entries = [...Object.values(pokedex).filter((p) => !p.isForme), ...Object.values(megadex)]
  .map((p) => ({ id: p.speciesId ?? p.id, name: displayName(p), num: p.num }))
  .sort((a, b) => a.name.localeCompare(b.name));

const az = document.getElementById("azIndex");
let letter = "";
for (const e of entries) {
  const first = e.name[0].toUpperCase();
  if (first !== letter) {
    letter = first;
    const h = document.createElement("p");
    h.className = "az-letter";
    h.textContent = letter;
    az.append(h);
  }
  const a = document.createElement("a");
  a.href = `cardPage.html?pokemon=${e.id}`;
  a.innerHTML = `${e.name}${e.num != null ? `<span class="az-num">${pad(e.num)}</span>` : ""}`;
  az.append(a);
}

// ---------------------------------------------------------------- tile scenes

// Which environment each Pokémon lives in (tools/build-backdrops.mjs). Photos
// have a crisp copy in data/scenes/ (tools/build-scenes.py); painted stand-ins
// only exist as the blurred backdrop, so tiles fall back to that.
const index = await fetch("data/backdrops/index.json", { cache: "no-cache" })
  .then((r) => (r.ok ? r.json() : {}))
  .catch(() => ({}));

const sceneFor = (id) => {
  const file = index[id];
  if (!file) return null;
  return file.startsWith("painted-") ? `data/backdrops/${file}` : `data/scenes/${file}`;
};

const decorate = (tile) => {
  if (tile.dataset.scene) return;
  const id = new URL(tile.href, location.href).searchParams.get("pokemon");
  const url = sceneFor(id);
  tile.dataset.scene = url ?? "none";
  if (url) tile.querySelector(".pokemon-art")?.style.setProperty("--scene", `url("${url}")`);
};

// Tiles are rendered by shared/index.js after its own data load; catch them as
// they arrive (and any already there).
for (const grid of ["pokedex", "megadex"].map((id) => document.getElementById(id)).filter(Boolean)) {
  grid.querySelectorAll("a.pokemon").forEach(decorate);
  new MutationObserver((muts) =>
    muts.forEach((m) => m.addedNodes.forEach((n) => n.matches?.("a.pokemon") && decorate(n))),
  ).observe(grid, { childList: true });
}
