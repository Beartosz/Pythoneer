/* ════════════════════════════════════════════════════════════════
   theme.js — palette management (the 4 palettes from the design spec)
   ════════════════════════════════════════════════════════════════ */
(function () {
  const PALETTES = [
    { id: "green",   name: "Serpent Green", sub: "Calm, classic Python",  swatch: ["#34d399", "#6ee7b7", "#a7f3d0"] },
    { id: "amber",   name: "Molten Amber",  sub: "Warm and energetic",    swatch: ["#fbbf24", "#fde68a", "#fb923c"] },
    { id: "cyan",    name: "Arctic Cyan",   sub: "Cool and focused",      swatch: ["#22d3ee", "#67e8f9", "#a5f3fc"] },
    { id: "crimson", name: "Crimson Edge",  sub: "Bold and high-contrast", swatch: ["#f43f5e", "#fb7185", "#fda4af"] },
  ];

  function apply(id) {
    const valid = PALETTES.some((p) => p.id === id) ? id : "green";
    document.documentElement.setAttribute("data-theme", valid);
    Store.theme = valid;
  }

  // Apply saved theme immediately so there's no flash of the wrong palette.
  apply(Store.theme);

  window.Theme = { PALETTES, apply, current: () => Store.theme };
})();
