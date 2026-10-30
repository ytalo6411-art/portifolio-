/* ------------------------------------------------------------------
   tools/mockups.mjs — capas e telas dos projetos demonstrativos.
   Uso: node tools/mockups.mjs [ids...]
------------------------------------------------------------------- */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { box, camisa, camiseta, calca, trico, vestido, jaqueta, cadeira, poltrona, mesa, luminaria, vaso, fone, notebook, celular, caixaSom, teclado, tenis, shorts, regata, bone, garrafa, colonata, planta, corte, campos, grade, arcos } from "./art.mjs";
import { F, T, R, C, L, doc, art, clip, para, wrap, measure, svgToPng } from "./engine.mjs";

const W = 1600;
const H = 1000;
const OUT = "assets/img/shots";

/* ---------------- ajudas de layout ---------------- */

function nav(x, y, items, { size = 15, font = F.sans, fill = "#17150f", gap = 34, opacity = 0.72, active = -1 } = {}) {
  let cx = x;
  let out = "";
  items.forEach((item, i) => {
    out += T(cx, y, item, { size, font, fill, opacity: i === active ? 1 : opacity });
    cx += measure(item, size, font) + gap;
  });
  return { svg: out, end: cx - gap };
}

function chips(x, y, items, { active = 0, ink = "#17150f", paper = "#f2efe8", h = 36, size = 14, gap = 10, font = F.mono } = {}) {
  let cx = x;
  let out = "";
  items.forEach((label, i) => {
    const w = measure(label, size, font) + 34;
    const on = i === active;
    out += R(cx, y - h / 2, w, h, on ? ink : "none", { r: 999, stroke: on ? "none" : ink, sw: 1, opacity: on ? 1 : 0.35 });
    out += T(cx + w / 2, y + size * 0.36, label, { size, font, fill: on ? paper : ink, opacity: on ? 1 : 0.75, anchor: "middle" });
    cx += w + gap;
  });
  return { svg: out, end: cx - gap };
}

function pageHeader(bg, ink, brand, items, right, opts = {}) {
  const { mono = false, size = 15, brandSize = 17, brandLs = mono ? 4 : 0, y = 58 } = opts;
  let s = R(0, 0, W, 88, bg);
  s += T(64, y, brand, { size: brandSize, font: mono ? F.monoMed : F.sansSemi, fill: ink, ls: brandLs });
  const navItems = nav(0, y, items, { size, fill: ink, gap: 32, active: opts.active });
  const startX = opts.navRight
    ? W - 64 - measure(right, 13, F.mono) - 48 - (navItems.end)
    : W - 900;
  s += nav(startX, y, items, { size, fill: ink, gap: 32, active: opts.active }).svg;
  s += T(W - 64, y, right, { size: 13, font: F.mono, fill: ink, anchor: "end", opacity: 0.85 });
  s += L(64, 88, W - 64, 88, ink, 1, 0.14);
  return s;
}

function card({ x, y, w, h, bg, meta, name, price, extra, artSvg, artBg, ink, muted, serif = false, badge }) {
  const a = art(x, y, w, h, artSvg, artBg, `c${Math.round(x)}_${Math.round(y)}`);
  let s = a.svg;
  s += T(x, y + h + 30, name, { size: 18, font: serif ? F.serif : F.sansMed, fill: ink });
  if (meta) s += T(x, y + h + 52, meta, { size: 12, font: F.mono, fill: muted });
  if (price) s += T(x + w, y + h + 30, price, { size: 14, font: F.mono, fill: ink, anchor: "end" });
  if (extra) s += T(x + w, y + h + 52, extra, { size: 11, font: F.mono, fill: muted, anchor: "end" });
  if (badge) {
    s += R(x + 12, y + 12, measure(badge, 11, F.mono) + 20, 24, ink, { r: 2, opacity: 0.92 });
    s += T(x + 22, y + 28, badge, { size: 11, font: F.mono, fill: artBg, opacity: 1 });
  }
  return { svg: s, defs: a.defs };
}

/* ---------------- 01. Rua Sete ---------------- */

const rs = { bg: "#efe9de", ink: "#1c1a17", muted: "#7a7466", accent: "#b8431f", card: "#e4dac8" };

const projects = {};

