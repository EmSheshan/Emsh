// field-card.js — the field-guide Pokémon page (<region>/cardPage.html;
// styles in field-card.css on top of field.css). Regions that haven't moved
// to the field guide keep shared/cardPage.js.
//
// Layout, after the reference field guide:
//   band    the Pokémon in its own habitat photo, its name in the display
//           serif, kind beside it; prev / next and back-to-dex in the nav
//   paper   the A–Z index (built by field.js) beside: About, Field notes laid
//           along a moss line, Base stats, Evolution
//
// Moving between Pokémon (prev/next, evolution, index, arrow keys) re-renders
// in place and cross-fades the band, like the homepage hero.

import { loadDex } from "./pokeData.js";
import { abilities, moves, region } from "./region.js";

const SHARED = "../shared/";
const pad = (n) => String(n).padStart(3, "0");
// url()s inside CSS variables resolve against the stylesheet that uses them
// (shared/), not this page -- so hand them absolute URLs.
const abs = (p) => new URL(p, document.baseURI).href;

const baseName = (p) => p.name.split("-")[0];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const art = (id, shiny = false) => `data/pokemonArt/${id}${shiny ? "_shiny" : ""}.webp`;

// ---------------------------------------------------------------- data

const [{ pokedex, megadex, canondex }, index] = await Promise.all([
  loadDex(),
  fetch("data/backdrops/index.json", { cache: "no-cache" }).then((r) => (r.ok ? r.json() : {})).catch(() => ({})),
]);
const byId = { ...canondex, ...pokedex, ...megadex };

// Species -> its formes (base first); prev/next order = dex order, then Megas.
const forms = new Map();
for (const p of [...Object.values(pokedex), ...Object.values(megadex)]) {
  if (!forms.has(p.speciesId)) forms.set(p.speciesId, []);
  forms.get(p.speciesId).push(p);
}
const order = [...forms.keys()];

// A link can be declared from either side: a parent's `evo` or a child's `prevo`.
const children = (p) => {
  const ids = [...(p.evo ?? [])];
  for (const c of Object.values(byId)) if (c.prevo === p.id && !ids.includes(c.id)) ids.push(c.id);
  return ids.map((id) => byId[id]).filter(Boolean);
};
const root = (p) => {
  let cur = p;
  for (let i = 0; i < 6 && cur.prevo && byId[cur.prevo]; i++) cur = byId[cur.prevo];
  return cur;
};

// Background for a Pokémon: crisp hero photo of its environment, or the blurred
// backdrop when its environment has no photo yet.
const photoFor = (id) => {
  const file = index[id];
  if (!file) return null;
  return file.startsWith("painted-") ? `data/backdrops/${file}` : `data/scenes/hero-${file}`;
};
const tileFor = (id) => {
  const file = index[id];
  if (!file) return null;
  return file.startsWith("painted-") ? `data/backdrops/${file}` : `data/scenes/${file}`;
};
const envName = (id) => {
  const file = index[id];
  return file && !file.startsWith("painted-") ? file.replace(/\.jpg$/, "").replace(/-/g, " ") : null;
};

const typeIcon = (t) => `<img src="${SHARED}typeIcons/${t}.png" alt="" class="t-icon">`;
const typeChip = (t) => `<span class="t-chip" style="--t: var(--type-${t.toLowerCase()})">${typeIcon(t)}${t}</span>`;

// ---------------------------------------------------------------- page parts

function bandHTML(mon, list, formIndex) {
  const i = order.indexOf(mon.speciesId);
  const navTo = (sid, dir) => {
    if (!sid) return `<span class="band-step band-step--${dir} is-empty"></span>`;
    const p = forms.get(sid)[0];
    return `<a class="band-step band-step--${dir}" href="?pokemon=${sid}" data-go="${sid}">
      <span class="band-step-label">${p.num != null ? `Nº ${pad(p.num)}<span class="band-step-name">  ${esc(baseName(p))}</span>` : esc(baseName(p))}</span>
      <span class="hero-link-rule" aria-hidden="true"></span></a>`;
  };
  const formTabs = list.length > 1
    ? `<div class="form-tabs" role="tablist" aria-label="Forms">${list.map((f, k) =>
        `<button role="tab" aria-selected="${k === formIndex}" data-form="${k}">${esc(f.forme || f.name.split("-")[1] || "Base")}</button>`).join("")}</div>`
    : "";
  return `
    <nav class="hero-nav band-nav">
      <a class="brand" href="../index.html"><span class="brand-mark" aria-hidden="true"></span>emsh</a>
      <a class="band-back" href="index.html">${esc(region.name)} Pokédex</a>
      <div class="band-steps">${navTo(order[i - 1], "prev")}${navTo(order[i + 1], "next")}</div>
    </nav>
    <div class="band-title">
      <p class="band-meta">${mon.num != null ? `<span class="band-num">Nº ${pad(mon.num)}</span>` : `<span class="band-num">${mon.isMega ? "Xeno / Mega" : ""}</span>`}${mon.types.map(typeChip).join("")}</p>
      <p class="band-kind">The ${esc(mon.kind)} Pokémon</p>
      <h1 class="visually-hidden">${esc(baseName(mon))}</h1>
      ${formTabs}
    </div>
    <button class="shiny-toggle" type="button" aria-pressed="false"><span class="shiny-mark" aria-hidden="true"></span>Shiny</button>`;
}

