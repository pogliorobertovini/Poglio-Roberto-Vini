// Corrige a perspectiva de um quadrilátero de uma foto e salva como imagem retangular.
// `masks` (opcional): lista de quadriláteros (no espaço da foto original); fora deles o pixel fica transparente.
import sharp from "sharp";

function squareToQuad([p0, p1, p2, p3]) {
  const [x0, y0] = p0, [x1, y1] = p1, [x2, y2] = p2, [x3, y3] = p3;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  let a, b, c, d, e, f, g, h;
  if (dx3 === 0 && dy3 === 0) {
    a = x1 - x0; b = x2 - x1; c = x0; d = y1 - y0; e = y2 - y1; f = y0; g = 0; h = 0;
  } else {
    const den = dx1 * dy2 - dx2 * dy1;
    g = (dx3 * dy2 - dx2 * dy3) / den;
    h = (dx1 * dy3 - dx3 * dy1) / den;
    a = x1 - x0 + g * x1; b = x3 - x0 + h * x3; c = x0;
    d = y1 - y0 + g * y1; e = y3 - y0 + h * y3; f = y0;
  }
  return { a, b, c, d, e, f, g, h };
}

function inQuad(px, py, q, inset) {
  // q: TL,TR,BR,BL — ponto dentro de polígono convexo (sinal consistente), com margem `inset` em px
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = q[i], [x2, y2] = q[(i + 1) % 4];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const cross = ((x2 - x1) * (py - y1) - (y2 - y1) * (px - x1)) / len;
    if (cross < inset) return false;
  }
  return true;
}

export async function warp(src, corners, outW, outH, outPath, opts = {}) {
  const { data, info } = await sharp(src).rotate().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const m = squareToQuad(corners);
  const out = Buffer.alloc(outW * outH * 4);
  for (let j = 0; j < outH; j++) {
    const v = j / (outH - 1);
    for (let i = 0; i < outW; i++) {
      const u = i / (outW - 1);
      const w = m.g * u + m.h * v + 1;
      const x = (m.a * u + m.b * v + m.c) / w;
      const y = (m.d * u + m.e * v + m.f) / w;
      const x0 = Math.max(0, Math.min(W - 2, Math.floor(x))), y0 = Math.max(0, Math.min(H - 2, Math.floor(y)));
      const fx = Math.max(0, Math.min(1, x - x0)), fy = Math.max(0, Math.min(1, y - y0));
      const o = (j * outW + i) * 4;
      for (let k = 0; k < 3; k++) {
        const p00 = data[(y0 * W + x0) * 4 + k], p10 = data[(y0 * W + x0 + 1) * 4 + k];
        const p01 = data[((y0 + 1) * W + x0) * 4 + k], p11 = data[((y0 + 1) * W + x0 + 1) * 4 + k];
        out[o + k] = p00 * (1 - fx) * (1 - fy) + p10 * fx * (1 - fy) + p01 * (1 - fx) * fy + p11 * fx * fy;
      }
      let alpha = 255;
      if (opts.masks) alpha = opts.masks.some((q) => inQuad(x, y, q, opts.inset ?? 0)) ? 255 : 0;
      out[o + 3] = alpha;
    }
  }
  await sharp(out, { raw: { width: outW, height: outH, channels: 4 } }).webp({ quality: 90, alphaQuality: 100 }).toFile(outPath);
}
