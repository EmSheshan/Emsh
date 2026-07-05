// script.js — catalog behavior

// Real roster data pulled from each region's own pokedex.js (name, dex
// number, and the image-file key, which matches pokemonArt/{key}.png on
// the live site) — not invented, so the random spread only ever shows
// mons that actually exist.
const LACADIA_MONS = [
    ["springbun", 2000, "Springbun"],
    ["snapbun", 2001, "Snapbun"],
    ["faestalk", 2002, "Faestalk"],
    ["basilly", 2003, "Basilly"],
    ["knaviper", 2004, "Knaviper"],
    ["verkillion", 2005, "Verkillion"],
    ["purluxe", 2006, "Purluxe"],
    ["lyonite", 2007, "Lyonite"],
    ["enkidros", 2008, "Enkidros"],
    ["possolo", 2009, "Possolo"],
    ["oposse", 2010, "Oposse"],
    ["tirakitsu", 2011, "Tirakitsu"],
    ["asterbat", 2012, "Asterbat"],
    ["wittern", 2013, "Wittern"],
    ["aerin", 2014, "Aerin"],
    ["zephyrin", 2015, "Zephyrin"],
    ["decaffin", 2016, "Decaffin"],
    ["espressurge", 2017, "Espressurge"],
    ["grubblo", 2018, "Grubblo"],
    ["tentrilo", 2019, "Tentrilo"],
    ["rocadocio", 2020, "Rocadocio"],
    ["nokoi", 2021, "Nokoi"],
    ["yakoyzatiger", 2022, "Yakoyza-Tiger"],
    ["yakoyzaink", 2022, "Yakoyza-Ink"],
    ["yakoyzaryujin", 2022, "Yakoyza-Ryujin"],
    ["yakoyzaoni", 2022, "Yakoyza-Oni"],
    ["ribbeat", 2023, "Ribbeat"],
    ["ventribbit", 2024, "Ventribbit"],
    ["mochu", 2025, "Mochu"],
    ["snochu", 2026, "Snochu"],
    ["murkitty", 2027, "Murkitty"],
    ["tammalkin", 2028, "Tammalkin"],
    ["velyger", 2029, "Velyger"],
    ["lileef", 2030, "Lileef"],
    ["citradily", 2031, "Citradily"],
    ["krabuto", 2032, "Krabuto"],
    ["krabutops", 2033, "Krabutops"],
    ["filch", 2034, "Filch"],
    ["dodon", 2035, "Dodon"],
    ["dodonodon", 2036, "Dodonodon"],
    ["tuatot", 2037, "Tuatot"],
    ["tuatargon", 2038, "Tuatargon"],
    ["balite", 2039, "Balite"],
    ["baleet", 2040, "Baleet"],
    ["balaast", 2041, "Balaast"],
    ["cryocone", 2042, "Cryocone"],
    ["cryoconda", 2043, "Cryoconda"],
    ["cobblin", 2044, "Cobblin"],
    ["grumblock", 2045, "Grumblock"],
    ["ragnarock", 2046, "Ragnarock"],
    ["battrey", 2047, "Battrey"],
    ["vladibolt", 2048, "Vladibolt"],
    ["phalankton", 2049, "Phalankton"],
    ["shardling", 2050, "Shardling"],
    ["crucigem", 2051, "Crucigem"],
    ["scrithymn", 2052, "Scrithymn"],
    ["blazephemy", 2053, "Blazephemy"],
    ["ceraphinx", 2054, "Ceraphinx"],
    ["censerpent", 2055, "Censerpent"],
    ["roignon", 2056, "Roignon"],
    ["scallahad", 2057, "Scallahad"],
    ["moosenge", 2058, "Moosenge"],
    ["bitbyte", 2059, "Bitbyte"],
    ["cathogen", 2060, "Cathogen"],
    ["ramnant", 2061, "Ramnant"],
    ["logomorph", 2062, "Logomorph"],
    ["ornidrone", 2063, "Ornidrone"],
    ["velostrike", 2064, "Velostrike"],
    ["gunraptor", 2065, "Gunraptor"],
    ["jellien", 2066, "Jellien"],
    ["encephid", 2067, "Encephid"],
    ["monolithid", 2068, "Monolithid"],
    ["marazcal", 2069, "Marazcal"],
    ["iguavadon", 2070, "Iguavadon"],
    ["tortarmasolar", 2071, "Tortarma-Solar"],
    ["tortarmapolar", 2071, "Tortarma-Polar"],
    ["tortality", 2072, "Tortality"],
    ["kheprini", 2073, "Kheprini"],
    ["servankh", 2074, "Servankh"],
    ["pharomancy", 2075, "Pharomancy"],
    ["furnawurm", 2076, "Furnawurm"],
    ["selky", 2077, "Selky"],
    ["lumajesty", 2078, "Lumajesty"],
    ["shuckler", 2079, "Shuckler"],
    ["smeltmor", 2080, "Smeltmor"],
    ["pyrant", 2081, "Pyrant"],
    ["patopod", 2082, "Patopod"],
    ["nymphlora", 2083, "Nymphlora"],
    ["idagon", 2084, "Idagon"],
    ["libradon", 2085, "Libradon"],
    ["suprion", 2086, "Suprion"],
    ["larvos", 2087, "Larvos"],
    ["syrinsect", 2088, "Syrinsect"],
    ["stratoclysm", 2089, "Stratoclysm"],
    ["paracabra", 2090, "Paracabra"],
    ["saskrypt", 2091, "Saskrypt"],
    ["devile", 2092, "Devile"],
    ["azamoth", 2093, "Azamoth"],
    ["albythos", 2094, "Albythos"],
    ["xerasige", 2095, "Xerasige"],
    ["jeneosis", 2096, "Jeneosis"],
    ["xophis", 2097, "Xophis"],
    ["ravenger", 2098, "Ravenger"],
    ["sacrabellhymn", 2099, "Sacrabell-Hymn"],
    ["sacrabelldirge", 2099, "Sacrabell-Dirge"]
];

