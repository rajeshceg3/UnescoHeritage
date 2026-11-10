const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", colorScheme: "light" });
  await p.goto("http://127.0.0.1:8774/#site=274");
  await p.waitForFunction(() => document.querySelectorAll(".beat-layer.on").length >= 1);
  await p.screenshot({ path: "docs/illustrated-stories/after/274-beat1-390-light.png" });
  await b.close();
  console.log("ok");
})();
