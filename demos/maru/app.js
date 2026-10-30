/* Estúdio Maru — desenhos de projeto (SVG) + filtro + ficha em diálogo. */
(function () {
  "use strict";

  var INK = "#22261f";
  var ACCENT = "#42583f";
  var SOFT = "#8b907f";

  function wrap(inner, square) {
    return (
      '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="400" height="300" fill="' +
      (square || "#e3e0d4") +
      '"/>' +
      inner +
      "</svg>"
    );
  }

  /* cada planta é uma composição de linhas grossas e finas */

  function plano(blocks, voids, extras) {
    var s = "";
    (blocks || []).forEach(function (b) {
      s +=
        '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" fill="none" stroke="' + INK + '" stroke-width="2.4"/>';
    });
    (voids || []).forEach(function (v) {
      s +=
        '<rect x="' + v[0] + '" y="' + v[1] + '" width="' + v[2] + '" height="' + v[3] + '" fill="' + ACCENT + '" opacity="0.16"/>';
    });
    return s + (extras || "");
  }

  var DRAWINGS = {
    patio: plano(
      [[40, 60, 320, 180], [150, 112, 110, 84]],
      [[150, 112, 110, 84]],
      '<path d="M40,240 L360,240" stroke="' + INK + '" stroke-width="1"/>' +
        '<path d="M150,112 L260,196 M260,112 L150,196" stroke="' + ACCENT + '" stroke-width="1" opacity="0.6"/>' +
        '<circle cx="205" cy="154" r="10" fill="none" stroke="' + ACCENT + '" stroke-width="1.4"/>'
    ),
    escola: plano(
      [[30, 80, 340, 46], [30, 148, 340, 46], [30, 216, 340, 30]],
      [[30, 132, 340, 12]],
      '<path d="M64,80 L64,246 M120,80 L120,246 M178,80 L178,246 M236,80 L236,246 M298,80 L298,246" stroke="' + SOFT + '" stroke-width="1"/>' +
        '<path d="M30,262 L370,262" stroke="' + INK + '" stroke-width="1" stroke-dasharray="4 4"/>'
    ),
    aurora: plano(
      [[70, 40, 260, 220], [96, 62, 208, 176]],
      [[120, 96, 76, 54], [208, 96, 72, 54], [120, 170, 76, 46], [208, 170, 72, 46]],
      '<path d="M96,196 L304,196" stroke="' + INK + '" stroke-width="1.4"/>' +
        '<path d="M340,64 L340,236 M326,64 L326,236" stroke="' + ACCENT + '" stroke-width="1" opacity="0.7"/>'
    ),
    vao: plano(
      [[48, 92, 150, 148], [198, 92, 154, 62]],
      [[198, 154, 154, 86]],
      '<path d="M48,240 L198,240" stroke="' + INK + '" stroke-width="1.6"/>' +
        '<path d="M198,154 L352,240" stroke="' + SOFT + '" stroke-width="1" stroke-dasharray="3 3"/>' +
        '<path d="M48,60 L352,60" stroke="' + SOFT + '" stroke-width="1"/>'
    ),
    linha: plano(
      [[40, 186, 320, 52]],
      [[64, 202, 272, 20]],
      '<path d="M64,186 L64,238 M104,186 L104,238 M144,186 L144,238 M184,186 L184,238 M224,186 L224,238 M264,186 L264,238 M304,186 L304,238" stroke="' + SOFT + '" stroke-width="0.9"/>' +
        '<circle cx="336" cy="112" r="26" fill="none" stroke="' + ACCENT + '" stroke-width="1.4"/>' +
        '<circle cx="336" cy="112" r="6" fill="' + ACCENT + '" opacity="0.5"/>'
    ),
    bosque: plano(
      [[56, 108, 288, 96]],
      [[110, 132, 60, 48], [182, 132, 60, 48], [254, 132, 60, 48]],
      (function () {
        var trees = "";
        [
          [70, 76, 14],
          [140, 60, 10],
          [212, 78, 16],
          [286, 58, 11],
          [336, 92, 13],
          [96, 246, 12],
          [330, 250, 15]
        ].forEach(function (t) {
          trees +=
            '<circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="none" stroke="' + ACCENT + '" stroke-width="1.1" opacity="0.75"/>';
        });
        return trees;
      })()
    )
  };

  /* ---------- miniaturas ---------- */

  document.querySelectorAll("[data-art]").forEach(function (node) {
    var key = node.getAttribute("data-art");
    node.innerHTML = DRAWINGS[key] ? wrap(DRAWINGS[key]) : "";
  });

  var hero = document.querySelector("[data-hero-art]");
  if (hero) hero.innerHTML = wrap(DRAWINGS.patio);

  /* ---------- filtro ---------- */

  var chips = document.querySelectorAll("[data-filter]");
  var tiles = document.querySelectorAll("[data-type]");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var value = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === chip));
      });
      tiles.forEach(function (tile) {
        var ok = value === "todos" || tile.getAttribute("data-type") === value;
        tile.hidden = !ok;
      });
    });
  });

  /* ---------- ficha em diálogo ---------- */

  var PROJECTS = {
    "casa-patio": {
      label: "residencial · 2024",
      title: "Casa Pátio",
      text: "Casa térrea em torno de um pátio de 4 × 5 m. O miolo sem telhado resolve iluminação e ventilação sem abrir janela para a rua.",
      facts: [
        ["Área", "148 m²"],
        ["Terreno", "12 × 26 m"],
        ["Estrutura", "concreto e alvenaria"],
        ["Ficha", "cliente fictício"]
      ],
      art: "patio"
    },
    "escola-ipe": {
      label: "educacional · 2023",
      title: "Escola Ipê",
      text: "Seis salas em duas barras paralelas, com corredor aberto no meio. A cobertura deixa passar luz indireta e ventila o corredor nos dias quentes.",
      facts: [
        ["Área", "620 m²"],
        ["Salas", "6 · 2 a 8 anos"],
        ["Cobertura", "telha metálica e shed"],
        ["Ficha", "projeto conceitual"]
      ],
      art: "escola"
    },
    "edificio-aurora": {
      label: "uso misto · 2025",
      title: "Edifício Aurora",
      text: "Quatro pavimentos: comércio no térreo, escritórios em cima e uma varanda coletiva no último andar. O volume recua para deixar a esquina livre.",
      facts: [
        ["Área", "1.240 m²"],
        ["Pavimentos", "4"],
        ["Fachada", "brise de concreto"],
        ["Ficha", "projeto conceitual"]
      ],
      art: "aurora"
    },
    "casa-vao": {
      label: "residencial · 2022",
      title: "Casa Vão",
      text: "Duas caixas desencontradas deixam um vão central que vira varanda. A casa é pequena por dentro e enorme por fora — o espaço que falta está no meio.",
      facts: [
        ["Área", "96 m²"],
        ["Terreno", "8 × 20 m"],
        ["Vão central", "3,2 m"],
        ["Ficha", "projeto conceitual"]
      ],
      art: "vao"
    },
    "centro-linha": {
      label: "educacional · 2024",
      title: "Centro Linha",
      text: "Um corredor coberto de 62 m liga oficinas, biblioteca e refeitório. Uma linha só organiza o terreno comprido e molda o percurso das crianças.",
      facts: [
        ["Área", "310 m²"],
        ["Comprimento", "62 m"],
        ["Programa", "oficinas e biblioteca"],
        ["Ficha", "projeto conceitual"]
      ],
      art: "linha"
    },
    "casa-bosque": {
      label: "residencial · 2026",
      title: "Casa Bosque",
      text: "Barra alongada entre árvores existentes, com três vazios alinhados à copa. Nenhuma árvore adulta foi retirada do terreno.",
      facts: [
        ["Área", "210 m²"],
        ["Terreno", "com 9 árvores adultas"],
        ["Estrutura", "madeira laminada"],
        ["Ficha", "projeto conceitual"]
      ],
      art: "bosque"
    }
  };

  var dialog = document.getElementById("projeto-dialog");
  if (!dialog) return;
  var lastFocus = null;

  function showModal(el) {
    if (typeof el.showModal === "function") el.showModal();
    else el.setAttribute("open", "");
    document.body.classList.add("dlg-open");
  }

  function hideModal(el) {
    if (typeof el.close === "function") el.close();
    else el.removeAttribute("open");
    document.body.classList.remove("dlg-open");
    if (lastFocus && lastFocus.isConnected) lastFocus.focus();
  }

  function openProject(id, trigger) {
    var data = PROJECTS[id];
    if (!data) return;
    lastFocus = trigger || document.activeElement;
    document.getElementById("dlg-title").textContent = data.title;
    document.getElementById("dlg-label").textContent = data.label;
    dialog.querySelector("[data-dialog-text]").textContent = data.text;
    dialog.querySelector("[data-dialog-art]").innerHTML = wrap(DRAWINGS[data.art]);
    dialog.querySelector("[data-dialog-facts]").innerHTML = data.facts
      .map(function (f) {
        return "<div><dt>" + f[0] + "</dt><dd>" + f[1] + "</dd></div>";
      })
      .join("");
    showModal(dialog);
    dialog.querySelector("[data-dialog-close]").focus();
  }

  document.querySelectorAll("[data-project]").forEach(function (tile) {
    tile.addEventListener("click", function () {
      openProject(tile.getAttribute("data-project"), tile);
    });
  });

  dialog.querySelector("[data-dialog-close]").addEventListener("click", function () {
    hideModal(dialog);
  });

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) hideModal(dialog);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dialog.open) hideModal(dialog);
  });
})();