const ANDELA_MONS = [
    ["fawnna", 2000, "Fawnna"],
    ["fawliage", 2001, "Fawliage"],
    ["dynastag", 2002, "Dynastag"],
    ["pumace", 2003, "Pumace"],
    ["pyroncho", 2004, "Pyroncho"],
    ["smoldero", 2005, "Smoldero"],
    ["sealor", 2006, "Sealor"],
    ["seagent", 2007, "Seagent"],
    ["brigantide", 2008, "Brigantide"],
    ["cackloon", 2021, "Cackloon"],
    ["necrondor", 2022, "Necrondor"],
    ["sedimentaldormant", 2036, "Sedimental-Dormant"],
    ["sedimentalbloom", 2036, "Sedimental-Bloom"],
    ["amistaphore", 2068, "Amistaphore"]
];

function pickRandom(list, count) {
    const pool = list.slice();
    const picks = [];
    while (picks.length < count && pool.length) {
        const i = Math.floor(Math.random() * pool.length);
        picks.push(pool.splice(i, 1)[0]);
    }
    return picks;
}

function renderMonSpread(containerId, mons) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const base = container.dataset.base;
    // Internal dex numbers start at 2000 (to avoid colliding with the real
    // National Dex); both regions display them starting from 1 on their
    // own sites, so match that here rather than showing the raw offset.
    container.innerHTML = pickRandom(mons, 3).map(([key, num, name]) => {
        const src = `${base}pokemonArt/${key}.png`;
        return `
        <div class="mon-card">
            <div class="mon-media" style="--sprite:url('${src}')">
                <img src="${src}" alt="${name}" loading="lazy">
            </div>
            <div class="mon-caption">
                <span class="mon-num">N&deg; ${String(num - 1999).padStart(2, '0')}</span>
                <span class="mon-name">${name}</span>
            </div>
        </div>
        `;
    }).join('');
}

renderMonSpread('mons-andela', ANDELA_MONS);
renderMonSpread('mons-lacadia', LACADIA_MONS);

// Hero blobs drift toward the cursor slightly — a light parallax, not a follow.
const hero = document.querySelector('.hero');
const blobs = document.querySelectorAll('.blob');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Each mon card slides in from the outer edge once it scrolls into view
// (see the .in-view rules in styles.css for the offset/timing). Observing
// each card individually — not the shared .mon-spread container — matters
// on mobile: the three stack full-height there, so a container-level
// trigger fires as soon as the first card peeks into view and every card's
// delay has long finished by the time you scroll down to the third one,
// which looks like no stagger at all. Per-card observation makes each one
// slide in right as it arrives, on both layouts.
const monCards = document.querySelectorAll('.mon-card');
if (monCards.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
        monCards.forEach((el) => el.classList.add('in-view'));
    } else {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in-view');
                cardObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        monCards.forEach((el) => cardObserver.observe(el));
    }
}

