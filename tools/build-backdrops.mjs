// Builds each Pokemon's backdrop: the blurred photo its card page shows behind
// the art.
//
//   node tools/build-backdrops.mjs              # every region
//   node tools/build-backdrops.mjs lacadia      # one region
//
// The CSV's `background` column names a photo in environments/ (forest ->
// environments/forest.jpg). No photo, no backdrop: the page shows the region's
// plain colour instead. Output: one image per photo in
// <region>/data/backdrops/ plus index.json (Pokemon id -> file). Re-run after
// adding photos or changing the column.

import { createCanvas, loadImage } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { parseCSV, buildDex } from '../shared/pokeData.js';

const W = 480, H = 600;
const ENV_DIR = 'environments';
const regions = process.argv.slice(2).length ? process.argv.slice(2)
    : fs.readdirSync('.').filter((d) => fs.existsSync(path.join(d, 'data', 'pokedex.csv')));

/** node-canvas has no ctx.filter: blur by shrinking and growing in steps. */
function blur(src, w, h, strength) {
    let cur = src, cw = w, ch = h;
    const steps = [];
    for (let f = 2; f <= strength; f *= 2) steps.push(f);
    for (const f of steps) {
        const c = createCanvas(Math.max(1, Math.round(w / f)), Math.max(1, Math.round(h / f)));
        c.getContext('2d').drawImage(cur, 0, 0, cw, ch, 0, 0, c.width, c.height);
        cur = c; cw = c.width; ch = c.height;
    }
    for (const f of [...steps].reverse().slice(1).concat(1)) {
        const c = createCanvas(Math.round(w / f), Math.round(h / f));
        c.getContext('2d').drawImage(cur, 0, 0, cw, ch, 0, 0, c.width, c.height);
        cur = c; cw = c.width; ch = c.height;
    }
    return cur;
}

const photoCache = new Map();
async function photoFor(env) {
    if (!env) return null;
    if (!photoCache.has(env)) {
        const file = ['jpg', 'jpeg', 'png'].map((e) => path.join(ENV_DIR, `${env}.${e}`)).find((p) => fs.existsSync(p));
        photoCache.set(env, file ? await loadImage(file) : null);
    }
    return photoCache.get(env);
}

const missingPhotos = new Set();

for (const region of regions) {
    const dir = path.join(region, 'data');
    const out = path.join(dir, 'backdrops');
    fs.rmSync(out, { recursive: true, force: true });  // drop files no longer used
    fs.mkdirSync(out, { recursive: true });
    const index = {};
    const written = new Set();
    const read = (f) => fs.existsSync(path.join(dir, f)) ? parseCSV(fs.readFileSync(path.join(dir, f), 'utf8')) : [];
    // Canon Pokémon too: they appear as tiles in evolution families.
    const mons = [...Object.values(buildDex(read('pokedex.csv'))), ...Object.values(buildDex(read('megadex.csv'), { mega: true })),
        ...Object.values(buildDex(read('canondex.csv'), { external: true }))];
    const tally = {};

    for (const mon of mons) {
        const bg = mon.background;
        const src = await photoFor(bg);
        if (!src) {                       // nothing to show: the page uses its plain colour
            if (bg) missingPhotos.add(bg);
            tally['(no photo)'] = (tally['(no photo)'] ?? 0) + 1;
            continue;
        }
        const label = bg, key = bg;
        index[mon.id] = `${key}.jpg`;
        tally[label] = (tally[label] ?? 0) + 1;
        if (written.has(key)) continue;
        written.add(key);
        const sharp = createCanvas(W, H);
        const s = Math.max(W / src.width, H / src.height) * 1.08;  // overscan hides blurred edges
        sharp.getContext('2d').drawImage(src, (W - src.width * s) / 2, (H - src.height * s) / 2, src.width * s, src.height * s);
        const img = blur(sharp, W, H, 8);
        fs.writeFileSync(path.join(out, `${key}.jpg`), img.toBuffer('image/jpeg', { quality: 0.8 }));
    }
    fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(index, null, 1) + '\n');
    if (mons.length) console.log(region + ':', Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(', '));
}
if (missingPhotos.size) {
    console.log(`\nNo photo yet for: ${[...missingPhotos].sort().join(', ')} (shown on the plain colour)`);
    console.log(`Add ${ENV_DIR}/<name>.jpg for each, then re-run.`);
}
