/* Capas: derivadas da primeira tela de cada projeto, em 16:10 (1600×1000 + 800). */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { projects } from "./index.mjs";

const SRC = "assets/img/shots";
const OUT = "assets/img/cover";
await mkdir(OUT, { recursive: true });

for (const id of Object.keys(projects)) {
  const input = `${SRC}/${id}-1.webp`;
  await sharp(input).webp({ quality: 80, effort: 6 }).toFile(`${OUT}/${id}.webp`);
  await sharp(input).resize({ width: 800 }).webp({ quality: 76, effort: 6 }).toFile(`${OUT}/${id}-800.webp`);
}
console.log("capas:", Object.keys(projects).length);
