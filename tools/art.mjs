/* ------------------------------------------------------------------
   tools/art.mjs
   Ilustrações vetoriais usadas nas capas e dentro dos projetos.
   Todas são desenhadas numa caixa 100 × 100 e escaladas para o alvo.
   Não há banco de imagens: cada peça é desenho próprio.
------------------------------------------------------------------- */

export function stretch(x, y, w, h, inner) {
  return `<g transform="translate(${x},${y}) scale(${(w / 100).toFixed(4)},${(h / 100).toFixed(4)})">${inner}</g>`;
}

export function box(x, y, w, h, inner, pad = 0) {
  const s = (Math.min(w, h) - pad * 2) / 100;
  const tx = x + (w - 100 * s) / 2;
  const ty = y + (h - 100 * s) / 2;
  return `<g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${s.toFixed(4)})">${inner}</g>`;
}

const path = (d, fill, stroke = "none", sw = 0, opacity = 1) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}" stroke-linejoin="round" stroke-linecap="round"/>`;

/* ----------------------------- moda ----------------------------- */

export function camisa(c = "#e6ddca", l = "#cfc3a9", d = "#b5a68a") {
  return [
    path("M33,27 L21,31 L11,51 L21,57 L26,49 L26,92 L74,92 L74,49 L79,57 L89,51 L79,31 L67,27 Z", c),
    path("M33,27 L21,31 L11,51 L21,57 L26,49 L26,62 L33,60 Z", l),
    path("M67,27 L79,31 L89,51 L79,57 L74,49 L74,62 L67,60 Z", l),
    path("M41,27 L50,38 L59,27 L53,25 L50,30 L47,25 Z", d),
    path("M50,38 L50,92", "none", d, 1.1),
    [1, 2, 3, 4].map((i) => `<circle cx="50" cy="${44 + i * 11}" r="1.5" fill="${d}"/>`).join(""),
    path("M26,86 L74,86", "none", d, 0.8, 0.5)
  ].join("");
}

export function camiseta(c = "#f0ece1", l = "#d9d2c2", d = "#bdb4a1") {
  return [
    path("M35,26 L24,30 L14,44 L24,52 L29,44 L29,90 L71,90 L71,44 L76,52 L86,44 L76,30 L65,26 Z", c),
    path("M35,26 L41,33 L50,36 L59,33 L65,26 L58,24 L50,30 L42,24 Z", l),
    path("M29,80 L71,80", "none", d, 0.8, 0.35),
    path("M29,50 L29,90 L71,90 L71,50", "none", l, 0.9)
  ].join("");
}

export function calca(c = "#3a3a34", l = "#2c2c27", d = "#4a4a42") {
  return [
    path("M32,20 L68,20 L69,44 L66,94 L53,94 L50,52 L47,94 L34,94 L31,44 Z", c),
    path("M32,20 L68,20 L68,32 L32,32 Z", d),
    path("M50,32 L50,52", "none", l, 1.2),
    path("M34,90 L47,90 L46,94 L34,94 Z", l),
    path("M66,90 L53,90 L54,94 L66,94 Z", l),
    path("M32,20 L68,20", "none", d, 1)
  ].join("");
}

export function trico(c = "#c9bfa7", l = "#b3a88e", d = "#9b9077") {
  return [
    path("M34,28 L22,34 L8,62 L20,68 L26,56 L26,88 L74,88 L74,56 L80,68 L92,62 L78,34 L66,28 Z", c),
    path("M34,28 L43,36 L50,38 L57,36 L66,28 L60,25 L50,32 L40,25 Z", l),
    path("M26,80 L74,80", "none", l, 1),
    path("M26,84 L74,84", "none", l, 1, 0.6),
    [0, 1, 2, 3].map((i) => `<path d="M${33 + i * 11},40 L${33 + i * 11},78" stroke="${d}" stroke-width="0.9" opacity="0.5" fill="none"/>`).join("")
  ].join("");
}

export function vestido(c = "#b6603c", l = "#9c4d2c", d = "#7f3c21") {
  return [
    path("M40,26 L46,34 L54,34 L60,26 L66,32 L60,52 L76,92 L24,92 L40,52 L34,32 Z", c),
    path("M40,26 L46,34 L50,34 L50,52 L40,52 Z", l),
    path("M60,26 L54,34 L50,34 L50,52 L60,52 Z", l),
    path("M40,52 L60,52", "none", d, 0.9, 0.6),
    path("M34,32 L24,92", "none", l, 0.7, 0.4)
  ].join("");
}

