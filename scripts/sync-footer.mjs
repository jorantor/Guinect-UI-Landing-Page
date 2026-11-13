// Run with: node scripts/sync-footer.mjs
// Source of truth: partials/footer-es.html. Stamps static HTML so search engines can read it.
import fs from "node:fs"; import path from "node:path";
const footer=fs.readFileSync("partials/footer-es.html","utf8").trim();
const files=fs.readdirSync(".").filter(f=>f.endsWith(".html"));
const re=/<(?:section|footer)\\b[^>]*class=["'][^"']*\\bfooter-es\\b[^"']*["'][^>]*>[\\s\\S]*?<\\/(?:section|footer)>/i;
let updated=0;for(const file of files){let html=fs.readFileSync(file,"utf8");if(!re.test(html))continue;let next=html.replace(re,footer);if(next!==html){fs.writeFileSync(file,next);updated++;}}
console.log("Footer synced in "+updated+" pages");
