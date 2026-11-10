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
  const results = [];
  const base = process.env.BASE_URL || "http://127.0.0.1:8774";
  const out = process.env.OUT || "docs/navigation/local";
  fs.mkdirSync(out, { recursive: true });
  try {
    for (const [w, h] of [
      [320, 844],
      [390, 844],
      [844, 390],
      [1320, 844],
    ]) {
      const p = await b.newPage({
          viewport: { width: w, height: h },
          reducedMotion: process.env.MOTION || "reduce",
        }),
        errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(base);
      await p.waitForFunction(
        () =>
          document.querySelector("#siteName").textContent !== "Loading…" &&
          !document.querySelector("#heroCard").hasAttribute("aria-busy"),
      );
      assert.equal(await p.locator("details").getAttribute("open"), null);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      const first = await p.locator("#sitePosition").textContent();
      for (let n = 0; n < 6; n++) {
        const before = await p.locator("#sitePosition").textContent();
        await p.locator("#nextBtn").scrollIntoViewIfNeeded();
        assert.ok(
          await p.locator("#nextBtn").evaluate((e) => {
            const r = e.getBoundingClientRect();
            return (
              r.height >= 44 &&
              e.contains(
                document.elementFromPoint(
                  r.x + r.width / 2,
                  r.y + r.height / 2,
                ),
              )
            );
          }),
        );
        await p.locator("#nextBtn").click();
        if (process.env.MOTION === "no-preference") {
          assert.equal(
            await p.locator("#heroCard").getAttribute("aria-busy"),
            "true",
          );
          assert.equal(await p.locator("#favoriteBtn").isDisabled(), true);
          await p.locator("#nextBtn").evaluate((e) => e.click());
        }
        await p.waitForFunction(
          (before) =>
            document.querySelector("#sitePosition").textContent !== before,
          before,
        );
        assert.equal(
          await p.evaluate(() => document.activeElement.id),
          "siteName",
        );
        assert.ok(
          await p
            .locator("#siteName")
            .evaluate(
              (e) =>
                e.getBoundingClientRect().top >= 0 &&
                e.getBoundingClientRect().bottom < innerHeight,
            ),
        );
      }
      assert.equal(await p.locator("#sitePosition").textContent(), first);
      await p.locator("#prevBtn").scrollIntoViewIfNeeded();
      await p.locator("#prevBtn").focus();
      await p.keyboard.press("Enter");
      await p.waitForFunction(
        (first) =>
          document.querySelector("#sitePosition").textContent !== first,
        first,
      );
      const previous = await p.locator("#sitePosition").textContent();
      await p.locator("#nextBtn").focus();
      await p.keyboard.press("Space");
      await p.waitForFunction(
        (previous) =>
          document.querySelector("#sitePosition").textContent !== previous,
        previous,
      );
      assert.equal(await p.locator("#sitePosition").textContent(), first);
      for (const lens of ["Story", "Ritual", "Sense"]) {
        await p.getByRole("tab", { name: lens, exact: true }).click();
        assert.equal(
          await p
            .getByRole("tab", { name: lens, exact: true })
            .getAttribute("aria-selected"),
          "true",
        );
      }
      await p.locator("#favoriteBtn").click();
      assert.match(await p.locator("#favoriteBtn").textContent(), /Saved/);
      await p.reload();
      await p.waitForFunction(
        () => !document.querySelector("#heroCard").hasAttribute("aria-busy"),
      );
      assert.match(await p.locator("#favoriteCount").textContent(), /1\/6/);
      await p.locator("#nextBtn").scrollIntoViewIfNeeded();
      await p.screenshot({ path: `${out}/${w}-actions.png` });
      await p.locator("#nextBtn").click();
      await p.waitForFunction(() => document.activeElement.id === "siteName");
      await p.screenshot({ path: `${out}/${w}-arrival.png` });
      assert.deepEqual(errors, []);
      results.push({
        width: w,
        height: h,
        transitions: 6,
        keyboard: true,
        lenses: 3,
        favoritesPersistence: true,
        errors,
      });
      await p.close();
    }
    console.log(JSON.stringify(results, null, 2));
    fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
