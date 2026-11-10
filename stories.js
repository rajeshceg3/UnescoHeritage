// Six authored schematic studies. Each drawing is a deliberate diagram, not a
// picture: one relationship per place, revealed in three learner-paced beats.
// Layers carry class beat-1/2/3; script.js reveals them one beat at a time.
// pathLength="1" lets the draw-in animation treat every stroke uniformly.
"use strict";
const STORIES = {
  274: {
    accent: "#4a5d43",
    accentDark: "#93ab84",
    terms: [
      ["terrace", "a step cut into a slope to make flat ground for farming"],
      ["cloud forest", "mountain forest often wrapped in mist"],
    ],
    beats: [
      { caption: "A ridge where the Andes meet the Amazon." },
      { caption: "Terraces trace the slope instead of flattening it." },
      { caption: "Stone city and cloud forest, protected as one." },
    ],
    svg: `
<g class="beat-layer beat-1">
  <path pathLength="1" d="M60,470 C170,320 260,300 330,336 C395,215 435,180 470,246 C520,332 600,326 665,352 C745,382 820,424 858,470"/>
  <path pathLength="1" d="M150,470 C230,380 290,368 340,392"/>
  <path pathLength="1" d="M560,392 C640,368 740,400 810,452"/>
  <circle pathLength="1" cx="700" cy="236" r="30"/>
  <path pathLength="1" d="M700,194 v-20 M670,206 l-14,-14 M730,206 l14,-14 M662,236 h-20 M738,236 h20"/>
  <path pathLength="1" d="M140,200 q12,-10 24,0 M176,188 q12,-10 24,0 M240,226 q12,-10 24,0 M282,240 q10,-8 20,0"/>
  <text class="note" x="85" y="292" transform="rotate(-2 85 292)">the ridge</text>
</g>
<g class="beat-layer beat-2">
  <path pathLength="1" class="wash" d="M118,436 C170,404 230,398 288,410 L288,470 L118,470 Z"/>
  <path class="hatch" d="M255,336 l38,-16 M275,350 l38,-16 M295,364 l38,-16"/>
  <path pathLength="1" d="M118,436 C170,404 230,398 288,410"/>
  <path pathLength="1" d="M128,414 C176,386 230,380 282,390"/>
  <path pathLength="1" d="M142,394 C184,368 232,362 276,372"/>
  <path pathLength="1" d="M160,374 C196,352 236,346 270,354"/>
  <path class="channel flow" d="M330,336 C344,382 352,424 360,466"/>
  <text class="note" x="116" y="517" transform="rotate(-2 116 517)">terraces</text>
  <text class="note" x="368" y="466" transform="rotate(1 368 466)">water channel</text>
</g>
<g class="beat-layer beat-3">
  <path pathLength="1" d="M392,420 L392,388 L412,372 L432,388 L432,420"/>
  <path pathLength="1" d="M440,420 L440,392 L458,378 L476,392 L476,420"/>
  <path pathLength="1" d="M484,420 L484,394 L500,382 L516,394 L516,420"/>
  <path pathLength="1" d="M404,404 h16 M450,404 h16 M494,404 h12"/>
  <path pathLength="1" d="M560,470 q16,-30 32,0 q16,-30 32,0 q16,-30 32,0 q16,-30 32,0 q16,-30 32,0 q16,-30 32,0 q16,-30 32,0 q16,-30 32,0"/>
  <path pathLength="1" d="M580,440 q12,-22 24,0 q12,-22 24,0 q12,-22 24,0 q12,-22 24,0 q12,-22 24,0 q12,-22 24,0 q12,-22 24,0 q12,-22 24,0"/>
  <text class="note" x="600" y="520" transform="rotate(-2 600 520)">cloud forest</text>
  <text class="note" x="394" y="346" transform="rotate(-2 394 346)">stone city</text>
</g>`,
  },
  668: {
    accent: "#9c5a24",
    accentDark: "#d29a5b",
    terms: [
      ["baray", "a vast hand-dug reservoir"],
      ["moat", "a square of water around a temple"],
    ],
    beats: [
      { caption: "Not one temple." },
      { caption: "Many capitals scattered across a vast plain." },
      { caption: "Water made the city: reservoirs, moats, canals." },
    ],
    svg: `
<g class="beat-layer beat-1">
  <g transform="translate(275 410) scale(2) translate(-275 -410)">
  <path pathLength="1" d="M150,470 H400"/>
  <path pathLength="1" d="M170,470 V440 H380 V470"/>
  <path pathLength="1" d="M205,440 C205,410 215,400 225,370 C235,400 245,410 245,440"/>
  <path pathLength="1" d="M255,440 C255,395 268,380 275,330 C282,380 295,395 295,440"/>
  <path pathLength="1" d="M305,440 C305,410 315,400 325,370 C335,400 345,410 345,440"/>
  <path pathLength="1" d="M262,470 v-14 h26 v14"/>
  </g>
  <text class="note" x="220" y="225" transform="rotate(-2 220 225)">Angkor Wat</text>
</g>
<g class="beat-layer beat-2" transform="translate(560 455) scale(1.2) translate(-560 -455)">
  <path pathLength="1" d="M480,470 H840" class="ground"/>
  <path pathLength="1" d="M560,470 C560,440 575,428 590,404 C605,428 620,440 620,470"/>
  <path pathLength="1" d="M700,470 C700,446 712,436 724,418 C736,436 748,446 748,470"/>
  <path pathLength="1" d="M780,470 C780,452 788,444 798,432 C808,444 816,452 816,470"/>
  <path pathLength="1" d="M640,470 v-26 q10,-14 20,0 v26"/>
  <path pathLength="1" class="moat" d="M132,398 H418 V500 H132 Z"/>
  <text class="note" x="548" y="518" transform="rotate(-1 548 518)">the Bayon</text>
  <text class="note" x="700" y="396" transform="rotate(2 700 396)">older capitals</text>
</g>
<g class="beat-layer beat-3">
  <path class="hatch" d="M486,312 h64 M566,318 h64 M506,326 h64"/>
  <path pathLength="1" class="water" d="M470,150 H820 V300 H470 Z"/>
  <path class="waterline flow" d="M500,196 q24,-8 48,0 q24,8 48,0 q24,-8 48,0"/>
  <path pathLength="1" class="waterline" d="M540,246 q24,-8 48,0 q24,8 48,0 q24,-8 48,0"/>
  <path class="channel flow" d="M470,250 C400,300 380,360 400,398"/>
  <path class="channel flow" d="M620,300 C610,340 600,370 592,404"/>
  <path class="channel flow" d="M600,300 C585,340 570,370 556,398"/>
  <path class="waterline" d="M560,212 q20,-7 40,0 q20,7 40,0"/>
  <path class="waterline" d="M180,440 q18,-6 36,0 q18,6 36,0"/>
  <text class="note" x="540" y="132" transform="rotate(-2 540 132)">West Baray</text>
  <text class="note" x="470" y="374" transform="rotate(1 470 374)">canals</text>
</g>`,
  },
  156: {
    accent: "#8a6a1c",
    accentDark: "#d4a94e",
    terms: [
      ["migration", "the herds' yearly loop between feeding grounds"],
      ["water hole", "where animals gather in the dry season"],
    ],
    beats: [
      { caption: "Plains that look empty." },
      { caption: "Until a million hooves move." },
      { caption: "The park is the route: a loop that follows rain." },
    ],
    svg: `
<g class="beat-layer beat-1" transform="translate(450 390) scale(1.1) translate(-450 -390)">
  <path pathLength="1" d="M50,400 C300,378 600,388 850,382"/>
  <path pathLength="1" d="M700,400 v-64 M700,336 C660,320 640,328 620,336 M700,336 C740,318 762,328 780,338"/>
  <path pathLength="1" d="M420,392 q90,-18 190,-4"/>
  <path pathLength="1" d="M240,400 v-40 M240,360 C215,350 200,356 190,362 M240,360 C262,350 278,356 290,362"/>
  <path pathLength="1" d="M150,430 v-18 M170,432 v-14 M250,436 v-14 M350,440 v-16 M450,438 v-15 M520,436 v-18 M600,434 v-13 M700,440 v-15 M820,424 v-14"/>
  <path pathLength="1" d="M330,180 q11,-9 22,0 M368,192 q10,-8 20,0"/>
</g>
<g class="beat-layer beat-2">
  <path pathLength="1" d="M200,400 q18,-18 36,0 M206,400 v14 M214,400 v14 M222,400 v14 M230,400 v14 M236,392 q10,-8 8,-16"/>
  <path pathLength="1" d="M280,396 q20,-20 40,0 M287,396 v15 M296,396 v15 M305,396 v15 M314,396 v15 M320,388 q11,-9 9,-18"/>
  <path pathLength="1" d="M370,402 q17,-16 34,0 M376,402 v13 M384,402 v13 M392,402 v13 M400,402 v13 M404,394 q10,-8 8,-15"/>
  <path pathLength="1" d="M450,398 q19,-18 38,0 M457,398 v14 M466,398 v14 M475,398 v14 M484,398 v14 M488,390 q10,-8 8,-16"/>
  <path pathLength="1" d="M540,404 q16,-15 32,0 M546,404 v12 M554,404 v12 M562,404 v12 M570,404 v12"/>
  <path pathLength="1" d="M610,400 q18,-17 36,0 M617,400 v13 M626,400 v13 M635,400 v13 M644,400 v13 M646,392 q10,-8 8,-15"/>
  <path pathLength="1" d="M250,368 q13,-13 26,0 M255,368 v10 M262,368 v10 M269,368 v10"/>
  <path pathLength="1" d="M430,364 q12,-12 24,0 M435,364 v10 M442,364 v10 M449,364 v10"/>
  <path pathLength="1" d="M560,368 q12,-12 24,0 M565,368 v10 M572,368 v10 M579,368 v10"/>
  <text class="note" x="250" y="302" transform="rotate(-1 250 302)">the herds</text>
</g>
<g class="beat-layer beat-3">
  <path class="route flow" d="M240,430 C220,300 640,280 660,390 C672,462 380,510 240,430"/>
  <path class="route" d="M660,390 l26,6 l-20,18"/>
  <path class="route" d="M300,424 C290,330 590,314 604,384 C612,442 400,478 300,424"/>
  <path pathLength="1" d="M400,486 v-10 M450,492 v-10 M500,492 v-10"/>
  <path class="rain flow" d="M630,172 l-6,20 M658,174 l-6,20"/>
  <path class="hatch" d="M104,420 l28,-7 M144,422 l28,-7 M758,412 l28,-7 M798,410 l28,-7"/>
  <path pathLength="1" class="cloud" d="M600,150 q-6,-26 22,-26 q6,-20 30,-14 q22,-8 30,12 q24,0 20,22 q-2,16 -26,14 h-56 q-20,-2 -20,-8"/>
  <path class="rain flow" d="M616,168 l-6,22 M644,170 l-6,24 M672,168 l-6,22"/>
  <text class="note" x="600" y="90" transform="rotate(-2 600 90)">rain</text>
  <text class="note" x="420" y="554" transform="rotate(-1 420 554)">the loop</text>
</g>`,
  },
  95: {
    accent: "#33626a",
    accentDark: "#7fb2ba",
    terms: [
      ["ramparts", "the defensive walls around the old city"],
      ["restoration", "careful repair after earthquake and conflict"],
    ],
    beats: [
      { caption: "A small walled city on the Adriatic." },
      { caption: "Gothic, Renaissance and Baroque buildings share its streets." },
      { caption: "Earthquake and shells damaged it; repair became part of the city." },
    ],
    svg: `
<g class="beat-layer beat-1" transform="translate(450 390) scale(1.1) translate(-450 -390)">
  <path class="waterline flow" d="M60,480 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0"/>
  <path pathLength="1" class="waterline" d="M110,525 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0 q30,10 60,0 q30,-10 60,0"/>
  <path pathLength="1" d="M150,440 H840"/>
  <path pathLength="1" d="M200,440 V330 h16 v-16 h20 v16 h20 v-16 h20 v16 h20 v-16 h20 v16 h20 v-16 h20 v16 h20 v-16 h20 v16 h16 V440"/>
  <path pathLength="1" d="M560,440 V300 q0,-28 30,-28 q30,0 30,28 V440"/>
  <path pathLength="1" d="M548,300 q0,-34 42,-34 q42,0 42,34"/>
  <path pathLength="1" d="M700,440 V350 h14 v-14 h18 v14 h18 v-14 h18 v14 h18 v-14 h18 v14 h14 V440"/>
  <text class="note" x="68" y="415" transform="rotate(-1 68 415)">city walls</text>
  <text class="note" x="700" y="548" transform="rotate(-2 700 548)">the Adriatic</text>
</g>
<g class="beat-layer beat-2">
  <path pathLength="1" d="M280,330 V240 h74 v90 M280,240 l37,-26 l37,26"/>
  <path pathLength="1" class="gothic" d="M300,330 v-44 q10,-18 20,0 v44 M326,330 v-44 q10,-18 20,0 v44"/>
  <path pathLength="1" d="M420,330 V252 h88 v78 M420,252 q44,-46 88,0"/>
  <path pathLength="1" class="dome" d="M452,206 q12,-30 24,0 v46 h-24 Z"/>
  <path pathLength="1" d="M560,330 V250 h80 v80 M560,250 q10,-22 20,0 q10,-22 20,0 q10,-22 20,0 q10,-22 20,0"/>
  <path pathLength="1" class="baroque" d="M578,330 v-40 q9,-15 18,0 v40 M604,330 v-40 q9,-15 18,0 v40"/>
  <text class="note" x="272" y="200" transform="rotate(-2 272 200)">Gothic</text>
  <text class="note" x="395" y="148" transform="rotate(-2 395 148)">Renaissance</text>
  <text class="note" x="566" y="200" transform="rotate(2 566 200)">Baroque</text>
</g>
<g class="beat-layer beat-3">
  <path pathLength="1" class="crack" d="M240,330 l14,22 l-12,20 l16,22 l-10,24"/>
  <path pathLength="1" class="scaffold" d="M660,440 V250 M700,440 V250 M660,280 h40 M660,330 h40 M660,380 h40"/>
  <path pathLength="1" class="tile" d="M430,240 l8,-8 M450,236 l8,-8 M470,240 l8,-8 M490,244 l8,-8"/>
  <path pathLength="1" class="tile" d="M290,228 l8,-8 M310,224 l8,-8 M330,228 l8,-8"/>
  <path class="hatch" d="M336,360 h64 M336,385 h64 M336,410 h64"/>
  <text class="note" x="265" y="402" transform="rotate(1 265 402)">1667</text>
  <text class="note" x="706" y="230" transform="rotate(2 706 230)">repaired</text>
</g>`,
  },
  154: {
    accent: "#b14a38",
    accentDark: "#e08a72",
    terms: [
      ["staghorn", "a branching coral shaped like antlers"],
      ["seagrass", "flowering plants that grow under shallow water"],
    ],
    beats: [
      { caption: "A coastline, and a distant line of surf." },
      { caption: "Beneath it, thousands of reefs." },
      { caption: "Corals, fish, turtles, seagrass: one living system." },
    ],
    svg: `
<g class="beat-layer beat-1">
  <path pathLength="1" d="M60,120 C140,140 180,200 200,300 C214,372 220,420 240,470"/>
  <path pathLength="1" d="M110,150 l-24,10 M130,190 l-24,8 M150,236 l-24,8 M172,290 l-24,8"/>
  <path class="hatch" d="M210,185 l24,-11 M215,225 l24,-11 M220,265 l24,-11"/>
  <path pathLength="1" class="waterline" d="M240,230 q40,-12 80,0 q40,12 80,0 q40,-12 80,0 q40,12 80,0 q40,-12 80,0 q40,12 80,0"/>
  <path class="surf flow" d="M320,262 q10,-14 20,0 M380,258 q10,-14 20,0 M440,262 q10,-14 20,0 M500,258 q10,-14 20,0 M560,262 q10,-14 20,0 M620,258 q10,-14 20,0 M680,262 q10,-14 20,0 M740,258 q10,-14 20,0"/>
  <text class="note" x="246" y="334" transform="rotate(-1 246 334)">reef line</text>
</g>
<g class="beat-layer beat-2">
  <path pathLength="1" class="coral" d="M330,470 C330,430 320,410 300,390 M330,440 C340,420 356,410 370,396 M330,455 C318,442 306,436 292,432 M342,428 C350,410 350,400 348,388"/>
  <path pathLength="1" class="coral" d="M470,470 q-6,-40 30,-52 q36,-12 60,6 M480,470 q10,-26 40,-30"/>
  <path pathLength="1" class="coral" d="M640,470 C630,430 650,410 640,380 C660,400 668,420 660,440 C676,428 690,430 700,444 C684,452 668,458 664,470"/>
  <path pathLength="1" d="M760,470 q0,-30 24,-34 q24,-4 30,18 q4,20 -14,26 q-16,6 -24,-6"/>
  <path pathLength="1" d="M772,452 q10,-6 18,2 M776,464 q10,-6 16,2"/>
</g>
<g class="beat-layer beat-3">
  <path pathLength="1" class="fish" d="M360,330 q16,-12 32,0 q-16,12 -32,0 M392,330 l12,-8 v16 Z"/>
  <path pathLength="1" class="fish" d="M420,350 q14,-10 28,0 q-14,10 -28,0 M448,350 l10,-7 v14 Z"/>
  <path pathLength="1" class="fish" d="M390,300 q13,-10 26,0 q-13,10 -26,0 M416,300 l10,-7 v14 Z"/>
  <path pathLength="1" class="fish" d="M450,318 q12,-9 24,0 q-12,9 -24,0 M474,318 l9,-6 v12 Z"/>
  <path pathLength="1" class="turtle" d="M560,330 q30,-22 60,0 q-30,20 -60,0 M586,312 q6,-12 16,-14 M586,346 q6,12 16,14 M560,330 l-14,-8 M620,330 l14,-6"/>
  <path pathLength="1" class="grass" d="M280,470 C276,440 284,420 280,400 M296,470 C296,444 304,428 300,406 M312,470 C310,446 318,432 316,414"/>
  <text class="note" x="280" y="530" transform="rotate(-3 280 530)">staghorn</text>
  <text class="note" x="652" y="380" transform="rotate(2 652 380)">one system</text>
</g>`,
  },
  326: {
    accent: "#a04a2e",
    accentDark: "#d98d6b",
    terms: [
      ["siq", "the narrow gorge that is the city's entrance"],
      ["facade", "a front carved out of the cliff face"],
    ],
    beats: [
      { caption: "A gorge split through rose sandstone." },
      { caption: "A facade carved into the cliff, not built on it." },
      { caption: "Caravan routes crossed here, and a city grew rich." },
    ],
    svg: `
<g class="beat-layer beat-1">
  <path pathLength="1" d="M120,80 C150,240 130,400 90,560"/>
  <path pathLength="1" d="M240,60 C270,230 250,400 290,560"/>
  <path pathLength="1" d="M150,180 h60 M140,300 h70 M155,420 h60"/>
  <path pathLength="1" d="M560,80 C530,240 550,400 590,560"/>
  <path pathLength="1" d="M470,60 C445,230 465,400 430,560"/>
  <path pathLength="1" d="M480,180 h60 M475,300 h60 M470,420 h60"/>
  <path pathLength="1" class="trail" d="M300,560 C330,440 320,300 355,180"/>
  <text class="note" x="362" y="328" transform="rotate(-4 362 328)">the siq</text>
</g>
<g class="beat-layer beat-2">
  <path pathLength="1" class="carve" d="M560,220 h140 M560,220 V420 M700,220 V420 M560,420 h140"/>
  <path pathLength="1" class="carve" d="M575,220 l55,-34 l55,34"/>
  <path pathLength="1" class="carve" d="M585,420 V260 M615,420 V260 M645,420 V260 M675,420 V260"/>
  <path pathLength="1" class="carve" d="M620,420 v-50 q10,-14 20,0 v50"/>
  <path pathLength="1" class="carve" d="M622,186 q8,-16 16,0 q-8,10 -16,0"/>
  <path pathLength="1" class="chisel" d="M545,240 l-12,-8 M545,290 l-14,-4 M545,340 l-12,6 M715,240 l12,-8 M715,290 l14,-4 M715,340 l12,6"/>
  <text class="note" x="560" y="148" transform="rotate(-2 560 148)">carved, not built</text>
</g>
<g class="beat-layer beat-3">
  <path class="route flow" d="M120,480 C260,430 420,470 560,440 C680,415 780,440 850,420"/>
  <path class="route flow" d="M180,540 C340,500 520,530 700,500"/>
  <path class="hatch" d="M500,120 l45,-8 M495,215 l50,-8"/>
  <path pathLength="1" class="camel" d="M300,452 q12,-18 24,0 q4,-10 10,-2 q8,2 6,12 M306,452 v16 M318,452 v16 M330,452 v16 M340,452 v14"/>
  <path pathLength="1" class="camel" d="M480,486 q11,-16 22,0 q4,-9 9,-2 q8,2 6,11 M486,486 v15 M497,486 v15 M508,486 v15 M517,486 v13"/>
  <text class="note" x="442" y="586" transform="rotate(-1 442 586)">caravans</text>
</g>`,
  },
};