export function jaqueta(c = "#2f3a34", l = "#26302a", d = "#8e9c8a") {
  return [
    path("M33,26 L20,32 L12,58 L22,62 L27,50 L27,90 L73,90 L73,50 L78,62 L88,58 L80,32 L67,26 Z", c),
    path("M42,26 L50,42 L58,26 L52,23 L50,28 L48,23 Z", l),
    path("M50,42 L50,90", "none", d, 1),
    path("M27,50 L27,90", "none", l, 1.2),
    path("M73,50 L73,90", "none", l, 1.2),
    `<circle cx="50" cy="52" r="2" fill="${d}"/><circle cx="50" cy="64" r="2" fill="${d}"/><circle cx="50" cy="76" r="2" fill="${d}"/>`
  ].join("");
}

/* --------------------------- mobiliário --------------------------- */

export function cadeira(wood = "#6b5a44", seat = "#c8b394", line = "none") {
  return [
    path("M60,18 L88,24 L86,46 L58,40 Z", wood),
    path("M32,52 L74,46 L80,60 L38,68 Z", seat),
    path("M60,24 L34,58", "none", wood, 2.2),
    path("M86,30 L76,60", "none", wood, 2.2),
    path("M38,66 L32,92", "none", wood, 2.6),
    path("M66,58 L60,92", "none", wood, 2.6),
    path("M74,54 L80,90", "none", wood, 2.2),
    path("M46,56 L70,52", "none", seat, 1.4, 0.8)
  ].join("");
}

export function poltrona(c = "#8b7358", l = "#75614a", d = "#5d4c39") {
  return [
    path("M26,44 Q26,30 38,30 L62,30 Q74,30 74,44 L74,72 L26,72 Z", c),
    path("M20,48 Q14,48 14,58 L14,76 L28,76 L28,54", l),
    path("M80,48 Q86,48 86,58 L86,76 L72,76 L72,54", l),
    path("M26,62 L74,62 L74,74 L26,74 Z", d),
    path("M30,74 L28,92", "none", d, 2.4),
    path("M70,74 L72,92", "none", d, 2.4),
    path("M34,50 L66,50", "none", d, 0.8, 0.4)
  ].join("");
}

export function mesa(c = "#8a6f4f", l = "#70583c", d = "#5c482f") {
  return [
    path("M14,38 L86,38 L86,46 L14,46 Z", c),
    path("M20,46 L26,46 L24,94 L18,94 Z", l),
    path("M80,46 L74,46 L76,94 L82,94 Z", l),
    path("M14,38 L86,38", "none", d, 1),
    path("M24,68 L76,68", "none", l, 1.6, 0.8)
  ].join("");
}

export function luminaria(c = "#e3d6bc", l = "#cbb994", d = "#8b7a5c") {
  return [
    path("M38,16 L62,16 L78,52 L22,52 Z", c),
    path("M38,16 L62,16 L70,34 L30,34 Z", l),
    path("M50,52 L50,88", "none", d, 2.2),
    path("M34,90 Q50,86 66,90", "none", d, 2.6),
    path("M22,52 L78,52", "none", d, 1.4)
  ].join("");
}

export function vaso(c = "#a8876a", l = "#8f7055", d = "#6f5641") {
  return [
    path("M38,26 L62,26 L58,40 Q78,56 72,74 Q66,92 50,92 Q34,92 28,74 Q22,56 42,40 Z", c),
    path("M38,26 L62,26 L59,36 L41,36 Z", l),
    path("M34,66 Q50,74 66,66", "none", d, 1.4, 0.7),
    path("M42,40 Q50,48 58,40", "none", l, 1)
  ].join("");
}

/* --------------------------- tecnologia --------------------------- */

export function fone(c = "#2a3242", a = "#7dd6a8", d = "#1a2130") {
  return [
    path("M20,58 L20,46 A30,30 0 0 1 80,46 L80,58", "none", c, 8),
    path("M14,54 L28,54 L28,80 L16,80 Q14,80 14,74 Z", c),
    path("M86,54 L72,54 L72,80 L84,80 Q86,80 86,74 Z", c),
    path("M17,58 L25,58 L25,76 L17,76 Z", d),
    path("M83,58 L75,58 L75,76 L83,76 Z", d),
    `<circle cx="21" cy="67" r="3.4" fill="${a}"/><circle cx="79" cy="67" r="3.4" fill="${a}"/>`,
    path("M28,44 L40,34", "none", a, 1.2, 0.5)
  ].join("");
}

export function notebook(c = "#3b4658", screen = "#101724", a = "#7dd6a8") {
  return [
    path("M22,34 L78,34 L78,70 L22,70 Z", c),
    path("M26,38 L74,38 L74,66 L26,66 Z", screen),
    path("M10,74 L90,74 L84,84 L16,84 Z", c),
    path("M16,74 L84,74 L82,78 L18,78 Z", d_ok(a)),
    path("M32,46 L52,46", "none", a, 2, 0.9),
    path("M32,52 L62,52", "none", a, 2, 0.55),
    path("M32,58 L44,58", "none", a, 2, 0.35)
  ].join("");
}
const d_ok = (a) => a;

