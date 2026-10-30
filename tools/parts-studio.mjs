/* Mockups — Estúdio Maru, Circuito e Alçada (sites institucionais) */
import { box, stretch, colonata, planta, corte, cadeira, campos, grade, teclado, celular, notebook } from "./art.mjs";
import { doc } from "./engine.mjs";
import { W, H, T, R, C, L, art, header, footerStrip, F, measure, para, wrap } from "./ui.mjs";

const ma = { bg: "#e9e6dc", ink: "#22261f", muted: "#8a8c80", soft: "#4c5148", line: "#c9c4b5" };

export const maru = [
  () => {
    let defs = "";
    let s = header({ bg: ma.bg, ink: ma.ink, brand: "ESTÚDIO MARU", brandFont: F.mono, brandLs: 4, brandSize: 13, items: ["Projetos", "Estúdio", "Processo", "Contato"], right: "São Paulo · 23°33'S", active: 0, opacity: 0.75 });
    s += T(64, 214, "Arquitetura", { size: 88, font: F.serif, fill: ma.ink, ls: -3 });
    s += T(64, 306, "que começa", { size: 88, font: F.serifIt, fill: ma.ink, ls: -3 });
    s += T(64, 398, "pelo chão.", { size: 88, font: F.serif, fill: ma.ink, ls: -3 });
    s += para(66, 452, "Desenhamos casas, escolas e pequenos edifícios a partir do lugar: luz, vento, terreno e vizinhança.", { size: 16, fill: ma.soft, maxWidth: 520, lh: 1.6 });
    s += L(64, 540, 520, 540, ma.ink, 1, 0.2);
    s += T(64, 574, "PROJETOS SELECIONADOS 2019 — 2026", { size: 10.5, font: F.mono, fill: ma.muted, ls: 2 });
    const a = art(660, 110, 876, 560, stretch(660, 110, 876, 560, colonata(ma.ink, "#e2ddce", 5)), "#e2ddce", "maHero");
    defs += a.defs;
    s += a.svg;
    s += T(660, 700, "Casa Pátio — Bragança Paulista, 2025", { size: 12, font: F.mono, fill: ma.muted });
    s += T(1536, 700, "01 / 09", { size: 12, font: F.mono, fill: ma.muted, anchor: "end" });
    s += L(64, 744, 1536, 744, ma.ink, 1, 0.14);
    const trio = [
      ["Casa Pátio", "residencial · 240 m²"],
      ["Escola Ipê", "educacional · 1.200 m²"],
      ["Edifício Aurora", "uso misto · 3.400 m²"]
    ];
    trio.forEach((t, i) => {
      s += T(64 + i * 500, 796, t[0], { size: 19, font: F.serif, fill: ma.ink });
      s += T(64 + i * 500, 818, t[1], { size: 11, font: F.mono, fill: ma.muted });
    });
    s += T(1536, 796, "Ver todos", { size: 12, font: F.mono, fill: ma.ink, anchor: "end" });
    /* três imagens pequenas */
    s += L(64, 848, 1536, 848, ma.ink, 1, 0.1);
    ["planta", "corte", "maquete"].forEach((label, i) => {
      const x = 64 + i * 500;
      const draw = label === "planta" ? planta(ma.ink, "#e2ddce") : label === "corte" ? corte(ma.ink, "#e2ddce") : colonata(ma.ink, "#ded9ca", 3);
      const im = art(x, 872, 200, 96, stretch(x, 872, 200, 96, draw), "#e2ddce", `maTh${i}`);
      defs += im.defs;
      s += im.svg;
      s += T(x + 216, 908, label, { size: 11, font: F.mono, fill: ma.muted });
    });
    return doc(W, H, ma.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: ma.bg, ink: ma.ink, brand: "ESTÚDIO MARU", brandFont: F.mono, brandLs: 4, brandSize: 13, right: "PROJETOS · 9", active: -1 });
    s += T(64, 186, "Projetos", { size: 60, font: F.serif, fill: ma.ink, ls: -2 });
    s += T(1536, 180, "2019 — 2026 · 9 projetos", { size: 12, font: F.mono, fill: ma.muted, anchor: "end" });
    const cards = [
      ["Casa Pátio", "Bragança Paulista · 2025 · 240 m²", colonata(ma.ink, "#e2ddce", 5)],
      ["Escola Ipê", "Itatiba · 2024 · 1.200 m²", colonata(ma.ink, "#dcd8c8", 4)],
      ["Edifício Aurora", "Campinas · 2023 · 3.400 m²", colonata(ma.ink, "#e5e0d0", 6)],
      ["Casa Vão", "Atibaia · 2022 · 180 m²", planta(ma.ink, "#e0dbcb")],
      ["Centro Cultural Linha", "Jundiaí · 2021 · 900 m²", corte(ma.ink, "#e0dbcb")]
    ];
    cards.forEach((c, i) => {
      const x = i % 2 ? 812 : 64;
      const y = 232 + Math.floor(i / 2) * 246;
      const im = art(x, y, 724, 190, stretch(x, y, 724, 190, c[2]), "#e2ddce", `maC${i}`);
      defs += im.defs;
      s += im.svg;
      s += T(x, y + 218, c[0], { size: 19, font: F.serif, fill: ma.ink });
      s += T(x + 724, y + 218, c[1], { size: 11, font: F.mono, fill: ma.muted, anchor: "end" });
    });
    return doc(W, H, ma.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = R(0, 0, 1100, 1000, "#e2ddce");
    s += T(64, 56, "ESTÚDIO MARU", { size: 12, font: F.mono, fill: ma.ink, ls: 4 });
    s += T(1536, 56, "← Projetos", { size: 12, font: F.mono, fill: ma.muted, anchor: "end" });
    s += T(64, 140, "CASA PÁTIO · RESIDENCIAL · 2025", { size: 11, font: F.mono, fill: ma.muted, ls: 2.5 });
    s += T(64, 204, "Casa Pátio", { size: 54, font: F.serif, fill: ma.ink, ls: -1.6 });
    const big = art(64, 236, 1000, 470, stretch(64, 236, 1000, 470, colonata(ma.ink, "#e2ddce", 6)), "#e2ddce", "maP1");
    defs += big.defs;
    s += big.svg;
    const p2 = art(64, 726, 320, 210, stretch(64, 726, 320, 210, planta(ma.ink, "#e7e2d3")), "#e7e2d3", "maP2");
    defs += p2.defs;
    s += p2.svg;
    const p3 = art(404, 726, 320, 210, stretch(404, 726, 320, 210, corte(ma.ink, "#e7e2d3")), "#e7e2d3", "maP3");
    defs += p3.defs;
    s += p3.svg;
    const p4 = art(744, 726, 320, 210, box(744, 726, 320, 210, cadeira("#6b5a44", "#c8b394")), "#e7e2d3", "maP4");
    defs += p4.defs;
    s += p4.svg;
    /* ficha técnica à direita */
    s += T(1120, 140, "FICHA", { size: 11, font: F.mono, fill: ma.muted, ls: 2.5 });
    const rows = [
      ["Local", "Bragança Paulista, SP"],
      ["Área", "240 m² construídos"],
      ["Terreno", "1.020 m², declive de 4 m"],
      ["Programa", "Casa térrea com dois pátios"],
      ["Estrutura", "Alvenaria + madeira laminada"],
      ["Ano", "2025 · em obra"]
    ];
    rows.forEach((r, i) => {
      s += T(1120, 190 + i * 54, r[0], { size: 10.5, font: F.mono, fill: ma.muted, ls: 1 });
      s += T(1120, 212 + i * 54, r[1], { size: 14, fill: ma.ink });
      s += L(1120, 226 + i * 54, 1536, 226 + i * 54, ma.ink, 1, 0.1);
    });
    s += T(1120, 572, "PROCESSO", { size: 11, font: F.mono, fill: ma.muted, ls: 2.5 });
    s += para(1120, 600, "Partimos do caminho do sol e dos ventos dominantes. O pátio central resolve ventilação cruzada e iluminação sem aumentar a área construída.", { size: 14, fill: ma.soft, maxWidth: 410, lh: 1.65 });
    s += T(1120, 726, "EQUIPE", { size: 11, font: F.mono, fill: ma.muted, ls: 2.5 });
    s += T(1120, 752, "Estúdio Maru + engenharia local", { size: 14, fill: ma.ink });
    s += T(1120, 792, "Materiais", { size: 11, font: F.mono, fill: ma.muted, ls: 1 });
    ["Tijolo aparente", "Madeira laminada", "Concreto polido", "Vegetação nativa"].forEach((m, i) => {
      s += T(1120 + (i % 2) * 220, 820 + Math.floor(i / 2) * 28, "· " + m, { size: 13, fill: ma.soft });
    });
    return doc(W, H, "#e2ddce", s, defs);
  }
];

