// script.js — catalog viewer behavior

document.querySelectorAll('.btn-duo[data-target]').forEach((button) => {
    button.addEventListener('click', () => {
        const { target, src } = button.dataset;
        const viewer = document.getElementById(`viewer-${target}`);
        const frame = viewer.querySelector('iframe');
        const openLink = document.querySelector(`.open-link[data-for="${target}"]`);

        if (frame.src !== src) {
            frame.src = src;
        }

        viewer.classList.add('open');
        openLink.classList.remove('hidden');

        // Briefly show the grayscale "developing" state before revealing color.
        viewer.classList.remove('developed');
        window.setTimeout(() => {
            viewer.classList.add('developed');
        }, 700);

        button.querySelector('span').textContent = 'RELOAD';
    });
});

// Hero blobs drift toward the cursor slightly — a light parallax, not a follow.
const hero = document.querySelector('.hero');
const blobs = document.querySelectorAll('.blob');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
    const lines = ['fake regions.', 'real spreadsheets.'];
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
