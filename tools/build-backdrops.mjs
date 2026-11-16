// Builds each Pokemon's backdrop: the blurred scene its card page shows behind
// the art (the same look as the Instagram carousels).
//
//   node tools/build-backdrops.mjs              # every region
//   node tools/build-backdrops.mjs lacadia      # one region
//
// The CSV's `environment` column picks the scene, in this order:
//   1. a photo at environments/<environment>.jpg (or .jpeg/.png) -- shared by
//      every region, so one forest photo covers every forest Pokemon;
//   2. otherwise a painted scene of that name (see tools/habitats.mjs);
//   3. with the column blank, a painted scene guessed from flavour text + type.
// Output: <region>/data/backdrops/<id>.jpg, ~20 KB each. Re-run after adding
// photos or changing the column.

import { createCanvas, loadImage } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { parseCSV, buildDex } from '../shared/pokeData.js';
import { pickHabitat, paintHabitat, HABITATS } from './habitats.mjs';

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
    fs.mkdirSync(out, { recursive: true });
    const read = (f) => fs.existsSync(path.join(dir, f)) ? parseCSV(fs.readFileSync(path.join(dir, f), 'utf8')) : [];
    const mons = [...Object.values(buildDex(read('pokedex.csv'))), ...Object.values(buildDex(read('megadex.csv'), { mega: true }))];
    const tally = {};

    for (const mon of mons) {
        const env = mon.environment;
        let src = await photoFor(env), label;
        if (src) {
            label = `${env} (photo)`;
        } else {
            if (env) missingPhotos.add(env);
            const scene = HABITATS.includes(env) ? env : pickHabitat(mon);
            src = paintHabitat(scene, mon.speciesId ?? mon.id);
            label = `${scene} (painted)`;
        }
        const sharp = createCanvas(W, H);
        const s = Math.max(W / src.width, H / src.height) * 1.08;  // overscan hides blurred edges
        sharp.getContext('2d').drawImage(src, (W - src.width * s) / 2, (H - src.height * s) / 2, src.width * s, src.height * s);
        const img = blur(sharp, W, H, label.endsWith('(photo)') ? 16 : 4);
        fs.writeFileSync(path.join(out, `${mon.id}.jpg`), img.toBuffer('image/jpeg', { quality: 0.8 }));
        tally[label] = (tally[label] ?? 0) + 1;
    }
    if (mons.length) console.log(region + ':', Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(', '));
}
if (missingPhotos.size) {
    console.log(`\nNo photo yet for: ${[...missingPhotos].sort().join(', ')}`);
    console.log(`Add ${ENV_DIR}/<name>.jpg for each, then re-run.`);
}
