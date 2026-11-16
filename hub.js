// hub.js — the landing page (see hub.css):
//   - the hero: Pokémon from every region, each in its own habitat, cross-
//     fading every few seconds to one from a different region or family
//   - each region card: species count, its habitat photo, a featured Pokémon
// Reads each region's data folder directly; no region code is loaded.

import { parseCSV, buildDex } from "./shared/pokeData.js";

const REGIONS = [
  { key: "lacadia", name: "Lacadia" },
  { key: "andela", name: "Andela" },
];
const HOLD_MS = 5000;
const pad = (n) => String(n).padStart(3, "0");
const baseName = (n) => String(n).split("-")[0];
const abs = (p) => new URL(p, document.baseURI).href;
const text = (url) => fetch(url).then((r) => (r.ok ? r.text() : "")).catch(() => "");
const json = (url) => fetch(url, { cache: "no-cache" }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(true); i.onerror = () => ok(false); i.src = src; });

// Each region's start number lives in its region.js; read it without
// importing (region.js resolves its data against the page).
const startOf = async (key) => {
  const src = await text(`${key}/data/region.js`);
  const m = src.match(/startNumber:\s*(\d+)/);
  return m ? Number(m[1]) : 0;
};

const regions = await Promise.all(REGIONS.map(async (r) => {
  const [dexCsv, megaCsv, index, start] = await Promise.all([
    text(`${r.key}/data/pokedex.csv`), text(`${r.key}/data/megadex.csv`),
    json(`${r.key}/data/backdrops/index.json`), startOf(r.key),
  ]);
  const dex = buildDex(parseCSV(dexCsv), { start });
  const mega = buildDex(parseCSV(megaCsv), { mega: true });
  const all = { ...dex, ...mega };
  const family = (p) => {
    let cur = p;
    for (let i = 0; i < 6 && cur.prevo && all[cur.prevo]; i++) cur = all[cur.prevo];
    return `${r.key}:${cur.id}`;
  };
  // Pokémon whose habitat has a crisp photo (painted stand-ins don't).
  const mons = Object.values(all)
    .filter((p) => !p.isForme && index[p.id] && !index[p.id].startsWith("painted-"))
    .map((p) => ({
      region: r, id: p.id, speciesId: p.speciesId ?? p.id, name: baseName(p.name), num: p.num,
      env: index[p.id].replace(/\.jpg$/, ""), family: family(p),
    }));
  return { ...r, count: Object.values(dex).filter((p) => !p.isForme).length, mons };
}));

// ---------------------------------------------------------------- region cards

for (const r of regions) {
  const card = document.querySelector(`.region[data-region="${r.key}"]`);
  if (!card) continue;
  card.querySelector(".region-count").textContent = `${r.count} Pokémon`;
  // A featured Pokémon whose art has actually been added.
  for (const m of [...r.mons].sort(() => Math.random() - 0.5)) {
    const art = `${r.key}/data/pokemonArt/${m.id}.webp`;
    if (await load(art)) {
      card.querySelector(".region-photo").style.setProperty("--photo", `url("${abs(`${r.key}/data/scenes/${m.env}.jpg`)}")`);
      card.querySelector(".region-art").src = art;
      break;
    }
  }
}

// ---------------------------------------------------------------- hero

const stage = document.querySelector(".hero-stage");
const cap = document.querySelector(".hero-caption");
const pool = regions.flatMap((r) => r.mons);
let current = null;
const recent = [];

function pick() {
  // A different family each time (and the other region when possible), not
  // one of the last few shown.
  let choices = pool.filter((m) => !current || m.family !== current.family);
  const otherRegion = choices.filter((m) => !current || m.region.key !== current.region.key);
  if (otherRegion.length) choices = otherRegion;
  const fresh = choices.filter((m) => !recent.includes(m.family));
  if (fresh.length) choices = fresh;
  return choices[Math.floor(Math.random() * choices.length)];
}

async function show(m) {
  const photo = `${m.region.key}/data/scenes/hero-${m.env}.jpg`;
  const art = `${m.region.key}/data/pokemonArt/${m.id}.webp`;
  const [, hasArt] = await Promise.all([load(photo), load(art)]);
  if (!hasArt) return false;                         // art not added yet: skip it

  const slide = document.createElement("div");
  slide.className = "hero-slide";
  slide.innerHTML = `<div class="hero-photo"></div><img class="hero-mon" alt="" src="${art}">`;
  slide.querySelector(".hero-photo").style.setProperty("--hero-photo", `url("${abs(photo)}")`);
  stage.append(slide);

  cap.classList.remove("is-shown");
  setTimeout(() => {
    cap.href = `${m.region.key}/cardPage.html?pokemon=${m.speciesId}`;
    cap.setAttribute("aria-label", `${m.name} of ${m.region.name}, in the ${m.env.replace(/-/g, " ")}`);
    cap.querySelector(".hero-caption-num").textContent = `${m.region.name}${m.num != null ? ` · Nº ${pad(m.num)}` : ""}`;
    cap.querySelector(".hero-caption-name").textContent = m.name;
    cap.querySelector(".hero-caption-env").textContent = m.env.replace(/-/g, " ");
    cap.classList.add("is-shown");
  }, current ? 500 : 0);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const old = stage.querySelectorAll(".hero-slide.is-active");
    slide.classList.add("is-active");
    old.forEach((o) => { o.classList.remove("is-active"); setTimeout(() => o.remove(), 1600); });
  }));
  current = m;
  recent.push(m.family);
  if (recent.length > 6) recent.shift();
  return true;
}

async function next() {
  for (let tries = 0; tries < 8; tries++) if (await show(pick())) return;
}

if (stage && cap && pool.length) {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  const schedule = () => {
    clearTimeout(timer);
    if (still || document.hidden) return;
    timer = setTimeout(async () => { await next(); schedule(); }, HOLD_MS);
  };
  document.addEventListener("visibilitychange", schedule);
  next().then(schedule);
}
