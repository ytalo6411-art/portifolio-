/* Circuito — diagrama de integração desenhado em SVG. */
(function () {
  "use strict";

  var hero = document.querySelector("[data-hero-art]");
  if (!hero) return;

  var ink = "#e8ecf7";
  var line = "#3b4767";
  var accent = "#8ad86b";
  var card = "#1a2136";

  var nodes = [
    { x: 44, y: 44, w: 118, h: 56, label: "loja", sub: "pedidos" },
    { x: 238, y: 44, w: 118, h: 56, label: "estoque", sub: "saldo" },
    { x: 44, y: 214, w: 118, h: 56, label: "caixa", sub: "recebíveis" },
    { x: 238, y: 214, w: 118, h: 56, label: "fiscal", sub: "notas" }
  ];

  var s = '<rect width="400" height="314" fill="' + card + '"/>';

  /* linhas do hub para os nós */
  var cx = 200;
  var cy = 157;
  nodes.forEach(function (n) {
    var nx = n.x + n.w / 2;
    var ny = n.y + n.h / 2;
    s +=
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + nx + '" y2="' + ny + '" stroke="' + line + '" stroke-width="1.2" stroke-dasharray="4 4"/>';
  });

  /* grade de fundo */
  for (var gx = 20; gx < 400; gx += 40) {
    s += '<line x1="' + gx + '" y1="0" x2="' + gx + '" y2="314" stroke="' + ink + '" stroke-width="0.4" opacity="0.05"/>';
  }

  nodes.forEach(function (n) {
    s +=
      '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="7" fill="#111729" stroke="' + line + '"/>' +
      '<text x="' + (n.x + 14) + '" y="' + (n.y + 26) + '" font-family="Instrument Sans, sans-serif" font-size="13" fill="' + ink + '">' +
      n.label +
      "</text>" +
      '<text x="' + (n.x + 14) + '" y="' + (n.y + 42) + '" font-family="Plex Mono, monospace" font-size="8.5" fill="#7e8aa8">' +
      n.sub +
      "</text>";
  });

  /* hub */
  s +=
    '<circle cx="200" cy="157" r="42" fill="#0d1526" stroke="' + accent + '" stroke-width="1.6"/>' +
    '<circle cx="200" cy="157" r="30" fill="none" stroke="' + accent + '" stroke-width="0.8" opacity="0.5"/>' +
    '<text x="200" y="154" text-anchor="middle" font-family="Plex Mono, monospace" font-size="8" fill="' + accent + '">circuito</text>' +
    '<text x="200" y="168" text-anchor="middle" font-family="Plex Mono, monospace" font-size="7.5" fill="#7e8aa8">sync 90s</text>';

  /* legenda */
  s +=
    '<rect x="44" y="290" width="8" height="8" rx="2" fill="' + accent + '"/>' +
    '<text x="58" y="298" font-family="Plex Mono, monospace" font-size="8" fill="#7e8aa8">fonte de verdade única</text>' +
    '<text x="356" y="298" text-anchor="end" font-family="Plex Mono, monospace" font-size="8" fill="#7e8aa8">demo</text>';

  hero.innerHTML =
    '<svg viewBox="0 0 400 314" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama: loja, estoque, caixa e fiscal ligados a um painel central" xmlns="http://www.w3.org/2000/svg">' +
    s +
    "</svg>";
})();
