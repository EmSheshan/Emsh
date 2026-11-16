// Paints each Pokemon's habitat backdrop: a small, heavily blurred scene the
// card page shows behind the art (the same look as the Instagram carousels).
//
//   node tools/build-backdrops.mjs              # every region
//   node tools/build-backdrops.mjs lacadia      # one region
//
// The scene comes from the CSV's `habitat` column when set, otherwise it is
// guessed from the flavour text and type (see tools/habitats.mjs). A photo at
// <region>/data/environments/<id>.jpg is used instead when present.
// Output: <region>/data/backdrops/<id>.jpg, ~20 KB each.

import { createCanvas, loadImage } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { parseCSV, buildDex } from '../shared/pokeData.js';
import { pickHabitat, paintHabitat, HABITATS } from './habitats.mjs';

const W = 480, H = 600;
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

for (const region of regions) {
    const dir = path.join(region, 'data');
    const out = path.join(dir, 'backdrops');
    fs.mkdirSync(out, { recursive: true });
    const dex = buildDex(parseCSV(fs.readFileSync(path.join(dir, 'pokedex.csv'), 'utf8')));
    const tally = {};

    for (const mon of Object.values(dex)) {
        const photoPath = ['jpg', 'jpeg', 'png'].map((e) => path.join(dir, 'environments', `${mon.id}.${e}`))
            .find((p) => fs.existsSync(p));
        let src, scene;
        if (photoPath) {
            src = await loadImage(photoPath);
            scene = 'photo';
        } else {
            scene = HABITATS.includes(mon.habitat) ? mon.habitat : pickHabitat(mon);
            src = paintHabitat(scene, mon.speciesId ?? mon.id);
        }
        // Cover-fit with overscan so the blurred edges don't show.
        const sharp = createCanvas(W, H);
        const s = Math.max(W / src.width, H / src.height) * 1.08;
        sharp.getContext('2d').drawImage(src, (W - src.width * s) / 2, (H - src.height * s) / 2, src.width * s, src.height * s);
        const img = blur(sharp, W, H, scene === 'photo' ? 16 : 4);
        fs.writeFileSync(path.join(out, `${mon.id}.jpg`), img.toBuffer('image/jpeg', { quality: 0.8 }));
        tally[scene] = (tally[scene] ?? 0) + 1;
    }
    console.log(region, Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(', '));
}
