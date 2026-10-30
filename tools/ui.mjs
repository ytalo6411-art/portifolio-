/* Helpers de desenho de interface reaproveitados por todos os mockups. */
import { F, T, R, C, L, art, measure, wrap, para } from "./engine.mjs";

export const W = 1600;
export const H = 1000;

export function nav(x, y, items, { size = 15, font = F.sans, fill = "#17150f", gap = 32, opacity = 0.7, active = -1 } = {}) {
  let cx = x;
  let out = "";
  items.forEach((item, i) => {
    out += T(cx, y, item, { size, font, fill, opacity: i === active ? 1 : opacity });
    cx += measure(item, size, font) + gap;
  });
  return { svg: out, end: cx - gap, width: cx - gap - x };
}

export function header({ bg, ink, brand, items = [], right = "", brandFont = F.sansSemi, brandSize = 17, brandLs = 0, navSize = 15, active = -1, h = 88, x = 64, opacity = 0.7 }) {
  let s = R(0, 0, W, h, bg);
  s += T(x, h / 2 + 8, brand, { size: brandSize, font: brandFont, fill: ink, ls: brandLs });
  if (right) s += T(W - x, h / 2 + 6, right, { size: 12, font: F.mono, fill: ink, anchor: "end", opacity: 0.85 });
  if (items.length) {
    const rightW = right ? measure(right, 12, F.mono) + 56 : 0;
    const navW = items.reduce((acc, it, i) => acc + measure(it, navSize, F.sans) + (i ? 32 : 0), 0);
    const startX = W - x - rightW - navW;
    s += nav(startX, h / 2 + 6, items, { size: navSize, fill: ink, opacity, active }).svg;
  }
  s += L(x, h, W - x, h, ink, 1, 0.14);
  return s;
}

export function chips(x, y, items, { active = 0, ink = "#17150f", paper = "#f2efe8", h = 36, size = 13, gap = 9, font = F.mono } = {}) {
  let cx = x;
  let out = "";
  items.forEach((label, i) => {
    const w = measure(label, size, font) + 32;
    const on = i === active;
    out += R(cx, y - h / 2, w, h, on ? ink : "none", { r: 999, stroke: on ? "none" : ink, sw: 1, opacity: on ? 1 : 0.32 });
    out += T(cx + w / 2, y + size * 0.36, label, { size, font, fill: on ? paper : ink, opacity: on ? 1 : 0.78, anchor: "middle" });
    cx += w + gap;
  });
  return { svg: out, end: cx - gap };
}

export function productCard({ x, y, w, h, draw, artBg, name, price, meta, extra, ink, muted, serif = false, badge, badgeInk, badgePaper, id }) {
  const a = art(x, y, w, h, draw, artBg, id || `pc${Math.round(x)}_${Math.round(y)}`);
  let s = a.svg;
  s += T(x, y + h + 30, name, { size: 17, font: serif ? F.serif : F.sansMed, fill: ink });
  if (price) s += T(x + w, y + h + 30, price, { size: 13, font: F.mono, fill: ink, anchor: "end" });
  if (meta) s += T(x, y + h + 52, meta, { size: 11, font: F.mono, fill: muted });
  if (extra) s += T(x + w, y + h + 52, extra, { size: 11, font: F.mono, fill: muted, anchor: "end" });
  if (badge) {
    const bw = measure(badge, 10, F.mono) + 18;
    s += R(x + 12, y + 12, bw, 22, badgeInk || ink, { r: 2, opacity: 0.94 });
    s += T(x + 21, y + 27, badge, { size: 10, font: F.mono, fill: badgePaper || artBg });
  }
  return { svg: s, defs: a.defs };
}

export function footerStrip(bg, ink, text, y = 962) {
  return R(0, y - 26, W, H - y + 26, bg) + T(64, y, text, { size: 10.5, font: F.mono, fill: ink, ls: 1.4 });
}

export { T, R, C, L, art, measure, wrap, para, F };
