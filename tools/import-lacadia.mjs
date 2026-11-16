// One-off import: Lacadia's pokedex.js / abilities.js / moves.js -> the
// spreadsheet format this site reads (see shared/pokeData.js for the columns).
//
//   node tools/import-lacadia.mjs /path/to/Lacadia
//
// Writes lacadia/data/{pokedex.csv, megadex.csv, abilities.js, moves.js,
// region.js}. After this, lacadia/data/pokedex.csv is the source of truth --
// edit it in a spreadsheet like Andela's.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = path.resolve(process.argv[2] ?? '../Lacadia');
const OUT = path.resolve('lacadia/data');
const load = (f) => import(pathToFileURL(path.join(SRC, f)).href);

const { pokedex } = await load('pokedex.js');
const { abilities } = await load('abilities.js');
fs.mkdirSync(OUT, { recursive: true });

const COLS = ['id', 'name', 'forme', 'type1', 'type2', 'hp', 'atk', 'def', 'spa', 'spd', 'spe',
    'ability0', 'ability1', 'abilityH', 'kind', 'heightm', 'weightkg', 'signatureMove',
    'description1', 'description2', 'prevo', 'evo', 'evoMethod', 'habitat'];

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const baseName = (n) => String(n).split('-')[0];

// Dex order, with a species' formes kept together (base forme first).
const entries = Object.entries(pokedex).sort((a, b) => a[1].num - b[1].num);

// Species id = the first row of each dex number; evolutions point at it.
const speciesByNum = new Map();
for (const [id, m] of entries) if (!speciesByNum.has(m.num)) speciesByNum.set(m.num, id);
const speciesByName = new Map();
for (const [id, m] of entries) {
    speciesByName.set(norm(m.name), speciesByNum.get(m.num));
    speciesByName.set(norm(baseName(m.name)), speciesByNum.get(m.num));
}

// prevo comes from whoever lists this species in its `evos`.
const prevoOf = new Map();
for (const [id, m] of entries) {
    for (const e of m.evos ?? []) {
        const child = speciesByName.get(norm(e));
        if (child && !prevoOf.has(child)) prevoOf.set(child, speciesByNum.get(m.num));
    }
}

const csvCell = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const rows = [];
const seenNum = new Set();
for (const [id, m] of entries) {
    const isBase = !seenNum.has(m.num);
    seenNum.add(m.num);
    const species = speciesByNum.get(m.num);
    const ab = m.abilities ?? {};
    const evo = (m.evos ?? []).map((e) => speciesByName.get(norm(e))).filter(Boolean);
    rows.push({
        id,
        name: m.name,
        forme: isBase ? '' : (m.forme ?? m.name.split('-').slice(1).join('-')),
        type1: m.types[0], type2: m.types[1] ?? '',
        ...m.baseStats,
        ability0: ab[0] ?? '', ability1: ab[1] ?? '', abilityH: ab.H ?? '',
        kind: m.kind ?? '',
        heightm: m.heightm ?? '', weightkg: m.weightkg ?? '',
        signatureMove: m.signatureMove ?? '',
        description1: m.description?.[0] ?? '', description2: m.description?.[1] ?? '',
        prevo: isBase ? (prevoOf.get(species) ?? '') : '',
        evo: isBase ? [...new Set(evo)].join(',') : '',
        evoMethod: '',
        habitat: '',
    });
}

const csv = [COLS.join(','), ...rows.map((r) => COLS.map((c) => csvCell(r[c])).join(','))].join('\n') + '\n';
fs.writeFileSync(path.join(OUT, 'pokedex.csv'), csv);
fs.writeFileSync(path.join(OUT, 'megadex.csv'), COLS.join(',') + '\n');

// Abilities: Lacadia mixes plain strings and {description, tag}; normalise to objects.
const abOut = Object.fromEntries(Object.entries(abilities).map(([k, v]) =>
    [k, typeof v === 'string' ? { description: v } : v]));
fs.writeFileSync(path.join(OUT, 'abilities.js'),
    `// Imported from the Lacadia repo by tools/import-lacadia.mjs.\nexport const abilities = ${JSON.stringify(abOut, null, 2)};\n`);

fs.copyFileSync(path.join(SRC, 'moves.js'), path.join(OUT, 'moves.js'));
fs.writeFileSync(path.join(OUT, 'region.js'),
    `// region.js — this region's name and where its dex numbering starts.\nexport const region = {\n  name: "Lacadia",\n  startNumber: 1,\n};\n`);

console.log(`lacadia: ${rows.length} rows, ${seenNum.size} species, ${Object.keys(abOut).length} abilities`);
