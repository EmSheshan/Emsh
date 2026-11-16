# emsh dex

Em's fan-made Pokémon in one site: the **Lacadia** and **Andela** regional
dexes, plus **Misc** for redesigns and one-offs. Every page shares the look of
the Instagram carousels — habitat backdrops, liquid-glass panels, the yellow
name banner, a gold frame and outlined art.

Static site — plain HTML, CSS and vanilla JS, served by GitHub Pages. Node is
only needed for the scripts in `tools/` that prepare art and backdrops.

## Layout

```
index.html, hub.css, hub.js   the landing page (one card per region)
shared/                       code + styles used by every region (from Andela)
  pokeData.js                 CSV loader; region.js loads a region's modules
  index.js / cardPage.js      the dex grid and the Pokémon page
  styles.css                  Andela's layout;  theme.css / theme.js  the carousel look
andela/  lacadia/  misc/      one folder per region:
  index.html, cardPage.html   thin pages pointing at shared/
  data/pokedex.csv            the dex — edit in any spreadsheet (columns: see shared/pokeData.js)
  data/megadex.csv, canondex.csv, abilities.js, moves.js
  data/region.js              name, where numbering starts, whether it's numbered
  data/pokemonArt/<id>.webp   art (and <id>_shiny.webp)
  data/backdrops/<id>.jpg     blurred habitat behind each Pokémon
environments/                 background photos, one per environment name (forest.jpg, …)
tools/                        art + backdrop scripts
```

## Adding a Pokémon

1. Add a row to `<region>/data/pokedex.csv`. Its `environment` column (forest,
   ocean, cave, space, …) picks the background — see `environments/README.md`.
2. Add the art: `python3 tools/optimize-art.py <folder of PNGs> <region>/data/pokemonArt [id …]`
3. Build its backdrop: `npm install` once, then `node tools/build-backdrops.mjs <region>`.
   It uses the photo `environments/<environment>.jpg`, or a painted stand-in until there is one.

## Adding a region

Copy a region folder, empty its CSVs and art, set `data/region.js`, and add a
card for it in `index.html`.

## Running locally

```
python3 -m http.server
```
