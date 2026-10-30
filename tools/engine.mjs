/* ------------------------------------------------------------------
   tools/engine.mjs
   Mini-motor de layout em SVG: mede texto com as métricas reais das
   fontes antes de posicionar, para nenhuma linha invadir outra coluna.
------------------------------------------------------------------- */

import { readFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import path from "node:path";

const metrics = JSON.parse(readFileSync("tools/fonts/metrics.json", "utf8"));

export const F = {
  serif: "Maru Serif",
  serifMed: "Maru Serif Medium",
  serifIt: "Maru Serif Italic",
  sans: "Maru Sans",
  sansMed: "Maru Sans Medium",
  sansSemi: "Maru Sans Semi",
  sansBold: "Maru Sans Bold",
  mono: "Maru Mono",
  monoMed: "Maru Mono Medium"
};

const metricKey = {
  [F.serif]: "fraunces-normal-400",
  [F.serifMed]: "fraunces-normal-500",
  [F.serifIt]: "fraunces-italic-400",
  [F.sans]: "instrument-sans-400",
  [F.sansMed]: "instrument-sans-500",
  [F.sansSemi]: "instrument-sans-600",
  [F.sansBold]: "instrument-sans-700",
  [F.mono]: "plex-mono-400",
  [F.monoMed]: "plex-mono-500"
};

export function measure(str, size, font = F.sans, ls = 0) {
  const m = metrics[metricKey[font] || "instrument-sans-400"];
  let total = 0;
  for (const ch of String(str)) {
    const w = m.w[ch];
    total += w === undefined ? m.w[" "] || 0.28 : w;
  }
  return total * size + Math.max(0, String(str).length - 1) * ls;
}

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function T(x, y, str, o = {}) {
  const {
    size = 20,
    font = F.sans,
    fill = "#17150f",
    anchor = "start",
    ls = 0,
    opacity = 1,
    style = ""
  } = o;
  let dx = x;
  if (anchor === "end") dx = x - measure(str, size, font, ls);
  else if (anchor === "middle") dx = x - measure(str, size, font, ls) / 2;
  return `<text x="${dx.toFixed(2)}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" letter-spacing="${ls}" opacity="${opacity}" style="${style}">${esc(str)}</text>`;
}

export function wrap(str, size, font, maxWidth, maxLines = 4) {
  const words = String(str).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (measure(test, size, font) > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

export function para(x, y, str, o = {}) {
  const { size = 17, font = F.sans, fill = "#4c5148", maxWidth = 400, lh = 1.5, opacity = 1 } = o;
  return wrap(str, size, font, maxWidth)
    .map((line, i) => T(x, y + i * size * lh, line, { size, font, fill, opacity }))
    .join("");
}

export const R = (x, y, w, h, fill, o = {}) => {
  const { r = 0, opacity = 1, stroke = "none", sw = 1 } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${opacity}" stroke="${stroke}" stroke-width="${sw}"/>`;
};

export const C = (cx, cy, r, fill, opacity = 1) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;

export const L = (x1, y1, x2, y2, stroke, sw = 1, opacity = 1, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;

export const clip = (id, x, y, w, h, r = 0) =>
  `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>`;

export function doc(w, h, bg, body, defs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>${defs}</defs>
  ${R(0, 0, w, h, bg)}
  ${body}
</svg>`;
}

/* área de imagem com ilustração centralizada */
export function art(x, y, w, h, inner, bg, id) {
  const defs = clip(id, x, y, w, h);
  return {
    defs,
    svg: `<g clip-path="url(#${id})">${R(x, y, w, h, bg)}${inner}</g>`
  };
}

const fontFiles = [
  "fraunces-normal-400.ttf",
  "fraunces-normal-500.ttf",
  "fraunces-italic-400.ttf",
  "instrument-sans-400.ttf",
  "instrument-sans-500.ttf",
  "instrument-sans-600.ttf",
  "instrument-sans-700.ttf",
  "plex-mono-400.ttf",
  "plex-mono-500.ttf"
].map((f) => path.join("tools/fonts", f));

export function svgToPng(svg, width) {
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: F.sans
    }
  });
  return r.render().asPng();
}
