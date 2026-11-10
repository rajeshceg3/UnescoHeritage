const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
  const out = "docs/illustrated-stories/after";
  for (const id of ["274","668","95","156","154","326"]) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference", colorScheme: "light" });
    await p.goto("http://127.0.0.1:8774/#site=" + id);
    await p.waitForFunction(() => document.querySelectorAll(".beat-layer.on").length >= 1);
    await p.evaluate(() => setBeat(3));
    await p.waitForTimeout(3200);
    await p.screenshot({ path: `${out}/${id}-beat3-390-light.png` });
    await p.close();
  }
  await b.close();
  console.log("shots done");
})();
