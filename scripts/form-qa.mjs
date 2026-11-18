// Form QA on a public URL at 390px: empty submit shows errors; valid submit shows confirmation + builds mailto.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const [url, out] = process.argv.slice(2);
const port = 9338;
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`,
  "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) {
  try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = l.find((t) => t.type === "page"); if (p) { ws = new WebSocket(p.webSocketDebuggerUrl); break; } } catch {}
  await sleep(250);
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map(); let navigatedTo = null;
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.method === "Page.frameRequestedNavigation" || m.method === "Page.navigatedWithinDocument") navigatedTo = m.params.url;
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send("Runtime.evaluate", { returnByValue: true, awaitPromise: true, expression })).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url });
await sleep(3500);
// Capture the mailto instead of leaving the page.
await ev(`(() => { const d = Object.getOwnPropertyDescriptor(Location.prototype, 'href'); window.__mailto = null;
  Object.defineProperty(window.location, 'href', { configurable: true, set(v) { window.__mailto = v; }, get() { return d.get.call(window.location); } }); return true; })()`).catch(() => {});
await ev(`document.querySelector('#enquire').scrollIntoView(); document.querySelector('#enquire form button[type=submit]').click(); true`);
await sleep(600);
const errs = await ev(`[...document.querySelectorAll('#enquire [aria-invalid=true]')].map(e => e.id).join(',') + ' | focused=' + document.activeElement.id`);
console.log("empty submit -> invalid:", errs);
const shot1 = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(`${out}-errors.png`, Buffer.from(shot1.result.data, "base64"));
const setv = (sel, v) => `(() => { const el = document.querySelector('${sel}'); const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(v)}); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); })()`;
for (const [s, v] of [["#f-name", "Emma Clarke"], ["#f-email", "emma@example.co.uk"], ["#f-country", "United Kingdom"], ["#f-riders", "3"], ["#f-dateFrom", "2027-05-14"], ["#f-level", "intermediate"], ["#f-experience", "beach-day"], ["#f-message", "Two adults and a teenager."]]) { await ev(setv(s, v)); await sleep(80); }
await ev(`document.querySelector('#enquire form button[type=submit]').click(); true`);
await sleep(800);
const ok = await ev(`(document.querySelector('#enquire [role=status]')||{}).innerText || 'NO CONFIRMATION'`);
const mailto = await ev(`window.__mailto || (document.querySelector('#enquire [role=status] a[href^="mailto:"]')||{}).href || ''`);
console.log("valid submit -> confirmation:", ok.replace(/\n+/g, " / ").slice(0, 200));
console.log("mailto:", decodeURIComponent(mailto).slice(0, 260).replace(/\n/g, " ⏎ "));
const shot2 = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(`${out}-success.png`, Buffer.from(shot2.result.data, "base64"));
ws.close(); chrome.kill();
