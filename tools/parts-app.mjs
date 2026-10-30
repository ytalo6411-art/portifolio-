/* Mockups — Farol, Fluxo e Trilha (sistemas) */
import { doc } from "./engine.mjs";
import { W, H, T, R, C, L, art, F, measure, para } from "./ui.mjs";

/* ---------- helpers de gráfico ---------- */

function bars(x, y, w, h, values, color, muted) {
  const max = Math.max(...values);
  const bw = w / values.length;
  return values
    .map((v, i) => {
      const bh = (v / max) * (h - 22);
      return R(x + i * bw + bw * 0.18, y + h - bh, bw * 0.64, bh, color, { r: 2, opacity: i === values.length - 1 ? 1 : 0.55 });
    })
    .join("") +
    L(x, y + h, x + w, y + h, muted, 1, 0.35);
}

function sparkline(x, y, w, h, values, color) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => {
    const px = x + (i / (values.length - 1)) * w;
    const py = y + h - ((v - min) / (max - min || 1)) * h;
    return [px, py];
  });
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
}

function donut(cx, cy, r, parts, colors, bg) {
  let out = "";
  const total = parts.reduce((a, b) => a + b, 0);
  let angle = -Math.PI / 2;
  parts.forEach((p, i) => {
    const sweep = (p / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep);
    const y2 = cy + r * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    out += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${colors[i]}"/>`;
    angle += sweep;
  });
  out += C(cx, cy, r * 0.62, bg);
  return out;
}

/* ---------- shell de dashboard ---------- */

function shell({ bg, side, line, ink, muted, accent, brand, items, active, title, subtitle, avatar, right }) {
  let s = R(0, 0, W, H, bg);
  s += R(0, 0, 248, H, side);
  s += T(32, 52, brand, { size: 16, font: F.sansSemi, fill: ink });
  s += T(32, 72, "ambiente de demonstração", { size: 9.5, font: F.mono, fill: muted });
  s += L(32, 92, 216, 92, line, 1);
  items.forEach((item, i) => {
    const y = 130 + i * 42;
    const on = i === active;
    if (on) s += R(20, y - 22, 208, 34, accent, { r: 3, opacity: 0.14 });
    s += T(32, y, item, { size: 13, fill: on ? ink : muted });
    if (on) s += R(20, y - 22, 3, 34, accent);
  });
  s += L(32, 900, 216, 900, line, 1);
  s += C(48, 930, 14, accent, 0.25);
  s += T(48, 935, "Y", { size: 12, font: F.sansSemi, fill: ink, anchor: "middle" });
  s += T(72, 928, "Ytalo · demo", { size: 12, fill: ink });
  s += T(72, 946, "sair", { size: 10, font: F.mono, fill: muted });
  s += R(248, 0, W - 248, 74, bg);
  s += T(280, 40, title, { size: 20, font: F.sansSemi, fill: ink });
  s += T(280, 60, subtitle, { size: 11, font: F.mono, fill: muted });
  s += R(1100, 18, 260, 36, side, { r: 3, stroke: line, sw: 1 });
  s += T(1116, 41, "buscar pedido, cliente…", { size: 11, font: F.mono, fill: muted });
  s += T(1400, 41, avatar, { size: 11, font: F.mono, fill: ink });
  s += T(1536, 41, right, { size: 11, font: F.mono, fill: muted, anchor: "end" });
  s += L(248, 74, W, 74, line, 1);
  return s;
}

/* ============ Farol — gestão empresarial ============ */

const fa = { bg: "#f7f5f0", side: "#ecebe4", line: "#e2ded5", ink: "#16181a", muted: "#8a867c", accent: "#25403a", card: "#ffffff" };

