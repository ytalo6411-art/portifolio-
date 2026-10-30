/* Mockups — Grão, Onda e Assina (landing pages) + Ritmo e Malha (experimentos) */
import { box, arcos, campos } from "./art.mjs";
import { doc } from "./engine.mjs";
import { W, H, T, R, C, L, art, header, F, measure, para, wrap } from "./ui.mjs";

/* ============ Grão — assinatura de café ============ */

const gr = { bg: "#f3ece0", ink: "#2a1c12", muted: "#8b7a66", accent: "#a3471f", soft: "#55402e" };

export const grao = [
  () => {
    let defs = "";
    let s = header({ bg: gr.bg, ink: gr.ink, brand: "GRÃO", brandFont: F.serifMed, brandSize: 22, brandLs: 2, items: ["Como funciona", "Cafés", "Planos", "Presente"], right: "entrar", active: 0, h: 86, opacity: 0.7 });
    s += T(64, 192, "ASSINATURA DE CAFÉ ESPECIAL", { size: 11, font: F.mono, fill: gr.accent, ls: 2.5 });
    s += T(64, 296, "Todo mês,", { size: 82, font: F.serif, fill: gr.ink, ls: -2.4 });
    s += T(64, 384, "um café que", { size: 82, font: F.serif, fill: gr.ink, ls: -2.4 });
    s += T(64, 472, "ninguém escolheu", { size: 82, font: F.serifIt, fill: gr.accent, ls: -2.4 });
    s += T(64, 560, "por você.", { size: 82, font: F.serif, fill: gr.ink, ls: -2.4 });
    s += para(66, 612, "Duas torras por mês, de produtores independentes. Você conta o que gosta; a gente escolhe a próxima xícara.", { size: 16, fill: gr.soft, maxWidth: 540, lh: 1.6 });
    s += R(64, 686, 210, 54, gr.ink, { r: 999 });
    s += T(169, 719, "Começar agora", { size: 15, fill: gr.bg, anchor: "middle" });
    s += T(300, 719, "a partir de R$ 69/mês", { size: 12, font: F.mono, fill: gr.muted });
    /* saco de café ilustrado */
    const a = art(720, 130, 816, 560, box(720, 130, 816, 560, `
      <path d="M22,92 L18,34 Q18,20 32,20 L68,20 Q82,20 82,34 L78,92 Z" fill="#c9a87f"/>
      <path d="M18,34 Q18,20 32,20 L68,20 Q82,20 82,34 L80,42 L20,42 Z" fill="#b08a5c"/>
      <path d="M30,20 L30,12 L70,12 L70,20" fill="#a97f50"/>
      <path d="M20,42 L80,42" stroke="#8b6a44" stroke-width="0.9" opacity="0.55"/>
      <rect x="30" y="52" width="40" height="28" fill="#f3ece0" opacity="0.92"/>
      <text x="50" y="64" font-family="Maru Mono" font-size="3.4" fill="#a3471f" text-anchor="middle">TORRA 018</text>
      <text x="50" y="70" font-family="Maru Serif" font-size="6.4" fill="#2a1c12" text-anchor="middle">GRAO</text>
      <text x="50" y="76" font-family="Maru Mono" font-size="2.8" fill="#8b7a66" text-anchor="middle">250 g · moido</text>
      <path d="M26,88 L74,88" stroke="#8b6a44" stroke-width="0.8" opacity="0.45"/>
      <circle cx="50" cy="34" r="4" fill="#a3471f" opacity="0.75"/>
    `), "#eadfcd", "grHero");
    defs += a.defs;
    s += a.svg;
    s += T(720, 726, "Torra 018 — Serra da Mantiqueira", { size: 12, font: F.mono, fill: gr.muted });
    s += T(1536, 726, "outubro · lote de 240 assinantes", { size: 12, font: F.mono, fill: gr.muted, anchor: "end" });
    /* três passos */
    s += L(64, 774, 1536, 774, gr.ink, 1, 0.16);
    const steps = [
      ["01", "Você responde", "Um questionário de 6 perguntas."],
      ["02", "Escolhemos", "Curadoria por perfil de xícara."],
      ["03", "Chega torrado", "Moagem na data do envio."]
    ];
    steps.forEach((st, i) => {
      const x = 64 + i * 300;
      s += T(x, 818, st[0], { size: 11, font: F.mono, fill: gr.accent });
      s += T(x, 852, st[1], { size: 18, font: F.serif, fill: gr.ink });
      s += T(x, 876, st[2], { size: 12, fill: gr.soft });
    });
    s += R(1040, 800, 496, 120, "#eadfcd", { r: 2 });
    s += T(1064, 836, "Esta semana", { size: 10.5, font: F.mono, fill: gr.muted, ls: 1 });
    s += T(1064, 868, "Média 4,8 de 5 em 312 avaliações.", { size: 13, fill: gr.ink });
    s += T(1064, 892, "Cancelamento em um clique, sem ligação.", { size: 12, fill: gr.soft });
    return doc(W, H, gr.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: gr.bg, ink: gr.ink, brand: "GRÃO", brandFont: F.serifMed, brandSize: 22, brandLs: 2, items: ["Como funciona", "Cafés", "Planos", "Presente"], right: "entrar", active: 0, h: 86 });
    s += T(64, 178, "COMO FUNCIONA", { size: 11, font: F.mono, fill: gr.accent, ls: 2.5 });
    s += T(64, 250, "Seis perguntas,", { size: 54, font: F.serif, fill: gr.ink, ls: -1.6 });
    s += T(64, 308, "duas torras por mês.", { size: 54, font: F.serifIt, fill: gr.accent, ls: -1.6 });
    /* mock de questionário */
    s += R(64, 368, 640, 470, "#ffffff", { r: 3, stroke: "#ded3bf", sw: 1 });
    s += T(96, 408, "PERGUNTA 3 DE 6", { size: 10, font: F.mono, fill: gr.muted, ls: 1.5 });
    s += R(96, 420, 576, 4, "#eee5d6", { r: 2 });
    s += R(96, 420, 288, 4, gr.accent, { r: 2 });
    s += T(96, 468, "Como você toma?", { size: 24, font: F.serif, fill: gr.ink });
    ["Com leite, todos os dias", "Puro, sem açúcar", "Prensa francesa", "Espresso"].forEach((o, i) => {
      const y = 496 + i * 62;
      const on = i === 1;
      s += R(96, y, 576, 50, on ? "#f6eee1" : "none", { r: 2, stroke: on ? gr.accent : "#e2d8c6", sw: 1 });
      s += C(118, y + 25, 7, on ? gr.accent : "none");
      if (!on) s += `<circle cx="118" cy="${y + 25}" r="7" fill="none" stroke="#cdbfa8" stroke-width="1"/>`;
      s += T(140, y + 30, o, { size: 13.5, fill: gr.ink });
    });
    s += T(96, 786, "voltar", { size: 11, font: F.mono, fill: gr.muted });
    s += T(624, 786, "continuar", { size: 11, font: F.mono, fill: gr.accent, anchor: "end" });
    /* explicação à direita */
    const items = [
      ["Curadoria por perfil", "Nada de sorteio: a escolha considera origem, processo e intensidade do que você marcou."],
      ["Torra semanal", "O café sai do torrador na segunda e chega até quinta na sua casa."],
      ["Pausa fácil", "Pular um mês ou cancelar leva dois cliques. Sem fidelidade e sem multa."],
      ["Ficha do produtor", "Cada pacote vem com altitude, variedade e o nome de quem plantou."]
    ];
    items.forEach((it, i) => {
      const y = 380 + i * 118;
      s += T(760, y, it[0], { size: 20, font: F.serif, fill: gr.ink });
      s += para(760, y + 26, it[1], { size: 13.5, fill: gr.soft, maxWidth: 720, lh: 1.6 });
      s += L(760, y + 82, 1536, y + 82, gr.ink, 1, 0.1);
    });
    /* ilustração do pacote */
    const p = art(1180, 620, 356, 230, box(1180, 620, 356, 230, `
      <path d="M30,26 L70,26 L74,44 L74,88 L26,88 L26,44 Z" fill="#c8a67c"/>
      <path d="M30,26 L70,26 L72,38 L28,38 Z" fill="#b08a5c"/>
      <circle cx="50" cy="64" r="8" fill="#a3471f"/>
    `), "#eadfcd", "grPack");
    defs += p.defs;
    s += p.svg;
    return doc(W, H, gr.bg, s, defs);
  },
  () => {
    let defs = "";
    let s = header({ bg: gr.bg, ink: gr.ink, brand: "GRÃO", brandFont: F.serifMed, brandSize: 22, brandLs: 2, items: ["Como funciona", "Cafés", "Planos", "Presente"], right: "entrar", active: 2, h: 86 });
    s += T(64, 178, "PLANOS", { size: 11, font: F.mono, fill: gr.accent, ls: 2.5 });
    s += T(64, 248, "Escolha o tamanho", { size: 48, font: F.serif, fill: gr.ink, ls: -1.4 });
    s += T(64, 300, "da sua xícara.", { size: 48, font: F.serifIt, fill: gr.accent, ls: -1.4 });
    s += T(64, 342, "Frete incluso em todo o Brasil. Cancele quando quiser.", { size: 13, fill: gr.soft });
    const plans = [
      ["Gota", "R$ 69", "1 pacote · 250 g", false, ["Uma origem por mês", "Moagem a escolher", "Ficha do produtor"]],
      ["Xícara", "R$ 129", "2 pacotes · 500 g", true, ["Duas origens por mês", "Duas moagens diferentes", "Frete grátis", "Acesso a lotes raros"]],
      ["Buquê", "R$ 219", "4 pacotes · 1 kg", false, ["Quatro origens", "Brinde de filtro", "Vídeo do produtor", "Prioridade em microlotes"]]
    ];
    plans.forEach((pl, i) => {
      const x = 64 + i * 500;
      const on = pl[3];
      s += R(x, 396, 464, 420, on ? "#ffffff" : "none", { r: 3, stroke: on ? gr.accent : "#ded3bf", sw: 1 });
      if (on) {
        s += R(x + 24, 372, 132, 26, gr.accent, { r: 2 });
        s += T(x + 34, 390, "MAIS ESCOLHIDO", { size: 9.5, font: F.mono, fill: "#ffffff", ls: 1 });
      }
      s += T(x + 32, 448, pl[0], { size: 26, font: F.serif, fill: gr.ink });
      s += T(x + 32, 500, pl[1], { size: 34, font: F.serifMed, fill: gr.ink });
      s += T(x + 32, 524, "por mês · " + pl[2], { size: 11, font: F.mono, fill: gr.muted });
      pl[4].forEach((li, j) => {
        s += T(x + 32, 570 + j * 32, "· " + li, { size: 13, fill: gr.soft });
      });
      s += R(x + 32, 748, 400, 48, on ? gr.accent : "none", { r: 999, stroke: on ? "none" : gr.ink, sw: 1 });
      s += T(x + 232, 778, "Assinar " + pl[0].toLowerCase(), { size: 13, fill: on ? "#ffffff" : gr.ink, anchor: "middle" });
    });
    s += L(64, 862, 1536, 862, gr.ink, 1, 0.12);
    s += para(64, 896, "Primeira entrega em até 5 dias úteis. Não gostou da torra? Mandamos outra sem custo — já aconteceu 11 vezes em 2.400 entregas.", { size: 12.5, fill: gr.soft, maxWidth: 900, lh: 1.6 });
    return doc(W, H, gr.bg, s, defs);
  }
];

