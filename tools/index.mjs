/* Junta todos os mockups em um catálogo único. */
import { projects as first } from "./parts-first.mjs";
import { casalenta, volta } from "./parts-shop.mjs";
import { maru, circuito, alcada } from "./parts-studio.mjs";
import { farol, fluxo, trilha } from "./parts-app.mjs";
import { grao, onda, assina, ritmo, malha } from "./parts-landing.mjs";

export const projects = {
  ...first,
  casalenta,
  volta,
  maru,
  circuito,
  alcada,
  farol,
  fluxo,
  trilha,
  grao,
  onda,
  assina,
  ritmo,
  malha
};
