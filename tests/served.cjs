const fs = require("node:fs"),
  crypto = require("node:crypto"),
  assert = require("node:assert/strict");
(async () => {
  const files = [
    "index.html",
    "styles.css",
    "script.js",
    "curated.js",
    "assets/world.svg",
    "data/catalog.json",
    "data/NOTICE.md",
  ];
  const results = [];
  for (const file of files) {
    const r = await fetch(
      new URL(
        file,
        process.env.BASE_URL || "https://unesco-heritage-zeta.vercel.app/",
      ),
    );
    assert.equal(r.status, 200, file);
    const bytes = Buffer.from(await r.arrayBuffer());
    assert.ok(bytes.equals(fs.readFileSync(file)), file + "exact source match");
    results.push({
      file,
      url: r.url,
      sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    });
  }
  fs.writeFileSync(
    "docs/full-catalog/served.json",
    JSON.stringify(results, null, 2),
  );
  console.log(results.length, "exact runtime/data files");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
