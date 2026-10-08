// Gera as texturas da 6ª garrafa ("In arrivo") em public/labels:
//   novita-label.webp  (rótulo + etiqueta, fundo transparente — mesmo formato dos outros vinhos)
//   novita-back.webp   (contrarrótulo)
// Para mudar textos/cores, edite abaixo e rode: node scripts/label-novita.mjs
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
GlobalFonts.registerFromPath(path.join(here, "fonts/Cinzel-600.ttf"), "Cinzel");

const PAPER = "#2a2c34"; // carvão, como o rótulo La Bruciata
const GOLD = "#d4a85a";
const CREAM = "#f1e7d3";
const TAG = "#6e1423"; // Rosso Barbera
const INSTAGRAM = "@poglio.roberto.vini";

const font = (px) => `600 ${px}px Cinzel`;
function text(ctx, s, x, y, px, color, { align = "center", spacing = 0 } = {}) {
  ctx.font = font(px);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.letterSpacing = `${spacing}px`;
  ctx.fillText(s, x, y);
}

/* ——— frente: mesmo enquadramento das texturas dos outros vinhos (1232×1568) ——— */
{
  const W = 1232, H = 1568;
  const c = createCanvas(W, H);
  const g = c.getContext("2d");
  const L = 277, R = W; // rótulo principal (a etiqueta sobrepõe a borda esquerda)
  g.fillStyle = PAPER;
  g.fillRect(L, 0, R - L, H);

  // moldura dourada com o nome cruzando a linha de cima
  const fx0 = L + 80, fx1 = R - 80, fy0 = 150, fy1 = H - 110;
  const nameW = 560;
  g.strokeStyle = GOLD;
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo((fx0 + fx1) / 2 - nameW / 2 - 24, fy0);
  g.lineTo(fx0, fy0);
  g.lineTo(fx0, fy1);
  g.lineTo(fx1, fy1);
  g.lineTo(fx1, fy0);
  g.lineTo((fx0 + fx1) / 2 + nameW / 2 + 24, fy0);
  g.stroke();
  const cx = (fx0 + fx1) / 2;
  text(g, "POGLIO ROBERTO", cx, fy0 + 18, 56, GOLD, { spacing: 3 });
  text(g, "AZIENDA AGRICOLA", cx, fy0 + 78, 30, CREAM, { spacing: 5 });

  text(g, "PROSSIMAMENTE", cx, 520, 66, CREAM, { spacing: 4 });

  // o "?" dourado no lugar da torre
  text(g, "?", cx, 1230, 640, GOLD);
  // um filete de colina embaixo, como a base da torre
  g.strokeStyle = GOLD;
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(fx0 + 60, fy1 - 80);
  g.quadraticCurveTo(cx, fy1 - 130, fx1 - 60, fy1 - 80);
  g.stroke();

  // etiqueta lateral
  const tx = 40, ty = 520, tw = 440, th = 780;
  g.fillStyle = TAG;
  g.fillRect(tx, ty, tw, th);
  const tc = tx + tw / 2;
  text(g, "IN ARRIVO", tc, ty + 230, 76, CREAM, { spacing: 2 });
  g.fillStyle = "rgba(241,231,211,0.5)";
  g.fillRect(tc - 70, ty + 280, 140, 3);
  text(g, "NOVITÀ", tc, ty + 360, 42, CREAM, { spacing: 4 });
  text(g, "IN CANTINA", tc, ty + 412, 42, CREAM, { spacing: 4 });
  text(g, "SEGUICI SU", tc, ty + 600, 30, CREAM, { spacing: 4 });
  text(g, "INSTAGRAM", tc, ty + 642, 30, CREAM, { spacing: 4 });

  await sharp(c.toBuffer("image/png")).webp({ quality: 92, alphaQuality: 100 }).toFile("public/labels/novita-label.webp");
}

/* ——— contrarrótulo (proporção 60×70 mm) ——— */
{
  const W = 1000, H = 1167;
  const c = createCanvas(W, H);
  const g = c.getContext("2d");
  g.fillStyle = PAPER;
  g.fillRect(0, 0, W, H);
  g.strokeStyle = GOLD;
  g.lineWidth = 3;
  g.strokeRect(40, 40, W - 80, H - 80);
  const cx = W / 2;
  text(g, "NOVITÀ IN ARRIVO", cx, 230, 64, GOLD, { spacing: 3 });
  g.fillStyle = GOLD;
  g.fillRect(cx - 60, 270, 120, 3);
  text(g, "Presto, qualcosa di nuovo", cx, 420, 56, CREAM);
  text(g, "in cantina…", cx, 490, 56, CREAM);
  text(g, "Seguici su Instagram", cx, 700, 50, CREAM);
  text(g, "per scoprirla per primi", cx, 765, 50, CREAM);
  text(g, INSTAGRAM, cx, 900, 58, GOLD, { spacing: 1 });
  text(g, "AZIENDA AGRICOLA POGLIO ROBERTO", cx, 1060, 30, CREAM, { spacing: 3 });
  text(g, "CASTELNUOVO CALCEA · ASTI", cx, 1105, 30, CREAM, { spacing: 3 });

  await sharp(c.toBuffer("image/png")).webp({ quality: 92 }).toFile("public/labels/novita-back.webp");
}
console.log("ok");
