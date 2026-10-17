#!/usr/bin/env node
// IndexNow: tell Bing (and Yandex, Seznam, Naver) which pages changed, right after a
// deploy. Bing's index is what ChatGPT search and Microsoft Copilot answer from, so
// this is the fastest way for an edit to reach them. Google doesn't take IndexNow.
//
// Sends only URLs whose sitemap lastmod is newer than the last successful ping
// (.indexnow-last, gitignored; first run sends everything). lastmod is the exact
// time of each page's last commit (scripts/build-content.mjs), so this is accurate.
// The key is public by design: Bing checks it at https://ahromlabs.com/<key>.txt.
import fs from "node:fs";

const HOST = "ahromlabs.com";
const KEY = "f0bb9ca76f6f593250c83226eb1ede11";
const STATE = new URL("../.indexnow-last", import.meta.url);

const last = fs.existsSync(STATE) ? new Date(fs.readFileSync(STATE, "utf-8").trim()) : new Date(0);
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const changed = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .filter(([, , lastmod]) => new Date(lastmod) > last)
  .map(([, loc]) => loc);

if (changed.length === 0) {
  console.log("indexnow: nothing changed since", last.toISOString());
  process.exit(0);
}
const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: changed }),
});
// 200 = accepted, 202 = accepted and the key is still being verified.
if (r.status !== 200 && r.status !== 202) {
  console.log(`indexnow: ${r.status} ${await r.text()} — not recorded; the next deploy retries`);
  process.exit(0); // never fail a deploy over this
}
fs.writeFileSync(STATE, new Date().toISOString());
console.log(`indexnow: ${r.status}, sent ${changed.length} URL(s)`);
