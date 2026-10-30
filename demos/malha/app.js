/* Malha — desenho generativo em canvas.
   A semente define tudo. Redesenha só quando um controle muda. */

(function () {
  "use strict";

  var canvas = document.getElementById("malha");
  var stage = canvas ? canvas.parentElement : null;
  var readout = document.querySelector("[data-readout]");
  var modeLabel = document.querySelector("[data-mode-label]");
  var fallback = document.querySelector("[data-fallback]");
  var status = document.querySelector("[data-export-status]");

  var state = {
    seed: 4182,
    density: 26,
    amp: 12,
    mode: "malha",
    ink: "#2f5d50"
  };

  var OUT_W = 2200;
  var OUT_H = 1520;

  /* PRNG determinístico (mulberry32) */
  function prng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function setupCanvas(w, h) {
    if (!canvas) return null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.aspectRatio = w + " / " + h;
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  function draw() {
    var rect = stage ? stage.getBoundingClientRect() : { width: 900 };
    var w = Math.max(320, Math.round(rect.width || 900));
    var h = Math.round(w * (OUT_H / OUT_W));

    var cols = state.density;
    var rows = Math.max(4, Math.round(state.density * 0.78));

    // a leitura da tela não depende do canvas
    if (readout) {
      readout.textContent =
        "semente " + state.seed + " · " + cols + " × " + rows + " pontos · amplitude " + state.amp;
    }
    if (modeLabel) modeLabel.textContent = "modo " + state.mode;

    var ctx = setupCanvas(w, h);

    if (!ctx) {
      if (fallback) fallback.hidden = false;
      return;
    }
    if (fallback) fallback.hidden = true;

    var rand = prng(state.seed);
    var amp = (state.amp / 40) * Math.min(w, h) * 0.16;
    var phaseA = rand() * Math.PI * 2;
    var phaseB = rand() * Math.PI * 2;
    var cellW = w / cols;
    var cellH = h / rows;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#e6e5dd";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = state.ink;
    ctx.fillStyle = state.ink;
    ctx.lineWidth = Math.max(0.5, w / 2200);

    function offsetX(i, j) {
      return Math.sin(i * 0.55 + phaseA + j * 0.32) * amp;
    }
    function offsetY(i, j) {
      return Math.cos(j * 0.6 + phaseB + i * 0.28) * amp;
    }
    function jitter(i, j) {
      // ruído estável por ponto, derivado da semente
      var v = Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233 + state.seed) * 43758.5453;
      return (v - Math.floor(v)) - 0.5;
    }

    if (state.mode === "malha") {
      for (var j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (var i = 0; i <= cols; i++) {
          var x = i * cellW + offsetX(i, j);
          var y = j * cellH + offsetY(i, j);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.28 + ((j % 5) * 0.06);
        ctx.stroke();
      }
      for (var i2 = 0; i2 <= cols; i2++) {
        ctx.beginPath();
        for (var j2 = 0; j2 <= rows; j2++) {
          var x2 = i2 * cellW + offsetX(i2, j2);
          var y2 = j2 * cellH + offsetY(i2, j2);
          if (j2 === 0) ctx.moveTo(x2, y2);
          else ctx.lineTo(x2, y2);
        }
        ctx.globalAlpha = 0.22 + ((i2 % 4) * 0.07);
        ctx.stroke();
      }
    } else if (state.mode === "pontos") {
      for (var jp = 0; jp <= rows; jp++) {
        for (var ip = 0; ip <= cols; ip++) {
          var px = ip * cellW + offsetX(ip, jp);
          var py = jp * cellH + offsetY(ip, jp);
          var r = Math.max(0.8, (cellW * 0.22) * (0.35 + Math.abs(jitter(ip, jp)) * 1.6));
          ctx.globalAlpha = 0.35 + Math.abs(jitter(jp, ip)) * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      for (var il = 0; il <= cols; il++) {
        ctx.beginPath();
        for (var jl = 0; jl <= rows * 3; jl++) {
          var t = jl / (rows * 3);
          var yl = t * h;
          var wobble =
            Math.sin(t * Math.PI * (2 + (il % 3)) + phaseA + il * 0.4) * amp * 1.4 +
            Math.cos(t * Math.PI * 6 + phaseB) * amp * 0.3;
          var xl = il * cellW + wobble;
          if (jl === 0) ctx.moveTo(xl, yl);
          else ctx.lineTo(xl, yl);
        }
        ctx.globalAlpha = 0.3 + ((il % 6) * 0.09);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  }

  /* desenha no máximo uma vez por quadro */
  var pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      draw();
    });
  }

  /* ---------- controles ---------- */

  var seedInput = document.querySelector("[data-seed]");
  var density = document.querySelector("[data-density]");
  var densityOut = document.querySelector("[data-density-out]");
  var ampInput = document.querySelector("[data-amp]");
  var ampOut = document.querySelector("[data-amp-out]");

  function setSeed(value, updateInput) {
    var n = parseInt(value, 10);
    if (!n || n < 1) n = 1;
    if (n > 999999) n = 999999;
    state.seed = n;
    if (updateInput !== false && seedInput) seedInput.value = String(n);
    if (location.hash !== "#" + n) {
      history.replaceState(null, "", "#" + n);
    }
    schedule();
  }

  if (seedInput) {
    seedInput.addEventListener("input", function () {
      setSeed(seedInput.value, false);
    });
  }

  if (density) {
    density.addEventListener("input", function () {
      state.density = Number(density.value);
      if (densityOut) densityOut.textContent = String(state.density);
      schedule();
    });
  }

  if (ampInput) {
    ampInput.addEventListener("input", function () {
      state.amp = Number(ampInput.value);
      if (ampOut) ampOut.textContent = String(state.amp);
      schedule();
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-mode]"), function (btn) {
    btn.addEventListener("click", function () {
      state.mode = btn.getAttribute("data-mode");
      Array.prototype.forEach.call(document.querySelectorAll("[data-mode]"), function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      schedule();
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-ink]"), function (btn) {
    btn.addEventListener("click", function () {
      state.ink = btn.getAttribute("data-ink");
      Array.prototype.forEach.call(document.querySelectorAll("[data-ink]"), function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      schedule();
    });
  });

  var dice = document.querySelector("[data-dice]");
  if (dice) {
    dice.addEventListener("click", function () {
      setSeed(Math.floor(Math.random() * 999999) + 1);
    });
  }

  var randomize = document.querySelector("[data-randomize]");
  if (randomize) {
    randomize.addEventListener("click", function () {
      setSeed(Math.floor(Math.random() * 999999) + 1);
      var dens = 10 + Math.floor(Math.random() * 36);
      state.density = dens;
      if (density) density.value = String(dens);
      if (densityOut) densityOut.textContent = String(dens);
      var amp = Math.floor(Math.random() * 40);
      state.amp = amp;
      if (ampInput) ampInput.value = String(amp);
      if (ampOut) ampOut.textContent = String(amp);
      var modes = ["malha", "pontos", "linhas"];
      var next = modes[Math.floor(Math.random() * modes.length)];
      state.mode = next;
      Array.prototype.forEach.call(document.querySelectorAll("[data-mode]"), function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === next));
      });
      var inks = ["#2f5d50", "#8b3a22", "#2a2a28"];
      var ink = inks[Math.floor(Math.random() * inks.length)];
      state.ink = ink;
      Array.prototype.forEach.call(document.querySelectorAll("[data-ink]"), function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-ink") === ink));
      });
      schedule();
    });
  }

  /* exporta em resolução maior, redesenhando fora da tela */
  var exportBtn = document.querySelector("[data-export]");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      var off = document.createElement("canvas");
      off.width = OUT_W;
      off.height = OUT_H;
      var octx = off.getContext("2d");
      if (!octx || !canvas) {
        if (status) status.textContent = "Exportação indisponível neste navegador.";
        return;
      }
      octx.drawImage(canvas, 0, 0, OUT_W, OUT_H);
      var link = document.createElement("a");
      var name = "malha-semente-" + state.seed + ".png";
      link.download = name;
      try {
        link.href = off.toDataURL("image/png");
        link.click();
        if (status) status.textContent = "PNG gerado: " + name;
      } catch (err) {
        if (status) status.textContent = "O navegador bloqueou a exportação.";
      }
    });
  }

  /* semente vinda do endereço (#4182) */
  var hashSeed = parseInt((location.hash || "").replace("#", ""), 10);
  if (hashSeed > 0) setSeed(hashSeed);
  else draw();

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(schedule, 180);
  });
})();