// Section headers, spread text, and closing copy fade/rise in the same
// way, generalized from the mon-card reveal above.
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('in-view'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.15 });
        revealEls.forEach((el) => revealObserver.observe(el));
    }
}

// Colorbar registration mark travels down the bar with scroll progress,
// and the background kanji drifts at a different rate than the page for
// a touch of depth. Both fixed/absolute decorations, both desktop-only
// (colorbar is hidden under 45rem), so this never runs against layouts
// where it wouldn't be visible anyway.
const colorbar = document.querySelector('.colorbar');
const colorbarMark = document.querySelector('.colorbar-mark');
const kanji = document.querySelector('.kanji-accent');
if (!reduceMotion && ((colorbar && colorbarMark) || (kanji && hero))) {
    let scrollTicking = false;
    const updateOnScroll = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

        if (colorbar && colorbarMark) {
            const travel = colorbar.clientHeight - colorbarMark.clientHeight;
            colorbarMark.style.transform = `translateY(${progress * travel}px)`;
        }

        if (kanji && hero) {
            const rect = hero.getBoundingClientRect();
            kanji.style.transform = `translateY(calc(-50% + ${rect.top * -0.06}px))`;
        }

        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(updateOnScroll);
    }, { passive: true });

    updateOnScroll();
}

if (hero && blobs.length && !reduceMotion && hasFinePointer) {
    let ticking = false;
    let lastEvent = null;

    hero.addEventListener('mousemove', (event) => {
        lastEvent = event;
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            const rect = hero.getBoundingClientRect();
            const x = (lastEvent.clientX - rect.left) / rect.width - 0.5;
            const y = (lastEvent.clientY - rect.top) / rect.height - 0.5;
            blobs.forEach((blob, i) => {
                const strength = i === 0 ? 18 : -26;
                blob.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            ticking = false;
        });
    });

    hero.addEventListener('mouseleave', () => {
        blobs.forEach((blob) => {
            blob.style.transform = '';
        });
    });
}

// Hero title types itself out on load, like a typewriter banging out the line.
// All three overprint layers are typed in lockstep so the misregistration
// tracks the growing text; only the top layer carries the caret.
const headline = document.querySelector('.headline');
if (headline) {
    const layerMain = headline.querySelector('.layer-main');
    const offsetLayers = headline.querySelectorAll('.layer');
    const lines = ['drawing creatures.', 'building worlds.'];
    const CARET = '<span class="type-caret" aria-hidden="true"></span>';

    // Both lines are always present (empty until reached) so the headline
    // reserves its full height and nothing below it reflows while typing.
    const paint = (lineIdx, count) => {
        const s0 = lineIdx === 0 ? lines[0].slice(0, count) : lines[0];
        const s1 = lineIdx === 0 ? '' : lines[1].slice(0, count);
        const base = `${s0}<br>${s1}`;
        offsetLayers.forEach((el) => { el.innerHTML = base; });
        layerMain.innerHTML = lineIdx === 0
            ? `${s0}${CARET}<br>${s1}`
            : `${s0}<br>${s1}${CARET}`;
    };

    if (!reduceMotion) {
        paint(0, 0); // clear the pre-rendered text before first paint (no flash)

        const type = (lineIdx, count) => {
            paint(lineIdx, count);
            if (count < lines[lineIdx].length) {
                window.setTimeout(() => type(lineIdx, count + 1), 45 + Math.random() * 55);
            } else if (lineIdx < lines.length - 1) {
                window.setTimeout(() => type(lineIdx + 1, 0), 320); // beat at the line break
            } else {
                const caret = layerMain.querySelector('.type-caret');
                if (caret) window.setTimeout(() => caret.classList.add('is-done'), 900);
            }
        };

        window.setTimeout(() => type(0, 0), 250); // small beat before it starts
    }
}

// Retro view counter — local only, honestly labeled as such. No analytics,
// no server; just localStorage counting how many times this browser has
// loaded the page.
const counterEl = document.getElementById('counterDigits');
if (counterEl) {
    try {
        const count = Number(window.localStorage.getItem('emsh-views') || '0') + 1;
        window.localStorage.setItem('emsh-views', String(count));
        counterEl.textContent = String(count).padStart(6, '0');
    } catch (err) {
        // Private browsing / storage disabled — leave the placeholder digits.
    }
}
