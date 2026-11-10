const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  for (const id of ["274","668","156","95","154","326"]) {
    await p.goto("http://127.0.0.1:8774/#site=" + id);
    await p.waitForFunction(() => document.querySelectorAll(".beat-layer.on").length >= 1);
    for (let bIdx = 1; bIdx <= 3; bIdx++) {
      await p.evaluate((n) => setBeat(n), bIdx);
      const info = await p.evaluate(() => {
        const svg = document.querySelector("#storyArtInner svg");
        const srect = svg.getBoundingClientRect();
        const scale = srect.width / 900;
        const toVb = (x, y) => [Math.round((x - srect.left) / scale), Math.round((y - srect.top) / scale)];
        const out = [];
        const notes = [...document.querySelectorAll(".beat-layer.on .note")];
        const rects = notes.map((n) => { const r = n.getBoundingClientRect(); return { r, t: n.textContent }; });
        for (const pth of document.querySelectorAll(".beat-layer.on path")) {
          const len = pth.getTotalLength();
          for (let d = 0; d <= len; d += 5) {
            const pt = pth.getPointAtLength(d);
            const m = pth.getScreenCTM();
            const x = m.a * pt.x + m.c * pt.y + m.e, y = m.b * pt.x + m.d * pt.y + m.f;
            for (const { r, t } of rects)
              if (x > r.left + 2 && x < r.right - 2 && y > r.top + 2 && y < r.bottom - 2)
                out.push(`${t} hit by path near vb ${toVb(x, y)}`);
          }
        }
        for (let i = 0; i < rects.length; i++)
          for (let j = i + 1; j < rects.length; j++) {
            const a = rects[i].r, b2 = rects[j].r;
            if (a.left < b2.right - 2 && a.right > b2.left + 2 && a.top < b2.bottom - 2 && a.bottom > b2.top + 2)
              out.push(`note-note ${rects[i].t}/${rects[j].t}`);
          }
        const nrects = rects.map(({ r, t }) => `${t} vb-rect ${toVb(r.left, r.top)}..${toVb(r.right, r.bottom)}`);
        return { hits: [...new Set(out)], nrects };
      });
      if (info.hits.length) console.log(id, "beat", bIdx, JSON.stringify(info, null, 1));
    }
  }
  await b.close();
})();
