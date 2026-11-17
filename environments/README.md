# Background photos

The photo behind each Pokémon. A Pokémon's `background` column (in
`<region>/data/pokedex.csv`) names a photo in this folder: `forest` ->
`environments/forest.jpg`. Its `environment` column is separate: the habitat in
words, shown in the field notes, and can say anything.

1. Save a photo here as `<background>.jpg` (or .png). Any size; it is cropped
   and blurred, so 1600px wide is plenty.
2. Run `node tools/build-backdrops.mjs` and `python3 tools/build-scenes.py <region>`
   (after `npm install` once).
3. Commit the photo and the regenerated `*/data/backdrops/` and `*/data/scenes/`.

No photo yet means no background photo: the page shows the region's plain
colour until one is added. Credits for photos are in CREDITS.md.

## Environments in use

Every evolution line has its own background, so no two lines share a
background. (A) = Andela, (M) = Misc, the rest are Lacadia.

### Still needed (42)

Save each as `environments/<name>.jpg`. Until then the line shows on the plain colour.

| file | look for | Pokémon |
|---|---|---|
| `abyss` | pitch-black deep ocean, faint glow | Lumajesty |
| `agave-field` | blue agave rows, desert farm | Marazcal, Iguavadon |
| `ancient-forest` | giant ferns, prehistoric woodland | Tuatot, Tuatargon |
| `arctic-sea` | icy sea with floating ice, cold light | Selky |
| `attic` | dusty old attic, floorboards | Filch |
| `barn` | old wooden barn at dusk | Possolo, Oposse |
| `beach` | sandy beach with surf | Krabuto, Krabutops |
| `bell-tower` | old bell tower / temple bell | Sacrabell |
| `crystal-cave` | cave full of glowing crystals | Larvos, Syrinsect, Stratoclysm |
| `desert-rain` | desert in rain, wet sand / blooms | Sedimental (A) |
| `dunes` | rolling sand dunes, hot sun | Tortarma |
| `foggy-bridge` | bridge in thick fog at night (mothman) | Azamoth |
| `forge` | blacksmith forge, glowing metal | Smeltmor |
| `glacier` | blue glacier ice | Cryocone, Cryoconda |
| `hall-of-mirrors` | hall of mirrors / reflections | Hyper Ditto (M) |
| `haunted-house` | eerie abandoned house interior | Saskrypt |
| `iceberg` | iceberg at sea | Balite, Baleet, Balaast |
| `incense-shrine` | incense smoke in a shrine | Censerpent |
| `kiln` | pottery kiln / porcelain workshop | Mega Tuskelain (M) |
| `laboratory` | clinical lab, specimen tanks | Megalocyte (A) |
| `lava-field` | flowing lava, black rock | Pyrant |
| `mine` | mine tunnel with mineral veins | Shuckler |
| `moonless-night` | dark night sky over silhouettes | Devile |
| `moonlit-forest` | forest clearing under a full moon | Moosenge |
| `museum` | museum hall with statues | Ceraphinx |
| `night-harbor` | harbour at night, city lights on water | Hyper Inteleon (M) |
| `overgrown-ruins` | ruins overgrown with giant plants | Hyper Torterra (M) |
| `power-plant` | power station / pylons | Battrey, Vladibolt |
| `primeval-forest` | ancient, untouched old-growth forest | Albythos |
| `riverbank` | muddy riverbank | Patopod, Nymphlora |
| `rooftops` | city rooftops from above | Ornidrone, Velostrike, Gunraptor |
| `ruins` | crumbling ruins, dark sky | Xeno Tyranitar (A) |
| `shallows` | sunlit shallow sea, clear water | Phalankton |
| `starry-sky` | night sky full of stars / milky way | Tortality |
| `swamp` | murky green swamp | Hyper Toxicroak (M) |
| `tall-grass` | tall grass field, low angle | Mega Lokix (A) |
| `thornbush` | dry hills with thorny scrub | Grismirk (A), Grimson (A) |
| `toxic-spring` | acid-coloured hot spring / sulphur pools | Basilly, Knaviper, Verkillion |
| `volcano` | erupting volcano | Hyper Typhlosion (M) |
| `wheat-field` | golden wheat field | Panacha (A), Marracacha (A) |
| `wildflowers` | wildflower meadow with bees | Chumbi (A) |
| `ziggurat` | ancient Mesopotamian ziggurat | Purluxe, Lyonite, Enkidros |

### Done (42)

| file | | Pokémon |
|---|---|---|
| `antique` |  | Lockatoo (M) |
| `autumn-forest` |  | Tirakitsu, Asterbat |
| `badlands` |  | Pumace (A), Pyroncho (A), Smoldero (A) |
| `bamboo` |  | Fawnna (A), Fawliage (A), Dynastag (A) |
| `canyon` |  | Furnawurm |
| `cave` |  | Cobblin, Grumblock, Ragnarock |
| `cave-painting` |  | Dodon, Dodonodon |
| `cavern` |  | Aurago (A) |
| `circus` |  | Grubblo, Tentrilo, Rocadocio |
| `city` |  | Idagon, Libradon, Suprion |
| `coffee` |  | Decaffin, Espressurge |
| `cyberpunk` |  | Ravenger |
| `cyberspace` |  | Logomorph |
| `dark-jungle` |  | Murkitty, Tammalkin, Velyger |
| `darkness` |  | Paracabra |
| `deep-sea` |  | Jellien, Encephid, Monolithid |
| `egypt` |  | Kheprini, Servankh, Pharomancy, Mega Pharomancy (M) |
| `farm` |  | Peppilla (A), Peppyre (A), Pepperisher (A) |
| `forest` |  | Springbun, Snapbun, Faestalk |
| `foundry` |  | Xeno Scizor (A) |
| `graveyard` |  | Cackloon (A), Necrondor (A) |
| `gray-forest` |  | Dwemaldos (A) |
| `green-cave` |  | Shardling, Crucigem |
| `heaven` |  | Xerasige |
| `heaven-2` |  | Xophis |
| `hell` |  | Jeneosis |
| `ice` |  | Wittern, Aerin, Zephyrin |
| `jungle` |  | Lileef, Citradily |
| `junkyard` |  | Bitbyte, Cathogen, Ramnant |
| `lotus` |  | Amistaphore (A) |
| `lotus-pond` |  | Nokoi, Yakoyza |
| `marsh` |  | Ribbeat, Ventribbit |
| `meadow` |  | Polishell (A), Tarnishell (A), Lavisheen (A) |
| `mountains` |  | Phurbash (M), Phurbanish (M) |
| `onion` |  | Roignon, Scallahad |
| `palms` |  | Tropius (A) |
| `rocky-shore` |  | Pyukumuku (A) |
| `sea-lion-beach` |  | Sealor (A), Enseal (A), Brigantide (A) |
| `snow` |  | Mochu, Snochu |
| `space` |  | Synthecyte (A) |
| `stormy-sea` |  | Khamathos (A) |
| `temple` |  | Scrithymn, Blazephemy |
