/* Onda — ondas da abertura, ícones e mistura visual (sem áudio). */
(function () {
  "use strict";

  /* ---------- forma de onda ---------- */

  var wave = document.querySelector("[data-wave]");
  if (wave) {
    var bars = 48;
    var html = "";
    for (var i = 0; i < bars; i++) {
      var t = i / bars;
      var h =
        22 +
        Math.abs(Math.sin(t * Math.PI * 3.2)) * 52 +
        Math.abs(Math.cos(t * Math.PI * 1.4)) * 22;
      html += '<span style="height:' + Math.round(h) + '%"></span>';
    }
    wave.innerHTML = html;
  }

  /* ---------- ícones ---------- */

  var ICONS = {
    layers:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5"/></svg>',
    timer:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M9 2h6"/></svg>',
    offline:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16a4 4 0 0 1 .6-8A6 6 0 0 1 17 9a3.5 3.5 0 0 1 .5 7H7"/><path d="M3 3l18 18"/></svg>',
    quiet:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h3l4 4V5L7 9H4Z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>'
  };

  document.querySelectorAll("[data-icon]").forEach(function (node) {
    var key = node.getAttribute("data-icon");
    node.innerHTML = ICONS[key] || "";
  });

  /* ---------- mistura ---------- */

  var sliders = Array.prototype.slice.call(document.querySelectorAll("[data-layer]"));
  var blob = document.querySelector("[data-blob]");
  var label = document.querySelector("[data-mix-label]");

  function paint() {
    if (!sliders.length) return;
    var total = 0;
    var active = 0;

    sliders.forEach(function (input) {
      var value = Number(input.value);
      total += value;
      if (value > 0) active++;
      var out = document.querySelector('[data-value="' + input.getAttribute("data-layer") + '"]');
      if (out) out.textContent = String(value);
    });

    var avg = total / (sliders.length * 100);
    if (blob) {
      var scale = 0.75 + avg * 0.6;
      blob.style.transform = "scale(" + scale.toFixed(3) + ")";
      blob.style.opacity = String(0.35 + avg * 0.65);
    }
    if (label) {
      var db = Math.round(avg * 24) - 24;
      label.textContent = active + (active === 1 ? " camada" : " camadas") + " · " + db + " dB";
    }
  }

  sliders.forEach(function (input) {
    input.addEventListener("input", paint);
  });
  paint();
})();
