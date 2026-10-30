/* ------------------------------------------------------------------
   art.js — desenhos vetoriais usados dentro das lojas conceituais.
   Cada função devolve o conteúdo de um <svg viewBox="0 0 400 400">.
   Paleta sempre vem de fora, para o mesmo desenho servir a identidades
   diferentes sem parecer o mesmo produto.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var CHROME = 0.001; // evita sombras duplicadas quando o traço é zero

  function svg(inner) {
    return (
      '<svg viewBox="0 0 400 400" role="img" aria-hidden="true" focusable="false" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      inner +
      "</svg>"
    );
  }

  function ground(c) {
    return '<rect x="0" y="0" width="400" height="400" fill="' + c + '"/>';
  }

  /* ---------- roupas ---------- */

  function camiseta(body, shade, bg) {
    return svg(
      ground(bg || "#efe7d9") +
        '<path d="M150 96 L120 112 L96 146 L128 176 L140 164 L140 316 Q200 328 260 316 L260 164 L272 176 L304 146 L280 112 L250 96 Q200 126 150 96 Z" fill="' +
        body +
        '"/>' +
        '<path d="M150 96 Q200 126 250 96 Q200 108 150 96 Z" fill="' + shade + '"/>' +
        '<path d="M140 250 Q200 262 260 250" fill="none" stroke="' + shade + '" stroke-width="2" opacity="0.5"/>'
    );
  }

  function camisa(body, shade, bg) {
    return svg(
      ground(bg || "#eeeae1") +
        '<path d="M150 92 L118 110 L92 152 L126 180 L138 166 L138 320 Q200 332 262 320 L262 166 L274 180 L308 152 L282 110 L250 92 L200 112 Z" fill="' +
        body +
        '"/>' +
        '<path d="M200 112 L200 326" stroke="' + shade + '" stroke-width="2"/>' +
        '<path d="M172 104 L200 128 L228 104 L212 96 L200 104 L188 96 Z" fill="' + shade + '"/>' +
        '<circle cx="200" cy="186" r="2.4" fill="' + shade + '"/>' +
        '<circle cx="200" cy="232" r="2.4" fill="' + shade + '"/>' +
        '<circle cx="200" cy="278" r="2.4" fill="' + shade + '"/>'
    );
  }

  function jaqueta(body, shade, bg) {
    return svg(
      ground(bg || "#e7e3d7") +
        '<path d="M148 96 L112 116 L84 158 L120 186 L134 170 L134 322 Q200 334 266 322 L266 170 L280 186 L316 158 L288 116 L252 96 L200 118 Z" fill="' +
        body +
        '"/>' +
        '<path d="M200 118 L200 328" stroke="' + shade + '" stroke-width="3"/>' +
        '<path d="M200 118 L172 96 L148 96 L160 132 Z" fill="' + shade + '"/>' +
        '<path d="M200 118 L228 96 L252 96 L240 132 Z" fill="' + shade + '"/>' +
        '<rect x="146" y="262" width="44" height="30" fill="none" stroke="' + shade + '" stroke-width="2"/>' +
        '<rect x="210" y="262" width="44" height="30" fill="none" stroke="' + shade + '" stroke-width="2"/>'
    );
  }

  function vestido(body, shade, bg) {
    return svg(
      ground(bg || "#eae2d4") +
        '<path d="M164 92 L140 100 L132 128 Q160 132 200 132 Q240 132 268 128 L260 100 L236 92 Q200 112 164 92 Z" fill="' +
        shade +
        '"/>' +
        '<path d="M164 108 Q200 126 236 108 L244 150 L262 300 Q200 320 138 300 L156 150 Z" fill="' +
        body +
        '"/>' +
        '<path d="M156 250 Q200 262 244 250" fill="none" stroke="' + shade + '" stroke-width="2" opacity="0.7"/>'
    );
  }

  function calca(body, shade, bg) {
    return svg(
      ground(bg || "#ecebe2") +
        '<path d="M148 104 L252 104 L258 150 L246 336 L204 336 L200 208 L196 336 L154 336 L142 150 Z" fill="' +
        body +
        '"/>' +
        '<path d="M148 104 L252 104 L254 126 L146 126 Z" fill="' + shade + '"/>' +
        '<path d="M186 132 L186 196" stroke="' + shade + '" stroke-width="2" opacity="0.6"/>' +
        '<path d="M214 132 L214 196" stroke="' + shade + '" stroke-width="2" opacity="0.6"/>'
    );
  }

  /* ---------- calçados ---------- */

  function tenis(body, sole, bg) {
    return svg(
      ground(bg || "#ece4d6") +
        '<path d="M92 268 Q92 224 126 212 L168 198 Q196 190 216 206 L266 244 Q300 252 306 274 Q308 296 286 298 L118 298 Q94 296 92 268 Z" fill="' +
        body +
        '"/>' +
        '<path d="M92 276 L306 276 Q308 298 286 298 L118 298 Q94 296 92 276 Z" fill="' +
        sole +
        '"/>' +
        '<path d="M150 208 L196 238 M164 200 L210 232 M180 194 L224 224" stroke="' + sole + '" stroke-width="3" opacity="0.85"/>' +
        '<path d="M262 252 Q282 260 292 276" stroke="' + sole + '" stroke-width="2" fill="none" opacity="0.6"/>'
    );
  }

  /* ---------- tecnologia ---------- */

  function fone(body, shade, bg) {
    return svg(
      ground(bg || "#e8e2d6") +
        '<path d="M112 226 L112 190 Q112 112 200 112 Q288 112 288 190 L288 226" fill="none" stroke="' +
        shade +
        '" stroke-width="16" stroke-linecap="round"/>' +
        '<rect x="86" y="212" width="54" height="112" rx="24" fill="' + body + '"/>' +
        '<rect x="260" y="212" width="54" height="112" rx="24" fill="' + body + '"/>' +
        '<rect x="98" y="230" width="26" height="76" rx="12" fill="' + shade + '" opacity="0.55"/>' +
        '<rect x="276" y="230" width="26" height="76" rx="12" fill="' + shade + '" opacity="0.55"/>'
    );
  }

  function teclado(body, shade, bg) {
    var keys = "";
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 12; c++) {
        keys +=
          '<rect x="' + (72 + c * 21) + '" y="' + (216 + r * 22) + '" width="16" height="16" rx="3" fill="' +
          shade +
          '" opacity="' + (0.35 + ((r + c) % 3) * 0.16) + '"/>';
      }
    }
    return svg(
      ground(bg || "#e9e6df") +
        '<rect x="56" y="186" width="288" height="132" rx="14" fill="' + body + '"/>' +
        keys +
        '<rect x="126" y="304" width="148" height="8" rx="4" fill="' + shade + '" opacity="0.5"/>'
    );
  }

  function celular(body, shade, bg) {
    return svg(
      ground(bg || "#eae5da") +
        '<rect x="140" y="62" width="120" height="252" rx="22" fill="' + body + '"/>' +
        '<rect x="152" y="78" width="96" height="220" rx="12" fill="' + shade + '" opacity="0.35"/>' +
        '<rect x="180" y="70" width="40" height="7" rx="3.5" fill="' + body + '" opacity="0.9"/>' +
        '<circle cx="200" cy="314" r="60" fill="' + body + '" opacity="0.18"/>' +
        '<circle cx="200" cy="330" r="52" fill="' + body + '" opacity="0.22"/>'
    );
  }

  function caixa(body, shade, bg) {
    return svg(
      ground(bg || "#e7e2d5") +
        '<rect x="150" y="120" width="120" height="190" rx="26" fill="' + body + '"/>' +
        '<circle cx="200" cy="196" r="40" fill="' + shade + '" opacity="0.4"/>' +
        '<circle cx="200" cy="196" r="14" fill="' + shade + '"/>' +
        '<rect x="178" y="264" width="44" height="6" rx="3" fill="' + shade + '" opacity="0.55"/>' +
        '<rect x="190" y="278" width="20" height="6" rx="3" fill="' + shade + '" opacity="0.35"/>'
    );
  }

  /* ---------- casa ---------- */

  function cadeira(body, shade, bg) {
    return svg(
      ground(bg || "#efe9dd") +
        '<path d="M150 96 L250 96 Q262 96 262 110 L262 196 L138 196 L138 110 Q138 96 150 96 Z" fill="' +
        body +
        '"/>' +
        '<rect x="126" y="196" width="148" height="26" rx="8" fill="' + shade + '"/>' +
        '<path d="M142 222 L128 330 M258 222 L272 330" stroke="' + shade + '" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M142 268 L258 268" stroke="' + shade + '" stroke-width="6" opacity="0.5"/>'
    );
  }

  function luminaria(body, shade, bg) {
    return svg(
      ground(bg || "#f0eadf") +
        '<path d="M200 70 L200 130" stroke="' + shade + '" stroke-width="4"/>' +
        '<path d="M148 130 L252 130 L236 218 Q200 236 164 218 Z" fill="' + body + '"/>' +
        '<path d="M200 218 L200 320" stroke="' + shade + '" stroke-width="4"/>' +
        '<ellipse cx="200" cy="328" rx="54" ry="12" fill="' + shade + '" opacity="0.35"/>' +
        '<circle cx="200" cy="240" r="34" fill="' + shade + '" opacity="0.14"/>'
    );
  }

  function vaso(body, shade, bg) {
    return svg(
      ground(bg || "#eee7da") +
        '<path d="M162 180 Q154 268 172 312 Q200 328 228 312 Q246 268 238 180 Z" fill="' + body + '"/>' +
        '<path d="M162 180 L238 180 L232 200 L168 200 Z" fill="' + shade + '" opacity="0.6"/>' +
        '<path d="M200 180 L200 120" stroke="' + shade + '" stroke-width="3"/>' +
        '<path d="M200 150 Q168 128 152 96 Q192 100 200 150 Z" fill="' + shade + '" opacity="0.75"/>' +
        '<path d="M200 138 Q232 112 256 92 Q250 132 200 138 Z" fill="' + shade + '" opacity="0.5"/>'
    );
  }

  /* ---------- esporte ---------- */

  function bola(body, shade, bg) {
    return svg(
      ground(bg || "#e9e6d8") +
        '<circle cx="200" cy="200" r="104" fill="' + body + '"/>' +
        '<path d="M200 96 A104 104 0 0 1 200 304 A104 104 0 0 1 200 96 Z" fill="none" stroke="' + shade + '" stroke-width="4" opacity="0.8"/>' +
        '<path d="M96 200 A104 104 0 0 0 304 200" fill="none" stroke="' + shade + '" stroke-width="4" opacity="0.55"/>' +
        '<path d="M96 200 A104 104 0 0 1 304 200" fill="none" stroke="' + shade + '" stroke-width="4" opacity="0.55"/>' +
        '<circle cx="200" cy="200" r="34" fill="' + shade + '" opacity="0.35"/>'
    );
  }

  function garrafa(body, shade, bg) {
    return svg(
      ground(bg || "#e8e6dd") +
        '<path d="M178 74 L222 74 L222 118 Q248 148 248 208 L248 312 Q248 328 232 328 L168 328 Q152 328 152 312 L152 208 Q152 148 178 118 Z" fill="' +
        body +
        '"/>' +
        '<rect x="174" y="62" width="52" height="20" rx="8" fill="' + shade + '"/>' +
        '<rect x="152" y="196" width="96" height="34" fill="' + shade + '" opacity="0.5"/>'
    );
  }

  function mochila(body, shade, bg) {
    return svg(
      ground(bg || "#ece7db") +
        '<rect x="132" y="132" width="136" height="184" rx="40" fill="' + body + '"/>' +
        '<path d="M160 134 Q200 86 240 134" fill="none" stroke="' + shade + '" stroke-width="10" stroke-linecap="round"/>' +
        '<rect x="162" y="236" width="76" height="60" rx="12" fill="' + shade + '" opacity="0.55"/>' +
        '<rect x="186" y="186" width="28" height="12" rx="6" fill="' + shade + '" opacity="0.7"/>'
    );
  }

  window.Art = {
    camiseta: camiseta,
    camisa: camisa,
    jaqueta: jaqueta,
    vestido: vestido,
    calca: calca,
    tenis: tenis,
    fone: fone,
    teclado: teclado,
    celular: celular,
    caixa: caixa,
    cadeira: cadeira,
    luminaria: luminaria,
    vaso: vaso,
    bola: bola,
    garrafa: garrafa,
    mochila: mochila
  };
})();
