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

### Still needed (21)

Save each as `environments/<name>.jpg`. Until then the line shows on the plain colour.

| file | look for | Pokémon |
|---|---|---|
| `abyss` | pitch-black deep ocean, faint glow | Lumajesty |
| `agave-field` | blue agave rows, desert farm | Marazcal, Iguavadon |
| `arctic-sea` | icy sea with floating ice, cold light | Selky |
| `bell-tower` | old bell tower / temple bell | Sacrabell |
| `crystal-cave` | cave full of glowing crystals | Larvos, Syrinsect, Stratoclysm |
| `desert-night` | desert under a starry night sky | Tortarma, Tortality |
| `foggy-bridge` | bridge in thick fog at night (mothman) | Azamoth |
| `forge` | blacksmith forge, glowing metal | Smeltmor |
| `glacier` | blue glacier ice | Cryocone, Cryoconda |
| `haunted-house` | eerie abandoned house interior | Saskrypt |
| `haunted-mine` | dark mine tunnel, eerie (cave ghosts) | Shardling, Crucigem |
| `incense-shrine` | incense smoke in a shrine | Censerpent |
| `lava-field` | flowing lava, black rock | Pyrant |
| `mine` | mine tunnel with mineral veins | Shuckler |
| `moonless-night` | dark night sky over silhouettes | Devile |
| `moonlit-forest` | forest clearing under a full moon | Moosenge |
| `museum` | museum hall with statues | Ceraphinx |
| `power-plant` | power station / pylons | Battrey, Vladibolt |
| `primeval-forest` | ancient, untouched old-growth forest | Albythos |
| `rooftops` | city rooftops from above | Idagon, Libradon, Suprion |
| `shallows` | sunlit shallow sea, clear water | Phalankton |

### Done (53)

| file | | Pokémon |
|---|---|---|
| `autumn-forest` |  | Tirakitsu, Asterbat |
| `badlands` |  | Pumace (A), Pyroncho (A), Smoldero (A) |
| `bamboo` |  | Fawnna (A), Fawliage (A), Dynastag (A) |
| `beach` | rocky beach | Krabuto, Krabutops |
| `bluebell-woods` | bluebell woods in sun | Springbun, Snapbun, Faestalk |
| `canyon` |  | Furnawurm |
| `carousel` | carousel at night | Grubblo, Tentrilo, Rocadocio |
| `cave` |  | Cobblin, Grumblock, Ragnarock |
| `cave-painting` |  | Dodon, Dodonodon |
| `cavern` |  | Aurago (A) |
| `city` |  | Ornidrone, Velostrike, Gunraptor |
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
| `frosted-forest` | frosted forest | Mochu, Snochu |
| `graveyard` |  | Cackloon (A), Necrondor (A) |
| `gray-forest` |  | Dwemaldos (A) |
| `green-cave` |  | Tuatot, Tuatargon |
| `hazy-city` | hazy city skyline with pyramids | Xeno Tyranitar (A) |
| `heaven` |  | Xerasige |
| `heaven-2` |  | Xophis |
| `hell` |  | Jeneosis |
| `jungle` |  | Lileef, Citradily |
| `junkyard` |  | Bitbyte, Cathogen, Ramnant |
| `lava-sea` | lava pouring into the sea | Basilly, Knaviper, Verkillion |
| `lotus` |  | Patopod, Nymphlora |
| `lotus-pond` |  | Nokoi, Yakoyza |
| `marsh` |  | Wittern, Aerin, Zephyrin |
| `meadow` |  | Chumbi (A) |
| `moonlit-trees` | full moon behind trees | Mega Lokix (A) |
| `mossy-pond` | mossy woodland pond | Ribbeat, Ventribbit |
| `palms` |  | Tropius (A) |
| `river-buffalo` | river with water buffalo | Purluxe, Lyonite, Enkidros |
| `rocky-plain` | rocky alpine plain | Polishell (A), Tarnishell (A), Lavisheen (A) |
| `rocky-shore` |  | Pyukumuku (A) |
| `ruined-house` | ruined house with snow | Filch |
| `sea-lion-beach` |  | Sealor (A), Enseal (A), Brigantide (A) |
| `snow` |  | Balite, Baleet, Balaast |
| `space` |  | Synthecyte (A), Megalocyte (A) |
| `stormy-sea` |  | Khamathos (A) |
| `street` | empty street at night | Grismirk (A), Grimson (A) |
| `temple` |  | Scrithymn, Blazephemy |
| `vegetable-garden` | vegetable garden | Roignon, Scallahad |
| `wheat-field` | golden wheat field | Panacha (A), Marracacha (A) |

### Spare photos (not used by any line)

`antique` · `circus` · `forest` · `ice` · `mountains` · `onion`