/* ============ Onda — app de sons ============ */

const on = { bg: "#12233a", ink: "#eaf2fb", muted: "#8aa3bf", accent: "#7fb2e5", card: "#1a2f4b" };

export const onda = [
  () => {
    let s = header({ bg: on.bg, ink: on.ink, brand: "ONDA", brandFont: F.sansSemi, brandSize: 20, brandLs: 3, items: ["Recursos", "Sons", "Preço", "Blog"], right: "baixar", active: 0, h: 84, opacity: 0.65 });
    s += T(64, 186, "FOCO · SONO · RESPIRAÇÃO", { size: 11, font: F.mono, fill: on.accent, ls: 2.5 });
    s += T(64, 276, "Barulho na", { size: 70, font: F.sansSemi, fill: on.ink, ls: -2.4 });
    s += T(64, 350, "medida certa", { size: 70, font: F.sansSemi, fill: on.accent, ls: -2.4 });
    s += T(64, 424, "para o dia render.", { size: 70, font: F.sansSemi, fill: on.ink, ls: -2.4 });
    s += para(66, 474, "Camadas de som ambiente com mistura ajustável, timer e modo offline. Sem conta obrigatória, sem anúncio no meio do silêncio.", { size: 16, fill: "#a9c0d8", maxWidth: 520, lh: 1.6 });
    s += R(64, 556, 190, 52, on.accent, { r: 999 });
    s += T(159, 588, "Baixar grátis", { size: 13, fill: "#12233a", anchor: "middle" });
    s += T(274, 588, "iOS · Android · Web", { size: 11, font: F.mono, fill: on.muted });
    /* telas do app */
    const phone = (x, y, label, active) => {
      let p = R(x, y, 236, 470, "#0d1a2b", { r: 22, stroke: "#2b4667", sw: 1 });
      p += R(x + 10, y + 10, 216, 450, "#14273f", { r: 16 });
      p += T(x + 22, y + 46, label, { size: 10, font: F.mono, fill: on.muted, ls: 1 });
      p += T(x + 118, y + 120, "42:15", { size: 30, font: F.monoMed, fill: on.ink, anchor: "middle" });
      p += T(x + 118, y + 142, "sessão de foco", { size: 9, font: F.mono, fill: on.muted, anchor: "middle" });
      const bars = active === 0 ? [18, 30, 24, 40, 34, 46, 28, 38, 22, 32, 26, 42] : active === 1 ? [10, 16, 22, 30, 36, 42, 36, 30, 22, 16, 12, 8] : [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
      bars.forEach((h, i) => {
        p += R(x + 26 + i * 16, y + 250 - h / 2, 8, h, on.accent, { r: 4, opacity: 0.35 + i * 0.05 });
      });
      /* camadas */
      const layers = active === 0 ? ["Chuva fina", "Café", "Ruído marrom"] : active === 1 ? ["Ondas", "Vento em bambu"] : ["Ruído branco"];
      layers.forEach((l, i) => {
        const ly = y + 300 + i * 44;
        p += T(x + 24, ly, l, { size: 9.5, fill: on.ink });
        p += R(x + 24, ly + 10, 188, 4, "#20364f", { r: 2 });
        p += R(x + 24, ly + 10, 188 * [0.7, 0.35, 0.55][i], 4, on.accent, { r: 2 });
      });
      return p;
    };
    s += phone(900, 150, "FOCO", 0);
    s += phone(1160, 110, "SONO", 1);
    s += phone(1420, 190, "RESPIRAÇÃO", 2);
    /* faixa inferior */
    s += L(64, 660, 1536, 660, on.ink, 1, 0.12);
    const feats = [
      ["Mistura livre", "Combine até 6 camadas e salve presets."],
      ["Timer inteligente", "Fade out de 5 min, retomada de onde parou."],
      ["Offline", "Baixe sons e use no avião, sem dados."],
      ["Sem anúncios", "Uma vez por ano, nada no meio do som."]
    ];
    feats.forEach((f, i) => {
      s += T(64 + i * 372, 706, f[0], { size: 15, font: F.sansMed, fill: on.ink });
      s += para(64 + i * 372, 732, f[1], { size: 12.5, fill: "#a9c0d8", maxWidth: 300, lh: 1.55 });
    });
    s += T(64, 884, "Projeto conceitual — o app não existe nas lojas. Este mockup demonstra layout e estados.", { size: 11, font: F.mono, fill: on.muted });
    return doc(W, H, on.bg, s);
  },
  () => {
    let s = header({ bg: on.bg, ink: on.ink, brand: "ONDA", brandFont: F.sansSemi, brandSize: 20, brandLs: 3, items: ["Recursos", "Sons", "Preço", "Blog"], right: "baixar", active: 0, h: 84 });
    s += T(64, 178, "RECURSOS", { size: 11, font: F.mono, fill: on.accent, ls: 2.5 });
    s += T(64, 246, "Misture, salve,", { size: 50, font: F.sansSemi, fill: on.ink, ls: -1.8 });
    s += T(64, 302, "volte depois.", { size: 50, font: F.sansSemi, fill: on.accent, ls: -1.8 });
    /* mock de mixer */
    s += R(64, 356, 720, 480, on.card, { r: 4 });
    s += T(96, 396, "MISTURA · CHUVA NA JANELA", { size: 10, font: F.mono, fill: on.muted, ls: 1.5 });
    s += T(752, 396, "02:14", { size: 11, font: F.mono, fill: on.ink, anchor: "end" });
    const tracks = [
      ["Chuva fina", 0.72, "#7fb2e5"],
      ["Trovão distante", 0.28, "#6f9fd0"],
      ["Café ao fundo", 0.45, "#9ec6ec"],
      ["Ruído marrom", 0.62, "#5f8fbf"],
      ["Ventilador", 0.2, "#88b4dd"]
    ];
    tracks.forEach((t, i) => {
      const y = 440 + i * 66;
      s += T(96, y, t[0], { size: 12.5, fill: on.ink });
      s += R(96, y + 14, 560, 7, "#20364f", { r: 4 });
      s += R(96, y + 14, 560 * t[1], 7, t[2], { r: 4 });
      s += C(96 + 560 * t[1], y + 17, 8, t[2]);
      s += T(752, y, Math.round(t[1] * 100) + "%", { size: 10.5, font: F.mono, fill: on.muted, anchor: "end" });
    });
    s += L(96, 772, 752, 772, "#2b4667", 1);
    s += R(96, 790, 120, 34, on.accent, { r: 3 });
    s += T(156, 812, "salvar preset", { size: 10.5, font: F.mono, fill: "#12233a", anchor: "middle" });
    s += T(752, 812, "fade out em 5 min", { size: 10.5, font: F.mono, fill: on.muted, anchor: "end" });
    /* lista de recursos */
    const features = [
      ["Camadas independentes", "Volume, filtro passa-baixa e panorama por camada."],
      ["Presets", "Salve combinações e troque com um toque."],
      ["Timer com fade", "De 5 a 120 minutos, com saída suave."],
      ["Offline", "Pacotes de 40 MB, sem perda perceptível."]
    ];
    features.forEach((f, i) => {
      const y = 400 + i * 112;
      s += T(848, y, f[0], { size: 18, font: F.sansMed, fill: on.ink });
      s += para(848, y + 24, f[1], { size: 13, fill: "#a9c0d8", maxWidth: 660, lh: 1.6 });
      s += L(848, y + 72, 1536, y + 72, on.ink, 1, 0.1);
    });
    return doc(W, H, on.bg, s);
  },
  () => {
    let s = header({ bg: on.bg, ink: on.ink, brand: "ONDA", brandFont: F.sansSemi, brandSize: 20, brandLs: 3, right: "baixar", active: -1, h: 84 });
    s += R(64, 150, 740, 520, on.card, { r: 4 });
    s += T(96, 196, "BAIXAR", { size: 10.5, font: F.mono, fill: on.accent, ls: 2 });
    s += T(96, 252, "Comece com", { size: 42, font: F.sansSemi, fill: on.ink, ls: -1.4 });
    s += T(96, 302, "três camadas grátis.", { size: 42, font: F.sansSemi, fill: on.accent, ls: -1.4 });
    ["App Store", "Google Play", "Abrir no navegador"].forEach((st, i) => {
      const y = 356 + i * 66;
      s += R(96, y, 340, 52, "none", { r: 3, stroke: "#2b4667", sw: 1 });
      s += T(118, y + 32, st, { size: 13, fill: on.ink });
      s += T(416, y + 32, "→", { size: 13, font: F.mono, fill: on.muted, anchor: "end" });
    });
    s += T(96, 590, "Grátis · 6,4 MB · sem cadastro para começar", { size: 11, font: F.mono, fill: on.muted });
    s += T(96, 622, "Requer iOS 15+ ou Android 9+", { size: 11, font: F.mono, fill: on.muted });
    /* QR */
    s += R(860, 150, 300, 300, "#eaf2fb", { r: 4 });
    let qr = "";
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        const on2 = (x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0 || (x < 4 && y < 4) || (x > 10 && y < 4) || (x < 4 && y > 10);
        if (on2) qr += R(880 + x * 18, 170 + y * 18, 16, 16, "#12233a");
      }
    }
    s += qr;
    s += T(1010, 486, "QR de demonstração — não leva a lugar nenhum.", { size: 10.5, font: F.mono, fill: on.muted, anchor: "middle" });
    /* planos */
    s += T(1220, 196, "PLANOS", { size: 10.5, font: F.mono, fill: on.accent, ls: 2 });
    [["Grátis", "camadas básicas, 3 presets"], ["Onda+", "R$ 9,90/mês · tudo liberado"]].forEach((p, i) => {
      const y = 230 + i * 120;
      s += R(1220, y, 316, 104, i === 1 ? on.card : "none", { r: 3, stroke: i === 1 ? on.accent : "#2b4667", sw: 1 });
      s += T(1244, y + 34, p[0], { size: 16, font: F.sansMed, fill: on.ink });
      s += T(1244, y + 58, p[1], { size: 11.5, fill: "#a9c0d8" });
      s += T(1244, y + 84, i === 0 ? "usar agora" : "testar 14 dias", { size: 10.5, font: F.mono, fill: on.accent });
    });
    /* faixa de ondas decorativa */
    const wave = [];
    for (let i = 0; i <= 60; i++) {
      const x = 860 + i * 11;
      const y = 600 + Math.sin(i / 3) * 26;
      wave.push(`${i ? "L" : "M"}${x},${y.toFixed(1)}`);
    }
    s += `<path d="${wave.join(" ")}" fill="none" stroke="#7fb2e5" stroke-width="1.2" opacity="0.5"/>`;
    s += T(860, 700, "Feito com Web Audio e muito silêncio.", { size: 12, font: F.mono, fill: on.muted });
    s += T(1536, 700, "Onda · projeto conceitual 2026", { size: 11, font: F.mono, fill: on.muted, anchor: "end" });
    s += R(860, 760, 676, 1, "#2b4667");
    s += T(860, 800, "PERGUNTAS", { size: 10.5, font: F.mono, fill: on.accent, ls: 2 });
    ["Consome bateria em segundo plano?", "Funciona com fones com cancelamento?", "Dá para exportar a mistura?"].forEach((q, i) => {
      s += T(860 + (i % 2) * 350, 836 + Math.floor(i / 2) * 34, q, { size: 12, fill: "#a9c0d8", opacity: 0.9 });
    });
    return doc(W, H, on.bg, s);
  }
];

