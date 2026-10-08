// Isola a logo (dourado sobre cinza) do fundo, gerando PNGs transparentes em public/logo.
import sharp from "sharp";
const SRC = "C:/Users/pedro/Downloads/1.png";
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const bg = [data[0], data[1], data[2]];
console.log("bg", bg, W, H);
const out = Buffer.alloc(W * H * 4);
const D = 110; // diferença a partir da qual o pixel é totalmente opaco
for (let i = 0; i < W * H; i++) {
  const c = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
  const diff = Math.max(Math.abs(c[0] - bg[0]), Math.abs(c[1] - bg[1]), Math.abs(c[2] - bg[2]));
  const a = Math.min(1, diff / D);
  out[i * 4 + 3] = Math.round(a * 255);
  for (let k = 0; k < 3; k++) {
    out[i * 4 + k] = a > 0.02 ? Math.max(0, Math.min(255, Math.round(bg[k] + (c[k] - bg[k]) / a))) : 0;
  }
}
const full = sharp(out, { raw: { width: W, height: H, channels: 4 } });
const trimmed = await full.clone().trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
console.log("full", trimmed.info.width, trimmed.info.height);
await sharp(trimmed.data).toFile("public/logo/logo-oro.png");
// só a torre (região central, sem as 4 palavras)
const tower = { left: 400, top: 150, width: 240, height: 275 };
// apaga as palavras (caixas na imagem original) para sobrar só a torre
for (const [x0,y0,x1,y1] of [[340,255,455,300],[592,255,700,300],[485,90,565,138],[480,419,565,456]]) for (let y=y0;y<y1;y++) for (let x=x0;x<x1;x++) out[(y*W+x)*4+3]=0;
const crop = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).extract(tower).png().toBuffer();
const t = await sharp(crop).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
console.log("torre", t.info.width, t.info.height);
await sharp(t.data).toFile("public/logo/torre-oro.png");
// prévia sobre o escuro do site
await sharp({ create: { width: 1000, height: 560, channels: 3, background: "#17130F" } })
  .composite([{ input: "public/logo/logo-oro.png", gravity: "west" }, { input: "public/logo/torre-oro.png", gravity: "east" }])
  .png().toFile(process.env.TEMP + "/logo-preview.png");
