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

Every evolution line has its own background (Megalocyte shares Synthecyte's, and the
four cryptids share misty-forest). Canon
Pokémon in a family (canondex.csv) use their line's background too.
(A) = Andela, the rest are Lacadia.

### Still needed

None: every line has a photo.

### Done (72)

| file | | Pokémon |
|---|---|---|
| `agave-field` | blue agave rows, desert farm | Marazcal, Iguavadon |
| `altar` | candlelit altar | Scrithymn, Blazephemy |
| `aurora-lake` | aurora over a lake | Selky |
| `autumn-trees` | autumn trees | Tirakitsu, Asterbat |
| `badlands` |  | Pumace (A), Pyroncho (A), Smoldero (A) |
| `bamboo` |  | Fawnna (A), Fawliage (A), Dynastag (A) |
| `bluebell-woods` | bluebell woods in sun | Springbun, Snapbun, Faestalk |
| `canyon` |  | Furnawurm |
| `carousel` | carousel at night | Grubblo, Tentrilo, Rocadocio |
| `carved-tunnel` | carved stone tunnel | Shardling, Crucigem |
| `cave` |  | Cobblin, Grumblock, Ragnarock |
| `cave-painting` |  | Dodon, Dodonodon |
| `cavern` |  | Aurago (A) |
| `city` |  | Ornidrone, Velostrike, Gunraptor |
| `coffee` |  | Decaffin, Espressurge |
| `crystal-cave` | cave with blue pool | Larvos, Syrinsect, Stratoclysm |
| `cyberpunk` |  | Ravenger |
| `cyberspace` |  | Logomorph |
| `dark-jungle` |  | Murkitty, Tammalkin, Velyger |
| `desert-night` | desert dunes under stars | Tortarma, Tortality |
| `desert-rain` | desert in rain, wet sand / blooms | Sedimental (A) |
| `dewy-grass` | dewy grass at night | Possolo, Oposse |
| `egypt` |  | Kheprini, Servankh, Pharomancy |
| `farm` |  | Peppilla (A), Peppyre (A), Pepperisher (A) |
| `fireflies` | fireflies at dusk | Amistaphore (A) |
| `foundry` |  | Xeno Scizor (A) |
| `frosted-forest` | frosted forest | Mochu, Snochu |
| `frosted-hills` | frosted brown hills | Pyrant |
| `graveyard` |  | Cackloon (A), Necrondor (A) |
| `gray-forest` |  | Dwemaldos (A) |
| `green-cave` |  | Tuatot, Tuatargon |
| `hazy-city` | hazy city skyline with pyramids | Xeno Tyranitar (A) |
| `heaven-2` |  | Xophis |
| `hell` |  | Jeneosis |
| `ice-cave` | blue ice cave | Battrey, Vladibolt |
| `incense-shrine` | incense burning in a temple | Censerpent |
| `jellyfish` | glowing jellyfish | Lumajesty |
| `jungle` |  | Lileef, Citradily |
| `jungle-pyramid` | jungle pyramid | Albythos |
| `junkyard` |  | Bitbyte, Cathogen, Ramnant |
| `lava-sea` | lava pouring into the sea | Basilly, Knaviper, Verkillion |
| `lotus` |  | Patopod, Nymphlora |
| `marsh` |  | Wittern, Aerin, Zephyrin |
| `meadow` |  | Chumbi (A) |
| `misty-forest` | misty forest at night | Paracabra, Saskrypt, Devile, Azamoth |
| `moonlit-trees` | full moon behind trees | Mega Lokix (A) |
| `mossy-pond` | mossy woodland pond | Ribbeat, Ventribbit |
| `statue-gallery` | vaulted gallery of white statues | Ceraphinx |
| `palms` |  | Tropius (A) |
| `pine-path` | path through a pine forest | Shuckler |
| `pink-peak` | snowy peak at pink dusk | Smeltmor |
| `hot-spring` | rainbow hot spring | Purluxe, Lyonite, Enkidros |
| `sakura-canal` | canal under cherry blossoms | Nokoi, Yakoyza |
| `rocky-plain` | rocky alpine plain | Polishell (A), Tarnishell (A), Lavisheen (A) |
| `rocky-shore` |  | Pyukumuku (A) |
| `ruined-house` | ruined house with snow | Filch |
| `sea-cave` | sea cave arch | Krabuto, Krabutops |
| `sea-lion-beach` |  | Sealor (A), Enseal (A), Brigantide (A) |
| `shallows` | murky shallows with fish | Phalankton |
| `shore-temple` | stone shore temple | Xerasige |
| `snow` |  | Balite, Baleet, Balaast |
| `snowy-shore` | snowy pebble shore | Cryocone, Cryoconda |
| `space` |  | Synthecyte (A), Megalocyte (A) |
| `standing-stones` | standing stones | Moosenge |
| `stormy-sea` |  | Khamathos (A) |
| `street` | empty street at night | Grismirk (A), Grimson (A) |
| `sunlit-sea` | sunlit underwater | Jellien, Encephid, Monolithid |
| `temple` |  | Sacrabell |
| `tunnel` | curving subway tunnel | Idagon, Libradon, Suprion |
| `vegetable-garden` | vegetable garden | Roignon, Scallahad |
| `wheat-field` | golden wheat field | Panacha (A), Marracacha (A) |
| `ice` | pack ice on a frozen sea | Mistocrat |

### Spare photos (not used by any line)

`antique` · `autumn-forest` · `beach` · `circus` · `cliff-face` · `darkness` · `deep-sea` · `forest` · `heaven` · `lotus-pond` · `mountains` · `museum` · `onion` · `red-mountains` · `river-ruins` · `river-buffalo` · `underground-station`
