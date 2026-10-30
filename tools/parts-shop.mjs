/* Mockups — Casa Lenta e Volta */
import { box, cadeira, poltrona, mesa, luminaria, vaso, tenis, shorts, regata, bone, garrafa } from "./art.mjs";
import { doc } from "./engine.mjs";
import { W, H, T, R, C, L, art, header, chips, productCard, footerStrip, F, measure, para } from "./ui.mjs";

const cl = { bg: "#f4efe6", card: "#e7dfce", ink: "#2c2a24", muted: "#8b8472", accent: "#9a6b43" };

export const casalenta = [
  () => {
    let defs = "";
    let s = header({ bg: cl.bg, ink: cl.ink, brand: "CASA LENTA", brandFont: F.mono, brandLs: 5, brandSize: 14, items: ["Ambientes", "Móveis", "Projetos", "Diário"], right: "loja · Campinas", active: 0 });
    s += T(64, 186, "Móveis", { size: 92, font: F.serif, fill: cl.ink, ls: -2.5 });
    s += T(64, 280, "para morar", { size: 92, font: F.serifIt, fill: cl.ink, ls: -2.5 });
    s += T(64, 374, "com calma", { size: 92, font: F.serif, fill: cl.accent, ls: -2.5 });
    s += para(66, 430, "Peças em madeira maciça feitas sob encomenda no interior de São Paulo. Nada sai em 24 horas — e é isso.", { size: 17, fill: "#5b5546", maxWidth: 560, lh: 1.55 });
    s += R(64, 512, 196, 50, cl.ink, { r: 999 });
    s += T(162, 543, "Ver ambientes", { size: 15, fill: cl.bg, anchor: "middle" });
    s += T(280, 543, "Como funciona", { size: 14, fill: cl.ink, opacity: 0.75 });
    /* imagem principal */
    const a = art(700, 132, 836, 520, box(700, 132, 836, 520, poltrona("#8b7358", "#75614a", "#5d4c39")), "#e6dfd0", "clHero");
    defs += a.defs;
    s += a.svg;
    s += T(700, 682, "Poltrona Argila — linho cru e freijó", { size: 12, font: F.mono, fill: cl.muted });
    s += T(1536, 682, "a partir de R$ 3.460", { size: 12, font: F.mono, fill: cl.muted, anchor: "end" });
    /* linha inferior de peças */
    const strip = [
      ["Cadeira Serra", "R$ 1.240", cadeira("#7a6549", "#c8b394")],
      ["Mesa Baixa Oca", "R$ 2.980", mesa("#8a6f4f", "#70583c", "#5c482f")],
      ["Luminária Talo", "R$ 780", luminaria("#e3d6bc", "#cbb994", "#8b7a5c")]
    ];
    strip.forEach((it, i) => {
      const x = 700 + i * 280;
      const im = art(x, 716, 240, 200, box(x, 716, 240, 200, it[2]), "#eee7d9", `clS${i}`);
      defs += im.defs;
      s += im.svg;
      s += T(x, 946, it[0], { size: 13, fill: cl.ink });
      s += T(x + 240, 946, it[1], { size: 12, font: F.mono, fill: cl.muted, anchor: "end" });
    });
    s += T(64, 726, "Três coisas que", { size: 26, font: F.serif, fill: cl.ink });
    s += T(64, 758, "não abrimos mão", { size: 26, font: F.serifIt, fill: cl.accent });
    s += L(64, 782, 620, 782, cl.ink, 1, 0.14);
    const notes = [
      ["Madeira maciça", "Cumaru, freijó e peroba de manejo."],
      ["Feito à mão", "Marcenaria em Atibaia, 6 pessoas."],
      ["Prazo honesto", "35 dias. Não prometemos milagre."]
    ];
    notes.forEach((n, i) => {
      s += T(64, 818 + i * 44, n[0], { size: 16, fill: cl.ink });
      s += T(268, 818 + i * 44, n[1], { size: 13, fill: "#6f6857" });
    });
    return doc(W, H, cl.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: cl.bg, ink: cl.ink, brand: "CASA LENTA", brandFont: F.mono, brandLs: 5, brandSize: 14, items: ["Ambientes", "Móveis", "Projetos", "Diário"], right: "38 peças", active: 1 });
    s += T(64, 174, "Móveis", { size: 56, font: F.serif, fill: cl.ink, ls: -1.5 });
    s += T(1536, 168, "feitos sob encomenda · 35 dias", { size: 12, font: F.mono, fill: cl.muted, anchor: "end" });
    /* filtros laterais */
    s += T(64, 232, "AMBIENTE", { size: 10.5, font: F.mono, fill: cl.muted, ls: 2 });
    ["Sala", "Quarto", "Cozinha", "Externo"].forEach((t, i) => {
      s += T(64, 262 + i * 30, t, { size: 14, fill: i === 0 ? cl.ink : "#8b8472" });
      if (i === 0) s += L(64, 268, 128, 268, cl.accent, 1.5);
    });
    s += L(64, 392, 268, 392, cl.ink, 1, 0.12);
    s += T(64, 424, "MATERIAL", { size: 10.5, font: F.mono, fill: cl.muted, ls: 2 });
    ["Madeira maciça", "Palha natural", "Linho", "Pedra"].forEach((t, i) => {
      s += T(64, 454 + i * 30, t, { size: 14, fill: "#8b8472" });
    });
    s += L(64, 586, 268, 586, cl.ink, 1, 0.12);
    s += T(64, 618, "A PARTIR DE", { size: 10.5, font: F.mono, fill: cl.muted, ls: 2 });
    s += T(64, 646, "R$ 480 — R$ 6.200", { size: 13, font: F.mono, fill: cl.ink });
    s += R(64, 672, 204, 110, "#ece4d4", { r: 2 });
    s += T(88, 712, "Peça sem pressa:", { size: 14, font: F.serif, fill: cl.ink });
    s += T(88, 734, "mostruário em Campinas", { size: 12, fill: "#6f6857" });
    s += T(88, 754, "agende uma visita", { size: 12, fill: "#6f6857" });
    /* produtos */
    const items = [
      ["Cadeira Serra", "R$ 1.240", "madeira + palha", cadeira("#7a6549", "#c8b394")],
      ["Mesa Baixa Oca", "R$ 2.980", "freijó maciço", mesa("#8a6f4f", "#70583c", "#5c482f")],
      ["Poltrona Argila", "R$ 3.460", "linho cru", poltrona("#8b7358", "#75614a", "#5d4c39")],
      ["Aparador Rio", "R$ 2.150", "cumaru", mesa("#6f5740", "#5d4832", "#4a3928")],
      ["Banco Curto", "R$ 640", "peroba", cadeira("#8a7052", "#b3a184")],
      ["Luminária Talo", "R$ 780", "papel + latão", luminaria("#e3d6bc", "#cbb994", "#8b7a5c")]
    ];
    items.forEach((it, i) => {
      const x = 320 + (i % 3) * 404;
      const y = 200 + Math.floor(i / 3) * 372;
      const cd = productCard({ x, y, w: 372, h: 268, draw: box(x, y, 372, 268, it[3]), artBg: "#e9e1d1", name: it[0], price: it[1], meta: it[2], ink: cl.ink, muted: cl.muted, serif: true, id: `clq${i}` });
      defs += cd.defs;
      s += cd.svg;
    });
    return doc(W, H, cl.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = R(0, 0, W, 74, cl.bg);
    s += T(64, 44, "Sala / Cadeiras / Cadeira Serra", { size: 12, fill: cl.muted });
    s += T(1536, 44, "Sacola (0)", { size: 12, font: F.mono, fill: cl.ink, anchor: "end" });
    s += L(0, 74, W, 74, cl.ink, 1, 0.14);
    const a = art(64, 108, 700, 620, box(64, 108, 700, 620, cadeira("#7a6549", "#c8b394")), "#e8e1d1", "clPdp");
    defs += a.defs;
    s += a.svg;
    [["Freijó", "#c8b394"], ["Cumaru", "#a8836a"], ["Peroba", "#d3c3a4"]].forEach((sw, i) => {
      s += R(64 + i * 90, 750, 76, 76, sw[1]);
      if (i === 0) s += R(64, 750, 76, 76, "none", { stroke: cl.ink, sw: 1 });
      s += T(64 + i * 90, 846, sw[0], { size: 11, font: F.mono, fill: cl.muted });
    });
    s += T(820, 142, "CADEIRA", { size: 11, font: F.mono, fill: cl.accent, ls: 3 });
    s += T(820, 206, "Serra", { size: 62, font: F.serif, fill: cl.ink, ls: -1.5 });
    s += T(820, 250, "R$ 1.240", { size: 20, font: F.mono, fill: cl.ink });
    s += T(820, 278, "Prazo de produção: 35 dias úteis", { size: 12, font: F.mono, fill: cl.muted });
    s += L(820, 310, 1536, 310, cl.ink, 1, 0.14);
    s += para(820, 344, "Estrutura em freijó maciço, assento trançado à mão em palha de buriti. Sem parafusos aparentes e acabamento em cera natural.", { size: 16, fill: "#4f4a3d", maxWidth: 660, lh: 1.6 });
    const rows = [["Largura", "52 cm"], ["Altura", "78 cm"], ["Profundidade", "49 cm"], ["Peso", "4,2 kg"]];
    rows.forEach((r, i) => {
      s += T(820, 452 + i * 36, r[0], { size: 12, font: F.mono, fill: cl.muted });
      s += T(1536, 452 + i * 36, r[1], { size: 12, font: F.mono, fill: cl.ink, anchor: "end" });
      s += L(820, 466 + i * 36, 1536, 466 + i * 36, cl.ink, 1, 0.08);
    });
    s += T(820, 618, "Madeira", { size: 12, font: F.mono, fill: cl.muted });
    ["Freijó", "Cumaru", "Peroba"].forEach((t, i) => {
      const w = measure(t, 12, F.mono) + 30;
      const x = 820 + i * 104;
      s += R(x, 632, w, 38, i === 0 ? cl.ink : "none", { stroke: cl.ink, sw: 1 });
      s += T(x + w / 2, 656, t, { size: 12, font: F.mono, fill: i === 0 ? cl.bg : cl.ink, anchor: "middle" });
    });
    s += R(820, 700, 380, 54, cl.ink, { r: 999 });
    s += T(1010, 733, "Encomendar peça", { size: 15, fill: cl.bg, anchor: "middle" });
    s += T(1224, 733, "Ver na sala de estar", { size: 13, fill: cl.ink, opacity: 0.75 });
    s += L(820, 792, 1536, 792, cl.ink, 1, 0.12);
    s += T(820, 826, "Feito à mão em Atibaia, SP · embalagem reutilizável · frete calculado no checkout", { size: 11, font: F.mono, fill: cl.muted });
    s += T(820, 862, "Troca em 30 dias · assistência para conserto sem custo", { size: 11, font: F.mono, fill: cl.muted });
    return doc(W, H, cl.bg, s, defs);
  }
];