export function celular(c = "#1d2432", screen = "#0d131d", a = "#7dd6a8") {
  return [
    path("M36,10 L64,10 Q70,10 70,16 L70,84 Q70,90 64,90 L36,90 Q30,90 30,84 L30,16 Q30,10 36,10 Z", c),
    path("M34,18 L66,18 L66,80 L34,80 Z", screen),
    path("M44,14 L56,14", "none", c, 2),
    path("M38,26 L62,26", "none", a, 2, 0.8),
    path("M38,34 L54,34", "none", a, 2, 0.4),
    path("M38,44 L54,44 L54,60 L38,60 Z", "none", a, 1.4, 0.5)
  ].join("");
}

export function caixaSom(c = "#242b38", a = "#7dd6a8") {
  return [
    path("M28,14 L72,14 L72,88 L28,88 Z", c),
    `<circle cx="50" cy="42" r="17" fill="none" stroke="${a}" stroke-width="1.4" opacity="0.7"/>`,
    `<circle cx="50" cy="42" r="6" fill="${a}" opacity="0.85"/>`,
    `<circle cx="50" cy="74" r="9" fill="none" stroke="${a}" stroke-width="1.2" opacity="0.45"/>`,
    `<circle cx="50" cy="20" r="1.6" fill="${a}"/>`
  ].join("");
}

export function teclado(c = "#2b3443", a = "#7dd6a8") {
  let keys = "";
  for (let r = 0; r < 3; r++) {
    for (let k = 0; k < 8; k++) {
      keys += `<rect x="${17 + k * 8.6}" y="${52 + r * 9}" width="6.4" height="6" rx="1" fill="${a}" opacity="${0.22 + r * 0.06}"/>`;
    }
  }
  return [
    path("M12,40 L88,40 L88,80 L12,80 Z", c),
    keys,
    path("M30,74 L70,74", "none", a, 3, 0.3)
  ].join("");
}

/* ----------------------------- esporte ----------------------------- */

export function tenis(upper = "#d8cfbb", sole = "#f2efe8", accent = "#b8431f") {
  return [
    path("M12,74 Q14,60 26,56 L40,44 Q46,40 52,44 L62,50 L76,54 Q88,58 88,70 L88,78 L12,78 Z", upper),
    path("M12,78 L88,78 L88,86 Q88,88 86,88 L14,88 Q12,88 12,86 Z", sole),
    path("M40,44 L52,44 L58,50 L44,52 Z", accent),
    path("M46,50 L56,56", "none", accent, 1.4),
    path("M52,56 L62,61", "none", accent, 1.4),
    path("M58,62 L68,66", "none", accent, 1.4, 0.6),
    path("M12,78 L88,78", "none", accent, 1, 0.4)
  ].join("");
}

export function shorts(c = "#3a3c30", l = "#2f3127") {
  return [
    path("M30,30 L70,30 L72,58 L60,88 L50,88 L50,58 L50,88 L40,88 L28,58 Z", c),
    path("M30,30 L70,30 L70,40 L30,40 Z", l),
    path("M50,40 L50,56", "none", l, 1)
  ].join("");
}

export function regata(c = "#a8b08e", l = "#949c7c") {
  return [
    path("M38,24 L44,34 L56,34 L62,24 L70,28 L72,90 L28,90 L30,28 Z", c),
    path("M44,34 L56,34 L56,40 L44,40 Z", l),
    path("M50,40 L50,90", "none", l, 0.8, 0.5)
  ].join("");
}

export function bone(c = "#c05a34", l = "#a84a29", d = "#8c3c21") {
  return [
    path("M22,66 Q22,34 50,34 Q78,34 78,66 Z", c),
    path("M22,66 L88,66 Q92,66 92,72 L22,72 Z", d),
    path("M50,34 L50,66", "none", l, 1.2, 0.8),
    path("M24,60 L78,60", "none", l, 0.9, 0.4)
  ].join("");
}

export function garrafa(c = "#4a5d68", a = "#d8cfbb") {
  return [
    path("M42,18 L58,18 L58,34 L64,48 L64,88 L36,88 L36,48 L42,34 Z", c),
    path("M42,18 L58,18 L58,24 L42,24 Z", a),
    path("M38,60 L62,60", "none", a, 1, 0.5),
    path("M40,50 L60,50", "none", a, 1, 0.25)
  ].join("");
}

/* --------------------------- arquitetura --------------------------- */

