const { chromium } = require("playwright"),
  assert = require("node:assert/strict");
(async () => {
  const b = await chromium.launch({
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
    args: ["--no-sandbox"],
  });
  const base = process.env.BASE_URL || "http://127.0.0.1:8774";
  try {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await p.route("**/world.svg", async (r) => {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      await r.continue();
    });
    await p.goto(base + "#site=252", { waitUntil: "domcontentloaded" });
    await p.waitForFunction(
      () =>
        document.querySelector("#siteName").textContent === "Taj Mahal" &&
        !document.querySelector("#favoriteBtn").disabled,
    );
    const before = await p.locator("#siteImage").boundingBox();
    await p.locator("#siteImage").evaluate((e) => e.decode());
    const after = await p.locator("#siteImage").boundingBox();
    assert.equal(before.height, after.height);
    const dims = await p.evaluate(() => {
      const a = document.querySelector("#siteImage").getBoundingClientRect(),
        b = document.querySelector(".map-point").getBoundingClientRect();
      return { iw: a.width, ih: a.height, sw: b.width, sh: b.height };
    });
    assert.ok(
      Math.abs(dims.iw - dims.sw) < 1 && Math.abs(dims.ih - dims.sh) < 3,
    );
    await p.close();
    const e = await b.newPage();
    await e.route("**/world.svg", (r) => r.abort());
    await e.goto(base + "#site=252");
    await e.waitForFunction(() =>
      document
        .querySelector("#map-country")
        .textContent.includes("Map unavailable"),
    );
    await e.locator("#read-place").click();
    assert.equal(await e.locator("#place-notes").isVisible(), true);
    assert.equal(await e.locator(".map-point").isVisible(), false);
    await e.close();
    console.log(
      "slow map reserves final geometry, overlay aligned, failed map leaves notes usable",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