const vl = { bg: "#12110d", card: "#1c1b14", ink: "#f0ece1", muted: "#8f8a78", accent: "#e8603a" };

export const volta = [
  () => {
    let defs = "";
    let s = header({ bg: vl.bg, ink: vl.ink, brand: "VOLTA", brandFont: F.sansBold, brandSize: 24, items: ["Corrida", "Trilha", "Academia", "Ciclismo"], right: "SACOLA 1", h: 84, active: 0, opacity: 0.62 });
    s += T(64, 190, "DROP 07 · TÊNIS DE RUA", { size: 11, font: F.mono, fill: vl.accent, ls: 3 });
    s += T(64, 330, "CORRE", { size: 150, font: F.sansBold, fill: vl.ink, ls: -7 });
    s += T(64, 470, "MAIS", { size: 150, font: F.sansBold, fill: "none", ls: -7, style: `stroke:${vl.ink};stroke-width:1.6` });
    s += para(66, 528, "Leveza para 21 km. Malha vazada, sem costura no calcanhar e entressola com retorno de 78%.", { size: 17, fill: "#c9c3b3", maxWidth: 520, lh: 1.55 });
    s += R(64, 604, 230, 54, vl.accent);
    s += T(179, 638, "VER O DROP", { size: 13, font: F.monoMed, fill: "#12110d", anchor: "middle", ls: 1 });
    s += T(316, 638, "Tabela de medidas", { size: 13, font: F.mono, fill: vl.ink, opacity: 0.72 });
    const a = art(640, 110, 896, 660, box(640, 110, 896, 660, tenis("#d8cfbb", "#f2efe8", vl.accent)), "#1a1912", "vlHero");
    defs += a.defs;
    s += a.svg;
    s += T(1536, 800, "VOLTA 07 — R$ 649", { size: 12, font: F.mono, fill: vl.ink, anchor: "end", ls: 1 });
    /* faixa inferior */
    s += L(64, 816, 1536, 816, vl.ink, 1, 0.14);
    ["36–44 · 6 cores", "Entrega em 2 dias", "Troca de numeração grátis"].forEach((t, i) => {
      s += T(64 + i * 400, 856, t, { size: 13, font: F.mono, fill: vl.muted });
    });
    s += T(64, 926, "SUSTENTAÇÃO: ENTressola em EVA expandido · cabedal 62% reciclado", { size: 10.5, font: F.mono, fill: vl.muted, ls: 1 });
    return doc(W, H, vl.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: vl.bg, ink: vl.ink, brand: "VOLTA", brandFont: F.sansBold, brandSize: 24, items: ["Corrida", "Trilha", "Academia", "Ciclismo"], right: "SACOLA 1", h: 84, opacity: 0.62 });
    s += T(64, 172, "LOJA / TÊNIS", { size: 11, font: F.mono, fill: vl.accent, ls: 3 });
    s += T(64, 244, "Todos os passos", { size: 58, font: F.sansBold, fill: vl.ink, ls: -2.5 });
    s += chips(64, 292, ["Tênis", "Camisetas", "Shorts", "Meias"], { ink: vl.ink, paper: vl.bg, active: 0 }).svg;
    s += T(1536, 298, "ORDENAR: NOVIDADES", { size: 11, font: F.mono, fill: vl.muted, anchor: "end" });
    const items = [
      ["VOLTA 07", "R$ 649", "areia", tenis("#d8cfbb", "#f2efe8", vl.accent)],
      ["VOLTA 07", "R$ 649", "grafite", tenis("#4a4a42", "#e6e2d4", vl.accent)],
      ["TRILHA 02", "R$ 729", "musgo", tenis("#8a9168", "#efece0", "#c9a227")],
      ["TRILHA 02", "R$ 729", "oliva", tenis("#6f7a58", "#e6e2d4", "#c9a227")],
      ["PISTA 01", "R$ 499", "branco", tenis("#e4dfd2", "#ffffff", "#8a8b62")],
      ["PISTA 01", "R$ 499", "barro", tenis("#a0603f", "#efece0", "#f2efe8")]
    ];
    items.forEach((it, i) => {
      const x = 64 + (i % 3) * 500;
      const y = 344 + Math.floor(i / 3) * 330;
      const cd = productCard({ x, y, w: 464, h: 220, draw: box(x, y, 464, 220, it[3]), artBg: "#1c1b14", name: it[0], price: it[1], meta: it[2], extra: "36 37 38 39 40", ink: vl.ink, muted: vl.muted, id: `vlq${i}`, badge: i === 2 ? "NOVO" : "", badgeInk: vl.accent, badgePaper: "#12110d" });
      defs += cd.defs;
      s += cd.svg;
      s += L(x, y + 70, x + 464, y + 70, vl.ink, 1, 0.06);
    });
    return doc(W, H, vl.bg, s, defs);
  },
  () => {
    let s = header({ bg: vl.bg, ink: vl.ink, brand: "VOLTA", brandFont: F.sansBold, brandSize: 24, right: "SACOLA 1", h: 84 });
    s += T(64, 168, "SACOLA", { size: 11, font: F.mono, fill: vl.accent, ls: 3 });
    s += T(64, 232, "1 item", { size: 50, font: F.sansBold, fill: vl.ink, ls: -2 });
    s += R(64, 268, 120, 120, vl.card);
    s += T(64, 418, "VOLTA 07", { size: 19, font: F.sansMed, fill: vl.ink });
    s += T(64, 440, "tamanho 40 · areia", { size: 12, font: F.mono, fill: vl.muted });
    s += T(64, 470, "R$ 649", { size: 13, font: F.mono, fill: vl.ink });
    s += R(64, 500, 112, 40, "none", { stroke: "#3a382c", sw: 1 });
    s += T(86, 526, "−", { size: 16, fill: vl.ink });
    s += T(118, 526, "1", { size: 13, font: F.mono, fill: vl.ink });
    s += T(148, 526, "+", { size: 16, fill: vl.ink });
    s += T(176, 526, "REMOVER", { size: 10.5, font: F.mono, fill: vl.muted });
    s += L(64, 590, 1536, 590, vl.ink, 1, 0.14);
    s += T(64, 632, "COMPLETA O KIT", { size: 10.5, font: F.mono, fill: vl.muted, ls: 2 });
    ["Meia de corrida", "Camiseta vazada", "Cordão de tênis"].forEach((p, i) => {
      s += R(64, 652 + i * 100, 84, 84, vl.card);
      s += T(168, 684 + i * 100, p, { size: 14, fill: vl.ink });
      s += T(168, 706 + i * 100, "R$ " + [59, 189, 39][i], { size: 12, font: F.mono, fill: vl.muted });
      s += T(456, 700 + i * 100, "+ ADICIONAR", { size: 10.5, font: F.mono, fill: vl.accent, anchor: "end" });
    });
    s += R(560, 268, 976, 300, vl.card, { r: 1 });
    s += T(596, 316, "RESUMO", { size: 10.5, font: F.mono, fill: vl.muted, ls: 2 });
    [["Subtotal", "R$ 649,00"], ["Frete", "Grátis acima de R$ 399"], ["Cupom", "adicionar código"]].forEach((r, i) => {
      s += T(596, 360 + i * 38, r[0], { size: 13, fill: "#c9c3b3" });
      s += T(1500, 360 + i * 38, r[1], { size: 12, font: F.mono, fill: i === 2 ? vl.accent : vl.ink, anchor: "end" });
    });
    s += L(596, 466, 1500, 466, vl.ink, 1, 0.14);
    s += T(596, 508, "Total", { size: 16, fill: vl.ink });
    s += T(1500, 508, "R$ 649,00", { size: 22, font: F.mono, fill: vl.ink, anchor: "end" });
    s += R(1160, 268, 0, 0, "none");
    s += R(596, 640, 904, 54, vl.accent);
    s += T(1048, 673, "FINALIZAR PEDIDO", { size: 13, font: F.monoMed, fill: "#12110d", anchor: "middle", ls: 1 });
    s += T(596, 726, "Demonstração — nenhuma cobrança é feita. Frete e prazo são fictícios.", { size: 11, font: F.mono, fill: vl.muted });
    s += T(596, 786, "PAGAMENTO", { size: 10.5, font: F.mono, fill: vl.muted, ls: 2 });
    ["PIX", "Cartão em até 6×", "Boleto"].forEach((p, i) => {
      const w = measure(p, 12, F.mono) + 28;
      s += R(596 + i * 150, 802, w, 34, "none", { stroke: "#3a382c", sw: 1 });
      s += T(596 + i * 150 + w / 2, 824, p, { size: 12, font: F.mono, fill: vl.ink, anchor: "middle" });
    });
    return doc(W, H, vl.bg, s);
  }
];