export function colonata(ink = "#3a4036", paper = "#e6e1d2", n = 5) {
  let out = `<rect x="0" y="0" width="100" height="100" fill="${paper}"/>`;
  const bw = 100 / n;
  for (let i = 0; i < n; i++) {
    const x = i * bw + bw * 0.12;
    const w = bw * 0.76;
    const top = 14 + (i % 2 ? 4 : 0);
    out += `<path d="M${x},80 L${x},${top + w * 0.55} A${w / 2},${w / 2} 0 0 1 ${x + w},${top + w * 0.55} L${x + w},80 Z" fill="none" stroke="${ink}" stroke-width="0.9"/>`;
    out += `<rect x="${x + w * 0.14}" y="${top + w * 0.6}" width="${w * 0.72}" height="${80 - (top + w * 0.6)}" fill="${ink}" opacity="0.07"/>`;
  }
  out += `<line x1="0" y1="84" x2="100" y2="84" stroke="${ink}" stroke-width="0.8" opacity="0.7"/>`;
  out += `<line x1="0" y1="90" x2="100" y2="90" stroke="${ink}" stroke-width="0.5" opacity="0.35"/>`;
  return out;
}

export function planta(ink = "#3a4036", paper = "#e6e1d2") {
  return [
    `<rect x="0" y="0" width="100" height="100" fill="${paper}"/>`,
    `<g stroke="${ink}" fill="none" stroke-width="0.8" opacity="0.9">
      <rect x="14" y="14" width="72" height="60"/>
      <line x1="14" y1="44" x2="50" y2="44"/>
      <line x1="50" y1="14" x2="50" y2="44"/>
      <line x1="72" y1="44" x2="86" y2="44"/>
      <circle cx="66" cy="30" r="6"/>
      <rect x="18" y="50" width="16" height="20"/>
      <rect x="54" y="50" width="14" height="8"/>
    </g>`,
    `<line x1="14" y1="80" x2="86" y2="80" stroke="${ink}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.5"/>`,
    `<text x="50" y="90" font-family="Maru Mono" font-size="5" fill="${ink}" text-anchor="middle" opacity="0.7">planta · 1:200</text>`
  ].join("");
}

export function corte(ink = "#3a4036", paper = "#e6e1d2") {
  return [
    `<rect x="0" y="0" width="100" height="100" fill="${paper}"/>`,
    `<g stroke="${ink}" fill="none" stroke-width="0.8">
      <path d="M12,62 L12,40 L38,40 L38,28 L70,28 L70,62 Z"/>
      <line x1="12" y1="62" x2="70" y2="62"/>
      <path d="M16,54 L30,54 L30,46 L16,46 Z"/>
      <line x1="44" y1="28" x2="44" y2="62"/>
      <path d="M50,62 L50,50 Q60,42 68,50 L68,62" />
      <line x1="8" y1="70" x2="74" y2="70" stroke-dasharray="2 2" opacity="0.6"/>
    </g>`,
    `<line x1="12" y1="74" x2="70" y2="74" stroke="${ink}" stroke-width="0.5" opacity="0.4"/>`,
    `<text x="50" y="88" font-family="Maru Mono" font-size="5" fill="${ink}" text-anchor="middle" opacity="0.7">corte AA</text>`
  ].join("");
}

/* ---------------------------- abstratos ---------------------------- */

export function campos(tones = ["#2c4a43", "#7d9a8a", "#e2dccd"]) {
  return [
    `<rect x="0" y="0" width="100" height="100" fill="${tones[2]}"/>`,
    `<circle cx="36" cy="52" r="30" fill="${tones[0]}" opacity="0.92"/>`,
    `<circle cx="68" cy="40" r="22" fill="${tones[1]}" opacity="0.9"/>`,
    `<rect x="66" y="62" width="22" height="22" fill="${tones[0]}" opacity="0.45"/>`
  ].join("");
}

export function grade(ink = "#5f8a75") {
  let lines = "";
  for (let i = 1; i < 8; i++) lines += `<line x1="0" y1="${i * 12.5}" x2="100" y2="${i * 12.5}" stroke="${ink}" stroke-width="0.3" opacity="0.25"/>`;
  for (let i = 1; i < 10; i++) lines += `<line x1="${i * 10}" y1="0" x2="${i * 10}" y2="100" stroke="${ink}" stroke-width="0.3" opacity="0.25"/>`;
  return `<rect x="0" y="0" width="100" height="100" fill="#101a17"/>${lines}`;
}

export function arcos(tones = ["#b8431f", "#17150f", "#e8e2d4"]) {
  return [
    `<rect x="0" y="0" width="100" height="100" fill="${tones[2]}"/>`,
    `<path d="M8,92 A42,42 0 0 1 92,92" fill="none" stroke="${tones[1]}" stroke-width="7"/>`,
    `<path d="M26,92 A24,24 0 0 1 74,92" fill="none" stroke="${tones[0]}" stroke-width="6"/>`,
    `<circle cx="50" cy="92" r="6" fill="${tones[1]}"/>`
  ].join("");
}