function aboutHTML(mon) {
  const d = mon.description?.length ? mon.description : ["No entry yet."];
  return `
    <section class="about">
      <h2 class="entry-label">About</h2>
      <div class="about-text">${d.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    </section>`;
}

function notesHTML(mon) {
  const ab = [["0", ""], ["1", ""], ["H", "Hidden"]]
    .map(([k, note]) => [mon.abilities?.[k], note]).filter(([a]) => a);
  const isOriginal = (a) => {
    const tag = abilities[a]?.tag;
    return tag === region.name.toLowerCase() || tag === "mega";
  };
  const abDesc = (a) => (typeof abilities[a] === "object" ? abilities[a].description : abilities[a]) || "";
  const mv = mon.signatureMove && moves[mon.signatureMove];
  const env = envName(mon.id);

  const note = (label, body, cls = "") => `<div class="note ${cls}"><h3>${label}</h3>${body}</div>`;
  const items = [
    note("Type", `<p class="note-chips">${mon.types.map(typeChip).join("")}</p>`),
    mon.heightm != null ? note("Height", `<p class="note-figure">${mon.heightm} m</p>`) : "",
    mon.weightkg != null ? note("Weight", `<p class="note-figure">${mon.weightkg} kg</p>`) : "",
    env ? note("Habitat", `<p class="note-figure note-figure--word">${esc(env)}</p>`) : "",
    ...ab.map(([a, n]) => note(
      `${isOriginal(a) ? '<span class="orig" title="${esc(region.name)} original"></span>' : ""}${esc(a)}${n ? `<span class="note-tag">${n}</span>` : ""}`,
      `<p>${esc(abDesc(a))}</p>`, isOriginal(a) ? "note--original" : "")),
    mv ? note(
      `Signature move`,
      `<p class="move-name">${esc(mon.signatureMove)} ${mv.type ? typeIcon(mv.type) : ""}${mv.category ? `<img src="${SHARED}moveIcons/${mv.category}.png" alt="${mv.category}" class="t-icon">` : ""}</p>
       <p class="move-stats">${[mv.power ? `Power ${mv.power}` : "", mv.accuracy ? `Accuracy ${mv.accuracy === true ? "—" : mv.accuracy}` : "", mv.pp ? `${mv.pp} PP` : ""].filter(Boolean).join(" · ")}</p>
       <p>${esc(mv.description || "")}</p>`, "note--wide") : "",
  ].join("");

  return `
    <section class="notes">
      <h2 class="entry-label">Field notes</h2>
      <div class="notes-grid">${items}</div>
    </section>`;
}

function statsHTML(mon) {
  const rows = [["hp", "HP"], ["atk", "Attack"], ["def", "Defense"], ["spa", "Sp. Atk"], ["spd", "Sp. Def"], ["spe", "Speed"]];
  const bst = rows.reduce((t, [k]) => t + (mon.baseStats[k] ?? 0), 0);
  return `
    <section class="stats">
      <div class="stats-head"><h2 class="entry-label">Base stats</h2><p class="stats-total"><span>${bst}</span> total</p></div>
      <div class="stats-rows">${rows.map(([k, label]) => {
        const v = mon.baseStats[k] ?? 0;
        return `<div class="stat"><span class="stat-label">${label}</span><span class="stat-num">${v}</span>
          <span class="stat-track"><span class="stat-fill stat-fill--${k}" style="--w: ${Math.min(100, (v / 180) * 100)}%"></span></span></div>`;
      }).join("")}</div>
    </section>`;
}

