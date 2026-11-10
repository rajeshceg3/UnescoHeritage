# Contextual navigation audit - 2026-11-10

Baseline: ee5abfb7410dc82d71c31e9150b47aa297c485b7, canonical hosted app https://unesco-heritage-zeta.vercel.app/.

The old fixed-height shell cropped the reading card under a large design manifesto; sequential navigation was 35.6px high and competed with the larger random action. Keyboard Enter/Space was intercepted globally, including on focused native buttons. Changing destination could leave the reader at the previous destination's scroll position. All observed directly in the hosted app and its source.

Changes:
- Normal document scrolling, no dock overlay or viewport-height clipping. Next destination is the theme-colored primary action following each story. Previous remains secondary, random discovery is quieter.
- Controls have a minimum 44px height. At narrow widths the position takes its own row, leaving both navigation buttons room.
- Original design notes are preserved below the app in a closed disclosure.
- A new destination places focus and the viewport at its heading, not the old reading position. The initial render does not steal focus.
- Native button keyboard activation is no longer stolen by global shortcuts. Busy transitions reject duplicate navigation and disable favorite while destination identity changes. Reduced-motion removes transition delays and animation.
- No persistence, storage schema, backup, sync, account or hosting-provider change.

Repeatable check: npm ci; npx playwright install chromium; serve this folder on 8774; npm test. CHROME_PATH optionally selects system Chrome. BASE_URL selects hosted app, OUT selects evidence folder, MOTION=no-preference tests animated transitions.

Four viewports (320x844, 390x844, 844x390, 1320x844), six sequential transitions including wrap, previous Enter and next Space, all three lenses, favorite/reload, hit testing, focus, heading visibility, overflow and page errors. Both reduced and normal motion are tested. Screenshots are inspected separately rather than inferred from assertions.

Scope limitations: the six legacy destination records and remote Unsplash photography have not been fact-checked. The Angkor image was visibly unrelated (book/cup). This is an outstanding content defect, not acceptance of site photography, historical claims, travel advice or offline/device behavior. Favorite tally wording is pre-existing and is not a depth-of-learning measure.
