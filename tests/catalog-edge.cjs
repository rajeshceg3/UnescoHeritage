const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
    args: ["--no-sandbox"],
  });
  const base = process.env.BASE_URL || "http://127.0.0.1:8774",
    out = process.env.OUT || "docs/full-catalog/local";
  try {
    const p = await b.newPage({
      viewport: { width: 320, height: 844 },
      reducedMotion: "reduce",
    });
    await p.goto(base);
    await p.waitForFunction(
      () => document.querySelector("#favoriteBtn").disabled === false,
    );
    const sweep = await p.evaluate(() => {
      let bad = [];
      for (const s of catalog) {
        renderSite(s);
        if (document.documentElement.scrollWidth > innerWidth) bad.push(s.id);
        if (!$("place-notes").hidden || !$("collection").hidden)
          bad.push("cap-" + s.id);
      }
      return { records: catalog.length, bad };
    });
    assert.deepEqual(sweep, { records: 1273, bad: [] });
    const long = JSON.parse(fs.readFileSync("data/catalog.json")).sites.sort(
      (a, b) => b.name.length - a.name.length,
    )[0];
    await p.goto(base + "#site=" + long.id);
    await p.waitForFunction(
      (id) =>
        location.hash === "#site=" + id &&
        document.querySelector("#siteName").textContent.length > 100,
      long.id,
    );
    await p.screenshot({
      path: `${out}/longest-title-320.png`,
      fullPage: true,
    });
    await p.close();
    const e = await b.newPage();
    await e.route("**/data/catalog.json", (r) => r.abort());
    await e.goto(base);
    await e.waitForSelector("#retry-catalog:not([hidden])");
    assert.equal(await e.locator("#collection-toggle").isDisabled(), true);
    await e.unroute("**/data/catalog.json");
    await e.locator("#retry-catalog").click();
    await e.waitForFunction(
      () => !document.querySelector("#favoriteBtn").disabled,
    );
    await e.close();
    const c = await b.newPage();
    await c.addInitScript(() =>
      localStorage.setItem("unesco-favorites", "bad-json"),
    );
    await c.goto(base);
    await c.waitForFunction(() =>
      document
        .querySelector("#statusMessage")
        .textContent.includes("Nothing has been overwritten"),
    );
    await c.locator("#favoriteBtn").click();
    assert.equal(
      await c.evaluate(() => localStorage.getItem("unesco-favorites")),
      "bad-json",
    );
    await c.close();
    console.log(
      "1273phone layouts/disclosure cap, longest-title pixels, catalog failure/retry and malformed legacy preservation PASS",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