const ci = { bg: "#0e1a17", ink: "#eaf3ee", muted: "#7f9a8e", accent: "#5fd0a0", card: "#132420", line: "#1f3a33" };

export const circuito = [
  () => {
    let defs = "";
    let s = header({ bg: ci.bg, ink: ci.ink, brand: "CIRCUITO", brandFont: F.monoMed, brandLs: 4, brandSize: 15, items: ["Plataforma", "Infraestrutura", "Segurança", "Docs"], right: "Entrar", active: 0, h: 84, opacity: 0.68 });
    s += T(64, 168, "MONITORAMENTO PARA TIMES PEQUENOS", { size: 11, font: F.mono, fill: ci.accent, ls: 2.5 });
    s += T(64, 268, "Veja o que quebrou", { size: 60, font: F.sansSemi, fill: ci.ink, ls: -2 });
    s += T(64, 336, "antes do cliente ver.", { size: 60, font: F.sansSemi, fill: ci.accent, ls: -2 });
    s += para(66, 392, "Monitoramento de sites, APIs e filas em um painel único. Instalação em cinco minutos, sem agente proprietário.", { size: 17, fill: "#a8bcb3", maxWidth: 540, lh: 1.55 });
    s += R(64, 470, 190, 52, ci.accent, { r: 2 });
    s += T(159, 503, "Começar grátis", { size: 14, fill: "#0e1a17", anchor: "middle" });
    s += T(280, 503, "Ver a plataforma", { size: 13, font: F.mono, fill: ci.ink, opacity: 0.8 });
    /* diagrama */
    const g = art(680, 130, 856, 420, grade("#5f8a75"), ci.card, "ciHero");
    defs += g.defs;
    s += g.svg;
    const nodes = [
      ["checkout", 760, 200, "ok"],
      ["api-pagamentos", 980, 200, "ok"],
      ["fila-emails", 1200, 200, "alerta"],
      ["banco", 900, 340, "ok"],
      ["cdn", 1180, 340, "ok"]
    ];
    nodes.forEach(([label, x, y, state]) => {
      const border = state === "alerta" ? "#e0a03a" : ci.accent;
      s += R(x, y, 190, 74, "#101f1b", { r: 3, stroke: border, sw: 1 });
      s += C(x + 18, y + 26, 4, border);
      s += T(x + 14, y + 62, label, { size: 12, font: F.mono, fill: ci.ink, opacity: 0.9 });
      s += T(x + 178, y + 26, state === "alerta" ? "3 falhas" : "99.98%", { size: 10.5, font: F.mono, fill: border, anchor: "end" });
    });
    s += L(950, 274, 950, 340, ci.accent, 1, 0.5, "3 4");
    s += L(1070, 274, 1070, 340, ci.accent, 1, 0.5, "3 4");
    s += L(1090, 237, 900, 237, ci.muted, 1, 0.3, "3 4");
    /* métricas abaixo */
    s += L(64, 600, 1536, 600, ci.ink, 1, 0.12);
    const mets = [
      ["Uptime 90 d", "99,98%"],
      ["Latência p95", "214 ms"],
      ["Incidentes", "1 em maio"],
      ["Equipe", "3 devs"]
    ];
    mets.forEach((m, i) => {
      s += T(64 + i * 372, 654, m[0], { size: 11, font: F.mono, fill: ci.muted });
      s += T(64 + i * 372, 700, m[1], { size: 30, font: F.monoMed, fill: ci.ink });
    });
    s += T(64, 780, "PROJETO CONCEITUAL · dados de exemplo", { size: 11, font: F.mono, fill: ci.muted, ls: 1 });
    ["Sem agente proprietário", "Alertas no Slack e e-mail", "Histórico de 12 meses"].forEach((t, i) => {
      s += T(64 + i * 500, 860, "— " + t, { size: 14, fill: "#a8bcb3" });
    });
    return doc(W, H, ci.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: ci.bg, ink: ci.ink, brand: "CIRCUITO", brandFont: F.monoMed, brandLs: 4, brandSize: 15, items: ["Plataforma", "Infraestrutura", "Segurança", "Docs"], right: "Entrar", active: 1, h: 84 });
    s += T(64, 176, "INFRAESTRUTURA", { size: 11, font: F.mono, fill: ci.accent, ls: 2.5 });
    s += T(64, 244, "Como o dado anda", { size: 48, font: F.sansSemi, fill: ci.ink, ls: -1.6 });
    const g = art(64, 290, 1472, 420, grade("#5f8a75"), ci.card, "ciFlow");
    defs += g.defs;
    s += g.svg;
    const steps = [
      ["1 · Coleta", "sensor HTTP a cada 30 s", 120],
      ["2 · Fila", "eventos bufferizados", 560],
      ["3 · Análise", "agregação e limiar", 980],
      ["4 · Alerta", "Slack, e-mail, webhook", 1200]
    ];
    steps.forEach(([t, d, x]) => {
      s += R(x, 400, 320, 140, "#101f1b", { r: 3, stroke: ci.line, sw: 1 });
      s += T(x + 24, 442, t, { size: 15, font: F.sansMed, fill: ci.ink });
      s += T(x + 24, 470, d, { size: 11, font: F.mono, fill: ci.muted });
      s += L(x + 24, 492, x + 296, 492, ci.accent, 1, 0.4, "3 3");
      s += T(x + 24, 520, "ver logs", { size: 10.5, font: F.mono, fill: ci.accent });
    });
    s += L(440, 470, 556, 470, ci.accent, 1.4, 0.6);
    s += L(880, 470, 976, 470, ci.accent, 1.4, 0.6);
    s += L(1300, 470, 1240, 470, ci.accent, 1.4, 0.6);
    s += T(64, 780, "Segurança", { size: 24, font: F.sansSemi, fill: ci.ink, ls: -0.6 });
    const sec = [
      ["Dados no Brasil", "Região São Paulo, backup diário."],
      ["Sem dados de cartão", "Integração por token, nunca por cópia."],
      ["Logs por 12 meses", "Retenção configurável por projeto."],
      ["Acesso por papel", "Ver, editar e administrar."]
    ];
    sec.forEach((r, i) => {
      s += T(64 + (i % 2) * 740, 826 + Math.floor(i / 2) * 56, r[0], { size: 14, fill: ci.ink });
      s += T(64 + (i % 2) * 740, 846 + Math.floor(i / 2) * 56, r[1], { size: 12, fill: "#a8bcb3" });
    });
    return doc(W, H, ci.bg, s, defs);
  },
  () => {
    let s = header({ bg: ci.bg, ink: ci.ink, brand: "CIRCUITO", brandFont: F.monoMed, brandLs: 4, brandSize: 15, right: "FALE COM A GENTE", active: -1, h: 84 });
    s += T(64, 196, "CONTATO", { size: 11, font: F.mono, fill: ci.accent, ls: 2.5 });
    s += T(64, 268, "Quer testar", { size: 54, font: F.sansSemi, fill: ci.ink, ls: -1.6 });
    s += T(64, 326, "com o time?", { size: 54, font: F.sansSemi, fill: ci.accent, ls: -1.6 });
    s += para(66, 382, "Conta o tamanho da operação e o que dói hoje. Respondemos em até um dia útil.", { size: 16, fill: "#a8bcb3", maxWidth: 460, lh: 1.6 });
    s += T(64, 470, "TIME", { size: 10.5, font: F.mono, fill: ci.muted, ls: 2 });
    s += T(64, 498, "Três pessoas em Campinas e Recife.", { size: 14, fill: ci.ink });
    s += T(64, 540, "ATENDIMENTO", { size: 10.5, font: F.mono, fill: ci.muted, ls: 2 });
    s += T(64, 568, "Seg a sex, 9h — 18h (BRT)", { size: 14, fill: ci.ink });
    s += R(64, 610, 470, 230, "#101f1b", { r: 3, stroke: ci.line, sw: 1 });
    s += T(92, 646, "RESPOSTA AUTOMÁTICA", { size: 10, font: F.mono, fill: ci.accent, ls: 1.5 });
    s += T(92, 676, "Recebemos sua mensagem.", { size: 15, fill: ci.ink });
    s += T(92, 700, "Ticket #4821 aberto às 14:32.", { size: 12, font: F.mono, fill: ci.muted });
    s += T(92, 736, "Um humano responde em", { size: 12, font: F.mono, fill: ci.muted });
    s += T(92, 758, "até 1 dia útil — é o que", { size: 12, font: F.mono, fill: ci.muted });
    s += T(92, 780, "prometemos no SLA.", { size: 12, font: F.mono, fill: ci.muted });
    /* formulário */
    s += T(800, 196, "FORMULÁRIO", { size: 10.5, font: F.mono, fill: ci.muted, ls: 2 });
    const fields = [
      ["Nome", "Marina Alves"],
      ["E-mail", "marina@empresa.com.br"],
      ["Tamanho da operação", "12 serviços monitorados"]
    ];
    fields.forEach((f, i) => {
      s += T(800, 240 + i * 92, f[0], { size: 11, font: F.mono, fill: ci.muted });
      s += R(800, 252 + i * 92, 736, 52, "#101f1b", { r: 2, stroke: ci.line, sw: 1 });
      s += T(818, 284 + i * 92, f[1], { size: 14, fill: ci.ink });
    });
    s += T(800, 516, "Mensagem", { size: 11, font: F.mono, fill: ci.muted });
    s += R(800, 528, 736, 130, "#101f1b", { r: 2, stroke: ci.accent, sw: 1 });
    s += T(818, 560, "Nosso checkout cai duas vezes por semana e", { size: 14, fill: ci.ink });
    s += T(818, 584, "descobrimos sempre pelo cliente.", { size: 14, fill: ci.ink });
    s += L(818, 596, 826, 596, ci.accent, 1.5);
    s += R(800, 690, 220, 52, ci.accent, { r: 2 });
    s += T(910, 723, "Enviar mensagem", { size: 13, fill: "#0e1a17", anchor: "middle" });
    s += T(1030, 723, "Demonstração: envio simulado", { size: 11, font: F.mono, fill: ci.muted });
    /* estado de validação */
    s += R(800, 774, 736, 62, "#101f1b", { r: 2, stroke: "#e0a03a", sw: 1 });
    s += C(824, 805, 5, "#e0a03a");
    s += T(842, 809, "Confira o e-mail: falta o domínio.", { size: 12, font: F.mono, fill: "#e0a03a" });
    s += T(800, 872, "Nenhum dado sai do navegador nesta demonstração.", { size: 11, font: F.mono, fill: ci.muted });
    return doc(W, H, ci.bg, s);
  }
];

