/* Grão — ilustração do pacote e troca de periodicidade dos planos. */
(function () {
  "use strict";

  /* ---------- pacote ---------- */

  var art = document.querySelector("[data-bag-art]");
  if (art) {
    var ink = "#241a12";
    var body = "#b3401f";
    var paper = "#f3e9d8";

    var beans = "";
    for (var i = 0; i < 14; i++) {
      var bx = 60 + (i % 7) * 36 + (i > 6 ? 18 : 0);
      var by = 300 + Math.floor(i / 7) * 26;
      beans +=
        '<ellipse cx="' + bx + '" cy="' + by + '" rx="9" ry="6" fill="' + ink + '" opacity="' + (0.12 + (i % 3) * 0.05) + '" transform="rotate(' + (i % 2 ? 18 : -14) + " " + bx + " " + by + ')"/>';
    }

    art.innerHTML =
      '<svg viewBox="0 0 400 400" role="img" aria-label="Ilustração de pacote de café com etiqueta" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="400" height="400" fill="#efe6d6"/>' +
      '<rect x="96" y="66" width="208" height="34" rx="6" fill="' + paper + '" stroke="' + ink + '" stroke-width="1.4"/>' +
      '<path d="M112 66 L112 40 L288 40 L288 66" fill="none" stroke="' + ink + '" stroke-width="1.4"/>' +
      '<path d="M102 100 L298 100 L288 300 Q200 312 112 300 Z" fill="' + body + '"/>' +
      '<path d="M102 100 L298 100 L296 132 L104 132 Z" fill="' + ink + '" opacity="0.16"/>' +
      '<rect x="140" y="152" width="120" height="96" rx="3" fill="' + paper + '"/>' +
      '<text x="200" y="186" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="26" fill="' + ink + '">Grão</text>' +
      '<line x1="160" y1="198" x2="240" y2="198" stroke="' + ink + '" stroke-width="1" opacity="0.5"/>' +
      '<text x="200" y="216" text-anchor="middle" font-family="Plex Mono, monospace" font-size="8" fill="#5a4a3c" letter-spacing="1.6">TORRA 014</text>' +
      '<text x="200" y="232" text-anchor="middle" font-family="Plex Mono, monospace" font-size="8" fill="#5a4a3c" letter-spacing="1.6">250 G · MOÍDO</text>' +
      '<circle cx="200" cy="272" r="9" fill="none" stroke="' + paper + '" stroke-width="1.4" opacity="0.7"/>' +
      beans +
      "</svg>";
  }

  /* ---------- plano mensal / anual ---------- */

  var monthly = { gota: 79, xicara: 139, buque: 239 };
  var buttons = document.querySelectorAll("[data-cycle]");
  var prices = document.querySelectorAll("[data-price]");
  var labels = document.querySelectorAll("[data-cycle-label]");
  var cycle = "mes";

  function paint() {
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-cycle") === cycle));
    });

    prices.forEach(function (node) {
      var key = node.getAttribute("data-price");
      var base = monthly[key];
      if (!base) return;
      node.textContent = cycle === "ano" ? "R$ " + Math.round(base * 0.85 * 12) : "R$ " + base;
    });

    labels.forEach(function (node) {
      node.textContent = cycle === "ano" ? "por ano · 15% off" : "por mês";
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      cycle = btn.getAttribute("data-cycle");
      paint();
    });
  });

  paint();

  /* ---------- escolher plano ---------- */

  var planSelect = document.getElementById("gr-plano");
  document.querySelectorAll("[data-pick]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-pick");
      if (planSelect) {
        Array.prototype.forEach.call(planSelect.options, function (opt) {
          if (opt.text === name) planSelect.value = opt.value;
        });
      }
      var target = document.querySelector(".gr-form");
      if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      var first = document.getElementById("gr-nome");
      if (first) setTimeout(function () { first.focus(); }, 420);
    });
  });
})();