/* ============ Assina — assinatura digital ============ */

const as = { bg: "#f6f6f4", ink: "#14171c", muted: "#8b9099", accent: "#2f4bd8", card: "#ffffff", line: "#e2e2dd" };

export const assina = [
  () => {
    let defs = "";
    let s = header({ bg: as.bg, ink: as.ink, brand: "assina.", brandFont: F.sansBold, brandSize: 21, items: ["Produto", "Preços", "Para empresas", "Ajuda"], right: "entrar", active: 0, h: 86, opacity: 0.7 });
    s += T(64, 190, "ASSINATURA DIGITAL", { size: 11, font: F.mono, fill: as.accent, ls: 2.5 });
    s += T(64, 290, "Documento assinado", { size: 62, font: F.sansSemi, fill: as.ink, ls: -2.2 });
    s += T(64, 356, "em dois minutos.", { size: 62, font: F.sansSemi, fill: as.ink, ls: -2.2 });
    s += para(66, 404, "Envie, colete assinaturas e guarde tudo com validade jurídica. Sem imprimir, sem escanear, sem correr atrás de ninguém.", { size: 16, fill: "#4c5158", maxWidth: 500, lh: 1.6 });
    s += R(64, 486, 190, 52, as.accent, { r: 4 });
    s += T(159, 518, "Criar conta grátis", { size: 13, fill: "#ffffff", anchor: "middle" });
    s += T(276, 518, "Ver demonstração", { size: 12, font: F.mono, fill: as.ink, opacity: 0.7 });
    s += T(64, 574, "Sem cartão · 5 documentos por mês no plano gratuito", { size: 11, font: F.mono, fill: as.muted });
    /* documento flutuante */
    s += R(700, 140, 480, 600, "#ffffff", { r: 3, stroke: "#e6e6e0", sw: 1 });
    s += T(732, 186, "CONTRATO DE PRESTAÇÃO DE SERVIÇO", { size: 11, font: F.mono, fill: as.muted, ls: 1 });
    for (let i = 0; i < 9; i++) {
      s += R(732, 216 + i * 20, 416 - (i % 3) * 60, 7, "#e8e8e2", { r: 3 });
    }
    s += L(732, 430, 1148, 430, as.line, 1);
    s += T(732, 466, "Assinaturas", { size: 11, font: F.mono, fill: as.muted, ls: 1 });
    [["Marina Alves", "assinado", "#2f6b4f"], ["Tiago Freire", "aguardando", "#b07a2a"], ["Ler Editora Ltda.", "assinado", "#2f6b4f"]].forEach((r, i) => {
      const y = 496 + i * 66;
      s += R(732, y - 22, 416, 52, "#fbfbf9", { r: 2, stroke: as.line, sw: 1 });
      s += T(752, y, r[0], { size: 12.5, fill: as.ink });
      s += C(1090, y - 4, 3.2, r[2]);
      s += T(1100, y, r[1], { size: 10, font: F.mono, fill: r[2] });
      s += T(752, y + 18, i === 2 ? "CNPJ · 28/10 às 14:02" : "CPF · 28/10 às " + ["13:41", "—"][i], { size: 9.5, font: F.mono, fill: as.muted });
    });
    s += R(732, 690, 190, 40, as.accent, { r: 3 });
    s += T(827, 715, "enviar lembrete", { size: 10.5, font: F.mono, fill: "#fff", anchor: "middle" });
    /* checklist ao lado */
    const checks = [
      ["Validade jurídica", "MP 2.200-2/2001 · assinatura eletrônica avançada."],
      ["Trilha de auditoria", "IP, hora e hash de cada assinatura."],
      ["Integrações", "Google Drive, Notion e API REST."]
    ];
    checks.forEach((c, i) => {
      const y = 190 + i * 120;
      s += T(1240, y, c[0], { size: 15, font: F.sansMed, fill: as.ink });
      s += para(1240, y + 24, c[1], { size: 12, fill: "#4c5158", maxWidth: 300, lh: 1.55 });
    });
    s += L(64, 762, 1536, 762, as.line, 1);
    const logos = ["Ler Editora", "Norte Studio", "Casa Viva", "Clínica Árvo", "Bento & Sá"];
    logos.forEach((l, i) => {
      s += T(64 + i * 300, 812, l, { size: 14, font: F.serifMed, fill: as.muted });
    });
    s += T(64, 856, "Empresas fictícias · este é um projeto conceitual, sem clientes reais.", { size: 10.5, font: F.mono, fill: as.muted });
    s += T(64, 906, "2.400 documentos assinados na demonstração", { size: 11, font: F.mono, fill: as.muted });
    return doc(W, H, as.bg, s, defs);
  },
  () => {
    let s = header({ bg: as.bg, ink: as.ink, brand: "assina.", brandFont: F.sansBold, brandSize: 21, items: ["Produto", "Preços", "Para empresas", "Ajuda"], right: "entrar", active: 0, h: 86 });
    s += T(64, 178, "FLUXO", { size: 11, font: F.mono, fill: as.accent, ls: 2.5 });
    s += T(64, 244, "Três passos,", { size: 50, font: F.sansSemi, fill: as.ink, ls: -1.8 });
    s += T(64, 300, "nenhuma impressora.", { size: 50, font: F.sansSemi, fill: as.accent, ls: -1.8 });
    const steps = [
      ["1", "Envie o documento", "PDF, DOCX ou um link. Arraste para a tela."],
      ["2", "Marque os campos", "Assinatura, data, rubrica e iniciais."],
      ["3", "Envie para assinar", "Acompanhe quem já assinou em tempo real."]
    ];
    steps.forEach((st, i) => {
      const x = 64 + i * 500;
      s += R(x, 356, 464, 240, as.card, { r: 4, stroke: as.line, sw: 1 });
      s += T(x + 28, 396, st[0], { size: 11, font: F.mono, fill: as.accent });
      s += T(x + 28, 436, st[1], { size: 20, font: F.sansSemi, fill: as.ink });
      s += para(x + 28, 466, st[2], { size: 13, fill: "#4c5158", maxWidth: 380, lh: 1.6 });
      /* mini preview distinto por passo */
      if (i === 0) {
        s += R(x + 28, 522, 404, 44, "#f4f5f2", { r: 2, stroke: as.line, sw: 1 });
        s += T(x + 44, 549, "contrato-locacao.pdf", { size: 11, font: F.mono, fill: as.ink });
        s += T(x + 416, 549, "320 KB", { size: 10, font: F.mono, fill: as.muted, anchor: "end" });
      } else if (i === 1) {
        s += R(x + 28, 522, 404, 44, "#f4f5f2", { r: 2, stroke: as.line, sw: 1 });
        s += R(x + 44, 536, 120, 16, "none", { r: 1, stroke: as.accent, sw: 1 });
        s += T(x + 50, 548, "assinar aqui", { size: 8.5, font: F.mono, fill: as.accent });
        s += R(x + 184, 536, 60, 16, "none", { r: 1, stroke: as.line, sw: 1 });
        s += T(x + 190, 548, "data", { size: 8.5, font: F.mono, fill: as.muted });
      } else {
        s += R(x + 28, 522, 404, 44, "#f4f5f2", { r: 2, stroke: as.line, sw: 1 });
        s += C(x + 44, 538, 3, "#2f6b4f");
        s += T(x + 54, 542, "Marina assinou", { size: 10.5, fill: as.ink });
        s += T(x + 416, 542, "13:41", { size: 10, font: F.mono, fill: as.muted, anchor: "end" });
      }
    });
    /* tela de assinatura */
    s += R(64, 636, 1472, 300, as.card, { r: 4, stroke: as.line, sw: 1 });
    s += T(96, 676, "VISUALIZAR DOCUMENTO", { size: 10, font: F.mono, fill: as.muted, ls: 1.4 });
    s += R(96, 694, 560, 210, "#fbfbf9", { r: 2, stroke: as.line, sw: 1 });
    for (let i = 0; i < 6; i++) s += R(120, 722 + i * 26, 500 - (i % 2) * 90, 6, "#e8e8e2", { r: 3 });
    s += R(120, 860, 240, 1, "none");
    s += `<path d="M520,860 q14,-22 26,0 q12,20 24,-6" fill="none" stroke="${as.accent}" stroke-width="1.6"/>`;
    s += R(500, 838, 130, 34, "none", { r: 1, stroke: as.accent, sw: 1 });
    s += T(696, 676, "PARTICIPANTES", { size: 10, font: F.mono, fill: as.muted, ls: 1.4 });
    [["Marina Alves", "assinou", "#2f6b4f"], ["Tiago Freire", "visualizou", "#b07a2a"], ["Ler Editora", "convidado", "#8b9099"]].forEach((p, i) => {
      s += T(696, 712 + i * 40, p[0], { size: 12.5, fill: as.ink });
      s += T(900, 712 + i * 40, p[1], { size: 10.5, font: F.mono, fill: p[2] });
    });
    s += T(1040, 676, "AÇÕES", { size: 10, font: F.mono, fill: as.muted, ls: 1.4 });
    s += R(1040, 694, 300, 44, as.accent, { r: 3 });
    s += T(1190, 720, "Enviar para 3 pessoas", { size: 11, font: F.mono, fill: "#fff", anchor: "middle" });
    s += R(1040, 750, 300, 44, "none", { r: 3, stroke: as.line, sw: 1 });
    s += T(1190, 776, "Baixar com auditoria", { size: 11, font: F.mono, fill: as.ink, anchor: "middle" });
    s += T(1040, 828, "demonstração · sem envio real de e-mail", { size: 10, font: F.mono, fill: as.muted });
    return doc(W, H, as.bg, s);
  },
  () => {
    let s = header({ bg: as.bg, ink: as.ink, brand: "assina.", brandFont: F.sansBold, brandSize: 21, items: ["Produto", "Preços", "Para empresas", "Ajuda"], right: "entrar", active: 1, h: 86 });
    s += T(64, 178, "PREÇOS", { size: 11, font: F.mono, fill: as.accent, ls: 2.5 });
    s += T(64, 246, "Pague pelo uso,", { size: 48, font: F.sansSemi, fill: as.ink, ls: -1.6 });
    s += T(64, 300, "não pelo assento.", { size: 48, font: F.sansSemi, fill: as.accent, ls: -1.6 });
    const plans = [
      ["Grátis", "R$ 0", "5 documentos/mês", false, ["1 usuário", "Assinatura eletrônica", "Trilha de auditoria", "Suporte por e-mail"]],
      ["Pro", "R$ 39", "por mês · 100 documentos", true, ["5 usuários", "Campos personalizados", "Integração com Drive", "Suporte em 1 dia útil"]],
      ["Empresa", "R$ 149", "por mês · ilimitado", false, ["Usuários ilimitados", "Marca própria no documento", "API e webhooks", "Suporte prioritário"]]
    ];
    plans.forEach((p, i) => {
      const x = 64 + i * 500;
      const on = p[3];
      s += R(x, 366, 464, 402, on ? as.card : "none", { r: 4, stroke: on ? as.accent : as.line, sw: 1 });
      s += T(x + 32, 410, p[0], { size: 16, font: F.sansMed, fill: as.ink });
      s += T(x + 32, 466, p[1], { size: 34, font: F.sansSemi, fill: as.ink });
      s += T(x + 32, 492, p[2], { size: 10.5, font: F.mono, fill: as.muted });
      p[4].forEach((li, j) => {
        s += T(x + 32, 536 + j * 30, "· " + li, { size: 12.5, fill: "#4c5158" });
      });
      s += R(x + 32, 690, 400, 46, on ? as.accent : "none", { r: 3, stroke: on ? "none" : as.ink, sw: 1 });
      s += T(x + 232, 718, "Começar", { size: 12, fill: on ? "#fff" : as.ink, anchor: "middle" });
    });
    /* FAQ */
    s += L(64, 806, 1536, 806, as.line, 1);
    s += T(64, 846, "DÚVIDAS", { size: 10.5, font: F.mono, fill: as.muted, ls: 1.5 });
    const faq = [
      ["Tem validade jurídica?", "Sim, assinatura eletrônica avançada."],
      ["Posso cancelar quando quiser?", "Sim, sem multa e sem ligação."],
      ["Preciso instalar algo?", "Não, tudo no navegador."],
      ["Emite recibo?", "Sim, com hash e hora de cada ação."]
    ];
    faq.forEach((f, i) => {
      const x = 64 + (i % 2) * 740;
      const y = 878 + Math.floor(i / 2) * 48;
      s += T(x, y, f[0], { size: 12.5, font: F.sansMed, fill: as.ink });
      s += T(x + 330, y, f[1], { size: 12, fill: "#4c5158" });
    });
    return doc(W, H, as.bg, s);
  }
];

