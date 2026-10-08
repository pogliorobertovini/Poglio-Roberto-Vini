// Otimiza as fotos originais para a web (webp) em public/images.
import sharp from "sharp";
const D = "C:/Users/pedro/Downloads/Poderi La Bruciata branding/assets/";
const jobs = [
  ["vigna-neve.jpg", "vigna-neve.webp", 1600],
  ["famiglia.jpg", "famiglia.webp", 1800],
  ["cantina.jpg", "cantina.webp", 1200],
  ["grappolo.jpg", "grappolo.webp", 1400],
  ["vendemmia.jpg", "vendemmia.webp", 1400],
];
for (const [src, dst, w] of jobs) {
  const info = await sharp(D + src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile("public/images/" + dst);
  console.log(dst, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
}