export const farol = [
  () => {
    let s = shell({ ...fa, brand: "FAROL", items: ["Visão geral", "Pedidos", "Clientes", "Estoque", "Relatórios", "Equipe"], active: 0, title: "Visão geral", subtitle: "dados fictícios · atualizado há 4 min", avatar: "YA", right: "out 2026" });
    const kpis = [
      ["Faturamento do mês", "R$ 184.920", "+6,2% vs. set", true],
      ["Pedidos", "1.284", "+38 esta semana", true],
      ["Ticket médio", "R$ 144", "-1,8% vs. set", false],
      ["Taxa de devolução", "2,4%", "meta 3,0%", true]
    ];
    kpis.forEach((k, i) => {
      const x = 280 + i * 322;
      s += R(x, 106, 298, 118, fa.card, { r: 3, stroke: fa.line, sw: 1 });
      s += T(x + 20, 136, k[0], { size: 11, font: F.mono, fill: fa.muted });
      s += T(x + 20, 176, k[1], { size: 26, font: F.monoMed, fill: fa.ink });
      s += T(x + 20, 200, k[2], { size: 10.5, font: F.mono, fill: k[3] ? "#3d7a55" : "#b0433a" });
    });
    /* gráfico principal */
    s += R(280, 244, 700, 330, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    s += T(304, 276, "Vendas por semana", { size: 14, font: F.sansMed, fill: fa.ink });
    s += T(956, 276, "últimas 12 semanas", { size: 10.5, font: F.mono, fill: fa.muted, anchor: "end" });
    s += bars(312, 306, 644, 210, [42, 55, 48, 62, 58, 70, 66, 74, 69, 81, 76, 88], fa.accent, fa.muted);
    ["S32", "S34", "S36", "S38", "S40", "S42"].forEach((l, i) => {
      s += T(324 + i * 126, 542, l, { size: 10, font: F.mono, fill: fa.muted });
    });
    /* produção por categoria */
    s += R(1000, 244, 536, 330, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    s += T(1024, 276, "Share por categoria", { size: 14, font: F.sansMed, fill: fa.ink });
    s += donut(1136, 420, 74, [40, 26, 18, 16], ["#25403a", "#6f8f80", "#b3c4b8", "#dfe3da"], fa.card);
    const legend = [["Roupas", "40%"], ["Calçados", "26%"], ["Casa", "18%"], ["Outros", "16%"]];
    legend.forEach((l, i) => {
      s += R(1246, 372 + i * 26, 8, 8, ["#25403a", "#6f8f80", "#b3c4b8", "#dfe3da"][i]);
      s += T(1264, 380 + i * 26, l[0], { size: 11, fill: fa.ink });
      s += T(1500, 380 + i * 26, l[1], { size: 11, font: F.mono, fill: fa.muted, anchor: "end" });
    });
    /* tabela */
    s += R(280, 594, 1256, 330, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    s += T(304, 626, "Pedidos recentes", { size: 14, font: F.sansMed, fill: fa.ink });
    s += T(1512, 626, "ver todos", { size: 10.5, font: F.mono, fill: fa.accent, anchor: "end" });
    const head = ["PEDIDO", "CLIENTE", "STATUS", "VALOR", "DATA"];
    const colX = [304, 520, 820, 1120, 1512];
    head.forEach((h, i) => {
      s += T(colX[i], 660, h, { size: 9.5, font: F.mono, fill: fa.muted, ls: 1, anchor: i === 4 ? "end" : "start" });
    });
    s += L(304, 672, 1512, 672, fa.line, 1);
    const rows = [
      ["#2841", "Marina Alves", "Pago", "R$ 412,00", "29 out"],
      ["#2840", "Tiago Freire", "Em separação", "R$ 189,90", "29 out"],
      ["#2839", "Ler Editora", "Pago", "R$ 2.480,00", "28 out"],
      ["#2838", "Bruno Salles", "Aguardando", "R$ 96,00", "28 out"],
      ["#2837", "Ana Kobayashi", "Enviado", "R$ 342,50", "28 out"]
    ];
    rows.forEach((r, i) => {
      const y = 706 + i * 42;
      const color = r[2] === "Pago" || r[2] === "Enviado" ? "#3d7a55" : r[2] === "Aguardando" ? "#b0433a" : "#8a6516";
      s += T(colX[0], y, r[0], { size: 12, font: F.mono, fill: fa.ink });
      s += T(colX[1], y, r[1], { size: 12, fill: fa.ink });
      s += C(colX[2], y - 4, 3, color);
      s += T(colX[2] + 12, y, r[2], { size: 11, font: F.mono, fill: color });
      s += T(colX[3], y, r[3], { size: 12, font: F.mono, fill: fa.ink });
      s += T(colX[4], y, r[4], { size: 11, font: F.mono, fill: fa.muted, anchor: "end" });
      s += L(304, y + 14, 1512, y + 14, fa.line, 1, 0.7);
    });
    return doc(W, H, fa.bg, s);
  },
  () => {
    let s = shell({ ...fa, brand: "FAROL", items: ["Visão geral", "Pedidos", "Clientes", "Estoque", "Relatórios", "Equipe"], active: 1, title: "Pedidos", subtitle: "1.284 registros · filtro: outubro", avatar: "YA", right: "exportar" });
    /* filtros */
    const filters = ["Status: todos", "Canal: todos", "Período: outubro"];
    filters.forEach((f, i) => {
      s += R(280 + i * 240, 98, 224, 34, fa.card, { r: 3, stroke: fa.line, sw: 1 });
      s += T(296 + i * 240, 120, f, { size: 11, font: F.mono, fill: fa.ink });
      s += T(484 + i * 240, 120, "v", { size: 10, font: F.mono, fill: fa.muted, anchor: "end" });
    });
    s += R(1000, 98, 250, 34, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    s += T(1016, 120, "buscar por cliente…", { size: 11, font: F.mono, fill: fa.muted });
    s += R(1266, 98, 138, 34, fa.accent, { r: 3 });
    s += T(1335, 120, "Novo pedido", { size: 11, fill: "#f7f5f0", anchor: "middle" });
    s += R(1420, 98, 116, 34, "none", { r: 3, stroke: fa.line, sw: 1 });
    s += T(1478, 120, "Exportar", { size: 11, font: F.mono, fill: fa.ink, anchor: "middle" });
    /* tabela */
    s += R(280, 152, 1256, 780, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    const cols = [
      ["PEDIDO", 304, "start"],
      ["CLIENTE", 460, "start"],
      ["ITENS", 720, "start"],
      ["CANAL", 830, "start"],
      ["STATUS", 990, "start"],
      ["PAGAMENTO", 1180, "start"],
      ["VALOR", 1512, "end"]
    ];
    cols.forEach(([h, x, anchor]) => {
      s += T(x, 186, h, { size: 9.5, font: F.mono, fill: fa.muted, ls: 1, anchor });
    });
    s += L(304, 200, 1512, 200, fa.line, 1);
    const rows = [
      ["#2841", "Marina Alves", "3", "Site", "Pago", "PIX", "R$ 412,00"],
      ["#2840", "Tiago Freire", "1", "Site", "Separação", "Cartão", "R$ 189,90"],
      ["#2839", "Ler Editora", "12", "B2B", "Pago", "Boleto", "R$ 2.480,00"],
      ["#2838", "Bruno Salles", "1", "Marketplace", "Aguardando", "—", "R$ 96,00"],
      ["#2837", "Ana Kobayashi", "2", "Site", "Enviado", "Cartão", "R$ 342,50"],
      ["#2836", "Clube Norte", "8", "B2B", "Pago", "PIX", "R$ 1.120,00"],
      ["#2835", "Rita Campos", "2", "Marketplace", "Cancelado", "—", "R$ 78,00"],
      ["#2834", "Studio Meia", "5", "Site", "Enviado", "Cartão", "R$ 610,00"],
      ["#2833", "Paulo Vieira", "1", "Site", "Pago", "PIX", "R$ 149,90"],
      ["#2832", "Oficina Sul", "4", "B2B", "Separação", "Boleto", "R$ 980,00"]
    ];
    const statusColor = (v) => (v === "Pago" || v === "Enviado" ? "#3d7a55" : v === "Cancelado" || v === "Aguardando" ? "#b0433a" : "#8a6516");
    rows.forEach((r, i) => {
      const y = 236 + i * 66;
      if (i === 2) s += R(288, y - 24, 1240, 52, "#f1f6f2", { r: 2 });
      s += T(304, y, r[0], { size: 12, font: F.mono, fill: fa.ink });
      s += T(460, y, r[1], { size: 12.5, fill: fa.ink });
      s += T(720, y, r[2], { size: 12, font: F.mono, fill: fa.muted });
      s += T(830, y, r[3], { size: 11.5, fill: fa.muted });
      s += C(996, y - 4, 3.4, statusColor(r[4]));
      s += T(1008, y, r[4], { size: 11, font: F.mono, fill: statusColor(r[4]) });
      s += T(1180, y, r[5], { size: 11.5, font: F.mono, fill: fa.muted });
      s += T(1512, y, r[6], { size: 12, font: F.mono, fill: fa.ink, anchor: "end" });
      s += L(304, y + 20, 1512, y + 20, fa.line, 1, 0.8);
    });
    s += T(304, 918, "mostrando 10 de 1.284 · página 1", { size: 10.5, font: F.mono, fill: fa.muted });
    ["1", "2", "3", "…", "129"].forEach((p, i) => {
      const x = 1330 + i * 42;
      if (i === 0) s += R(x - 12, 902, 30, 26, fa.accent, { r: 2 });
      s += T(x, 920, p, { size: 11, font: F.mono, fill: i === 0 ? "#f7f5f0" : fa.muted });
    });
    return doc(W, H, fa.bg, s);
  },
  () => {
    let s = shell({ ...fa, brand: "FAROL", items: ["Visão geral", "Pedidos", "Clientes", "Estoque", "Relatórios", "Equipe"], active: 1, title: "Pedido #2839", subtitle: "criado em 28/10 · 12 itens", avatar: "YA", right: "imprimir" });
    /* tabela desfocada atrás + painel lateral */
    s += R(280, 100, 800, 800, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    s += T(304, 132, "Itens do pedido", { size: 14, font: F.sansMed, fill: fa.ink });
    const items = [
      ["Caderno Argila A5", "4", "R$ 240,00"],
      ["Caneta tinteiro", "2", "R$ 380,00"],
      ["Bloco refil", "4", "R$ 88,00"],
      ["Estojo lona", "2", "R$ 172,00"]
    ];
    items.forEach((it, i) => {
      const y = 180 + i * 58;
      s += T(304, y, it[0], { size: 13, fill: fa.ink });
      s += T(700, y, "× " + it[1], { size: 12, font: F.mono, fill: fa.muted });
      s += T(1060, y, it[2], { size: 12, font: F.mono, fill: fa.ink, anchor: "end" });
      s += L(304, y + 20, 1060, y + 20, fa.line, 1, 0.8);
    });
    s += T(304, 470, "Subtotal", { size: 12, fill: fa.muted });
    s += T(1060, 470, "R$ 2.480,00", { size: 12, font: F.mono, fill: fa.ink, anchor: "end" });
    s += T(304, 500, "Frete", { size: 12, fill: fa.muted });
    s += T(1060, 500, "R$ 0,00", { size: 12, font: F.mono, fill: fa.ink, anchor: "end" });
    s += T(304, 544, "Total", { size: 14, fill: fa.ink });
    s += T(1060, 544, "R$ 2.480,00", { size: 15, font: F.monoMed, fill: fa.ink, anchor: "end" });
    /* histórico */
    s += T(304, 620, "HISTÓRICO", { size: 10, font: F.mono, fill: fa.muted, ls: 1.5 });
    const hist = [
      ["28/10 14:02", "Pedido criado · site"],
      ["28/10 14:12", "Pagamento aprovado · boleto"],
      ["29/10 09:40", "Nota fiscal emitida"],
      ["29/10 10:05", "Separação iniciada · galpão 2"]
    ];
    hist.forEach((h, i) => {
      const y = 656 + i * 40;
      s += C(310, y - 4, 3.4, i === 3 ? "#8a6516" : "#3d7a55");
      s += T(328, y, h[1], { size: 12, fill: fa.ink });
      s += T(1060, y, h[0], { size: 10.5, font: F.mono, fill: fa.muted, anchor: "end" });
    });
    /* painel */
    s += R(1108, 100, 428, 800, fa.card, { r: 3, stroke: fa.line, sw: 1 });
    s += T(1136, 138, "CLIENTE", { size: 10, font: F.mono, fill: fa.muted, ls: 1.5 });
    s += C(1160, 178, 20, fa.accent, 0.18);
    s += T(1160, 183, "LE", { size: 12, font: F.sansSemi, fill: fa.ink, anchor: "middle" });
    s += T(1196, 174, "Ler Editora", { size: 15, font: F.sansMed, fill: fa.ink });
    s += T(1196, 194, "CNPJ 12.345.678/0001-90", { size: 10.5, font: F.mono, fill: fa.muted });
    s += T(1136, 234, "contato@lereditora.com.br", { size: 12, fill: fa.ink });
    s += T(1136, 258, "(19) 3242-1180", { size: 12, fill: fa.ink });
    s += L(1136, 282, 1508, 282, fa.line, 1);
    s += T(1136, 314, "ENTREGA", { size: 10, font: F.mono, fill: fa.muted, ls: 1.5 });
    s += para(1136, 340, "Rua Doutor Sampaio, 218 — Cambuí, Campinas/SP, 13024-080", { size: 12.5, fill: fa.ink, maxWidth: 360, lh: 1.5 });
    s += T(1136, 412, "Rastreio · BR930218477SP", { size: 11, font: F.mono, fill: fa.accent });
    s += L(1136, 440, 1508, 440, fa.line, 1);
    s += T(1136, 472, "STATUS", { size: 10, font: F.mono, fill: fa.muted, ls: 1.5 });
    ["Aguardando", "Separando", "Enviado", "Entregue"].forEach((st, i) => {
      const y = 500 + i * 34;
      s += R(1136, y - 10, 14, 14, i < 2 ? fa.accent : "none", { r: 7, stroke: fa.line, sw: 1 });
      s += T(1162, y, st, { size: 12, fill: i < 2 ? fa.ink : fa.muted });
    });
    s += L(1136, 650, 1508, 650, fa.line, 1);
    s += T(1136, 682, "OBSERVAÇÕES", { size: 10, font: F.mono, fill: fa.muted, ls: 1.5 });
    s += para(1136, 708, "Cliente pediu nota fiscal separada por centro de custo.", { size: 12.5, fill: fa.ink, maxWidth: 360, lh: 1.5 });
    s += R(1136, 780, 372, 46, fa.accent, { r: 3 });
    s += T(1322, 809, "Marcar como enviado", { size: 12, fill: "#f7f5f0", anchor: "middle" });
    s += T(1322, 852, "demonstração · ação não persiste", { size: 10, font: F.mono, fill: fa.muted, anchor: "middle" });
    return doc(W, H, fa.bg, s);
  }
];

/* ============ Fluxo — gestão financeira ============ */

const fl = { bg: "#0f1319", side: "#0b0e13", line: "#242b38", ink: "#eef1f6", muted: "#8a93a6", accent: "#4f9f8a", card: "#161b23" };

export const fluxo = [
  () => {
    let s = shell({ ...fl, brand: "FLUXO", items: ["Painel", "Lançamentos", "Contas", "Relatórios", "Configurações"], active: 0, title: "Painel", subtitle: "conta demo · outubro 2026", avatar: "YF", right: "fictício" });
    s += R(280, 106, 620, 200, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(304, 138, "SALDO CONSOLIDADO", { size: 10, font: F.mono, fill: fl.muted, ls: 1.5 });
    s += T(304, 194, "R$ 42.180,55", { size: 38, font: F.monoMed, fill: fl.ink });
    s += T(304, 224, "contas: corrente, reserva e cartão", { size: 11, font: F.mono, fill: fl.muted });
    s += sparkline(304, 244, 500, 44, [38, 41, 39, 44, 42, 46, 43, 47, 45, 42], fl.accent);
    s += R(920, 106, 616, 200, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(944, 138, "ENTRADAS E SAÍDAS · OUTUBRO", { size: 10, font: F.mono, fill: fl.muted, ls: 1.5 });
    s += T(944, 180, "+ R$ 18.420", { size: 22, font: F.monoMed, fill: "#5fd0a0" });
    s += T(1190, 180, "− R$ 12.905", { size: 22, font: F.monoMed, fill: "#e0745f" });
    s += bars(944, 196, 568, 84, [12, 14, 9, 16, 11, 18, 13, 15], fl.accent, fl.muted);
    /* gráfico de linha grande */
    s += R(280, 326, 880, 300, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(304, 358, "Fluxo de caixa · 6 meses", { size: 14, font: F.sansMed, fill: fl.ink });
    s += T(1136, 358, "realizado", { size: 10, font: F.mono, fill: fl.muted, anchor: "end" });
    [0, 1, 2, 3].forEach((i) => s += L(304, 396 + i * 56, 1136, 396 + i * 56, fl.line, 1, 0.8));
    s += sparkline(304, 400, 880, 160, [30, 42, 36, 58, 44, 68, 52, 74, 60, 82, 70, 88], fl.accent);
    ["mai", "jun", "jul", "ago", "set", "out"].forEach((m, i) => {
      s += T(304 + i * 172, 596, m, { size: 10, font: F.mono, fill: fl.muted });
    });
    /* categorias */
    s += R(1176, 326, 360, 300, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(1200, 358, "Gastos por categoria", { size: 14, font: F.sansMed, fill: fl.ink });
    const cats = [["Moradia", 42], ["Alimentação", 24], ["Transporte", 14], ["Lazer", 12], ["Outros", 8]];
    cats.forEach((c, i) => {
      const y = 396 + i * 42;
      s += T(1200, y, c[0], { size: 11.5, fill: fl.ink });
      s += R(1300, y - 10, 380 * 0.5, 8, fl.line, { r: 4 });
      s += R(1300, y - 10, 380 * 0.5 * (c[1] / 42), 8, i === 0 ? fl.accent : "#3f6f63", { r: 4 });
      s += T(1512, y, c[1] + "%", { size: 11, font: F.mono, fill: fl.muted, anchor: "end" });
    });
    /* lançamentos */
    s += R(280, 646, 1256, 288, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(304, 678, "Últimos lançamentos", { size: 14, font: F.sansMed, fill: fl.ink });
    s += T(1512, 678, "ver todos", { size: 10.5, font: F.mono, fill: fl.accent, anchor: "end" });
    const rows = [
      ["29/10", "Mercado Bom Preço", "Alimentação", "− R$ 284,12"],
      ["29/10", "Freelance · site Bento", "Receita", "+ R$ 3.200,00"],
      ["28/10", "Aluguel outubro", "Moradia", "− R$ 1.850,00"],
      ["27/10", "Assinatura design", "Ferramentas", "− R$ 89,90"],
      ["26/10", "Reembolso viagem", "Receita", "+ R$ 412,00"]
    ];
    rows.forEach((r, i) => {
      const y = 716 + i * 42;
      s += T(304, y, r[0], { size: 11, font: F.mono, fill: fl.muted });
      s += T(372, y, r[1], { size: 12.5, fill: fl.ink });
      s += T(760, y, r[2], { size: 11, font: F.mono, fill: fl.muted });
      s += T(1512, y, r[3], { size: 12, font: F.mono, fill: r[3].startsWith("+") ? "#5fd0a0" : "#e0948a", anchor: "end" });
      s += L(304, y + 16, 1512, y + 16, fl.line, 1, 0.7);
    });
    return doc(W, H, fl.bg, s);
  },
  () => {
    let s = shell({ ...fl, brand: "FLUXO", items: ["Painel", "Lançamentos", "Contas", "Relatórios", "Configurações"], active: 1, title: "Lançamentos", subtitle: "outubro 2026 · 248 registros", avatar: "YF", right: "fictício" });
    const f = ["Tipo: todos", "Categoria: todas", "Conta: corrente"];
    f.forEach((t, i) => {
      s += R(280 + i * 228, 98, 212, 34, fl.card, { r: 3, stroke: fl.line, sw: 1 });
      s += T(296 + i * 228, 120, t, { size: 10.5, font: F.mono, fill: fl.ink });
    });
    s += R(980, 98, 250, 34, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(996, 120, "buscar…", { size: 10.5, font: F.mono, fill: fl.muted });
    s += R(1244, 98, 140, 34, fl.accent, { r: 3 });
    s += T(1314, 120, "Novo lançamento", { size: 10.5, fill: "#0f1319", anchor: "middle" });
    s += R(1398, 98, 138, 34, "none", { r: 3, stroke: fl.line, sw: 1 });
    s += T(1467, 120, "Importar CSV", { size: 10.5, font: F.mono, fill: fl.ink, anchor: "middle" });
    s += R(280, 152, 1256, 640, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    const cols = [["DATA", 304], ["DESCRIÇÃO", 396], ["CATEGORIA", 800], ["CONTA", 1010], ["SITUAÇÃO", 1200], ["VALOR", 1512]];
    cols.forEach(([h, x]) => s += T(x, 186, h, { size: 9.5, font: F.mono, fill: fl.muted, ls: 1, anchor: x === 1512 ? "end" : "start" }));
    s += L(304, 200, 1512, 200, fl.line, 1);
    const rows = [
      ["29/10", "Mercado Bom Preço", "Alimentação", "Corrente", "Conferido", "− R$ 284,12"],
      ["29/10", "Freelance · site Bento", "Receita", "Corrente", "Pendente", "+ R$ 3.200,00"],
      ["28/10", "Aluguel outubro", "Moradia", "Corrente", "Conferido", "− R$ 1.850,00"],
      ["27/10", "Assinatura design", "Ferramentas", "Cartão", "Conferido", "− R$ 89,90"],
      ["26/10", "Reembolso viagem", "Receita", "Reserva", "Conferido", "+ R$ 412,00"],
      ["25/10", "Farmácia central", "Saúde", "Cartão", "Pendente", "− R$ 64,30"],
      ["24/10", "Curso de inglês", "Educação", "Cartão", "Conferido", "− R$ 220,00"],
      ["22/10", "Projeto marca Grão", "Receita", "Corrente", "Conferido", "+ R$ 2.600,00"],
      ["21/10", "Combustível", "Transporte", "Cartão", "Conferido", "− R$ 180,00"],
      ["20/10", "Internet fibra", "Moradia", "Corrente", "Conferido", "− R$ 129,90"]
    ];
    rows.forEach((r, i) => {
      const y = 238 + i * 54;
      s += T(304, y, r[0], { size: 11, font: F.mono, fill: fl.muted });
      s += T(396, y, r[1], { size: 12.5, fill: fl.ink });
      s += R(800, y - 14, measure(r[2], 10.5, F.mono) + 20, 22, "none", { r: 2, stroke: fl.line, sw: 1 });
      s += T(810, y, r[2], { size: 10.5, font: F.mono, fill: fl.muted });
      s += T(1010, y, r[3], { size: 11.5, fill: fl.muted });
      s += C(1206, y - 4, 3.2, r[4] === "Conferido" ? "#5fd0a0" : "#e0b05f");
      s += T(1218, y, r[4], { size: 10.5, font: F.mono, fill: r[4] === "Conferido" ? "#5fd0a0" : "#e0b05f" });
      s += T(1512, y, r[5], { size: 12, font: F.mono, fill: r[5].startsWith("+") ? "#5fd0a0" : "#e0948a", anchor: "end" });
      s += L(304, y + 14, 1512, y + 14, fl.line, 1, 0.6);
    });
    /* resumo lateral */
    s += R(280, 812, 1256, 122, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    [["Entradas", "+ R$ 18.420", "#5fd0a0"], ["Saídas", "− R$ 12.905", "#e0948a"], ["Saldo do mês", "R$ 5.515", fl.ink]].forEach((r, i) => {
      s += T(304 + i * 420, 848, r[0], { size: 10, font: F.mono, fill: fl.muted, ls: 1 });
      s += T(304 + i * 420, 884, r[1], { size: 20, font: F.monoMed, fill: r[2] });
    });
    s += T(304, 918, "Todos os valores são fictícios e servem apenas para demonstrar a interface.", { size: 10, font: F.mono, fill: fl.muted });
    return doc(W, H, fl.bg, s);
  },
  () => {
    let s = shell({ ...fl, brand: "FLUXO", items: ["Painel", "Lançamentos", "Contas", "Relatórios", "Configurações"], active: 3, title: "Relatórios", subtitle: "outubro 2026", avatar: "YF", right: "fictício" });
    s += R(280, 106, 620, 400, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(304, 140, "Gastos por categoria", { size: 14, font: F.sansMed, fill: fl.ink });
    s += donut(440, 316, 96, [42, 24, 14, 12, 8], ["#4f9f8a", "#3f6f63", "#2f534c", "#7fb8a8", "#243b38"], fl.card);
    s += T(440, 322, "R$ 12.905", { size: 15, font: F.monoMed, fill: fl.ink, anchor: "middle" });
    s += T(440, 342, "total do mês", { size: 9.5, font: F.mono, fill: fl.muted, anchor: "middle" });
    const cats = [["Moradia", "42%", "R$ 5.420"], ["Alimentação", "24%", "R$ 3.097"], ["Transporte", "14%", "R$ 1.807"], ["Lazer", "12%", "R$ 1.549"], ["Outros", "8%", "R$ 1.032"]];
    cats.forEach((c, i) => {
      const y = 212 + i * 48;
      s += R(608, y - 12, 8, 8, ["#4f9f8a", "#3f6f63", "#2f534c", "#7fb8a8", "#243b38"][i]);
      s += T(628, y, c[0], { size: 12, fill: fl.ink });
      s += T(860, y, c[1], { size: 11, font: F.mono, fill: fl.muted, anchor: "end" });
      s += T(900, y, c[2], { size: 11, font: F.mono, fill: fl.ink, anchor: "end" });
    });
    /* comparativo mensal */
    s += R(920, 106, 616, 400, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(944, 140, "Mês a mês", { size: 14, font: F.sansMed, fill: fl.ink });
    s += T(1512, 140, "12 meses", { size: 10, font: F.mono, fill: fl.muted, anchor: "end" });
    const vals = [62, 58, 71, 66, 74, 69, 80, 72, 84, 77, 88, 82];
    const maxV = Math.max(...vals);
    vals.forEach((v, i) => {
      const bh = (v / maxV) * 250;
      s += R(948 + i * 48, 470 - bh, 28, bh, i === 11 ? fl.accent : "#2f534c", { r: 2 });
    });
    ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"].forEach((m, i) => {
      s += T(962 + i * 48, 492, m, { size: 9, font: F.mono, fill: fl.muted });
    });
    s += L(944, 470, 1512, 470, fl.line, 1);
    /* tabela de contas */
    s += R(280, 532, 1256, 330, fl.card, { r: 3, stroke: fl.line, sw: 1 });
    s += T(304, 564, "Contas e limites", { size: 14, font: F.sansMed, fill: fl.ink });
    const accs = [
      ["Conta corrente", "R$ 18.420", "—", 1],
      ["Reserva", "R$ 21.600", "meta R$ 30.000", 0.72],
      ["Cartão final 4412", "− R$ 7.840", "limite R$ 12.000", 0.65]
    ];
    accs.forEach((a, i) => {
      const y = 610 + i * 72;
      s += T(304, y, a[0], { size: 13, fill: fl.ink });
      s += T(560, y, a[1], { size: 12.5, font: F.mono, fill: fl.ink });
      s += T(1512, y, a[2], { size: 10.5, font: F.mono, fill: fl.muted, anchor: "end" });
      if (a[3] !== 1) {
        s += R(304, y + 14, 600, 6, fl.line, { r: 3 });
        s += R(304, y + 14, 600 * a[3], 6, fl.accent, { r: 3 });
      }
    });
    /* botões de exportação */
    s += R(280, 886, 200, 44, "none", { r: 3, stroke: fl.line, sw: 1 });
    s += T(380, 913, "Exportar PDF", { size: 11, font: F.mono, fill: fl.ink, anchor: "middle" });
    s += R(496, 886, 200, 44, "none", { r: 3, stroke: fl.line, sw: 1 });
    s += T(596, 913, "Exportar CSV", { size: 11, font: F.mono, fill: fl.ink, anchor: "middle" });
    s += T(1512, 913, "demonstração · dados fictícios", { size: 10.5, font: F.mono, fill: fl.muted, anchor: "end" });
    return doc(W, H, fl.bg, s);
  }
];

/* ============ Trilha — tarefas e equipes ============ */

const tr = { bg: "#faf9f6", side: "#f1eee7", line: "#e0dbd0", ink: "#1c1e1c", muted: "#8b877c", accent: "#4a5d3f", card: "#ffffff" };

export const trilha = [
  () => {
    let s = shell({ ...tr, brand: "TRILHA", items: ["Quadro", "Lista", "Equipe", "Relatórios"], active: 0, title: "Projeto · site novo", subtitle: "equipe de 4 · sprint 12", avatar: "YT", right: "demo" });
    const cols = [
      ["A fazer", 5],
      ["Em andamento", 3],
      ["Revisão", 2],
      ["Concluído", 4]
    ];
    cols.forEach((c, ci) => {
      const x = 280 + ci * 320;
      s += T(x, 112, c[0], { size: 12, font: F.mono, fill: tr.muted, ls: 1 });
      s += T(x + 282, 112, String(c[1]), { size: 11, font: F.mono, fill: tr.muted, anchor: "end" });
      s += R(x - 8, 122, 296, 2, tr.line);
    });
    const cards = [
      [0, "Definir paleta e tipografia", "Design", "YA", "28 out", 0],
      [0, "Wireframe da home", "Design", "YA", "29 out", 0],
      [0, "Corrigir menu mobile", "Bug", "LC", "30 out", 2],
      [1, "Componente de produto", "Front", "YT", "31 out", 0],
      [1, "Integrar busca", "Front", "LC", "02 nov", 0],
      [2, "Revisão de textos", "Conteúdo", "YA", "01 nov", 0],
      [2, "Teste em iPhone SE", "QA", "RF", "01 nov", 3]
    ];
    const perCol = { 0: 0, 1: 0, 2: 0, 3: 0 };
    cards.forEach(([col, title, tag, who, date, high]) => {
      const x = 280 + col * 320;
      const y = 146 + perCol[col] * 108;
      perCol[col]++;
      s += R(x - 8, y, 296, 94, tr.card, { r: 3, stroke: tr.line, sw: 1 });
      s += R(x + 4, y + 14, measure(tag, 9.5, F.mono) + 16, 20, high === 3 ? "#f2dcd7" : high === 2 ? "#f7ecd7" : "#eef1e9", { r: 2 });
      s += T(x + 12, y + 29, tag, { size: 9.5, font: F.mono, fill: high === 3 ? "#a03026" : high === 2 ? "#8a6516" : tr.accent });
      s += para(x + 4, y + 52, title, { size: 12.5, fill: tr.ink, maxWidth: 260, lh: 1.35 });
      s += C(x + 14, y + 80, 9, "#d9d4c7");
      s += T(x + 14, y + 83, who, { size: 8.5, font: F.mono, fill: tr.ink, anchor: "middle" });
      s += T(x + 282, y + 83, date, { size: 10, font: F.mono, fill: tr.muted, anchor: "end" });
    });
    /* concluídos */
    s += R(1240, 146, 296, 94, tr.card, { r: 3, stroke: tr.line, sw: 1, opacity: 0.75 });
    s += T(1252, 182, "Header do site", { size: 12.5, fill: tr.ink, opacity: 0.5, style: "text-decoration:line-through" });
    s += T(1508, 182, "ok", { size: 10, font: F.mono, fill: tr.accent, anchor: "end" });
    s += R(1240, 254, 296, 94, tr.card, { r: 3, stroke: tr.line, sw: 1, opacity: 0.75 });
    s += T(1252, 290, "Setup do projeto", { size: 12.5, fill: tr.ink, opacity: 0.5, style: "text-decoration:line-through" });
    s += T(1508, 290, "ok", { size: 10, font: F.mono, fill: tr.accent, anchor: "end" });
    /* barra de progresso do sprint */
    s += R(280, 860, 1256, 84, tr.card, { r: 3, stroke: tr.line, sw: 1 });
    s += T(304, 892, "Sprint 12 · 14 de 18 tarefas", { size: 12.5, fill: tr.ink });
    s += R(304, 906, 900, 8, tr.line, { r: 4 });
    s += R(304, 906, 900 * 0.78, 8, tr.accent, { r: 4 });
    s += T(1512, 892, "encerra em 03 nov", { size: 10.5, font: F.mono, fill: tr.muted, anchor: "end" });
    s += T(1512, 914, "demonstração · quadro editável", { size: 10, font: F.mono, fill: tr.muted, anchor: "end" });
    return doc(W, H, tr.bg, s);
  },
  () => {
    let s = shell({ ...tr, brand: "TRILHA", items: ["Quadro", "Lista", "Equipe", "Relatórios"], active: 1, title: "Lista de tarefas", subtitle: "18 tarefas · sprint 12", avatar: "YT", right: "demo" });
    ["Filtro: abertas", "Responsável: todos", "Prioridade: todas"].forEach((f, i) => {
      s += R(280 + i * 220, 98, 204, 34, tr.card, { r: 3, stroke: tr.line, sw: 1 });
      s += T(294 + i * 220, 120, f, { size: 10.5, font: F.mono, fill: tr.ink });
    });
    s += R(1310, 98, 226, 34, tr.accent, { r: 3 });
    s += T(1423, 120, "+ Nova tarefa", { size: 11, fill: "#faf9f6", anchor: "middle" });
    s += R(280, 152, 1256, 760, tr.card, { r: 3, stroke: tr.line, sw: 1 });
    [["TAREFA", 304], ["RESP.", 900], ["PRIORIDADE", 1010], ["PRAZO", 1200], ["STATUS", 1512]].forEach(([h, x]) =>
      s += T(x, 186, h, { size: 9.5, font: F.mono, fill: tr.muted, ls: 1, anchor: x === 1512 ? "end" : "start" })
    );
    s += L(304, 200, 1512, 200, tr.line, 1);
    const rows = [
      ["Definir paleta e tipografia", "YA", "Alta", "28 out", "A fazer"],
      ["Wireframe da home", "YA", "Média", "29 out", "A fazer"],
      ["Corrigir menu mobile", "LC", "Alta", "30 out", "Em andamento"],
      ["Componente de produto", "YT", "Média", "31 out", "Em andamento"],
      ["Integrar busca", "LC", "Baixa", "02 nov", "Em andamento"],
      ["Revisão de textos", "YA", "Média", "01 nov", "Revisão"],
      ["Teste em iPhone SE", "RF", "Alta", "01 nov", "Revisão"],
      ["Header do site", "YT", "Baixa", "25 out", "Concluído"],
      ["Setup do projeto", "YT", "Baixa", "22 out", "Concluído"],
      ["Checklist de SEO", "LC", "Média", "03 nov", "A fazer"]
    ];
    const prioColor = (p) => (p === "Alta" ? "#a03026" : p === "Média" ? "#8a6516" : "#5b6b4f");
    rows.forEach((r, i) => {
      const y = 238 + i * 56;
      s += R(304, y - 14, 16, 16, r[4] === "Concluído" ? tr.accent : "none", { r: 2, stroke: r[4] === "Concluído" ? "none" : tr.line, sw: 1 });
      if (r[4] === "Concluído") s += T(308, y - 1, "x", { size: 11, fill: "#fff" });
      s += T(336, y, r[0], { size: 12.5, fill: r[4] === "Concluído" ? tr.muted : tr.ink, style: r[4] === "Concluído" ? "text-decoration:line-through" : "" });
      s += C(912, y - 4, 10, "#e3ded1");
      s += T(912, y - 1, r[1], { size: 8.5, font: F.mono, fill: tr.ink, anchor: "middle" });
      s += C(1016, y - 4, 3.2, prioColor(r[2]));
      s += T(1028, y, r[2], { size: 10.5, font: F.mono, fill: prioColor(r[2]) });
      s += T(1200, y, r[3], { size: 11, font: F.mono, fill: tr.muted });
      s += T(1512, y, r[4], { size: 10.5, font: F.mono, fill: r[4] === "Concluído" ? tr.accent : tr.muted, anchor: "end" });
      s += L(304, y + 16, 1512, y + 16, tr.line, 1, 0.8);
    });
    s += T(304, 890, "10 de 18 tarefas · ordenado por prazo", { size: 10.5, font: F.mono, fill: tr.muted });
    return doc(W, H, tr.bg, s);
  },
  () => {
    let s = shell({ ...tr, brand: "TRILHA", items: ["Quadro", "Lista", "Equipe", "Relatórios"], active: 0, title: "Tarefa #T-214", subtitle: "projeto site novo · sprint 12", avatar: "YT", right: "demo" });
    s += R(280, 106, 800, 800, tr.card, { r: 3, stroke: tr.line, sw: 1 });
    s += R(304, 138, 120, 22, "#f7ecd7", { r: 2 });
    s += T(316, 153, "ALTA PRIORIDADE", { size: 9.5, font: F.mono, fill: "#8a6516" });
    s += T(304, 208, "Corrigir menu mobile", { size: 30, font: F.sansSemi, fill: tr.ink, ls: -0.8 });
    s += T(304, 236, "aberta por Ytalo · 27 out · atualizada há 2 h", { size: 10.5, font: F.mono, fill: tr.muted });
    s += L(304, 258, 1056, 258, tr.line, 1);
    s += T(304, 292, "DESCRIÇÃO", { size: 9.5, font: F.mono, fill: tr.muted, ls: 1.4 });
    s += para(304, 320, "Em telas abaixo de 420 px o menu não fecha ao clicar em um link. Acontece no Safari do iOS 17 e no Chrome Android.", { size: 13, fill: tr.ink, maxWidth: 700, lh: 1.6 });
    s += T(304, 420, "CHECKLIST", { size: 9.5, font: F.mono, fill: tr.muted, ls: 1.4 });
    const checks = [["Reproduzir no emulador", true], ["Corrigir listener de clique", true], ["Testar com teclado", false], ["Atualizar changelog", false]];
    checks.forEach((c, i) => {
      const y = 450 + i * 36;
      s += R(304, y - 13, 16, 16, c[1] ? tr.accent : "none", { r: 2, stroke: c[1] ? "none" : tr.line, sw: 1 });
      if (c[1]) s += T(308, y - 1, "x", { size: 11, fill: "#fff" });
      s += T(332, y, c[0], { size: 12.5, fill: c[1] ? tr.muted : tr.ink, style: c[1] ? "text-decoration:line-through" : "" });
    });
    s += L(304, 606, 1056, 606, tr.line, 1);
    s += T(304, 640, "COMENTÁRIOS", { size: 9.5, font: F.mono, fill: tr.muted, ls: 1.4 });
    const cm = [
      ["LC", "Lia Campos", "Reproduzi no iPhone SE, confirma o bug.", "há 3 h"],
      ["YT", "Ytalo", "Correção no branch fix/menu. Falta testar Safari.", "há 2 h"]
    ];
    cm.forEach((c, i) => {
      const y = 678 + i * 84;
      s += C(316, y - 4, 12, "#e3ded1");
      s += T(316, y - 1, c[0], { size: 9, font: F.mono, fill: tr.ink, anchor: "middle" });
      s += T(340, y, c[1], { size: 12, font: F.sansMed, fill: tr.ink });
      s += T(1056, y, c[3], { size: 10, font: F.mono, fill: tr.muted, anchor: "end" });
      s += T(340, y + 22, c[2], { size: 12, fill: "#4a4b45" });
    });
    s += R(304, 826, 752, 48, "none", { r: 3, stroke: tr.line, sw: 1 });
    s += T(320, 855, "escrever comentário…", { size: 12, fill: tr.muted });
    /* painel */
    s += R(1108, 106, 428, 800, tr.card, { r: 3, stroke: tr.line, sw: 1 });
    const meta = [["RESPONSÁVEL", "Ytalo"], ["PRAZO", "01 nov 2026"], ["STATUS", "Em andamento"], ["SPRINT", "12 · encerra 03 nov"], ["ESTIMATIVA", "2 h"]];
    meta.forEach((m, i) => {
      s += T(1136, 146 + i * 70, m[0], { size: 9.5, font: F.mono, fill: tr.muted, ls: 1.2 });
      s += T(1136, 172 + i * 70, m[1], { size: 13, fill: tr.ink });
      s += L(1136, 192 + i * 70, 1508, 192 + i * 70, tr.line, 1, 0.8);
    });
    s += T(1136, 534, "ETIQUETAS", { size: 9.5, font: F.mono, fill: tr.muted, ls: 1.2 });
    ["bug", "mobile", "safari"].forEach((t, i) => {
      const w = measure(t, 10, F.mono) + 20;
      s += R(1136 + i * 76, 550, w, 24, "#eef1e9", { r: 2 });
      s += T(1146 + i * 76, 566, t, { size: 10, font: F.mono, fill: tr.accent });
    });
    s += T(1136, 626, "ATIVIDADE", { size: 9.5, font: F.mono, fill: tr.muted, ls: 1.2 });
    ["Criada por Ytalo", "Movida para andamento", "Checklist 2/4", "Comentário de Ytalo"].forEach((a, i) => {
      s += C(1140, 656 + i * 32, 3, tr.line);
      s += T(1154, 660 + i * 32, a, { size: 11.5, fill: "#4a4b45" });
    });
    s += R(1136, 800, 372, 46, tr.accent, { r: 3 });
    s += T(1322, 829, "Concluir tarefa", { size: 12, fill: "#faf9f6", anchor: "middle" });
    s += T(1322, 872, "demonstração · sem servidor", { size: 10, font: F.mono, fill: tr.muted, anchor: "middle" });
    return doc(W, H, tr.bg, s);
  }
];
