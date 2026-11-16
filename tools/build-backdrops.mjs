// Builds each Pokemon's backdrop: the blurred scene its card page shows behind
// the art (the same look as the Instagram carousels).
//
//   node tools/build-backdrops.mjs              # every region
//   node tools/build-backdrops.mjs lacadia      # one region
//
// The CSV's `environment` column picks the scene, in this order:
//   1. a photo at environments/<environment>.jpg (or .jpeg/.png) -- shared by
//      every region, so one forest photo covers every forest Pokemon;
//   2. otherwise (no photo for that environment yet, or the column is blank)
//      the default photo, environments/meadow.jpg -- the grassy field;
//   3. only if that is missing too, a painted scene (see tools/habitats.mjs).
// Environment names are kept as-is, so adding e.g. volcano.jpg later moves
// every volcano Pokemon off the default on the next run.
// Output: one image per distinct scene in <region>/data/backdrops/ (forest.jpg,
// meadow.jpg, ...), plus index.json mapping each Pokemon id to its file. Sharing
// files is what lets the card page skip the cross-fade when the next Pokemon
// has the same background. Re-run after adding photos or changing the column.

import { createCanvas, loadImage } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { parseCSV, buildDex } from '../shared/pokeData.js';
import { pickHabitat, paintHabitat, HABITATS } from './habitats.mjs';

const W = 480, H = 600;
const ENV_DIR = 'environments';
const DEFAULT_ENV = 'meadow';   // the grassy field: used until an environment has a photo
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
    const mons = [...Object.values(buildDex(read('pokedex.csv'))), ...Object.values(buildDex(read('megadex.csv'), { mega: true }))];
    const tally = {};

    for (const mon of mons) {
        const env = mon.environment;
        // `key` names the output file: the same key means the same image.
        let src = await photoFor(env), label, key;
        if (src) {
            label = `${env} (photo)`;
            key = env;
        } else if ((src = await photoFor(DEFAULT_ENV))) {
            if (env) missingPhotos.add(env);
            label = `${DEFAULT_ENV} (default, for ${env || 'blank'})`;
            key = DEFAULT_ENV;
        } else {
            if (env) missingPhotos.add(env);
            const scene = HABITATS.includes(env) ? env : pickHabitat(mon);
            key = `painted-${scene}-${mon.speciesId ?? mon.id}`;
            src = paintHabitat(scene, mon.speciesId ?? mon.id);
            label = `${scene} (painted)`;
        }
        index[mon.id] = `${key}.jpg`;
        tally[label] = (tally[label] ?? 0) + 1;
        if (written.has(key)) continue;
        written.add(key);
        const sharp = createCanvas(W, H);
        const s = Math.max(W / src.width, H / src.height) * 1.08;  // overscan hides blurred edges
        sharp.getContext('2d').drawImage(src, (W - src.width * s) / 2, (H - src.height * s) / 2, src.width * s, src.height * s);
        const img = blur(sharp, W, H, label.includes('(painted)') ? 4 : 8);
        fs.writeFileSync(path.join(out, `${key}.jpg`), img.toBuffer('image/jpeg', { quality: 0.8 }));
    }
    fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(index, null, 1) + '\n');
    if (mons.length) console.log(region + ':', Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(', '));
}
if (missingPhotos.size) {
    console.log(`\nNo photo yet for: ${[...missingPhotos].sort().join(', ')} (using ${DEFAULT_ENV}.jpg)`);
    console.log(`Add ${ENV_DIR}/<name>.jpg for each, then re-run.`);
}
