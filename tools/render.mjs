import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { projects } from "./index.mjs";
import { svgToPng } from "./engine.mjs";

const OUT = "assets/img/shots";
const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });

for (const [id, screens] of Object.entries(projects)) {
  if (only.length && !only.includes(id)) continue;
  for (let i = 0; i < screens.length; i++) {
    const png = svgToPng(screens[i](), 1600);
    await sharp(png).webp({ quality: 82, effort: 6 }).toFile(path.join(OUT, `${id}-${i + 1}.webp`));
    await sharp(png).resize({ width: 800 }).webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${id}-${i + 1}-800.webp`));
    await sharp(png).resize({ width: 400 }).webp({ quality: 72, effort: 6 }).toFile(path.join(OUT, `${id}-${i + 1}-sm.webp`));
  }
  console.log("ok", id);
}