/* ============ Ritmo — sequenciador (experimento) ============ */

const rt = { bg: "#0e0e11", ink: "#f2f0ea", muted: "#7f7d85", accent: "#e8c14a", accent2: "#d8573f" };

export const ritmo = [
  () => {
    let s = R(0, 0, W, H, rt.bg);
    s += T(48, 54, "RITMO", { size: 18, font: F.monoMed, fill: rt.ink, ls: 6 });
    s += T(1536, 52, "experimento · sequenciador de 16 passos", { size: 10.5, font: F.mono, fill: rt.muted, anchor: "end" });
    s += L(48, 80, 1536, 80, rt.ink, 1, 0.14);
    /* controles */
    s += R(48, 104, 132, 132, "none", { r: 74, stroke: rt.accent, sw: 2 });
    s += `<path d="M108,150 L108,190 L142,170 Z" fill="${rt.accent}"/>`;
    s += T(194, 136, "BPM", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    s += T(194, 176, "96", { size: 40, font: F.monoMed, fill: rt.ink });
    s += T(290, 136, "COMPASSO", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    s += T(290, 168, "4/4", { size: 22, font: F.mono, fill: rt.ink });
    s += T(290, 196, "kick · snare", { size: 9.5, font: F.mono, fill: rt.muted });
    s += T(420, 136, "SWING", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    s += R(420, 148, 180, 5, "#2a2a30", { r: 3 });
    s += R(420, 148, 112, 5, rt.accent, { r: 3 });
    s += C(532, 150, 7, rt.accent);
    s += T(420, 178, "62%", { size: 11, font: F.mono, fill: rt.muted });
    s += T(660, 136, "PADRÃO", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    ["A1", "A2", "B1", "B2"].forEach((p, i) => {
      s += R(660 + i * 62, 146, 52, 30, i === 0 ? rt.ink : "none", { r: 2, stroke: i === 0 ? "none" : "#2f2f36", sw: 1 });
      s += T(686 + i * 62, 166, p, { size: 10.5, font: F.mono, fill: i === 0 ? rt.bg : rt.muted, anchor: "middle" });
    });
    s += T(1000, 136, "INSTRUMENTOS", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    ["kick", "snare", "hat", "clap"].forEach((inst, i) => {
      s += T(1000 + i * 96, 168, inst, { size: 11, font: F.mono, fill: i < 3 ? rt.ink : rt.muted });
    });
    /* grade 4 x 16 */
    const rows = ["KICK", "SNARE", "HAT", "CLAP"];
    const pattern = [
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
    ];
    const gx = 190;
    const gy = 272;
    const cellW = 76;
    const cellH = 104;
    /* cabeçalho de passos */
    for (let i = 0; i < 16; i++) {
      s += T(gx + i * cellW + cellW / 2, gy - 20, String(i + 1).padStart(2, "0"), { size: 9.5, font: F.mono, fill: i % 4 === 0 ? rt.accent : rt.muted, anchor: "middle" });
    }
    rows.forEach((label, r) => {
      const y = gy + r * cellH;
      s += T(48, y + 58, label, { size: 11, font: F.mono, fill: rt.ink, ls: 2 });
      for (let c = 0; c < 16; c++) {
        const on = pattern[r][c];
        const active = c === 4;
        const x = gx + c * cellW;
        s += R(x + 4, y, cellW - 8, cellH - 12, on ? (active ? rt.accent : "#d8d3c4") : "#191920", { r: 3, stroke: active ? rt.accent : "none", sw: 1.5 });
        if (on && r === 1) s += R(x + 4, y, cellW - 8, cellH - 12, rt.accent2, { r: 3, opacity: 0.85 });
        if (on) {
          const cxm = x + cellW / 2;
          const cym = y + 40;
          if (r === 0) s += C(cxm, cym, 7, rt.bg, 0.85);
          else if (r === 1) s += `<path d="M${cxm},${cym - 8} L${cxm + 8},${cym + 7} L${cxm - 8},${cym + 7} Z" fill="${rt.bg}" opacity="0.85"/>`;
          else if (r === 2) s += R(cxm - 7, cym - 7, 14, 14, rt.bg, { r: 2, opacity: 0.85 });
          else s += `<path d="M${cxm - 7},${cym - 7} L${cxm + 7},${cym + 7} M${cxm + 7},${cym - 7} L${cxm - 7},${cym + 7}" stroke="${rt.bg}" stroke-width="2" opacity="0.85"/>`;
        }
      }
    });
    /* barra inferior */
    s += L(48, 720, 1536, 720, rt.ink, 1, 0.14);
    s += T(48, 764, "SOM", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    s += R(48, 776, 220, 48, "none", { r: 3, stroke: "#2f2f36", sw: 1 });
    s += T(64, 806, "sintetizado no navegador", { size: 10.5, font: F.mono, fill: rt.ink });
    s += T(320, 764, "ATALHOS", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    s += R(320, 776, 92, 30, "#191920", { r: 2, stroke: "#2f2f36", sw: 1 });
    s += T(366, 796, "espaço", { size: 10.5, font: F.mono, fill: rt.ink, anchor: "middle" });
    s += T(426, 796, "iniciar / pausar", { size: 10.5, font: F.mono, fill: rt.muted });
    s += R(580, 776, 76, 30, "#191920", { r: 2, stroke: "#2f2f36", sw: 1 });
    s += T(618, 796, "1 — 4", { size: 10.5, font: F.mono, fill: rt.ink, anchor: "middle" });
    s += T(670, 796, "trocar padrão", { size: 10.5, font: F.mono, fill: rt.muted });
    s += T(48, 880, "Três samples sintetizados com Web Audio API. Sem arquivos de áudio: cada som é gerado em tempo real.", { size: 11, font: F.mono, fill: rt.muted });
    s += T(1050, 880, "EXPERIMENTO · 2026", { size: 10, font: F.mono, fill: rt.muted, ls: 2 });
    return doc(W, H, rt.bg, s);
  },
  () => {
    let s = R(0, 0, W, H, rt.bg);
    s += T(48, 54, "RITMO", { size: 18, font: F.monoMed, fill: rt.ink, ls: 6 });
    s += T(1536, 52, "passo 05 · kick + snare", { size: 10.5, font: F.mono, fill: rt.accent, anchor: "end" });
    s += L(48, 80, 1536, 80, rt.ink, 1, 0.14);
    /* detalhe de uma faixa com forma de onda */
    const wavePts = [];
    for (let i = 0; i <= 120; i++) {
      const x = 48 + i * 8;
      const amp = Math.sin(i / 3) * 30 * Math.exp(-i / 90);
      wavePts.push(`${i ? "L" : "M"}${x},${220 - Math.abs(amp)}`);
    }
    const wavePts2 = [];
    for (let i = 0; i <= 120; i++) {
      const x = 48 + i * 8;
      const amp = Math.sin(i / 3) * 30 * Math.exp(-i / 90);
      wavePts2.push(`${i ? "L" : "M"}${x},${220 + Math.abs(amp)}`);
    }
    s += `<path d="${wavePts.join(" ")}" fill="none" stroke="${rt.accent}" stroke-width="1.4" opacity="0.9"/>`;
    s += `<path d="${wavePts2.join(" ")}" fill="none" stroke="${rt.accent}" stroke-width="1.4" opacity="0.35"/>`;
    s += L(48, 220, 1500, 220, rt.ink, 1, 0.25);
    s += T(48, 156, "KICK · sample sintetizado", { size: 10, font: F.mono, fill: rt.muted, ls: 1.5 });
    s += T(48, 300, "ataque", { size: 9.5, font: F.mono, fill: rt.muted });
    s += T(730, 300, "decaimento", { size: 9.5, font: F.mono, fill: rt.muted });
    /* controles de sample */
    const params = [
      ["AFINAÇÃO", "+2 st", 0.4],
      ["DECAIMENTO", "180 ms", 0.55],
      ["VOLUME", "−4 dB", 0.7],
      ["DISTORÇÃO", "12%", 0.25]
    ];
    params.forEach((p, i) => {
      const x = 48 + i * 372;
      s += T(x, 370, p[0], { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
      s += T(x, 398, p[1], { size: 18, font: F.mono, fill: rt.ink });
      s += R(x, 416, 300, 5, "#2a2a30", { r: 3 });
      s += R(x, 416, 300 * p[2], 5, rt.accent, { r: 3 });
      s += C(x + 300 * p[2], 418.5, 6, rt.accent);
    });
    /* mini grade com o passo ativo */
    s += L(48, 482, 1536, 482, rt.ink, 1, 0.14);
    s += T(48, 522, "PADRÃO ATUAL", { size: 9.5, font: F.mono, fill: rt.muted, ls: 1.5 });
    const pattern = [
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
    ];
    pattern.forEach((row, r) => {
      row.forEach((on, c) => {
        const x = 48 + c * 92;
        const y = 542 + r * 62;
        const active = c === 4;
        s += R(x + 2, y, 84, 50, on ? (active ? rt.accent : "#d8d3c4") : "#191920", { r: 3, stroke: active ? rt.accent : "none", sw: 1.4 });
      });
    });
    s += T(48, 830, "O padrão é editável no teclado: setas navegam, espaço alterna o passo.", { size: 11, font: F.mono, fill: rt.muted });
    s += T(48, 880, "Nada é salvo em servidor. O estado vive só na memória da página.", { size: 11, font: F.mono, fill: rt.muted });
    return doc(W, H, rt.bg, s);
  },
  () => {
    let s = R(0, 0, W, H, rt.bg);
    s += T(48, 54, "RITMO", { size: 18, font: F.monoMed, fill: rt.ink, ls: 6 });
    s += T(1536, 52, "como foi feito", { size: 10.5, font: F.mono, fill: rt.muted, anchor: "end" });
    s += L(48, 80, 1536, 80, rt.ink, 1, 0.14);
    s += T(48, 180, "Três osciladores,", { size: 54, font: F.sansSemi, fill: rt.ink, ls: -1.8 });
    s += T(48, 240, "nenhum arquivo de áudio.", { size: 54, font: F.sansSemi, fill: rt.accent, ls: -1.8 });
    s += para(48, 292, "Kick, snare e hat são gerados por código no momento em que tocam. O navegador não baixa nenhum sample — a página tem menos de 30 KB.", { size: 15, fill: "#a9a7af", maxWidth: 640, lh: 1.65 });
    /* bloco de código */
    s += R(48, 400, 720, 400, "#15151a", { r: 3, stroke: "#26262d", sw: 1 });
    const code = [
      ["const ctx = new AudioContext();", "#8f8f98"],
      ["", ""],
      ["function kick(t) {", rt.accent],
      ["  const o = ctx.createOscillator();", "#d8d3c4"],
      ["  o.frequency.setValueAtTime(140, t);", "#d8d3c4"],
      ["  o.frequency.exponentialRampToValueAtTime(", "#d8d3c4"],
      ["    46, t + 0.12);", "#d8d3c4"],
      ["  o.start(t); o.stop(t + 0.22);", "#d8d3c4"],
      ["  return o;", "#d8d3c4"],
      ["}", rt.accent],
      ["", ""],
      ["// snare: ruído filtrado por 60 ms", rt.muted]
    ];
    code.forEach(([line, color], i) => {
      s += T(76, 444 + i * 28, String(i + 1).padStart(2, "0"), { size: 10, font: F.mono, fill: "#4a4a52" });
      s += T(104, 444 + i * 28, line, { size: 11.5, font: F.mono, fill: color });
    });
    /* painel de decisões */
    const notes = [
      ["Sem biblioteca", "Web Audio direto, nenhuma dependência."],
      ["Sem imagem", "A interface é HTML e CSS com variáveis."],
      ["Acessível", "Foco visível, atalhos e prefers-reduced-motion."],
      ["Leve", "27 KB no total, incluindo CSS e JS."]
    ];
    notes.forEach((n, i) => {
      const y = 420 + i * 100;
      s += T(840, y, n[0], { size: 17, font: F.mono, fill: rt.ink });
      s += para(840, y + 26, n[1], { size: 13.5, fill: "#a9a7af", maxWidth: 660, lh: 1.6 });
      s += L(840, y + 70, 1536, y + 70, rt.ink, 1, 0.1);
    });
    s += T(840, 830, "Tempo de carregamento medido localmente: 0,4 s em 3G rápido.", { size: 11, font: F.mono, fill: rt.muted });
    s += T(48, 880, "EXPERIMENTO · 2026", { size: 10, font: F.mono, fill: rt.muted, ls: 2 });
    return doc(W, H, rt.bg, s);
  }
];

/* ============ Malha — gerador visual (experimento) ============ */

const ml = { bg: "#f1f0ea", ink: "#1b1c1a", muted: "#84867c", accent: "#2f5d50" };

export const malha = [
  () => {
    let s = R(0, 0, W, H, ml.bg);
    s += T(48, 54, "MALHA", { size: 16, font: F.monoMed, fill: ml.ink, ls: 5 });
    s += T(1536, 52, "gerador de malha · ruído + distância", { size: 10.5, font: F.mono, fill: ml.muted, anchor: "end" });
    s += L(48, 80, 1536, 80, ml.ink, 1, 0.16);
    /* grande área de canvas com malha de linhas */
    s += R(48, 104, 1100, 760, "#e6e5dd");
    let grid = "";
    for (let i = 0; i <= 26; i++) {
      const x = 48 + i * 42.3;
      const pts = [];
      for (let j = 0; j <= 20; j++) {
        const y = 104 + j * 38;
        const off = Math.sin(i / 2.4 + j / 3.1) * 12 + Math.cos(j / 4) * 6;
        pts.push(`${j ? "L" : "M"}${(x + off).toFixed(1)},${y.toFixed(1)}`);
      }
      grid += `<path d="${pts.join(" ")}" fill="none" stroke="#2f5d50" stroke-width="0.55" opacity="${0.18 + (i % 5) * 0.05}"/>`;
    }
    for (let j = 0; j <= 20; j++) {
      const y = 104 + j * 38;
      const pts = [];
      for (let i = 0; i <= 26; i++) {
        const x = 48 + i * 42.3;
        const off = Math.cos(j / 2.8 + i / 3.6) * 12;
        pts.push(`${i ? "L" : "M"}${x.toFixed(1)},${(y + off).toFixed(1)}`);
      }
      grid += `<path d="${pts.join(" ")}" fill="none" stroke="#2f5d50" stroke-width="0.55" opacity="0.14"/>`;
    }
    s += grid;
    /* nós */
    for (let i = 1; i < 26; i += 2) {
      for (let j = 1; j < 20; j += 2) {
        const x = 48 + i * 42.3 + Math.sin(i / 2.4 + j / 3.1) * 12;
        const y = 104 + j * 38;
        if ((i * j) % 7 === 0) s += C(x, y, 2.4, "#b8431f");
        else s += C(x, y, 1.6, "#2f5d50", 0.55);
      }
    }
    s += T(72, 840, "renderizado em canvas · 60 fps em máquina modesta", { size: 10.5, font: F.mono, fill: "#5c635c" });
    /* painel */
    s += T(1196, 118, "PARÂMETROS", { size: 10, font: F.mono, fill: ml.muted, ls: 1.5 });
    const params = [
      ["DENSIDADE", "26 × 20", 0.6],
      ["AMPLITUDE", "12 px", 0.42],
      ["FREQUÊNCIA", "3.1", 0.72],
      ["RUÍDO", "0.34", 0.34]
    ];
    params.forEach((p, i) => {
      const y = 160 + i * 88;
      s += T(1196, y, p[0], { size: 9.5, font: F.mono, fill: ml.muted, ls: 1.4 });
      s += T(1536, y, p[1], { size: 11, font: F.mono, fill: ml.ink, anchor: "end" });
      s += R(1196, y + 14, 340, 4, "#d9d8ce", { r: 3 });
      s += R(1196, y + 14, 340 * p[2], 4, ml.accent, { r: 3 });
      s += C(1196 + 340 * p[2], y + 16, 6, ml.accent);
    });
    /* paleta */
    s += T(1196, 526, "PALETA", { size: 10, font: F.mono, fill: ml.muted, ls: 1.5 });
    ["#2f5d50", "#b8431f", "#1b1c1a", "#c9b98f"].forEach((c, i) => {
      s += R(1196 + i * 60, 540, 48, 48, c);
      if (i === 0) s += R(1196, 540, 48, 48, "none", { stroke: ml.ink, sw: 1 });
    });
    s += T(1196, 622, "MODO", { size: 10, font: F.mono, fill: ml.muted, ls: 1.5 });
    ["malha", "pontos", "linhas"].forEach((m, i) => {
      const w = measure(m, 10.5, F.mono) + 26;
      s += R(1196 + i * 84, 636, w, 30, i === 0 ? ml.ink : "none", { r: 2, stroke: i === 0 ? "none" : "#d3d2c8", sw: 1 });
      s += T(1196 + i * 84 + w / 2, 656, m, { size: 10.5, font: F.mono, fill: i === 0 ? ml.bg : ml.muted, anchor: "middle" });
    });
    s += R(1196, 706, 340, 48, ml.accent, { r: 2 });
    s += T(1366, 736, "exportar PNG 2400 px", { size: 11, font: F.mono, fill: "#f1f0ea", anchor: "middle" });
    s += R(1196, 766, 340, 48, "none", { r: 2, stroke: "#d3d2c8", sw: 1 });
    s += T(1366, 796, "gerar outra semente", { size: 11, font: F.mono, fill: ml.ink, anchor: "middle" });
    s += T(1196, 860, "Espaço gera nova semente. S exporta.", { size: 10, font: F.mono, fill: ml.muted });
    return doc(W, H, ml.bg, s);
  },
  () => {
    let s = R(0, 0, W, H, ml.bg);
    s += T(48, 54, "MALHA", { size: 16, font: F.monoMed, fill: ml.ink, ls: 5 });
    s += T(1536, 52, "estados e controles", { size: 10.5, font: F.mono, fill: ml.muted, anchor: "end" });
    s += L(48, 80, 1536, 80, ml.ink, 1, 0.16);
    /* três variações lado a lado */
    const modes = ["malha", "pontos", "linhas"];
    modes.forEach((mode, m) => {
      const x = 48 + m * 500;
      s += R(x, 116, 464, 464, "#e6e5dd");
      if (mode === "pontos") {
        for (let i = 0; i < 22; i++) {
          for (let j = 0; j < 22; j++) {
            const px = x + 22 + i * 20 + Math.sin(i / 2 + j / 3) * 6;
            const py = 138 + j * 20 + Math.cos(j / 2.4) * 6;
            s += C(px, py, 1.6, "#2f5d50", 0.55);
          }
        }
      } else if (mode === "linhas") {
        for (let i = 0; i < 40; i++) {
          const y0 = 130 + i * 11;
          s += `<path d="M${x + 10},${y0} Q${x + 232},${y0 + Math.sin(i / 2) * 30} ${x + 454},${y0}" fill="none" stroke="#2f5d50" stroke-width="0.7" opacity="${0.12 + (i % 4) * 0.06}"/>`;
        }
      } else {
        for (let i = 0; i <= 20; i++) {
          const px = x + i * 23.2;
          const pts = [];
          for (let j = 0; j <= 20; j++) {
            const py = 120 + j * 23;
            pts.push(`${j ? "L" : "M"}${(px + Math.sin(i / 2.2 + j / 3) * 8).toFixed(1)},${py}`);
          }
          s += `<path d="${pts.join(" ")}" fill="none" stroke="#2f5d50" stroke-width="0.6" opacity="0.3"/>`;
        }
        for (let j = 0; j <= 20; j++) {
          const py = 120 + j * 23;
          const pts = [];
          for (let i = 0; i <= 20; i++) pts.push(`${i ? "L" : "M"}${x + i * 23.2},${(py + Math.cos(j / 2.6 + i / 3) * 8).toFixed(1)}`);
          s += `<path d="${pts.join(" ")}" fill="none" stroke="#2f5d50" stroke-width="0.6" opacity="0.22"/>`;
        }
      }
      s += T(x, 610, mode, { size: 11, font: F.mono, fill: ml.ink, ls: 1 });
      s += T(x + 464, 610, ["denso", "leve", "fluido"][m], { size: 10, font: F.mono, fill: ml.muted, anchor: "end" });
      s += R(x, 626, 464, 1, ml.ink, { opacity: 0.14 });
    });
    /* estados de interface */
    s += T(48, 690, "ESTADOS DE INTERFACE", { size: 10, font: F.mono, fill: ml.muted, ls: 1.5 });
    const states = [
      ["carregando", "gerando malha…", "#84867c"],
      ["pronto", "semente #4182", "#2f5d50"],
      ["exportando", "PNG 2400 px", "#b8431f"]
    ];
    states.forEach((st, i) => {
      const x = 48 + i * 500;
      s += R(x, 716, 464, 76, "none", { r: 3, stroke: "#d9d8ce", sw: 1 });
      s += C(x + 28, 754, 4, st[2]);
      s += T(x + 44, 758, st[0], { size: 12, font: F.mono, fill: ml.ink });
      s += T(x + 444, 758, st[1], { size: 11, font: F.mono, fill: ml.muted, anchor: "end" });
    });
    s += T(48, 862, "O gerador não envia nada para servidor: toda a imagem é calculada e exportada no navegador.", { size: 11, font: F.mono, fill: ml.muted });
    s += T(48, 910, "EXPERIMENTO · 2026", { size: 10, font: F.mono, fill: ml.muted, ls: 2 });
    return doc(W, H, ml.bg, s);
  },
  () => {
    let s = R(0, 0, W, H, "#171815");
    s += T(48, 54, "MALHA", { size: 16, font: F.monoMed, fill: "#f1f0ea", ls: 5 });
    s += T(1536, 52, "exportação", { size: 10.5, font: F.mono, fill: "#84867c", anchor: "end" });
    s += L(48, 80, 1536, 80, "#f1f0ea", 1, 0.16);
    s += T(48, 180, "A imagem sai", { size: 56, font: F.sansSemi, fill: "#f1f0ea", ls: -1.8 });
    s += T(48, 242, "pronta para imprimir.", { size: 56, font: F.sansSemi, fill: "#c9b98f", ls: -1.8 });
    s += para(48, 296, "Exporta PNG em 2400 × 2400 px com fundo transparente ou sólido. Sem marca d'água, sem login, sem fila.", { size: 15, fill: "#a9a79f", maxWidth: 620, lh: 1.65 });
    /* prévia da exportação */
    s += R(760, 120, 776, 700, "#e6e5dd");
    let grid = "";
    for (let i = 0; i <= 30; i++) {
      const px = 760 + i * 25.8;
      const pts = [];
      for (let j = 0; j <= 27; j++) {
        const py = 120 + j * 25.9;
        pts.push(`${j ? "L" : "M"}${(px + Math.sin(i / 2.2 + j / 3) * 10).toFixed(1)},${py}`);
      }
      grid += `<path d="${pts.join(" ")}" fill="none" stroke="#2f5d50" stroke-width="0.6" opacity="0.24"/>`;
    }
    s += grid;
    s += R(760, 640, 776, 180, "#171815", { opacity: 0.92 });
    s += T(792, 690, "ARQUIVO", { size: 10, font: F.mono, fill: "#84867c", ls: 1.5 });
    s += T(792, 722, "malha-semente-4182.png", { size: 15, font: F.mono, fill: "#f1f0ea" });
    s += T(792, 752, "2400 × 2400 · 486 KB · 2×", { size: 11, font: F.mono, fill: "#a9a79f" });
    s += R(1200, 700, 300, 48, "#c9b98f", { r: 2 });
    s += T(1350, 730, "baixar", { size: 12, font: F.mono, fill: "#171815", anchor: "middle" });
    /* etapas */
    const steps = [
      ["01", "Escolha a semente", "Qualquer número inteiro gera uma malha diferente."],
      ["02", "Ajuste densidade e ruído", "Sliders alteram em tempo real, sem recarregar."],
      ["03", "Exporte", "PNG 2× para impressão ou 1× para tela."]
    ];
    steps.forEach((st, i) => {
      const y = 400 + i * 118;
      s += T(48, y, st[0], { size: 10.5, font: F.mono, fill: "#c9b98f" });
      s += T(48, y + 32, st[1], { size: 19, font: F.sansMed, fill: "#f1f0ea" });
      s += para(48, y + 58, st[2], { size: 13, fill: "#a9a79f", maxWidth: 600, lh: 1.6 });
    });
    s += T(48, 880, "EXPERIMENTO · 2026", { size: 10, font: F.mono, fill: "#84867c", ls: 2 });
    return doc(W, H, "#171815", s);
  }
];
