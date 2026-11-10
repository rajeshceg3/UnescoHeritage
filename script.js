// Catalog data is UNESCO CC BY-SA 4.0. See data/NOTICE.md for transformations.
"use strict";
const $ = (id) => document.getElementById(id),
  CAP = 6,
  LEGACY = ["274", "668", "156", "95", "154", "326"];
let catalog = [],
  view = [],
  current = null,
  offset = 0,
  activeLens = 0,
  ready = false,
  mapFailed = false;
const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
let legacy = [],
  extra = [];
let storageIssue = false;
try {
  const v = JSON.parse(localStorage.getItem("unesco-favorites") || "[]");
  legacy = Array.isArray(v)
    ? v.filter((i) => Number.isInteger(i) && i >= 0 && i < 6)
    : [];
  const e = JSON.parse(localStorage.getItem("unesco-favorites-ids") || "[]");
  extra = Array.isArray(e) ? e.filter((i) => typeof i === "string") : [];
} catch {
  storageIssue = true;
}
const saved = (id) =>
  LEGACY.includes(id)
    ? legacy.includes(LEGACY.indexOf(id))
    : extra.includes(id);
const position = () => {
  const i = view.indexOf(current);
  $("sitePosition").textContent =
    i < 0
      ? "Outside this selection"
      : `${i + 1} / ${view.length.toLocaleString("en")}`;
};
const status = (s) => ($("statusMessage").textContent = s);
const closeNotes = () => {
  $("place-notes").hidden = true;
  $("read-place").setAttribute("aria-expanded", "false");
  $("read-place").innerHTML =
    'Read the place <span aria-hidden="true">↓</span>';
  $("official-description").open = false;
  document.querySelector(".reflection").open = false;
  document.querySelector(".reference").open = false;
};
function closeBrowse(focus = false) {
  $("collection").hidden = true;
  $("collection-toggle").setAttribute("aria-expanded", "false");
  $("heroCard").hidden = false;
  if (focus) $("collection-toggle").focus();
}
function countSaved() {
  $("favoriteCount").textContent =
    `${catalog.filter((s) => saved(s.id)).length} saved places · private to this browser`;
  $("favoriteBtn").textContent =
    current && saved(current.id) ? "Saved ✓" : "Save favorite";
}
function filterSites() {
  const q = normalize($("place-search").value.trim()),
    country = $("country-filter").value,
    category = $("category-filter").value;
  view = catalog.filter(
    (s) =>
      (!q || normalize(s.name + " " + s.countries.join(" ")).includes(q)) &&
      (!country || s.countries.includes(country)) &&
      (!category || s.category === category) &&
      (!$("saved-only").checked || saved(s.id)),
  );
  offset = 0;
  renderResults();
  if (current) {
    position();
    $("nextBtn").disabled = !view.length;
    $("prevBtn").disabled = !view.length;
  }
  $("shuffleBtn").disabled = !view.length;
}
function renderResults() {
  const list = $("place-list");
  list.replaceChildren();
  view.slice(offset, offset + CAP).forEach((s) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.id = s.id;
    b.textContent = s.name;
    const sub = document.createElement("span");
    sub.textContent = s.countries.join(" · ");
    b.append(sub);
    b.setAttribute("aria-current", String(current?.id === s.id));
    b.onclick = () => {
      closeBrowse();
      renderSite(s, true);
    };
    list.append(b);
  });
  $("result-count").textContent = view.length
    ? `${view.length.toLocaleString("en")} places found`
    : "No places match. Try another name or clear a filter.";
  $("result-page").textContent = view.length
    ? `${offset + 1}-${Math.min(offset + CAP, view.length)} of ${view.length.toLocaleString("en")}`
    : "0 results";
  $("results-prev").disabled = offset === 0;
  $("results-next").disabled = offset + CAP >= view.length;
  countSaved();
}
function lens() {
  if (!current) return;
  const custom = curatedSites[LEGACY.indexOf(current.id)];
  const generic = [
    "Start with the locator and the official description. What connects this place to its setting?",
    "Read the full UNESCO description above. Which events or traditions connect the place to its history?",
    "Which detail would you want to understand better? Follow the official listing before relying on a map point or planning a visit.",
  ];
  $("lensBody").textContent = custom
    ? custom.lenses[["sense", "story", "ritual"][activeLens]]
    : generic[activeLens];
  [...document.querySelectorAll("[role=tab]")].forEach((b, i) => {
    b.setAttribute("aria-selected", String(i === activeLens));
    b.tabIndex = i === activeLens ? 0 : -1;
    b.setAttribute("aria-controls", "lensBody");
    if (i === activeLens) $("lensBody").setAttribute("aria-labelledby", b.id);
  });
}
function renderSite(s, focus = false) {
  current = s;
  closeNotes();
  $("siteName").textContent = s.name;
  $("siteName").classList.toggle("long-title", s.name.length > 110);
  $("siteLocation").textContent = s.countries.join(" · ");
  $("categoryBadge").textContent = s.category;
  const text =
    s.description ||
    "No English description is supplied in this dataset snapshot. Read the official listing for more.";
  const first =
    text.match(/^.{1,320}(?:[.!?](?:\s|$)|$)/)?.[0] ||
    text.slice(0, Math.min(text.length, 300)).replace(/\s+\S*$/, "") + "…";
  $("siteDescription").textContent = first;
  $("full-description").textContent = text;
  $("siteYear").textContent = s.year || "Not supplied";
  $("siteCriteria").textContent = s.criteria || "Not supplied in this snapshot";
  $("site-source").href = `https://whc.unesco.org/en/list/${s.id}/`;
  $("place-number").textContent = "";
  $("sitePosition").textContent =
    `${view.indexOf(s) + 1} / ${view.length.toLocaleString("en")}`;
  const custom = curatedSites[LEGACY.indexOf(s.id)];
  $("siteSignificance").textContent = custom?.significance || "A closer look";
  $("siteHighlights").replaceChildren();
  (
    custom?.highlights || [
      `${s.category} heritage`,
      s.region || "Region not supplied",
    ]
  )
    .slice(0, 3)
    .forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      $("siteHighlights").append(li);
    });
  $("microMoments").replaceChildren();
  (
    custom?.moments || [
      "Name one question the official description raises for you.",
      "Consider what a single point on a map cannot tell you.",
    ]
  )
    .slice(0, 2)
    .forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      $("microMoments").append(li);
    });
  activeLens = 0;
  lens();
  const point = s.point;
  document.querySelector(".map-point").toggleAttribute("hidden", !point);
  $("map-country").textContent = point
    ? "UNESCO reference coordinate"
    : "No reference coordinate supplied";
  if (point) {
    for (const id of ["point-ring", "point-dot"]) {
      $(id).setAttribute("cx", (point.lon + 180) * 2.5);
      $(id).setAttribute("cy", (90 - point.lat) * 2.5);
    }
  }
  $("siteImage").alt = point
    ? `World locator with a representative point for ${s.name}. Not property boundaries.`
    : "World reference map; no point is supplied for this property.";
  if (mapFailed) showMapFailure();
  document.documentElement.style.setProperty(
    "--accent",
    s.category === "Natural" ? "#385b4a" : "#665038",
  );
  $("nextBtn").disabled = view.length < 2;
  $("prevBtn").disabled = view.length < 2;
  countSaved();
  history.replaceState(null, "", `#site=${s.id}`);
  status(
    storageIssue
      ? "Saved data could not be read. Nothing has been overwritten."
      : `Now exploring ${s.name}.`,
  );
  if (focus) {
    $("siteName").focus({ preventScroll: true });
    $("siteName").scrollIntoView({ block: "start", behavior: "instant" });
  }
}
function step(n) {
  if (!current || !view.length) return;
  const i = view.indexOf(current);
  renderSite(
    view[
      i < 0
        ? n > 0
          ? 0
          : view.length - 1
        : (i + n + view.length) % view.length
    ],
    true,
  );
}
async function load() {
  ready = false;
  $("retry-catalog").hidden = true;
  for (const id of [
    "collection-toggle",
    "nextBtn",
    "prevBtn",
    "favoriteBtn",
    "read-place",
  ])
    $(id).disabled = true;
  try {
    const r = await fetch("data/catalog.json");
    if (!r.ok) throw Error("catalog");
    const data = await r.json();
    if (!Array.isArray(data.sites) || data.sites.length !== data.count)
      throw Error("catalog");
    catalog = data.sites;
    view = [...catalog];
    const countries = [...new Set(catalog.flatMap((s) => s.countries))].sort(
      (a, b) => a.localeCompare(b),
    );
    $("country-filter").replaceChildren(
      new Option("Every country", ""),
      ...countries.map((c) => new Option(c, c)),
    );
    const id = location.hash.match(/^#site=(\d+)$/)?.[1] || "274";
    const s =
      catalog.find((s) => s.id === id) || catalog.find((s) => s.id === "274");
    for (const name of [
      "collection-toggle",
      "nextBtn",
      "prevBtn",
      "favoriteBtn",
      "read-place",
    ])
      $(name).disabled = false;
    ready = true;
    renderSite(s);
    renderResults();
    $("heroCard").removeAttribute("aria-busy");
  } catch {
    status("The catalog could not load. Your saved places have not changed.");
    $("retry-catalog").hidden = false;
  }
}
$("retry-catalog").onclick = load;
$("collection-toggle").onclick = () => {
  if (!ready) return;
  if (!$("collection").hidden) {
    closeBrowse(true);
    return;
  }
  $("collection").hidden = false;
  $("heroCard").hidden = true;
  $("collection-toggle").setAttribute("aria-expanded", "true");
  renderResults();
  $("place-search").focus();
};
$("close-browse").onclick = () => closeBrowse(true);
$("collection").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeBrowse(true);
  }
});
for (const id of [
  "place-search",
  "country-filter",
  "category-filter",
  "saved-only",
])
  $(id).addEventListener(
    id === "place-search" ? "input" : "change",
    filterSites,
  );