const al = { bg: "#f5f1e8", ink: "#1b2a4a", muted: "#7d8290", accent: "#b0382a", soft: "#3d4761", line: "#d8d2c4" };

export const alcada = [
  () => {
    let defs = "";
    let s = header({ bg: al.bg, ink: al.ink, brand: "ALÇADA", brandFont: F.serifMed, brandLs: 3, brandSize: 19, items: ["Serviços", "Equipe", "Casos", "Contato"], right: "OAB/SP · desde 2009", active: 0, h: 90, opacity: 0.75 });
    s += L(64, 150, 1536, 150, al.ink, 1, 0.5);
    s += T(64, 240, "Assessoria para quem", { size: 56, font: F.serif, fill: al.ink, ls: -1.6 });
    s += T(64, 304, "prefere resolver", { size: 56, font: F.serif, fill: al.ink, ls: -1.6 });
    s += T(64, 368, "sem litígio.", { size: 56, font: F.serifIt, fill: al.accent, ls: -1.6 });
    s += para(66, 424, "Trabalhamos com contratos, trabalhista e direito empresarial de pequenas operações. Primeira conversa de 30 minutos, sem custo.", { size: 16, fill: al.soft, maxWidth: 520, lh: 1.6 });
    s += R(64, 512, 208, 52, al.ink, { r: 0 });
    s += T(168, 544, "Agendar conversa", { size: 14, fill: al.bg, anchor: "middle" });
    s += T(300, 544, "Como trabalhamos", { size: 13, font: F.mono, fill: al.ink, opacity: 0.7 });
    /* imagem principal abstrata */
    const a = art(700, 150, 836, 480, box(700, 150, 836, 480, campos(["#1b2a4a", "#9aa2b4", "#e8e2d4"])), "#e8e2d4", "alHero");
    defs += a.defs;
    s += a.svg;
    s += T(700, 664, "Sede em Campinas · atendimento remoto em todo o país", { size: 12, font: F.mono, fill: al.muted });
    /* números */
    s += L(64, 700, 1536, 700, al.ink, 1, 0.14);
    const nums = [["2009", "ano de fundação"], ["4", "advogados"], ["62%", "dos casos encerrados em acordo"]];
    nums.forEach((n, i) => {
      s += T(64 + i * 372, 764, n[0], { size: 34, font: F.serif, fill: al.ink });
      s += T(64 + i * 372, 790, n[1], { size: 11, font: F.mono, fill: al.muted });
    });
    s += T(64, 862, "ÁREAS", { size: 10.5, font: F.mono, fill: al.muted, ls: 2 });
    ["Contratos e negociação", "Trabalhista preventivo", "Societário", "Cobrança e recuperação"].forEach((t, i) => {
      s += R(64 + i * 372, 878, 340, 52, "none", { stroke: al.line, sw: 1 });
      s += T(84 + i * 372, 910, t, { size: 13, fill: al.ink });
    });
    return doc(W, H, al.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: al.bg, ink: al.ink, brand: "ALÇADA", brandFont: F.serifMed, brandLs: 3, brandSize: 19, items: ["Serviços", "Equipe", "Casos", "Contato"], right: "OAB/SP · desde 2009", active: 0, h: 90 });
    s += T(64, 190, "Serviços", { size: 50, font: F.serif, fill: al.ink, ls: -1.4 });
    s += T(1536, 184, "escopo e prazos combinados por escrito", { size: 12, font: F.mono, fill: al.muted, anchor: "end" });
    const serv = [
      ["01", "Contratos", "Revisão, redação e negociação de contratos de prestação de serviço, locação e parceria.", "7 a 15 dias"],
      ["02", "Trabalhista preventivo", "Auditoria de rotina, modelos de documento e treinamento curto com o time de RH.", "3 a 6 semanas"],
      ["03", "Societário", "Acordo de sócios, entrada e saída de sócio, alterações contratuais.", "10 a 20 dias"],
      ["04", "Cobrança", "Notificação extrajudicial, negociação e, se necessário, ação de cobrança.", "caso a caso"]
    ];
    serv.forEach((r, i) => {
      const y = 250 + i * 150;
      s += L(64, y, 1536, y, al.ink, 1, 0.12);
      s += T(64, y + 44, r[0], { size: 12, font: F.mono, fill: al.accent });
      s += T(140, y + 44, r[1], { size: 24, font: F.serif, fill: al.ink });
      s += para(560, y + 40, r[2], { size: 14, fill: al.soft, maxWidth: 640, lh: 1.55 });
      s += T(1536, y + 44, r[3], { size: 11, font: F.mono, fill: al.muted, anchor: "end" });
      s += T(1536, y + 74, "ver detalhes", { size: 11, font: F.mono, fill: al.accent, anchor: "end" });
    });
    s += L(64, 850, 1536, 850, al.ink, 1, 0.12);
    s += T(64, 900, "Primeira conversa de 30 minutos, sem custo e sem compromisso.", { size: 15, font: F.serifIt, fill: al.accent });
    s += T(1536, 900, "agendar", { size: 12, font: F.mono, fill: al.ink, anchor: "end" });
    return doc(W, H, al.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: al.bg, ink: al.ink, brand: "ALÇADA", brandFont: F.serifMed, brandLs: 3, brandSize: 19, right: "EQUIPE", active: -1, h: 90 });
    s += T(64, 190, "Equipe", { size: 50, font: F.serif, fill: al.ink, ls: -1.4 });
    s += para(700, 186, "Quatro advogados e uma paralegal. Cada caso tem um responsável direto, com nome e ramal.", { size: 15, fill: al.soft, maxWidth: 620, lh: 1.6 });
    const people = [
      ["Helena Prado", "Sócia · contratos e societário", "OAB/SP 214.881", 0],
      ["Rafael Nunes", "Trabalhista preventivo", "OAB/SP 302.114", 1],
      ["Clara Mota", "Cobrança e recuperação", "OAB/SP 388.902", 2],
      ["Diego Sá", "Paralegal · prazos e protocolos", "—", 0]
    ];
    people.forEach((p, i) => {
      const x = 64 + i * 372;
      const im = art(x, 250, 340, 380, box(x, 250, 340, 380, `<circle cx="50" cy="42" r="19" fill="#1b2a4a"/><path d="M18,92 Q50,58 82,92 Z" fill="#1b2a4a"/>`), ["#e6e0d2", "#dfd8c8", "#e9e3d5", "#dcd5c5"][i], `alP${i}`);
      defs += im.defs;
      s += im.svg;
      s += T(x, 668, p[0], { size: 18, font: F.serif, fill: al.ink });
      s += T(x, 692, p[1], { size: 12, fill: al.soft });
      s += T(x, 714, p[2], { size: 10.5, font: F.mono, fill: al.muted });
    });
    s += L(64, 760, 1536, 760, al.ink, 1, 0.12);
    s += T(64, 806, "TRABALHE COM A GENTE", { size: 10.5, font: F.mono, fill: al.muted, ls: 2 });
    s += T(64, 842, "Sem vaga aberta agora. Currículos ficam em arquivo por seis meses.", { size: 15, fill: al.ink });
    s += R(64, 872, 240, 50, "none", { stroke: al.ink, sw: 1 });
    s += T(184, 903, "Enviar currículo", { size: 13, fill: al.ink, anchor: "middle" });
    s += T(1536, 903, "contato@alcada.exemplo", { size: 12, font: F.mono, fill: al.muted, anchor: "end" });
    return doc(W, H, al.bg, s, defs);
  }
];
