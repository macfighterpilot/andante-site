// Public-page QA: full-page screenshots at given widths + layout checks. Usage: node shot.mjs <url> <outPrefix> <width...>
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const [url, prefix, ...widths] = process.argv.slice(2);
const port = 9337;
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`,
  "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) {
  try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = l.find((t) => t.type === "page"); if (p) { ws = new WebSocket(p.webSocketDebuggerUrl); break; } } catch {}
  await sleep(250);
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map(); const logs = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.method === "Runtime.exceptionThrown") logs.push("EXC " + m.params.exceptionDetails.text);
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") logs.push("ERR " + m.params.args.map((a) => a.value).join(" "));
  if (m.method === "Network.loadingFailed") logs.push("NETFAIL " + m.params.errorText);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send("Runtime.evaluate", { returnByValue: true, awaitPromise: true, expression })).result?.result?.value;
await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable");
for (const w of widths.map(Number)) {
  const mobile = w < 600;
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: mobile ? 844 : 900, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await send("Page.navigate", { url });
  await sleep(3000);
  // scroll through to trigger lazy images
  const H = await ev("document.documentElement.scrollHeight");
  for (let y = 0; y < H; y += 700) { await ev(`window.scrollTo(0, ${y})`); await sleep(120); }
  await ev("window.scrollTo(0, 0)"); await sleep(1500);
  const info = JSON.parse(await ev(`JSON.stringify({
    title: document.title,
    robots: (document.querySelector('meta[name="robots"]')||{}).content,
    scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
    height: document.documentElement.scrollHeight,
    brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.alt).slice(0,5),
    smallTap: [...document.querySelectorAll('a,button,input,select,textarea')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 24 && getComputedStyle(e).display !== 'inline'; }).length,
    sections: [...document.querySelectorAll('main > section')].map(s => s.id || s.querySelector('h1,h2')?.textContent.slice(0,30))
  })`));
  // Full page without resizing the viewport: 100svh sections keep their real height.
  const fullH = Math.min(info.height, 16000);
  const shot = await send("Page.captureScreenshot", {
    format: "jpeg", quality: 78, captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: w, height: fullH, scale: 1 },
  });
  writeFileSync(`${prefix}-${w}-full.jpg`, Buffer.from(shot.result.data, "base64"));
  await ev("window.scrollTo(0, 0)"); await sleep(800);
  const top = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${prefix}-${w}-top.png`, Buffer.from(top.result.data, "base64"));
  console.log(w, JSON.stringify(info));
}
console.log("console/network issues:", logs.length ? logs.slice(0, 10) : "none");
ws.close(); chrome.kill();
