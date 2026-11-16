# Environment photos

Backgrounds for the card pages. Each Pokémon's `environment` column (in
`<region>/data/pokedex.csv`) names a photo in this folder: `forest` ->
`environments/forest.jpg`. One photo serves every region.

1. Save a photo here as `<environment>.jpg` (or .png). Any size; it is
   cropped to portrait and blurred heavily, so even 1600px wide is plenty.
2. Run `node tools/build-backdrops.mjs` (after `npm install` once).
3. Commit the photo and the regenerated `*/data/backdrops/`.

Until an environment has its own photo, its Pokémon use the grassy field
(`meadow.jpg`); they switch over as soon as the photo is added. You can invent new
environment names (e.g. `bamboo`, `ruins`) — just add the matching photo.

Photos from Unsplash are free to use under the Unsplash License; crediting the
photographer is appreciated but not required. Note credits in CREDITS.md if you like.

## Environments in use

(A) = Andela; the rest are Lacadia.

| environment | photo | Pokémon | who |
|---|---|---|---|
| `forest` | ✅ | 22 | Cackloon (A), Amistaphore (A), Mega Lokix (A), Snapbun, Asterbat, Decaffin, Espressurge, Grubblo, Tentrilo, Rocadocio, Tammalkin, Velyger, Lileef, Citradily, Roignon, Scallahad, Marazcal, Iguavadon, Shuckler, Nymphlora, Syrinsect, Azamoth |
| `meadow` | ✅ | 10 | Panacha (A), Marracacha (A), Polishell (A), Tarnishell (A), Lavisheen (A), Chumbi (A), Possolo, Oposse, Filch, Logomorph |
| `cave` | ✅ | 10 | Springbun, Dodon, Dodonodon, Tuatot, Tuatargon, Cobblin, Grumblock, Ragnarock, Shardling, Furnawurm |
| `space` | ✅ | 9 | Synthecyte (A), Megalocyte (A), Moosenge, Gunraptor, Larvos, Stratoclysm, Albythos, Xerasige, Xophis |
| `mountains` | ✅ | 9 | Peppilla (A), Peppyre (A), Pepperisher (A), Dwemaldos (A), Ribbeat, Ventribbit, Patopod, Idagon, Libradon |
| `badlands` | ✅ | 5 | Pumace (A), Pyroncho (A), Smoldero (A), Grismirk (A), Grimson (A) |
| `bamboo` | ✅ | 3 | Fawnna (A), Fawliage (A), Dynastag (A) |
| `rocky-shore` | ✅ | 3 | Sealor (A), Enseal (A), Pyukumuku (A) |
| `sea-lion-beach` | ✅ | 1 | Brigantide (A) |
| `temple` | ✅ | 1 | Necrondor (A) |
| `palms` | ✅ | 1 | Tropius (A) |
| `stormy-sea` | ✅ | 1 | Khamathos (A) |
| `cavern` | ✅ | 1 | Aurago (A) |
| `foundry` | ✅ | 1 | Xeno Scizor (A) |
| `ocean` | — grassy field for now | 14 | Purluxe, Lyonite, Enkidros, Aerin, Nokoi, Yakoyza, Krabuto, Krabutops, Balite, Jellien, Encephid, Monolithid, Selky, Lumajesty |
| `city` | — grassy field for now | 8 | Battrey, Bitbyte, Cathogen, Ramnant, Ornidrone, Velostrike, Suprion, Ravenger |
| `snow` | — grassy field for now | 7 | Wittern, Mochu, Snochu, Baleet, Balaast, Cryocone, Cryoconda |
| `desert` | — grassy field for now | 6 | Sedimental (A), Ceraphinx, Tortarma, Kheprini, Servankh, Pharomancy |
| `volcano` | — grassy field for now | 6 | Basilly, Knaviper, Verkillion, Tortality, Smeltmor, Pyrant |
| `night` | — grassy field for now | 4 | Xeno Tyranitar (A), Murkitty, Paracabra, Sacrabell |
| `blossom` | — grassy field for now | 4 | Tirakitsu, Scrithymn, Blazephemy, Jeneosis |
| `sky` | — grassy field for now | 3 | Faestalk, Zephyrin, Devile |
| `swamp` | — grassy field for now | 3 | Phalankton, Censerpent, Saskrypt |
| `storm` | — grassy field for now | 1 | Vladibolt |
| `graveyard` | — grassy field for now | 1 | Crucigem |
