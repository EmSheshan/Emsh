# emsh dex

Em's fan-made Pokémon in one site: field guides to the **Lacadia** and
**Andela** regions. Each Pokémon is
shown in a photograph of its habitat, set into a paper encyclopedia page.

Static site — plain HTML, CSS and vanilla JS, served by GitHub Pages. Node is
only needed for the scripts in `tools/` that prepare art and backdrops.

## Layout

```
index.html, hub.css, hub.js   the landing page: rotating hero + one card per region
shared/                       code + styles used by every region
  pokeData.js, region.js      CSV loader; loads a region's data modules
  field.css, field.js         the field-guide look: recessed habitat hero,
                              paper sheet, A–Z index, photo tiles
  field-card.css/.js          the field-guide Pokémon page
  index.js                    the dex grid (search, filters, tiles)
  styles.css                  Andela's original base styles (fonts, type colours)
andela/  lacadia/            one folder per region:
  index.html, cardPage.html   thin pages pointing at shared/
  data/pokedex.csv            the dex — edit in any spreadsheet (columns: see shared/pokeData.js)
  data/megadex.csv, canondex.csv, abilities.js, moves.js
  data/region.js              name, where numbering starts, whether it's numbered
  data/region.css             the region's colours
  data/pokemonArt/<id>.webp   art (and <id>_shiny.webp)
  data/backdrops/             blurred habitat per scene + index.json (who uses which)
  data/scenes/                crisp habitat photos for tiles and the hero
extra-art/                    art (and data) for designs not on the site
environments/                 background photos, one per environment name (forest.jpg, …)
tools/                        art, backdrop and scene scripts
```

## Adding a Pokémon

1. Add a row to `<region>/data/pokedex.csv`. `environment` is its habitat in
   words (shown in the field notes); `background` names the photo behind it
   (`forest` → `environments/forest.jpg`) — see `environments/README.md`.
2. Add the art: `python3 tools/optimize-art.py <folder of PNGs> <region>/data/pokemonArt [id …]`
3. Build its backgrounds: `npm install` once, then `node tools/build-backdrops.mjs <region>`
   and `python3 tools/build-scenes.py <region>`. They use the photo
   `environments/<background>.jpg`; with no photo the page shows its plain colour.

## Adding a region

Copy a region folder, empty its CSVs and art, set `data/region.js`, and add a
card for it in `index.html`.

## Running locally

```
python3 -m http.server
```
