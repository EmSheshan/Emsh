// region.js — loads the per-region modules for whichever region folder the
// page lives in. Every region (andela/, lacadia/…) is just a folder with
// its own data/; the code in shared/ is the same for all of them.
//
// Module paths resolve against the PAGE (document.baseURI), not this file, so
// "data/region.js" means e.g. lacadia/data/region.js on a Lacadia page.

const here = (p) => new URL(p, document.baseURI).href;

export const SHARED = "../shared/";
export const ART_EXT = ".webp";

export const { region } = await import(here("data/region.js"));
export const { abilities } = await import(here("data/abilities.js"));
export const { moves } = await import(here("data/moves.js"));
