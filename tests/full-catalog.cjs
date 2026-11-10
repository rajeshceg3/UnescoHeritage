const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
const data = JSON.parse(fs.readFileSync("data/catalog.json"));
assert.equal(data.count, 1273);
assert.equal(new Set(data.sites.map((s) => s.id)).size, 1273);
assert.deepEqual(
  Object.fromEntries(
    ["Cultural", "Natural", "Mixed"].map((c) => [
      c,
      data.sites.filter((s) => s.category === c).length,
    ]),
  ),
  { Cultural: 991, Natural: 240, Mixed: 42 },
);
for (const s of data.sites) {
  assert.match(s.id, /^\d+$/);
  assert.ok(s.name && s.countries.length && s.category);
  if (s.point)
    assert.ok(
      s.point.lon >= -180 &&
        s.point.lon <= 180 &&
        s.point.lat >= -90 &&
        s.point.lat <= 90,
    );
}
(async () => {
  const b = await chromium.launch({
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
    args: ["--no-sandbox"],
  });
  const out = process.env.OUT || "docs/full-catalog/local";
  fs.mkdirSync(out, { recursive: true });
  const base = process.env.BASE_URL || "http://127.0.0.1:8774";
  const results = [];
  try {
    for (const [w, h] of [
      [320, 844],
      [390, 844],
      [844, 390],
      [1320, 844],
    ]) {
      let p = await b.newPage({
          viewport: { width: w, height: h },
          reducedMotion: process.env.MOTION || "reduce",
        }),
        errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      const original = "[ 0, 2, 5 ]";
      await p.addInitScript((v) => {
        if (!localStorage.getItem("unesco-favorites"))
          localStorage.setItem("unesco-favorites", v);
      }, original);
      await p.goto(base);
      await p.waitForFunction(
        () =>
          document.querySelector("#siteName").textContent ===
          "Historic Sanctuary of Machu Picchu",
      );
      assert.equal(await p.locator("#collection").isVisible(), false);
      assert.equal(await p.locator("#place-notes").isVisible(), false);
      assert.equal(await p.locator("#favoriteBtn").textContent(), "Saved ✓");
      await p.locator("#siteImage").evaluate((e) => e.decode());
      await p.screenshot({ path: `${out}/home-${w}.png`, fullPage: true });
      await p.locator("#collection-toggle").click();
      assert.equal(await p.locator("#heroCard").isVisible(), false);
      assert.equal(await p.locator("#place-list button").count(), 6);
      await p.screenshot({
        path: `${out}/browse-first-${w}.png`,
        fullPage: true,
      });
      await p.locator("#results-next").click();
      assert.equal(await p.locator("#place-list button").count(), 6);
      await p.locator("#place-search").fill("Taj Mahal");
      assert.equal(await p.locator("#place-list button").count(), 1);
      await p.keyboard.press("Escape");
      assert.equal(
        await p.locator("#sitePosition").textContent(),
        "Outside this selection",
      );
      await p.locator("#nextBtn").click();
      await p.locator("#collection-toggle").click();
      await p.locator("#place-list button").click();
      await p.waitForFunction(() => document.activeElement.id === "siteName");
      assert.equal(await p.locator("#siteName").textContent(), "Taj Mahal");
      assert.equal(await p.locator("#place-notes").isVisible(), false);
      await p.locator("#favoriteBtn").click();
      assert.equal(await p.locator("#favoriteBtn").textContent(), "Saved ✓");
      assert.equal(
        await p.evaluate(() => localStorage.getItem("unesco-favorites")),
        original,
      );
      await p.reload();
      await p.waitForFunction(
        () => document.querySelector("#siteName").textContent === "Taj Mahal",
      );
      assert.equal(await p.locator("#favoriteBtn").textContent(), "Saved ✓");
      await p.locator("#read-place").click();
      await p.getByRole("tab", { name: "Notice", exact: true }).focus();
      await p.keyboard.press("ArrowRight");
      assert.equal(
        await p
          .getByRole("tab", { name: "Context", exact: true })
          .getAttribute("aria-selected"),
        "true",
      );
      await p.locator("#official-description summary").click();
      assert.ok(
        (await p.locator("#full-description").textContent()).length > 100,
      );
      await p.screenshot({ path: `${out}/notes-${w}.png`, fullPage: true });
      await p.locator("#nextBtn").click();
      assert.equal(await p.locator("#place-notes").isVisible(), false);
      await p.locator("#collection-toggle").click();
      await p.locator(".filters summary").click();
      await p.locator("#country-filter").selectOption("India");
      await p.locator("#category-filter").selectOption("Natural");
      assert.ok((await p.locator("#place-list button").count()) <= 6);
      assert.ok(
        (await p.locator("#place-list button").allTextContents()).every((t) =>
          t.includes("India"),
        ),
      );
      await p.screenshot({ path: `${out}/browse-${w}.png`, fullPage: true });
      await p.locator("#place-search").fill("zzzznotasite");
      assert.equal(await p.locator("#place-list button").count(), 0);
      assert.equal(await p.locator("#results-next").isDisabled(), true);
      await p.keyboard.press("Escape");
      assert.equal(await p.locator("#collection").isVisible(), false);
      await p.goto(base + "#site=868");
      await p.waitForFunction(
        () =>
          document.querySelector("#map-country").textContent ===
          "No reference coordinate supplied",
      );
      assert.equal(await p.locator(".story-art .map-point").isVisible(), false);
      assert.equal(await p.locator("#place-notes").isVisible(), false);
      await p.screenshot({
        path: `${out}/missing-point-${w}.png`,
        fullPage: true,
      });
      assert.equal(
        await p.evaluate(() => localStorage.getItem("unesco-favorites")),
        original,
      );
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.deepEqual(errors, []);
      results.push({
        width: w,
        fullCount: 1273,
        visiblePlaces: 1,
        browseCap: 6,
        legacyBytesPreserved: true,
        extraSaveReload: true,
        deepLink: true,
        filters: true,
        noResults: true,
        missingPoint: true,
        lensKeyboard: true,
        errors,
      });
      await p.close();
    }
    fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
    console.log(results);
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
