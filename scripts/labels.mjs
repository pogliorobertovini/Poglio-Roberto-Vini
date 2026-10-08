// Recorta os rótulos das fotos (corrigindo a perspectiva).
// Gera, para cada vinho: <nome>-tag.webp (etiqueta colorida) e <nome>-label.webp
// (rótulo principal + etiqueta sobreposta, fundo transparente) — esta última é a textura da garrafa 3D.
import { warp } from "./warp.mjs";
const U = "C:/Users/pedro/Downloads/Poderi La Bruciata branding/uploads/";
const S = 1.13, S2 = 1.11; // algumas imagens foram vistas reduzidas: coordenadas ajustadas
const sc = (pts, s) => pts.map(([x, y]) => [x * s, y * s]);
const jobs = {
  chiostro: { f: "labels-1791462470480-xh5n.png",
    main: [[383,150],[1293,245],[1300,1745],[400,1745]], tag: [[162,648],[590,700],[597,1425],[175,1420]] },
  anfiteatro: { f: "labels-1791462470550-237e.png",
    main: [[333,158],[1265,255],[1222,1790],[310,1815]], tag: [[92,705],[530,748],[522,1522],[88,1525]] },
  nonu: { f: "labels-1791462470624-6m76.png",
    main: sc([[367,260],[1247,340],[1268,1740],[352,1835]], S), tag: sc([[128,740],[570,775],[565,1495],[112,1520]], S) },
  frutteto: { f: "labels-1791462470690-ufiz.png",
    main: [[300,50],[1312,142],[1285,1700],[275,1712]], tag: [[35,568],[518,620],[508,1375],[25,1378]] },
  bruciata: { f: "labels-1791462470792-g7df.png",
    main: sc([[340,283],[1295,355],[1205,1840],[283,1880]], S2), tag: sc([[85,800],[530,838],[505,1565],[60,1578]], S2) },
};
const EXT = 0.29; // quanto estender o recorte à esquerda para caber a etiqueta inteira
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const only = process.argv[2];
for (const [name, j] of Object.entries(jobs)) {
  if (only && only !== name) continue;
  const [A, B, C, D] = j.main;
  await warp(U + j.f, j.tag, 560, 720, `public/labels/${name}-tag.webp`);
  const ext = [lerp(A, B, -EXT), B, C, lerp(D, C, -EXT)];
  const W = 1100, H = 1400;
  await warp(U + j.f, ext, W, H, `public/labels/${name}-label.webp`, { masks: [j.main, j.tag], inset: 5 });
  console.log("ok", name);
}
