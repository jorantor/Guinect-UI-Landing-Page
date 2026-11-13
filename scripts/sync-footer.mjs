// Run manually after updating partials/footer-es.html: node scripts/sync-footer.mjs
// Static HTML pages keep the shared footer markup so search engines can read it.
import fs from "node:fs";
const footer = fs.readFileSync("partials/footer-es.html", "utf8").trim();
const files = fs.readdirSync(".").filter(f => f.endsWith(".html"));
const re = /<(section|footer)\b[^>]*class=["'][^"']*\bfooter-es\b[^"']*["'][^>]*>[\s\S]*?<\/\1>/i;
let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  if (!re.test(before)) continue;
  const after = before.replace(re, footer);
  if (after !== before) { fs.writeFileSync(file, after); changed++; }
}
console.log(`Updated ${changed} pages with the shared footer.`);
