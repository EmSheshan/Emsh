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

## Backgrounds in use

Every evolution line has its own background (Megalocyte shares Synthecyte's). Canon
Pokémon in a family (canondex.csv) use their line's background too.
(A) = Andela, the rest are Lacadia.

### Still needed (25)

Save each as `environments/<name>.jpg`. Until then the line shows on the plain colour.

| file | look for | Pokémon |
|---|---|---|
| `abyss` | pitch-black deep ocean, faint glow | Lumajesty |
| `agave-field` | blue agave rows, desert farm | Marazcal, Iguavadon |
| `ancient-forest` | giant ferns, prehistoric woodland | Tuatot, Tuatargon |
| `arctic-sea` | icy sea with floating ice, cold light | Selky |
| `attic` | dusty old attic, floorboards | Filch |
| `beach` | sandy beach with surf | Krabuto, Krabutops |
| `bell-tower` | old bell tower / temple bell | Sacrabell |
| `crystal-cave` | cave full of glowing crystals | Larvos, Syrinsect, Stratoclysm |
| `dunes` | rolling sand dunes, hot sun | Tortarma |
| `foggy-bridge` | bridge in thick fog at night (mothman) | Azamoth |
| `forge` | blacksmith forge, glowing metal | Smeltmor |
| `glacier` | blue glacier ice | Cryocone, Cryoconda |
| `haunted-house` | eerie abandoned house interior | Saskrypt |
| `iceberg` | iceberg at sea | Balite, Baleet, Balaast |
| `incense-shrine` | incense smoke in a shrine | Censerpent |
| `lava-field` | flowing lava, black rock | Pyrant |
| `mine` | mine tunnel with mineral veins | Shuckler |
| `moonless-night` | dark night sky over silhouettes | Devile |
| `moonlit-forest` | forest clearing under a full moon | Moosenge |
| `museum` | museum hall with statues | Ceraphinx |
| `power-plant` | power station / pylons | Battrey, Vladibolt |
| `primeval-forest` | ancient, untouched old-growth forest | Albythos |
| `rooftops` | city rooftops from above | Ornidrone, Velostrike, Gunraptor |
| `shallows` | sunlit shallow sea, clear water | Phalankton |
| `starry-sky` | night sky full of stars / milky way | Tortality |

### Done (50)

| file | | Pokémon |
|---|---|---|
| `autumn-forest` |  | Tirakitsu, Asterbat |
| `badlands` |  | Pumace (A), Pyroncho (A), Smoldero (A) |
| `bamboo` |  | Fawnna (A), Fawliage (A), Dynastag (A) |
| `bluebell-woods` | bluebell woods in sun | Springbun, Snapbun, Faestalk |
| `canyon` |  | Furnawurm |
| `carousel` | carousel at night | Grubblo, Tentrilo, Rocadocio |
| `cave` |  | Cobblin, Grumblock, Ragnarock |
| `cave-painting` |  | Dodon, Dodonodon |
| `cavern` |  | Aurago (A) |
| `city` |  | Idagon, Libradon, Suprion |
| `coffee` |  | Decaffin, Espressurge |
| `cyberpunk` |  | Ravenger |
| `cyberspace` |  | Logomorph |
| `dark-jungle` |  | Murkitty, Tammalkin, Velyger |
| `darkness` |  | Paracabra |
| `deep-sea` |  | Jellien, Encephid, Monolithid |
| `desert-rain` | desert in rain, wet sand / blooms | Sedimental (A) |
| `dewy-grass` | dewy grass at night | Possolo, Oposse |
| `egypt` |  | Kheprini, Servankh, Pharomancy |
| `farm` |  | Peppilla (A), Peppyre (A), Pepperisher (A) |
| `fireflies` | fireflies at dusk | Amistaphore (A) |
| `foundry` |  | Xeno Scizor (A) |
| `graveyard` |  | Cackloon (A), Necrondor (A) |
| `gray-forest` |  | Dwemaldos (A) |
| `green-cave` |  | Shardling, Crucigem |
| `hazy-city` | hazy city skyline with pyramids | Xeno Tyranitar (A) |
| `heaven` |  | Xerasige |
| `heaven-2` |  | Xophis |
| `hell` |  | Jeneosis |
| `ice` |  | Wittern, Aerin, Zephyrin |
| `jungle` |  | Lileef, Citradily |
| `junkyard` |  | Bitbyte, Cathogen, Ramnant |
| `lava-sea` | lava pouring into the sea | Basilly, Knaviper, Verkillion |
| `lotus` |  | Patopod, Nymphlora |
| `lotus-pond` |  | Nokoi, Yakoyza |
| `marsh` |  | Ribbeat, Ventribbit |
| `meadow` |  | Chumbi (A) |
| `moonlit-trees` | full moon behind trees | Mega Lokix (A) |
| `palms` |  | Tropius (A) |
| `river-buffalo` | river with water buffalo | Purluxe, Lyonite, Enkidros |
| `rocky-plain` | rocky alpine plain | Polishell (A), Tarnishell (A), Lavisheen (A) |
| `rocky-shore` |  | Pyukumuku (A) |
| `sea-lion-beach` |  | Sealor (A), Enseal (A), Brigantide (A) |
| `snow` |  | Mochu, Snochu |
| `space` |  | Synthecyte (A), Megalocyte (A) |
| `stormy-sea` |  | Khamathos (A) |
| `street` | empty street at night | Grismirk (A), Grimson (A) |
| `temple` |  | Scrithymn, Blazephemy |
| `vegetable-garden` | vegetable garden | Roignon, Scallahad |
| `wheat-field` | golden wheat field | Panacha (A), Marracacha (A) |

### Spare photos (not used by any line)

`antique` · `circus` · `forest` · `mountains` · `onion`
