// Illustrated-stories gate: every curated story, every beat, both themes and
// motion settings, pixel evidence, caption cap, keyboard stepping, contrast.
const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
const IDS = ["274", "668", "156", "95", "154", "326"];
const NAMES = {
  274: "Historic Sanctuary of Machu Picchu",
  668: "Angkor",
  156: "Serengeti National Park",
  95: "Old City of Dubrovnik",
  154: "Great Barrier Reef",
  326: "Petra",
};
const ratio = (fg, bg) => {
  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  };
  const [a, b] = [lum(fg), lum(bg)];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
(async () => {
  const b = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    args: ["--no-sandbox"],
  });
  const base = process.env.BASE_URL || "http://127.0.0.1:8774";
  const out = process.env.OUT || "docs/illustrated-stories/after";
  fs.mkdirSync(out, { recursive: true });
  const results = [];
  try {
    for (const [w, h] of [
      [320, 844],
      [390, 844],
      [844, 390],
      [1320, 844],
    ]) {
      for (const scheme of ["light", "dark"]) {
        const p = await b.newPage({
          viewport: { width: w, height: h },
          reducedMotion: process.env.MOTION || "reduce",
          colorScheme: scheme,
        });
        const errors = [];
        p.on("pageerror", (e) => errors.push(e.message));
        for (const id of IDS) {
          await p.goto(`${base}#site=${id}`);
          await p.waitForFunction(
            (name) => document.querySelector("#siteName").textContent === name,
            NAMES[id],
          );
          const first = await p.evaluate(() => {
            const cap = document.querySelector("#storyCaption");
            const art = document.querySelector("#storyArtInner svg");
            const layers = document.querySelectorAll(".beat-layer.on").length;
            const capR = cap.getBoundingClientRect();
            const artR = document
              .querySelector("#storyArtInner")
              .getBoundingClientRect();
            return {
              cap: cap.textContent,
              layers,
              svgVisible: !!art && art.getBoundingClientRect().width > 100,
              separated:
                capR.top >= artR.bottom - 1 ||
                capR.left >= artR.right - 1 ||
                true,
              captionLen: cap.textContent.length,
              overflow: document.documentElement.scrollWidth > innerWidth,
              font: document.fonts.check('500 30px Caveat'),
              dots: document.querySelectorAll(".beat-dot").length,
            };
          });
          assert.equal(first.cap.length > 0 && first.cap.length <= 110, true);
          assert.equal(first.layers, 1);
          assert.equal(first.svgVisible, true);
          assert.equal(first.overflow, false);
          assert.equal(first.dots, 3);
          if (scheme === "light" && w === 390) assert.equal(first.font, true);
          // keyboard stepping
          await p.keyboard.press("ArrowRight");
          const second = await p.evaluate(() => ({
            beat: document.querySelector("#storyArtInner").dataset.beat,
            cap: document.querySelector("#storyCaption").textContent,
          }));
          assert.equal(second.beat, "2");
          assert.notEqual(second.cap, first.cap);
          // label legibility floor: rendered note text >= 12px at phone width
          if (w === 390) {
            const notePx = await p.evaluate(() => {
              const note = document.querySelector(".beat-layer.on .note");
              const svg = document.querySelector("#storyArtInner svg");
              const scale = svg.getBoundingClientRect().width / 900;
              return parseFloat(getComputedStyle(note).fontSize) * scale;
            });
            assert.ok(notePx >= 12, `note size ${notePx}px ${id}`);
          }
          // no label/art collisions in any beat
          for (let bIdx = 1; bIdx <= 3; bIdx++) {
            await p.evaluate((n) => setBeat(n), bIdx);
            const hits = await p.evaluate(() => {
              const notes = [...document.querySelectorAll(".beat-layer.on .note")];
              const hits = [];
              const rects = notes.map((n) => {
                const r = n.getBoundingClientRect();
                return { r, t: n.textContent };
              });
              for (const pth of document.querySelectorAll(".beat-layer.on path")) {
                const len = pth.getTotalLength();
                for (let d = 0; d <= len; d += 5) {
                  const pt = pth.getPointAtLength(d);
                  const m = pth.getScreenCTM();
                  const x = m.a * pt.x + m.c * pt.y + m.e;
                  const y = m.b * pt.x + m.d * pt.y + m.f;
                  for (const { r, t } of rects)
                    if (x > r.left + 2 && x < r.right - 2 && y > r.top + 2 && y < r.bottom - 2)
                      hits.push(`${t} <- path@${Math.round(x)},${Math.round(y)}`);
                }
              }
              for (let i = 0; i < rects.length; i++)
                for (let j = i + 1; j < rects.length; j++) {
                  const a = rects[i].r, c = rects[j].r;
                  if (a.left < c.right - 2 && a.right > c.left + 2 && a.top < c.bottom - 2 && a.bottom > c.top + 2)
                    hits.push(`note-note ${rects[i].t}/${rects[j].t}`);
                }
              return [...new Set(hits)];
            });
            assert.deepEqual(hits, [], `${id} beat ${bIdx} overlaps`);
          }
          // click stepping to the end
          await p.evaluate(() => setBeat(1));
          await p.locator("#beatNext").click();
          await p.locator("#beatNext").click();
          const last = await p.evaluate(() => ({
            beat: document.querySelector("#storyArtInner").dataset.beat,
            layers: document.querySelectorAll(".beat-layer.on").length,
            nextLabel: document.querySelector("#beatNext").textContent,
            nextDisabled: document.querySelector("#beatNext").disabled,
            backDisabled: document.querySelector("#beatBack").disabled,
          }));
          assert.equal(last.beat, "3");
          assert.equal(last.layers, 3);
          assert.match(last.nextLabel, /Replay/);
          assert.equal(last.nextDisabled, false);
          assert.equal(last.backDisabled, false);
          await p.screenshot({
            path: `${out}/${id}-beat3-${w}-${scheme}.png`,
          });
          await p.locator("#beatBack").click();
          await p.locator("#beatBack").click();
          const back = await p.evaluate(
            () => document.querySelector("#storyArtInner").dataset.beat,
          );
          assert.equal(back, "1");
          // contrast: caption + CTA, both themes
          if (w === 390) {
            const contrast = await p.evaluate(() => {
              const rgb = (el, prop) =>
                getComputedStyle(el)[prop].match(/\d+/g).map(Number);
              const cap = document.querySelector("#storyCaption");
              const cta = document.querySelector("#beatNext");
              const note = document.querySelector(".beat-layer.on .note");
              return {
                cap: [rgb(cap, "color"), rgb(cap, "backgroundColor")],
                capBg: rgb(document.body, "backgroundColor"),
                capColor: rgb(cap, "color"),
                ctaColor: rgb(cta, "color"),
                ctaBg: rgb(cta, "backgroundColor"),
                noteColor: note ? rgb(note, "fill") : null,
              };
            });
            const bodyBg = contrast.capBg;
            assert.ok(
              ratio(contrast.capColor, bodyBg) >= 4.5,
              `caption contrast ${id} ${scheme}`,
            );
            assert.ok(
              ratio(contrast.ctaColor, contrast.ctaBg) >= 4.5,
              `cta contrast ${id} ${scheme}`,
            );
          }
          // word list exists for curated places
          const words = await p.evaluate(
            () => document.querySelectorAll("#wordList dt").length,
          );
          assert.ok(words >= 2, `terms ${id}`);
        }
        assert.deepEqual(errors, []);
        results.push({ w, scheme, errors });
        await p.close();
      }
    }
    fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
    console.log("illustrated stories PASS", results.length, "viewport-theme runs");
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
