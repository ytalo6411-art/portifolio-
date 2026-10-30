/* Alçada — desenho de abertura: folha de trabalho com colunas e carimbo. */
(function () {
  "use strict";

  var hero = document.querySelector("[data-hero-art]");
  if (!hero) return;

  var ink = "#1b2b3a";
  var soft = "#8d99a2";
  var accent = "#a8442b";

  var rows = "";
  for (var i = 0; i < 11; i++) {
    var y = 96 + i * 18;
    var w = i % 4 === 0 ? 128 : i % 3 === 0 ? 92 : 148;
    rows +=
      '<line x1="70" y1="' + y + '" x2="' + (70 + w) + '" y2="' + y + '" stroke="' + soft + '" stroke-width="1.4" opacity="0.55"/>' +
      '<line x1="250" y1="' + y + '" x2="' + (250 + (i % 2 ? 44 : 62)) + '" y2="' + y + '" stroke="' + soft + '" stroke-width="1.4" opacity="0.35"/>';
  }

  var bars = "";
  [26, 44, 34, 58, 48].forEach(function (h, i) {
    bars +=
      '<rect x="' + (330 + i * 30) + '" y="' + (300 - h) + '" width="16" height="' + h + '" fill="' + (i === 3 ? accent : ink) + '" opacity="' + (i === 3 ? 0.85 : 0.18) + '"/>';
  });

  var inner =
    '<rect width="400" height="300" fill="#e7e4db"/>' +
    '<rect x="44" y="40" width="312" height="220" fill="#f7f5ef" stroke="' + ink + '" stroke-width="1"/>' +
    '<line x1="44" y1="70" x2="356" y2="70" stroke="' + ink + '" stroke-width="1"/>' +
    '<line x1="230" y1="70" x2="230" y2="260" stroke="' + ink + '" stroke-width="0.8" opacity="0.5"/>' +
    rows +
    '<line x1="56" y1="240" x2="344" y2="240" stroke="' + ink + '" stroke-width="1.2"/>' +
    bars +
    '<circle cx="304" cy="110" r="30" fill="none" stroke="' + accent + '" stroke-width="2" opacity="0.85"/>' +
    '<path d="M289,110 L299,121 L320,98" fill="none" stroke="' + accent + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M44,274 L356,274" stroke="' + soft + '" stroke-width="1" stroke-dasharray="3 4"/>';

  hero.innerHTML =
    '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
    inner +
    "</svg>";
})();
