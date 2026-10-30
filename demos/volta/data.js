/* Volta — catálogo fictício da loja conceitual de equipamento esportivo. */
window.SHOP_DATA = {
  brand: "Volta",
  currency: "BRL",
  cartKey: "volta-sacola",
  freeFrom: 250,
  products: [
    {
      id: "tenis-pista",
      name: "Tênis Pista",
      category: "corrida",
      price: 749,
      badge: "novo",
      art: "tenis",
      colors3: ["#e8603a", "#171610", "#12110d"],
      sizes: ["38", "40", "42", "44"],
      tags: ["corrida", "leve", "amortecimento"],
      desc: "Tênis de treino diário com entressola de espuma reativa e cabedal em malha aberta. 218 g no número 40.",
      specs: [["Peso", "218 g (nº 40)"], ["Drop", "8 mm"], ["Amortecimento", "médio"], ["Uso", "asfalto e esteira"]]
    },
    {
      id: "tenis-trilha",
      name: "Tênis Trilha",
      category: "trilha",
      price: 899,
      art: "tenis",
      colors3: ["#6f6a4f", "#2c2a1f", "#12110d"],
      sizes: ["38", "40", "42", "44"],
      tags: ["trilha", "tração", "impermeável"],
      desc: "Solado com cravos de 4 mm e cabedal resistente a respingo. Placa de proteção sob o pé para pedra solta.",
      specs: [["Peso", "312 g (nº 40)"], ["Cravo", "4 mm"], ["Drop", "6 mm"], ["Proteção", "placa rígida"]]
    },
    {
      id: "camiseta-dry",
      name: "Camiseta Dry",
      category: "academia",
      price: 139,
      art: "camiseta",
      colors3: ["#2a2820", "#16150f", "#12110d"],
      sizes: ["P", "M", "G", "GG"],
      tags: ["treino", "poliamida", "seca rápido"],
      desc: "Malha de poliamida com canal de ventilação nas costas. Seca em 20 minutos pendurada.",
      specs: [["Composição", "92% poliamida, 8% elastano"], ["Gramatura", "130 g/m²"], ["Costura", "plana"]]
    },
    {
      id: "calca-legging",
      name: "Calça Legging",
      category: "academia",
      price: 259,
      art: "calca",
      colors3: ["#20201a", "#14140f", "#12110d"],
      sizes: ["P", "M", "G"],
      tags: ["treino", "cintura alta", "bolso"],
      desc: "Cintura alta com cós duplo e bolso lateral para celular. Sem costura na parte da frente.",
      specs: [["Composição", "78% poliamida, 22% elastano"], ["Cintura", "alta, cós duplo"], ["Bolsos", "2 laterais"]]
    },
    {
      id: "garrafa-900",
      name: "Garrafa 900",
      category: "academia",
      price: 119,
      art: "garrafa",
      colors3: ["#3a382c", "#e8603a", "#12110d"],
      sizes: ["único"],
      tags: ["900 ml", "inox", "tampa"],
      desc: "Aço inox com parede dupla, 900 ml. Mantém gelado por 18 horas; a tampa veda com meia volta.",
      specs: [["Capacidade", "900 ml"], ["Material", "aço inox 304"], ["Gelo", "18 h"], ["Peso", "340 g"]]
    },
    {
      id: "mochila-ritmo",
      name: "Mochila Ritmo",
      category: "trilha",
      price: 389,
      oldPrice: 459,
      art: "mochila",
      colors3: ["#2c2a22", "#6f6a4f", "#12110d"],
      sizes: ["único"],
      tags: ["24 litros", "corrida", "hidratação"],
      desc: "Colete-mochila de 24 litros com bolsos de hidratação no peito e costas em tela. Não pula no treino.",
      specs: [["Volume", "24 litros"], ["Peso", "410 g"], ["Bolsos", "6, dois para garrafa"], ["Tela", "costas ventiladas"]]
    },
    {
      id: "bola-treino",
      name: "Bola Treino",
      category: "academia",
      price: 169,
      art: "bola",
      colors3: ["#e8603a", "#1e1c16", "#12110d"],
      sizes: ["único"],
      tags: ["futebol", "campo", "costura"],
      desc: "Bola de campo com gomos costurados à mão e câmara de butil. Mantém pressão por semanas.",
      specs: [["Circunferência", "69 cm"], ["Peso", "430 g"], ["Costura", "à mão"], ["Câmara", "butil"]]
    },
    {
      id: "tenis-veloz",
      name: "Tênis Veloz",
      category: "corrida",
      price: 1090,
      art: "tenis",
      colors3: ["#d8d2c0", "#e8603a", "#12110d"],
      sizes: ["38", "40", "42"],
      tags: ["prova", "carbono", "leve"],
      desc: "Placa de carbono e espuma de retorno alto para prova. Feito para ritmo forte, não para treino diário.",
      specs: [["Peso", "196 g (nº 40)"], ["Placa", "carbono"], ["Drop", "8 mm"], ["Uso", "prova e ritmo"]]
    }
  ]
};
