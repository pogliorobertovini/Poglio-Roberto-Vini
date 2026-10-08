// Gera as texturas das garrafas a partir dos PDFs de prova da gráfica (alta resolução).
// Passo 1 (fora do projeto): renderizar os PDFs em PNG com escala 6 (pdfjs-dist + @napi-rs/canvas),
//   gerando barbera-p1.png, prove-p1.png, prove-p2.png em PDF_PNG_DIR.
// Passo 2: node scripts/labels-pdf.mjs   -> public/labels/<id>-label.webp (frente + etiqueta) e <id>-back.webp
import sharp from "sharp";
import { warp } from "./warp.mjs";

const DIR = process.env.PDF_PNG_DIR;
if (!DIR) throw new Error("Defina PDF_PNG_DIR com a pasta dos PNGs renderizados");
const K = 1.29 * 2; // coordenadas medidas na prévia (escala 1/1.29 do render 3x) -> render 6x
const q = (pts) => pts.map(([x, y]) => [x * K, y * K]);
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// quadriláteros (TL, TR, BR, BL) na prévia
const FRONT = {
  bruciata: ["prove-p1.png", [[207,155],[668,187],[668,912],[207,945]], [[85,404],[313,421],[313,776],[85,794]]],
  chiostro: ["prove-p1.png", [[849,164],[1310,196],[1310,919],[849,953]], [[728,412],[955,428],[955,786],[728,802]]],
  cabianca: ["prove-p1.png", [[199,1133],[660,1165],[660,1888],[199,1922]], [[78,1381],[305,1397],[305,1754],[78,1771]]],
  frutteto: ["prove-p1.png", [[808,1116],[1269,1148],[1269,1872],[808,1905]], [[687,1364],[914,1380],[914,1738],[687,1754]]],
  nonu: ["barbera-p1.png", [[189,610],[651,643],[651,1367],[189,1400]], [[68,859],[296,876],[296,1233],[68,1249]]],
};
// contrarrótulos (retângulos retos): [arquivo, x0, y0, x1, y1]
const BACK = {
  bruciata: ["prove-p2.png", 187, 355, 583, 817],
  chiostro: ["prove-p2.png", 650, 355, 1046, 817],
  frutteto: ["prove-p2.png", 196, 891, 592, 1353],
  cabianca: ["prove-p2.png", 659, 897, 1055, 1359],
  nonu: ["barbera-p1.png", 206, 1470, 602, 1931],
};
const EXT = 0.29;
const only = process.argv[2];
for (const [id, [file, main, tag]] of Object.entries(FRONT)) {
  if (only && only !== id) continue;
  const [A, B, C, D] = q(main);
  const ext = [lerp(A, B, -EXT), B, C, lerp(D, C, -EXT)];
  await warp(`${DIR}/${file}`, ext, 1232, 1568, `public/labels/${id}-label.webp`, { masks: [q(main), q(tag)], inset: 6 });
  const [bf, x0, y0, x1, y1] = BACK[id];
  await sharp(`${DIR}/${bf}`).extract({ left: Math.round(x0 * K) + 4, top: Math.round(y0 * K) + 4, width: Math.round((x1 - x0) * K) - 8, height: Math.round((y1 - y0) * K) - 8 }).webp({ quality: 90 }).toFile(`public/labels/${id}-back.webp`);
  console.log("ok", id);
}
