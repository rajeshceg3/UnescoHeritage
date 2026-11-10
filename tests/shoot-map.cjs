const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
  for (const scheme of ["light", "dark"]) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, colorScheme: scheme, reducedMotion: "reduce" });
    await p.goto("http://127.0.0.1:8774/#site=274");
    await p.waitForFunction(() => document.querySelector("#siteName").textContent === "Historic Sanctuary of Machu Picchu");
    if (scheme === "light") {
      await p.locator("details.reference").screenshot({ path: "docs/illustrated-stories/after/map-entry-closed-390-light.png" });
    }
    await p.locator("details.reference summary").click();
    await p.locator("details.reference").screenshot({ path: `docs/illustrated-stories/after/map-entry-open-390-${scheme}.png` });
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exitCode = 1; });
