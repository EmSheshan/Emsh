// Misc signature moves (same shape as the other regions' moves.js).
export const moves = {
  "Wrathful Nail": {
    type: "Steel",
    category: "Physical",
    power: 100,
    accuracy: 100,
    pp: 5,
    contact: true,
    description:
      "The user pierces the opponent with its blade and pins them down. The target becomes grounded and unable to flee.",
  },
  // Canon signature moves of the Hyper forms.
  "Snipe Shot": {
    type: "Water",
    category: "Special",
    power: 80,
    accuracy: 100,
    pp: 15,
    description:
      "The user ignores the effects of the opposing Pokémon's moves and Abilities that draw in moves, allowing this move to hit the chosen target.",
  },
  Transform: {
    type: "Normal",
    category: "Status",
    power: null,
    accuracy: null,
    pp: 10,
    description:
      "The user transforms into a copy of the target right down to having the same move set.",
  },
};
