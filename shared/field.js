// field.js — the field-guide region homepage additions (see field.css), also
// loaded by the Pokémon page for its A–Z index:
//   - the hero: a random Pokémon in its own habitat on every visit
//   - the A–Z encyclopedia index
//   - each grid tile's habitat photo (--scene)
// The grid itself, search and filters are still built by shared/index.js.

import { loadDex } from "./pokeData.js";
import { region } from "./region.js";

// This page has no light/dark toggle; drop the class the old site may have set.
document.documentElement.classList.remove("dark-mode");
document.addEventListener("DOMContentLoaded", () => document.body.classList.remove("dark-mode"));

const pad = (n) => String(n).padStart(3, "0");
// url()s inside CSS variables resolve against the stylesheet that uses them
// (shared/), not this page -- so hand them absolute URLs.
const abs = (p) => new URL(p, document.baseURI).href;

const displayName = (p) => p.name.split("-")[0];

// Which environment each Pokémon lives in (tools/build-backdrops.mjs). Photos
// have crisp copies in data/scenes/ (tools/build-scenes.py); painted stand-ins
// only exist as the blurred backdrop.
const [index, { pokedex, megadex }] = await Promise.all([
  fetch("data/backdrops/index.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({})),
  loadDex(),
]);
const photoOf = (id) => {
  const file = index[id];
  return file && !file.startsWith("painted-") ? file.replace(/\.jpg$/, "") : null;
};

// ---------------------------------------------------------------- hero

// A random Pokémon in its own habitat on each visit, then every few seconds a
// cross-fade to one from a different evolution family. Runs alongside the rest
// of the page (not awaited), so the index and grid never wait on hero images.
const HERO_HOLD_MS = 5000;

function startHero() {
  const hero = document.querySelector(".hero");
  const stage = hero?.querySelector(".hero-stage");
  const cap = hero?.querySelector(".hero-caption");
  if (!stage || !cap) return;

  // Any Pokémon (Megas and Xenos included) whose habitat has a real photo.
  const all = { ...pokedex, ...megadex };
  const pool = Object.values(all).filter((p) => !p.isForme && photoOf(p.id));
  if (!pool.length) return;

  // Evolution family = the top of its prevo chain.
  const family = (p) => {
    let cur = p;
    for (let i = 0; i < 5 && cur.prevo && all[cur.prevo]; i++) cur = all[cur.prevo];
    return cur.id;
  };

  const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(true); i.onerror = () => ok(false); i.src = src; });
  let current = null;
  const recent = [];

  const pick = () => {
    // Not the current family, and not one of the last few shown if possible.
    let choices = pool.filter((p) => !current || family(p) !== family(current));
    const fresh = choices.filter((p) => !recent.includes(p.id));
    if (fresh.length) choices = fresh;
    if (!current) {
      let last = null;
      try { last = sessionStorage.getItem(`${region.name}Hero`); } catch {}
      const notLast = choices.filter((p) => p.id !== last);
      if (notLast.length) choices = notLast;
    }
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const show = async (mon) => {
    const env = photoOf(mon.id);
    const photoUrl = `data/scenes/hero-${env}.jpg`;
    const artUrl = `data/pokemonArt/${mon.id}.webp`;
    const [, hasArt] = await Promise.all([load(photoUrl), load(artUrl)]);   // never fade in half-loaded
    if (!hasArt) return false;                         // art not added yet: pick another

    const slide = document.createElement("div");
    slide.className = "hero-slide";
    slide.innerHTML = `<div class="hero-photo"></div><img class="hero-mon" alt="" src="${artUrl}">`;
    slide.querySelector(".hero-photo").style.setProperty("--hero-photo", `url("${abs(photoUrl)}")`);
    stage.append(slide);

    cap.classList.remove("is-shown");
    setTimeout(() => {
      cap.href = `cardPage.html?pokemon=${mon.speciesId ?? mon.id}`;
      cap.setAttribute("aria-label", `${displayName(mon)}, shown in the ${env.replace(/-/g, " ")}`);
      cap.querySelector(".hero-caption-num").textContent = mon.num != null ? `Nº ${pad(mon.num)}` : "";
      cap.querySelector(".hero-caption-name").textContent = displayName(mon);
      cap.querySelector(".hero-caption-env").textContent = env.replace(/-/g, " ");
      cap.classList.add("is-shown");
    }, current ? 500 : 0);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const old = stage.querySelectorAll(".hero-slide.is-active");
      slide.classList.add("is-active");
      old.forEach((o) => { o.classList.remove("is-active"); setTimeout(() => o.remove(), 1600); });
    }));

    current = mon;
    recent.push(mon.id);
    if (recent.length > Math.max(3, Math.floor(pool.length / 2))) recent.shift();
    try { sessionStorage.setItem(`${region.name}Hero`, mon.id); } catch {}
    return true;
  };

  const next = async () => {
    for (let tries = 0; tries < 8; tries++) if (await show(pick())) return;
  };

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  const schedule = () => {
    clearTimeout(timer);
    if (still || document.hidden) return;              // pause while the tab is hidden
    timer = setTimeout(async () => { await next(); schedule(); }, HERO_HOLD_MS);
  };
  document.addEventListener("visibilitychange", schedule);

  next().then(schedule);
}
startHero();

// Regions with no Megas/Xenos drop that whole section, heading included.
if (!Object.keys(megadex).length) document.querySelector(".section-head--sub")?.remove();

// ---------------------------------------------------------------- A–Z index

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

// Painted stand-ins have no crisp scene, so their tiles use the backdrop.
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
  if (url) tile.querySelector(".pokemon-art")?.style.setProperty("--scene", `url("${abs(url)}")`);
};

// Tiles are rendered by shared/index.js after its own data load; catch them as
// they arrive (and any already there).
for (const grid of ["pokedex", "megadex"].map((id) => document.getElementById(id)).filter(Boolean)) {
  grid.querySelectorAll("a.pokemon").forEach(decorate);
  new MutationObserver((muts) =>
    muts.forEach((m) => m.addedNodes.forEach((n) => n.matches?.("a.pokemon") && decorate(n))),
  ).observe(grid, { childList: true });
}