function nodeHTML(p, current, viewing = null) {
  const isCurrent = p.id === current || p.speciesId === current;
  // On the current node, show the forme you're looking at (e.g. Yakoyza-Ink).
  const shown = isCurrent && viewing ? viewing : p;
  const tile = tileFor(shown.id);
  const inner = `
    <span class="fam-art" ${tile ? `style="--scene: url('${abs(tile)}')"` : ""}><img src="${art(shown.id)}" alt="" loading="lazy"></span>
    <span class="fam-label">${p.num != null ? `<span class="fam-num">Nº ${pad(p.num)}</span>` : p.isExternal ? `<span class="fam-num">Canon</span>` : `<span class="fam-num">Xeno / Mega</span>`}
      <span class="fam-name">${esc(baseName(p))}</span></span>`;
  const cls = `fam-node${isCurrent ? " is-current" : ""}${p.isExternal ? " is-canon" : ""}`;
  return p.isExternal || isCurrent
    ? `<span class="${cls}"${isCurrent ? ' aria-current="page"' : ""}>${inner}</span>`
    : `<a class="${cls}" href="?pokemon=${p.speciesId}" data-go="${p.speciesId}">${inner}</a>`;
}

function familyHTML(p, current, viewing) {
  const kids = children(p);
  if (!kids.length) return `<div class="fam-branch">${nodeHTML(p, current, viewing)}</div>`;
  return `<div class="fam-branch">${nodeHTML(p, current, viewing)}
    <div class="fam-kids">${kids.map((k) => `
      <div class="fam-step"><span class="fam-arrow">${k.evoMethod ? `<span class="fam-method">${esc(k.evoMethod)}</span>` : ""}</span>${familyHTML(k, current, viewing)}</div>`).join("")}
    </div></div>`;
}

function evoHTML(mon) {
  // Evolution links are recorded on a species' base forme, so climb from that
  // (an alternate forme like Yakoyza-Ink has no prevo of its own).
  const base = forms.get(mon.speciesId)?.[0] ?? mon;
  const top = root(base);
  if (mon.isMega) {
    if (top.id === mon.id) return "";
    return `<section class="family"><h2 class="entry-label">Base form</h2>
      <div class="fam-tree">${nodeHTML(top, mon.speciesId)}<p class="fam-note">${esc(baseName(mon))} is a Xeno / Mega form of ${esc(baseName(top))}.</p></div></section>`;
  }
  const solo = !children(top).length;
  return `<section class="family"><h2 class="entry-label">Family</h2>
    <div class="fam-tree">${familyHTML(top, mon.speciesId, mon)}${solo ? '<p class="fam-note">Does not evolve.</p>' : ""}</div></section>`;
}

// ---------------------------------------------------------------- render

const band = document.querySelector(".band");
const content = document.getElementById("cardContent");
const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = i.onerror = ok; i.src = src; });
let state = { id: null, form: 0, shiny: false };

function markIndex(sid) {
  document.querySelectorAll("#azIndex a").forEach((a) => {
    const on = new URL(a.href).searchParams.get("pokemon") === sid;
    a.toggleAttribute("aria-current", on);
    if (on) a.setAttribute("aria-current", "page");
  });
}

// The big name: start from the size CSS gives it, then shrink until the real
// rendered width fits its column (letter widths vary too much to guess).
function fitName(el) {
  if (!el) return;
  el.style.fontSize = "";
  const fit = () => {
    el.style.fontSize = "";
    const room = el.clientWidth * 0.97;    // a little breathing room at the edge
    let size = parseFloat(getComputedStyle(el).fontSize);
    for (let i = 0; i < 12 && el.scrollWidth > room && size > 28; i++) {
      size *= Math.max(0.6, (room / el.scrollWidth) * 0.99);
      el.style.fontSize = `${size}px`;
    }
  };
  fit();
  document.fonts?.ready.then(fit);   // re-check once the serif has loaded
}
addEventListener("resize", () => document.querySelectorAll(".band-word").forEach(fitName));

