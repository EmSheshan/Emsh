# Environment photos

Backgrounds for the card pages. Each Pokémon's `environment` column (in
`<region>/data/pokedex.csv`) names a photo in this folder: `forest` ->
`environments/forest.jpg`. One photo serves every region.

1. Save a photo here as `<environment>.jpg` (or .png). Any size; it is
   cropped to portrait and blurred heavily, so even 1600px wide is plenty.
2. Run `node tools/build-backdrops.mjs` (after `npm install` once).
3. Commit the photo and the regenerated `*/data/backdrops/`.

Without a photo, a painted stand-in of the same name is used. You can invent new
environment names (e.g. `bamboo`, `ruins`) — just add the matching photo.

Photos from Unsplash are free to use under the Unsplash License; crediting the
photographer is appreciated but not required. Note credits in CREDITS.md if you like.

## Environments in use

(A) = Andela; the rest are Lacadia. Guessed from type and flavour text, so
change any that are wrong.

| environment | Pokémon | who |
|---|---|---|
| `forest` | 25 | Fawliage (A), Dynastag (A), Tropius (A), Amistaphore (A), Dwemaldos (A), Mega Lokix (A), Snapbun, Asterbat, Decaffin, Espressurge, Grubblo, Tentrilo, Rocadocio, Tammalkin, Velyger, Lileef, Citradily, Roignon, Scallahad, Marazcal, Iguavadon, Shuckler, Nymphlora, Syrinsect, Azamoth |
| `ocean` | 23 | Fawnna (A), Enseal (A), Brigantide (A), Marracacha (A), Polishell (A), Lavisheen (A), Pyukumuku (A), Khamathos (A), Aurago (A), Purluxe, Lyonite, Enkidros, Aerin, Nokoi, Yakoyza, Krabuto, Krabutops, Balite, Jellien, Encephid, Monolithid, Selky, Lumajesty |
| `volcano` | 14 | Pumace (A), Pyroncho (A), Smoldero (A), Panacha (A), Peppilla (A), Peppyre (A), Pepperisher (A), Xeno Scizor (A), Basilly, Knaviper, Verkillion, Tortality, Smeltmor, Pyrant |
| `city` | 10 | Grismirk (A), Chumbi (A), Battrey, Bitbyte, Cathogen, Ramnant, Ornidrone, Velostrike, Suprion, Ravenger |
| `cave` | 10 | Springbun, Dodon, Dodonodon, Tuatot, Tuatargon, Cobblin, Grumblock, Ragnarock, Shardling, Furnawurm |
| `space` | 9 | Synthecyte (A), Sealor (A), Moosenge, Gunraptor, Larvos, Stratoclysm, Albythos, Xerasige, Xophis |
| `snow` | 7 | Wittern, Mochu, Snochu, Baleet, Balaast, Cryocone, Cryoconda |
| `desert` | 6 | Sedimental (A), Ceraphinx, Tortarma, Kheprini, Servankh, Pharomancy |
| `meadow` | 5 | Tarnishell (A), Possolo, Oposse, Filch, Logomorph |
| `night` | 5 | Grimson (A), Xeno Tyranitar (A), Murkitty, Paracabra, Sacrabell |
| `mountains` | 5 | Ribbeat, Ventribbit, Patopod, Idagon, Libradon |
| `blossom` | 4 | Tirakitsu, Scrithymn, Blazephemy, Jeneosis |
| `graveyard` | 3 | Cackloon (A), Necrondor (A), Crucigem |
| `sky` | 3 | Faestalk, Zephyrin, Devile |
| `swamp` | 3 | Phalankton, Censerpent, Saskrypt |
| `aurora` | 1 | Megalocyte (A) |
| `storm` | 1 | Vladibolt |
