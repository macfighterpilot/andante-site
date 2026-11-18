// Crop Andante's Instagram images to remove the text overlays baked into the posts. Run once; output in src/assets/images.
import { createRequire } from "node:module";
import { dirname } from "node:path";
const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve("next/package.json"))] }));

const A = "/tmp/andante/ig";
const OUT = new URL("../src/assets/images/", import.meta.url).pathname;

// Post Db_FZ2djOQe (1080x1080): photo in the top ~700px, text panel below.
const dinner = sharp(`${A}/0-Db_FZ2djOQe.jpg`);
const dm = await dinner.metadata();
await dinner.extract({ left: 0, top: 0, width: dm.width, height: Math.round(dm.height * 0.64) }).jpeg({ quality: 84 }).toFile(`${OUT}andante-starlit-dinner.jpg`);

// Reel Dc1umtdMcCH cover (640x1136): a large "O" title letter on the left third, upper half.
const olive = sharp(`${A}/3-Dc1umtdMcCH.jpg`);
const om = await olive.metadata();
await olive.extract({ left: 150, top: 0, width: om.width - 150, height: om.height }).jpeg({ quality: 84 }).toFile(`${OUT}andante-olive-grove-lunch.jpg`);

for (const f of ["andante-starlit-dinner.jpg", "andante-olive-grove-lunch.jpg"]) {
  const m = await sharp(`${OUT}${f}`).metadata();
  console.log(f, m.width, "x", m.height);
}