async function showSlide(mon) {
  const stage = band.querySelector(".hero-stage");
  const photo = photoFor(mon.id);
  const src = art(mon.id, state.shiny);
  await Promise.all([photo ? load(photo) : null, load(src)]);
  const slide = document.createElement("div");
  slide.className = "hero-slide";
  // Photo, then the big name, then the Pokémon standing in front of its name.
  slide.innerHTML = `<div class="hero-photo"></div><p class="band-word" aria-hidden="true">${esc(baseName(mon))}</p><img class="hero-mon" alt="" src="${src}">`;
  if (photo) slide.querySelector(".hero-photo").style.setProperty("--hero-photo", `url("${abs(photo)}")`);
  slide.querySelector("img").addEventListener("error", (e) => (e.target.style.visibility = "hidden"));
  stage.append(slide);
  fitName(slide.querySelector(".band-word"));
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const old = stage.querySelectorAll(".hero-slide.is-active");
    slide.classList.add("is-active");
    old.forEach((o) => { o.classList.remove("is-active"); setTimeout(() => o.remove(), 1400); });
  }));
}

async function render(sid, formIndex = 0, { scroll = false } = {}) {
  // Accept a forme's own id too (e.g. ?pokemon=sedimentalbloom).
  if (!forms.has(sid) && byId[sid]) sid = byId[sid].speciesId;
  const list = forms.get(sid) ?? forms.get(order[0]);
  sid = list[0].speciesId;
  formIndex = Math.min(formIndex, list.length - 1);
  const mon = list[formIndex];
  const sameMon = state.id === sid && state.form === formIndex;
  const formeOnly = state.id === sid && state.form !== formIndex;   // same species, other forme
  if (!sameMon && !formeOnly) state.shiny = false;
  state = { ...state, id: sid, form: formIndex };

  document.title = `${mon.num != null ? `Nº ${pad(mon.num)} · ` : ""}${baseName(mon)} — ${region.name} Pokédex`;
  band.style.setProperty("--len", baseName(mon).length);   // sizes the big name
  document.documentElement.style.setProperty("--t1", `var(--type-${mon.types[0].toLowerCase()})`);

  band.querySelector(".band-chrome").innerHTML = bandHTML(mon, list, formIndex);
  // One compact entry: About + Field notes beside Base stats, Family below.
  content.innerHTML = `<div class="entry">${aboutHTML(mon)}${statsHTML(mon)}${notesHTML(mon)}${evoHTML(mon)}</div>`;
  requestAnimationFrame(() => content.classList.add("is-in"));
  markIndex(sid);

  const shinyBtn = band.querySelector(".shiny-toggle");
  shinyBtn.setAttribute("aria-pressed", String(state.shiny));
  shinyBtn.addEventListener("click", () => {
    state.shiny = !state.shiny;
    shinyBtn.setAttribute("aria-pressed", String(state.shiny));
    const img = band.querySelector(".hero-slide.is-active .hero-mon");
    if (img) img.src = art(mon.id, state.shiny);
  });
  band.querySelectorAll("[data-form]").forEach((b) =>
    b.addEventListener("click", () => render(sid, Number(b.dataset.form))));

  if (scroll) window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  if (formeOnly && swapInPlace(mon)) return;
  await showSlide(mon);
}

// Changing forme keeps the same slide: the art (and the photo, if this forme
// lives somewhere else) change on the spot -- no cross-fade, no blur-zoom.
function swapInPlace(mon) {
  const slide = band.querySelector(".hero-slide.is-active");
  if (!slide) return false;
  slide.querySelector(".hero-mon").src = art(mon.id, state.shiny);
  const photo = photoFor(mon.id);
  if (photo) slide.querySelector(".hero-photo").style.setProperty("--hero-photo", `url("${abs(photo)}")`);
  const word = slide.querySelector(".band-word");
  word.textContent = baseName(mon);
  fitName(word);
  return true;
}

// In-page navigation: prev/next, evolution nodes, the A–Z index.
const go = (sid) => {
  if (!sid || sid === state.id) return;
  history.pushState({ sid }, "", `?pokemon=${sid}`);
  render(sid, 0, { scroll: true });
};
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-go], #azIndex a");
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const sid = a.dataset.go ?? new URL(a.href).searchParams.get("pokemon");
  if (!sid || !forms.has(sid)) return;
  e.preventDefault();
  go(sid);
});
window.addEventListener("popstate", () => render(new URLSearchParams(location.search).get("pokemon") ?? order[0]));
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
  const i = order.indexOf(state.id);
  if (e.key === "ArrowLeft" && order[i - 1]) go(order[i - 1]);
  if (e.key === "ArrowRight" && order[i + 1]) go(order[i + 1]);
});

// The A–Z index is built by field.js; mark the current entry once it exists.
const az = document.getElementById("azIndex");
if (az) new MutationObserver(() => markIndex(state.id)).observe(az, { childList: true });

render(new URLSearchParams(location.search).get("pokemon") ?? order[0]);
