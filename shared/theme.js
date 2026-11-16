// theme.js — page furniture for the carousel theme (see theme.css):
//   - the SVG filter that gives art its solid half-opacity white stroke
//   - the gold viewport frame with diamond studs
//   - a link back to the hub on region grid pages
//   - hides art that hasn't been added yet instead of showing a broken image
(function () {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.innerHTML = `
    <filter id="art-stroke" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
      <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="grown"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.5"/>
      <feComposite in2="grown" operator="in" result="stroke"/>
      <feMerge><feMergeNode in="stroke"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;

  const frame = document.createElement("div");
  frame.className = "gold-frame";
  frame.setAttribute("aria-hidden", "true");
  frame.innerHTML = "<i></i>".repeat(6);

  const mount = () => {
    document.body.prepend(svg);
    document.body.append(frame);
    const banner = document.querySelector("header .banner-main");
    if (banner && !banner.querySelector(".hub-link")) {
      const a = document.createElement("a");
      a.className = "hub-link";
      a.href = "../index.html";
      a.textContent = "← all dexes";
      const search = banner.querySelector(".search-toggle-btn");
      banner.insertBefore(a, search);
    }
  };
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  // Art not converted yet: hide the broken image, keep the tile.
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && /pokemonArt/.test(img.src)) img.classList.add("missing-art");
  }, true);
})();