projects.ruasete = [
  () => {
    let defs = "";
    let s = pageHeader(rs.bg, rs.ink, "RUA SETE", ["Novidades", "Roupas", "Acessórios", "Arquivo"], "Sacola (2)", { mono: true, brandLs: 5, navRight: true, active: 0 });
    /* coluna de texto */
    s += T(64, 168, "COLEÇÃO VERÃO 26", { size: 12, font: F.mono, fill: rs.accent, ls: 3 });
    s += T(64, 262, "Verão de", { size: 104, font: F.serif, fill: rs.ink, ls: -3 });
    s += T(64, 364, "rua, não de", { size: 104, font: F.serifIt, fill: rs.ink, ls: -3 });
    s += T(64, 466, "passarela.", { size: 104, font: F.serif, fill: rs.accent, ls: -3 });
    s += para(66, 522, "Dezesseis peças em linho lavado, algodão cru e alfaiataria leve. Costuradas em lotes pequenos, aqui em Campinas.", { size: 18, fill: "#4a453b", maxWidth: 540, lh: 1.5 });
    s += R(64, 604, 226, 54, rs.ink, { r: 999 });
    s += T(177, 637, "Ver a coleção", { size: 16, fill: rs.bg, anchor: "middle" });
    s += T(316, 637, "Tabela de medidas", { size: 15, fill: rs.ink, opacity: 0.8 });
    /* imagem principal */
    const a = art(700, 140, 620, 470, box(700, 140, 620, 470, camisa("#e3d8c2", "#cdbfa2", "#b3a184")), "#ddd2bd", "rsHero");
    defs += a.defs;
    s += a.svg;
    s += T(700, 646, "Look 04 — camisa de linho cru", { size: 13, font: F.mono, fill: rs.muted });
    s += T(1320, 646, "01 / 06", { size: 13, font: F.mono, fill: rs.muted, anchor: "end" });
    /* faixa de imagens */
    const strip = [
      [700, 700, 190, 210, camiseta("#f0ece1", "#d9d2c2", "#bdb4a1"), "#e6dcc9"],
      [908, 700, 190, 210, calca("#4a463c", "#3a372f", "#5b564a"), "#e6dcc9"],
      [1116, 700, 204, 210, trico("#c9bfa7", "#b3a88e", "#9b9077"), "#e6dcc9"]
    ];
    strip.forEach(([x, y, w, h, draw, bgc], i) => {
      const im = art(x, y, w, h, box(x, y, w, h, draw), bgc, `rsStrip${i}`);
      defs += im.defs;
      s += im.svg;
    });
    s += T(64, 726, "A coleção", { size: 28, font: F.serif, fill: rs.ink });
    s += L(64, 748, 620, 748, rs.ink, 1, 0.15);
    const rows = [["Camisaria", "05 peças"], ["Alfaiataria", "04 peças"], ["Malharia", "04 peças"], ["Acessórios", "03 peças"]];
    rows.forEach((r, i) => {
      s += T(64, 790 + i * 44, r[0], { size: 17, fill: rs.ink });
      s += T(620, 790 + i * 44, r[1], { size: 13, font: F.mono, fill: rs.muted, anchor: "end" });
      s += L(64, 802 + i * 44, 620, 802 + i * 44, rs.ink, 1, 0.1);
    });
    s += T(64, 962, "ENVIO EM ATÉ 3 DIAS · TROCA EM 30 · ATENDIMENTO POR WHATSAPP", { size: 11, font: F.mono, fill: rs.muted, ls: 1.5 });
    return doc(W, H, rs.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = pageHeader(rs.bg, rs.ink, "RUA SETE", ["Novidades", "Roupas", "Acessórios", "Arquivo"], "Sacola (2)", { mono: true, brandLs: 5, navRight: true, active: 1 });
    s += T(64, 176, "Roupas", { size: 62, font: F.serif, fill: rs.ink, ls: -1.5 });
    s += T(1536, 172, "24 peças", { size: 13, font: F.mono, fill: rs.muted, anchor: "end" });
    const c = chips(64, 236, ["Tudo", "Camisaria", "Alfaiataria", "Malharia", "Acessórios"], { ink: rs.ink, paper: rs.bg, active: 1 });
    s += c.svg;
    s += T(1536, 242, "TAMANHOS   P   M   G   GG", { size: 12, font: F.mono, fill: rs.muted, anchor: "end" });
    s += L(64, 276, 1536, 276, rs.ink, 1, 0.12);
    const items = [
      ["Camisa Linho Cru", "R$ 249", "P · M · G", camisa("#e3d8c2", "#cdbfa2", "#b3a184"), "linho"],
      ["Calça Ampla Preta", "R$ 319", "P · M · G", calca("#44413a", "#37352f", "#514d44"), "alfaiataria"],
      ["Tricô de Algodão", "R$ 289", "M · G", trico("#c9bfa7", "#b3a88e", "#9b9077"), "malharia"],
      ["Vestido Forro", "R$ 379", "P · M", vestido("#b6603c", "#9c4d2c", "#7f3c21"), "linho"]
    ];
    items.forEach((it, i) => {
      const x = 64 + i * 378;
      const cd = card({ x, y: 316, w: 340, h: 300, bg: rs.card, name: it[0], price: it[1], meta: it[4], extra: it[2], artSvg: box(x, 316, 340, 300, it[3]), artBg: rs.card, ink: rs.ink, muted: rs.muted, serif: true });
      defs += cd.defs;
      s += cd.svg;
    });
    const items2 = [
      ["Jaqueta Sem Forro", "R$ 429", "P · M · G", jaqueta("#3a443d", "#2f3831", "#93a08c")],
      ["Camiseta Pesada", "R$ 159", "P · M · G · GG", camiseta("#e9e2d3", "#d3c9b6", "#b8ad98")],
      ["Camisa de Seda", "R$ 389", "P · M", camisa("#d8cbb6", "#c3b39a", "#a89a82")],
      ["Calça Wide Off", "R$ 299", "M · G", calca("#ded3bf", "#c9bca6", "#b0a28a")]
    ];
    items2.forEach((it, i) => {
      const x = 64 + i * 378;
      const cd = card({ x, y: 700, w: 340, h: 300, bg: rs.card, name: it[0], price: it[1], meta: "linho", extra: it[2], artSvg: box(x, 700, 340, 300, it[3]), artBg: rs.card, ink: rs.ink, muted: rs.muted, serif: true });
      defs += cd.defs;
      s += cd.svg;
    });
    return doc(W, H, rs.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = R(0, 0, W, 72, rs.bg);
    s += T(64, 44, "Início / Roupas / Camisaria / Camisa de linho", { size: 12, font: F.mono, fill: rs.muted });
    s += T(1536, 44, "Sacola (2)", { size: 12, font: F.mono, fill: rs.ink, anchor: "end" });
    s += L(0, 72, W, 72, rs.ink, 1, 0.14);
    const a = art(64, 108, 720, 600, box(64, 108, 720, 600, camisa("#e3d8c2", "#cdbfa2", "#b3a184")), "#ded3bf", "rsPdp");
    defs += a.defs;
    s += a.svg;
    ["#ded3bf", "#d6c9b2", "#3d3a33", "#e9e2d3"].forEach((col, i) => {
      s += R(64 + i * 92, 726, 80, 80, col);
      if (i === 0) s += R(64, 726, 80, 80, "none", { stroke: rs.ink, sw: 1 });
    });
    s += T(64, 838, "Vista 1 de 4 · giro de 360° disponível", { size: 12, font: F.mono, fill: rs.muted });
    s += T(880, 140, "CAMISARIA", { size: 11, font: F.mono, fill: rs.accent, ls: 3 });
    s += T(880, 208, "Camisa de linho", { size: 54, font: F.serif, fill: rs.ink, ls: -1.4 });
    s += T(880, 256, "cru lavado", { size: 54, font: F.serifIt, fill: rs.muted, ls: -1.4 });
    s += T(880, 312, "R$ 249,00", { size: 22, font: F.mono, fill: rs.ink });
    s += T(880, 340, "ou 3× de R$ 83 sem juros", { size: 13, font: F.mono, fill: rs.muted });
    s += L(880, 372, 1536, 372, rs.ink, 1, 0.14);
    s += T(880, 408, "Tamanho", { size: 12, font: F.mono, fill: rs.muted });
    s += T(1536, 408, "guia de medidas", { size: 12, font: F.mono, fill: rs.ink, anchor: "end", opacity: 0.7 });
    ["P", "M", "G", "GG"].forEach((t, i) => {
      const x = 880 + i * 62;
      s += R(x, 426, 52, 46, i === 1 ? rs.ink : "none", { stroke: i === 1 ? "none" : rs.ink, sw: 1 });
      s += T(x + 26, 455, t, { size: 15, fill: i === 1 ? rs.bg : rs.ink, anchor: "middle" });
    });
    s += T(880, 516, "Cor", { size: 12, font: F.mono, fill: rs.muted });
    ["#ded3bf", "#c9bda6", "#3d3a33"].forEach((col, i) => {
      s += C(892 + i * 38, 542, 12, col);
      s += C(892 + i * 38, 542, 12, "none");
    });
    s += `<circle cx="892" cy="542" r="16" fill="none" stroke="${rs.ink}" stroke-width="1"/>`;
    s += R(880, 586, 400, 56, rs.ink, { r: 999 });
    s += T(1080, 620, "Adicionar à sacola", { size: 16, fill: rs.bg, anchor: "middle" });
    s += R(1296, 586, 240, 56, "none", { r: 999, stroke: rs.ink, sw: 1 });
    s += T(1416, 620, "Salvar para depois", { size: 14, fill: rs.ink, anchor: "middle", opacity: 0.8 });
    s += L(880, 682, 1536, 682, rs.ink, 1, 0.14);
    s += T(880, 718, "COMPOSIÇÃO", { size: 11, font: F.mono, fill: rs.muted, ls: 2 });
    s += para(880, 744, "100% linho europeu, 190 g/m². Lavar a frio, secar à sombra. A peça amacia a cada lavagem.", { size: 15, fill: "#4a453b", maxWidth: 620, lh: 1.55 });
    s += T(880, 826, "FRETE", { size: 11, font: F.mono, fill: rs.muted, ls: 2 });
    s += T(880, 850, "Grátis acima de R$ 400 · envio em até 3 dias úteis", { size: 15, fill: "#4a453b" });
    s += T(880, 902, "Produzido em Campinas · 14 pessoas · lote de 60 peças", { size: 12, font: F.mono, fill: rs.muted });
    return doc(W, H, rs.bg, s, defs);
  }
];

/* ---------------- 02. Frequência ---------------- */

const fq = { bg: "#0c1015", ink: "#e9ecf2", muted: "#7e8ba3", accent: "#7dd6a8", card: "#12171f", line: "#242c3a" };

function fqHeader(active) {
  let s = R(0, 0, W, 84, fq.bg);
  s += T(64, 54, "FREQUÊNCIA", { size: 17, font: F.monoMed, fill: fq.ink, ls: 4 });
  const n = nav(620, 52, ["Áudio", "Imagem", "Computadores", "Smartphones", "Ofertas"], { size: 14, fill: fq.ink, opacity: 0.6, gap: 30, active });
  s += n.svg;
  s += T(1536, 52, "Buscar      Carrinho 3", { size: 13, font: F.mono, fill: fq.ink, anchor: "end", opacity: 0.85 });
  s += L(64, 84, 1536, 84, fq.ink, 1, 0.12);
  return s;
}

projects.frequencia = [
  () => {
    let defs = "";
    let s = fqHeader(0);
    s += T(64, 174, "NOVIDADES / ÁUDIO", { size: 11, font: F.mono, fill: fq.accent, ls: 3 });
    s += T(64, 272, "Fone que não", { size: 92, font: F.sansSemi, fill: fq.ink, ls: -3.5 });
    s += T(64, 362, "mente no grave.", { size: 92, font: F.sansSemi, fill: fq.accent, ls: -3.5 });
    s += para(66, 416, "Monitoração fechada com 42 dB de isolamento e 38 h de bateria. Testado em bancada, não em folheto.", { size: 18, fill: "#a3adc0", maxWidth: 560, lh: 1.5 });
    s += R(64, 500, 196, 54, fq.accent, { r: 3 });
    s += T(162, 534, "COMPRAR", { size: 14, font: F.monoMed, fill: "#0c1015", anchor: "middle", ls: 1 });
    s += T(288, 534, "Ficha técnica", { size: 14, font: F.mono, fill: fq.ink, opacity: 0.75 });
    /* card de preço */
    s += R(64, 604, 560, 150, fq.card, { r: 4, stroke: fq.line, sw: 1 });
    s += T(92, 650, "Kobayashi K7", { size: 20, font: F.sansMed, fill: fq.ink });
    s += T(92, 678, "R$ 1.299 · 12× sem juros", { size: 14, font: F.mono, fill: fq.muted });
    s += T(92, 716, "Em estoque · envio em 24 h", { size: 12, font: F.mono, fill: fq.accent });
    s += R(596, 628, 1, 100, fq.line);
    s += T(552, 650, "4.8", { size: 22, font: F.monoMed, fill: fq.ink, anchor: "end" });
    s += T(552, 672, "312 avaliações", { size: 11, font: F.mono, fill: fq.muted, anchor: "end" });
    /* imagem direita */
    const a = art(700, 140, 836, 614, box(700, 140, 836, 614, fone("#2a3242", fq.accent, "#161d2a")), "#111821", "fqHero");
    defs += a.defs;
    s += a.svg;
    s += T(1536, 786, "capa em couro vegano · 3 cores", { size: 12, font: F.mono, fill: fq.muted, anchor: "end" });
    /* faixa de três produtos */
    const strip = [
      ["Notebook V2", "R$ 6.120", notebook("#3b4658", "#0f1620", fq.accent)],
      ["Caixa de som", "R$ 890", caixaSom("#242b38", fq.accent)],
      ["Teclado mecânico", "R$ 640", teclado("#2b3443", fq.accent)]
    ];
    strip.forEach((it, i) => {
      const x = 64 + i * 190;
      const im = art(x, 806, 170, 130, box(x, 806, 170, 130, it[2]), "#12171f", `fqS${i}`);
      defs += im.defs;
      s += im.svg;
      s += T(x + 184, 832, it[0], { size: 13, fill: fq.ink });
      s += T(x + 184, 852, it[1], { size: 11, font: F.mono, fill: fq.muted });
    });
    return doc(W, H, fq.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = fqHeader(2);
    s += T(64, 158, "COMPUTADORES", { size: 11, font: F.mono, fill: fq.accent, ls: 3 });
    s += T(64, 208, "48 itens · filtros salvos", { size: 34, font: F.sansMed, fill: fq.ink, ls: -1 });
    /* barra lateral */
    s += R(64, 244, 300, 700, fq.card, { r: 3, stroke: fq.line, sw: 1 });
    s += T(88, 288, "FILTRAR", { size: 11, font: F.mono, fill: fq.muted, ls: 3 });
    s += T(88, 332, "Marca", { size: 14, fill: fq.ink });
    ["Todas", "Northline", "Kobayashi", "Vértice"].forEach((m, i) => {
      s += R(88, 350 + i * 32, 14, 14, i === 0 ? fq.accent : "none", { stroke: i === 0 ? "none" : "#465268", sw: 1, r: 2 });
      s += T(112, 362 + i * 32, m, { size: 13, fill: i === 0 ? fq.ink : "#a3adc0" });
    });
    s += L(88, 512, 340, 512, fq.line);
    s += T(88, 546, "Faixa de preço", { size: 14, fill: fq.ink });
    s += L(88, 574, 340, 574, "#2b3444", 3);
    s += L(88, 574, 246, 574, fq.accent, 3);
    s += C(246, 574, 6, fq.accent);
    s += T(88, 602, "R$ 1.200 — R$ 9.400", { size: 12, font: F.mono, fill: fq.muted });
    s += L(88, 632, 340, 632, fq.line);
    s += T(88, 666, "Memória", { size: 14, fill: fq.ink });
    ["16 GB", "32 GB", "64 GB"].forEach((m, i) => {
      const x = 88 + i * 84;
      const w = measure(m, 12, F.mono) + 20;
      s += R(x, 682, w, 28, i === 0 ? fq.accent : "none", { stroke: i === 0 ? "none" : "#2b3444", sw: 1, r: 2 });
      s += T(x + w / 2, 701, m, { size: 12, font: F.mono, fill: i === 0 ? "#0c1015" : "#a3adc0", anchor: "middle" });
    });
    s += T(88, 760, "Disponibilidade", { size: 14, fill: fq.ink });
    s += R(88, 776, 40, 22, fq.accent, { r: 11 });
    s += C(118, 787, 8, "#0c1015");
    s += T(140, 792, "só em estoque", { size: 12, fill: "#a3adc0" });
    s += T(88, 900, "LIMPAR FILTROS", { size: 11, font: F.mono, fill: fq.accent, ls: 2 });
    /* grade */
    const items = [
      ["Kobayashi K7", "R$ 7.890", "14\" · 32 GB", notebook("#3b4658", "#0f1620", fq.accent)],
      ["Northline Air", "R$ 5.240", "13\" · 16 GB", notebook("#46536a", "#0f1620", fq.accent)],
      ["Vértice V2", "R$ 3.980", "15\" · 16 GB", notebook("#323b4c", "#0f1620", fq.accent)],
      ["Kobayashi M1", "R$ 9.400", "16\" · 64 GB", notebook("#3f4a5e", "#0f1620", fq.accent)],
      ["Northline Studio", "R$ 6.120", "14\" · 32 GB", notebook("#39445a", "#0f1620", fq.accent)],
      ["Vértice Mini", "R$ 2.760", "12\" · 8 GB", notebook("#2e3747", "#0f1620", fq.accent)]
    ];
    items.forEach((it, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 396 + col * 384;
      const y = 244 + row * 372;
      const cd = card({ x, y, w: 356, h: 220, name: it[0], price: it[1], meta: it[2], artSvg: box(x, y, 356, 220, it[3]), artBg: fq.card, ink: fq.ink, muted: fq.muted, badge: i === 3 ? "NOVO" : "" });
      defs += cd.defs;
      s += cd.svg;
      s += R(x + 356 - 132, y + 220 + 40, 132, 30, "none", { stroke: fq.line, sw: 1, r: 2 });
      s += T(x + 356 - 66, y + 220 + 60, "comparar", { size: 11, font: F.mono, fill: fq.muted, anchor: "middle" });
    });
    return doc(W, H, fq.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = R(0, 0, W, 76, fq.bg);
    s += T(64, 46, "Áudio / Headphones / Kobayashi K7", { size: 12, font: F.mono, fill: fq.muted });
    s += T(1536, 46, "COMPARAR 2 ITENS", { size: 11, font: F.mono, fill: fq.accent, anchor: "end", ls: 1 });
    s += L(0, 76, W, 76, fq.ink, 1, 0.1);
    const a = art(64, 112, 640, 560, box(64, 112, 640, 560, fone("#2a3242", fq.accent, "#161d2a")), "#111821", "fqPdp");
    defs += a.defs;
    s += a.svg;
    ["#111821", "#1a2230", "#222a38"].forEach((col, i) => {
      s += R(64 + i * 100, 690, 88, 88, col);
      if (i === 0) s += R(64, 690, 88, 88, "none", { stroke: fq.accent, sw: 1 });
      const im = art(64 + i * 100, 690, 88, 88, box(64 + i * 100, 690, 88, 88, fone("#2a3242", fq.accent, "#161d2a")), col, `fqTh${i}`);
      defs += im.defs;
      s += im.svg;
    });
    s += T(64, 816, "R$ 1.299 no PIX · 12× de R$ 108", { size: 13, font: F.mono, fill: fq.muted });
    /* direita */
    s += T(760, 140, "KOBAYASHI", { size: 11, font: F.mono, fill: fq.accent, ls: 3 });
    s += T(760, 206, "Headphone fechado", { size: 40, font: F.sansMed, fill: fq.ink, ls: -1.2 });
    s += T(760, 248, "de monitoração", { size: 40, font: F.sansMed, fill: fq.ink, ls: -1.2 });
    s += T(760, 296, "4.8 · 312 avaliações · 2 anos de garantia", { size: 12, font: F.mono, fill: fq.muted });
    s += L(760, 322, 1536, 322, fq.line);
    const specs = [
      ["Resposta de frequência", "5 Hz — 40 kHz"],
      ["Impedância", "38 Ω"],
      ["Sensibilidade", "104 dB / mW"],
      ["Peso", "268 g"],
      ["Cabo", "2,4 m destacável"]
    ];
    specs.forEach((sp, i) => {
      s += T(760, 360 + i * 40, sp[0], { size: 12, font: F.mono, fill: fq.muted });
      s += T(1536, 360 + i * 40, sp[1], { size: 13, font: F.mono, fill: fq.ink, anchor: "end" });
      s += L(760, 376 + i * 40, 1536, 376 + i * 40, fq.line);
    });
    s += T(760, 592, "Em estoque · envio em 24 h", { size: 12, font: F.mono, fill: fq.accent });
    s += R(760, 612, 320, 54, fq.accent, { r: 3 });
    s += T(920, 646, "ADICIONAR AO CARRINHO", { size: 12, font: F.monoMed, fill: "#0c1015", anchor: "middle" });
    s += T(760, 706, "COMPARAR COM", { size: 11, font: F.mono, fill: fq.muted, ls: 2 });
    ["Northline H2 — R$ 1.120", "Kobayashi K5 — R$ 980"].forEach((p, i) => {
      s += R(760, 720 + i * 56, 776, 46, "none", { stroke: fq.line, sw: 1, r: 2 });
      s += T(784, 749 + i * 56, p, { size: 13, fill: "#c3cddd" });
      s += T(1512, 749 + i * 56, "→", { size: 14, font: F.mono, fill: fq.muted, anchor: "end" });
    });
    s += T(760, 880, "Ficha técnica completa em PDF · 340 KB", { size: 11, font: F.mono, fill: fq.muted });
    return doc(W, H, fq.bg, s, defs);
  }
];

export { projects };