for (const [id, n] of [
  ["results-prev", -1],
  ["results-next", 1],
])
  $(id).onclick = () => {
    offset += n * CAP;
    renderResults();
    $("place-list").firstElementChild?.focus();
  };
$("nextBtn").onclick = () => step(1);
$("prevBtn").onclick = () => step(-1);
$("shuffleBtn").onclick = () => {
  if (!view.length) return;
  const options = view.filter((s) => s !== current);
  closeBrowse();
  renderSite(
    options[Math.floor(Math.random() * options.length)] || view[0],
    true,
  );
};
$("favoriteBtn").onclick = () => {
  if (!current || storageIssue) return;
  const id = current.id,
    old = legacy.slice(),
    oldExtra = extra.slice();
  try {
    if (LEGACY.includes(id)) {
      const i = LEGACY.indexOf(id);
      legacy = saved(id) ? legacy.filter((n) => n !== i) : [...legacy, i];
      localStorage.setItem("unesco-favorites", JSON.stringify(legacy));
    } else {
      extra = saved(id) ? extra.filter((n) => n !== id) : [...extra, id];
      localStorage.setItem("unesco-favorites-ids", JSON.stringify(extra));
    }
    countSaved();
    status(
      saved(id)
        ? "Place saved in this browser."
        : "Place removed from saved places.",
    );
  } catch {
    legacy = old;
    extra = oldExtra;
    status(
      "This browser could not save the change. Your earlier saved places are unchanged.",
    );
  }
};
$("read-place").onclick = () => {
  const opening = $("place-notes").hidden;
  $("place-notes").hidden = !opening;
  $("read-place").setAttribute("aria-expanded", String(opening));
  $("read-place").innerHTML = opening
    ? 'Close field notes <span aria-hidden="true">↑</span>'
    : 'Read the place <span aria-hidden="true">↓</span>';
  if (opening) {
    $("siteSignificance").tabIndex = -1;
    $("siteSignificance").focus({ preventScroll: true });
    $("place-notes").scrollIntoView({ block: "start", behavior: "instant" });
  }
};
const tabs = [...document.querySelectorAll("[role=tab]")];
tabs.forEach((b, i) => {
  b.onclick = () => {
    activeLens = i;
    lens();
  };
  b.onkeydown = (e) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    activeLens =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? 2
          : (i + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3;
    lens();
    tabs[activeLens].focus();
  };
});
function showMapFailure() {
  mapFailed = true;
  $("siteImage").hidden = true;
  document.querySelector(".map-point").setAttribute("hidden", "");
  $("map-country").textContent =
    "Map unavailable. The description and source remain usable.";
}
$("siteImage").onerror = showMapFailure;
if ($("siteImage").complete && !$("siteImage").naturalWidth) showMapFailure();
window.addEventListener("hashchange", () => {
  const id = location.hash.match(/^#site=(\d+)$/)?.[1],
    s = catalog.find((s) => s.id === id);
  if (s) {
    closeBrowse();
    renderSite(s, true);
  }
});
document.addEventListener("keydown", (e) => {
  if (
    e.defaultPrevented ||
    e.repeat ||
    e.ctrlKey ||
    e.metaKey ||
    e.altKey ||
    !ready ||
    !$("collection").hidden ||
    e.target.closest(
      "button,a,input,select,textarea,summary,[contenteditable=true]",
    )
  )
    return;
  if (e.key === "ArrowRight") {
    e.preventDefault();
    step(1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    step(-1);
  }
});
load();
