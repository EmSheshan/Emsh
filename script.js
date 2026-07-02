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
