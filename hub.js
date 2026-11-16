// hub.js — fills each region card with its featured art, habitat backdrop and
// species count, read straight from that region's data folder.
import { parseCSV } from "./shared/pokeData.js";

for (const card of document.querySelectorAll(".region")) {
  const region = card.dataset.region;
  const hero = card.dataset.hero;
  const count = card.querySelector(".region-count");

  if (hero) {
    card.querySelector(".region-art").src = `${region}/data/pokemonArt/${hero}.webp`;
    fetch(`${region}/data/backdrops/index.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((index) => {
        card.querySelector(".region-bg").style.backgroundImage =
          `url("${region}/data/backdrops/${index[hero] ?? `${hero}.jpg`}")`;
      });
  }

  fetch(`${region}/data/pokedex.csv`)
    .then((r) => (r.ok ? r.text() : ""))
    .then((text) => {
      // Extra formes share their species' entry, so count base rows only.
      const n = parseCSV(text).filter((row) => !row.forme).length;
      count.textContent = n ? `${n} Pokémon` : "Coming soon";
      if (!n) card.classList.add("is-empty");
    })
    .catch(() => (count.textContent = ""));
}
