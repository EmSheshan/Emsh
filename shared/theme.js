// theme.js — page furniture for the carousel theme (see theme.css):
//   - a link back to the hub on region grid pages
//   - hides art that hasn't been added yet instead of showing a broken image
(function () {
  // The backdrop: type gradient plus two habitat slots for cross-fading.
  const bg = document.createElement("div");
  bg.className = "page-bg";
  bg.setAttribute("aria-hidden", "true");
  bg.innerHTML = '<div class="bg-layer"></div><div class="bg-layer"></div><div class="bg-shade"></div>';

  // Show a habitat behind the page. The image is loaded into the hidden slot
  // first and only then faded in, so switching Pokemon cross-fades smoothly
  // instead of flashing an empty frame. Rapid switches just keep the latest.
  let wanted = null;
  window.emshSetBackdrop = (url) => {
    wanted = url;
    const img = new Image();
    img.onload = () => {
      if (wanted !== url) return;
      const [a, b] = bg.querySelectorAll(".bg-layer");
      const showing = a.classList.contains("on") ? a : b.classList.contains("on") ? b : null;
      if (showing && showing.dataset.url === url) return;
      const next = showing === a ? b : a;
      next.style.backgroundImage = `url("${url}")`;
      next.dataset.url = url;
      next.classList.add("on");
      showing?.classList.remove("on");
      bg.classList.add("has-photo");
    };
    img.src = url;
  };

  const mount = () => {
    document.body.prepend(bg);
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
