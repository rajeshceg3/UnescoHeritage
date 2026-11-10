# All World Heritage properties, without a crowded screen

Request10November2026: extend to all UNESCO sites, no clutter, progressive disclosure.

## Source and license

Official current list https://whc.unesco.org/en/list/ confirms1,273properties:991Cultural,240Natural,42Mixed. The official UNESCO DataHub whc001 export matches with1,273unique id_no values. Metadata updated8November2026, retrieved10November2026. This is a dated snapshot, not a live refresh promise. DataHub metadata explicitly licenses this dataset CC BY-SA4.0. Older WHC XML syndication rules differ, so we do not rely on that feed or scrape individual properties. No photos are used.

Official dataset: https://data.unesco.org/explore/assets/whc001/
Metadata: https://data.unesco.org/api/explore/v2.1/catalog/datasets/whc001
License: https://creativecommons.org/licenses/by-sa/4.0/

Original selected export and metadata retained here. Adapted data under data/catalog.json is published with attribution and the same share-alike license, with field selection/format/excerpt changes disclosed. See data/NOTICE.md. Six original editorial note sets are kept; remaining entries use source descriptions and explicitly generic editorial questions, not fabricated site histories.

## Visible caps

- One property in the reading view, one source excerpt capped at320characters. Full official description behind a separate requested disclosure.
- Browse replaces the reading view. At most6compact results, never an ever-growing wall. Paging is explicit; search/filter changes reset the page. Search supports accent-insensitive names/countries, country and Cultural/Natural/Mixed filters plus saved-only.
- Field notes, filters, reflection and source details open only on request. Switching properties closes notes/source disclosures.
- Looking details max3items; reflection max2prompts. One lens visible at a time.

## Compatibility and map honesty

Original unesco-favorites numbers0..5keep their exact original meaning:274,668,156,95,154,326. Reading never rewrites that key. Saving an original property uses that same key; added properties use the separate stable-ID unesco-favorites-ids key. Malformed legacy bytes are not overwritten. Stable #site=ID deep links survive sorting and reload. Browser storage remains local, not cloud.

Bundled Natural Earth world map with dataset representative point. Not a boundary, entrance or whole serial-site extent. Two properties lack a point and get a clear no-coordinate caption. One lacks an English short description and points to the official listing rather than invented text. No remote map tiles or stock imagery.

## Verification

All1,273records structurally checked for unique IDs, names, countries, category totals and coordinate range. All1,273rendered at320px to assert no horizontal overflow and closed notes/browse. Longest-title pixels retained. Four-width both-motion browser journeys cover6-row cap, one-place cap, page navigation, search, country/category filters, no-results, deep links, tab keyboard control, old saved bytes and new save/reload. Catalog failure/retry and malformed saved-data preservation also tested. Previous six-site test scripts remain historical evidence, no longer the active test contract.
