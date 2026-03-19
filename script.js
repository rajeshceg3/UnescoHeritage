const heritageSites = [
  {
    name: 'Machu Picchu',
    location: 'Cusco Region, Peru',
    year: '1983',
    category: 'Cultural',
    season: 'May–September',
    significance: 'Inca astronomy + engineering',
    criteria: ['i', 'iii', 'vii', 'ix'],
    highlights: ['Temple of the Sun', 'Terraced cloud-forest ridges', 'Sun Gate dawn trail'],
    lenses: {
      sense: 'Crisp mountain air, wet stone under your fingertips, and quiet wind passing terraces before the morning crowds arrive.',
      story: 'An Inca citadel designed as both sanctuary and observatory, where architecture maps celestial rhythm into daily life.',
      ritual: 'Start at first light, pause silently at the Sun Gate, then descend terrace by terrace to read the landscape like a ceremony.'
    },
    moments: ['Breathe for 20 seconds at a lookout and map three mountain layers.', 'Trace one carved edge with your eyes to notice precision.', 'Close your eyes and listen for wind, birds, and footsteps in sequence.'],
    description:
      'Suspended between mist and mountain ridges, this Inca citadel creates a meditative rhythm of stone terraces, cosmic alignments, and cloud forests.',
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80'
  },
  {
    name: 'Angkor',
    location: 'Siem Reap, Cambodia',
    year: '1992',
    category: 'Cultural',
    season: 'November–February',
    significance: 'Khmer cosmology and sacred urbanism',
    criteria: ['i', 'ii', 'iii', 'iv'],
    highlights: ['Bayon stone faces', 'Angkor Wat galleries', 'Lotus pond reflections'],
    lenses: {
      sense: 'Humidity, incense, and jungle birds frame sandstone corridors lit by moving bands of sun.',
      story: 'Angkor is a sacred urban universe where power, devotion, and engineering converge in temple cities.',
      ritual: 'Arrive at dawn for reflection pools, then walk shaded galleries slowly to read stories carved in bas-relief.'
    },
    moments: ['Find one bas-relief scene and identify movement in the figures.', 'Notice how trees and stones coexist at one corner.', 'Pause by water and watch how temple geometry mirrors in ripples.'],
    description:
      'A sacred choreography of temple towers and jungle silence, where lotus ponds, carved galleries, and sunrise reflections feel like a living mandala.',
    image:
      'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=1800&q=80'
  },
  {
    name: 'Serengeti National Park',
    location: 'Tanzania',
    year: '1981',
    category: 'Natural',
    season: 'June–October',
    significance: 'Planet-scale migration ecology',
    criteria: ['vii', 'x'],
    highlights: ['Great migration crossings', 'Acacia-silhouette horizons', 'Predator-prey seasonal cycles'],
    lenses: {
      sense: 'Dry grass scent, low thunder from hooves, and sweeping skies that make every sound feel amplified.',
      story: 'A living system of migration, predation, and renewal that shows nature as movement rather than still scenery.',
      ritual: 'Scan the horizon in 360°, track one herd for several minutes, and note how birds signal where life gathers.'
    },
    moments: ['Spot one herd and follow its direction without zooming first.', 'Count five distinct sounds before speaking.', 'Watch cloud shadows move across grasslands for one minute.'],
    description:
      'An endless horizon of light and migration, where grasslands, acacia silhouettes, and wildlife movement unfold like a breathing planetary pulse.',
    image:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1800&q=80'
  },
  {
    name: 'Old City of Dubrovnik',
    location: 'Dubrovnik, Croatia',
    year: '1979',
    category: 'Cultural',
    season: 'April–June',
    significance: 'Adriatic maritime republic heritage',
    criteria: ['i', 'iii', 'iv'],
    highlights: ['City walls promenade', 'Marble limestone streets', 'Baroque facades at sunset'],
    lenses: {
      sense: 'Sea salt in the air, bright stone under sunlight, and distant bells bouncing through narrow lanes.',
      story: 'A resilient maritime republic whose walls and squares preserve centuries of Adriatic diplomacy and trade.',
      ritual: 'Walk the walls before noon, then descend into side alleys to feel the city shift from monument to neighborhood.'
    },
    moments: ['Touch a cool limestone wall and compare sunlit versus shaded tones.', 'Find a narrow lane and follow it without checking a map.', 'Pause at a high point and trace the line where sea meets fortifications.'],
    description:
      'A luminous Adriatic fortress city where marble streets, baroque facades, and sea-washed walls create an immersive atmosphere of calm grandeur.',
    image:
      'https://images.unsplash.com/photo-1549893074-67c7b88c5a73?auto=format&fit=crop&w=1800&q=80'
  },
  {
    name: 'Great Barrier Reef',
    location: 'Queensland, Australia',
    year: '1981',
    category: 'Natural',
    season: 'June–November',
    significance: 'Largest coral ecosystem on Earth',
    criteria: ['vii', 'viii', 'ix', 'x'],
    highlights: ['Coral bommies and lagoons', 'Sea turtle migration', 'Outer-reef blue gradients'],
    lenses: {
      sense: 'Salt on skin, filtered turquoise light, and the muffled crackle of reef life beneath the surface.',
      story: 'The reef is an immense living architecture built by coral communities over millennia.',
      ritual: 'Begin with shallow observation, identify three coral textures, then drift slowly to notice color gradients.'
    },
    moments: ['Look for one color family changing across depth.', 'Watch fish movement around a coral head for 30 seconds.', 'Surface and describe the quiet before speaking loudly.'],
    description:
      'An underwater cathedral of color and motion, where coral architecture and translucent blue gradients deliver a serene, floating sense of wonder.',
    image:
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1800&q=80'
  },
  {
    name: 'Petra',
    location: 'Ma’an Governorate, Jordan',
    year: '1985',
    category: 'Cultural',
    season: 'March–May',
    significance: 'Nabataean trade and rock architecture',
    criteria: ['i', 'iii', 'iv'],
    highlights: ['The Siq approach', 'Al-Khazneh facade', 'Monastery plateau vistas'],
    lenses: {
      sense: 'Warm canyon air, echoing footsteps, and pink sandstone glowing differently with each turn.',
      story: 'A Nabataean crossroads of trade where carved facades announced wealth, ritual, and global exchange.',
      ritual: 'Enter through the Siq slowly, delay your first photo, and let the Treasury reveal itself as a staged arrival.'
    },
    moments: ['Walk one stretch in silence to feel echo and scale.', 'Notice one carved detail before viewing the full facade.', 'At a vista, identify how shadow reshapes cliff textures.'],
    description:
      'Rose-red facades emerging from canyon shadows compose a cinematic ritual of approach, revealing a timeless city carved directly into living stone.',
    image:
      'https://images.unsplash.com/photo-1563177853-52aa306f49c1?auto=format&fit=crop&w=1800&q=80'
  }
];

const refs = {
  card: document.getElementById('heroCard'),
  name: document.getElementById('siteName'),
  location: document.getElementById('siteLocation'),
  description: document.getElementById('siteDescription'),
  year: document.getElementById('siteYear'),
  season: document.getElementById('siteSeason'),
  significance: document.getElementById('siteSignificance'),
  criteria: document.getElementById('siteCriteria'),
  highlights: document.getElementById('siteHighlights'),
  categoryBadge: document.getElementById('categoryBadge'),
  image: document.getElementById('siteImage'),
  button: document.getElementById('shuffleBtn'),
  prevButton: document.getElementById('prevBtn'),
  nextButton: document.getElementById('nextBtn'),
  sitePosition: document.getElementById('sitePosition'),
  favoriteButton: document.getElementById('favoriteBtn'),
  favoriteCount: document.getElementById('favoriteCount'),
  favoritesList: document.getElementById('favoritesList'),
  statusMessage: document.getElementById('statusMessage'),
  contentLayer: document.querySelector('.content-layer'),
  lensBody: document.getElementById('lensBody'),
  moments: document.getElementById('microMoments'),
  lensButtons: {
    sense: document.getElementById('lensSenseBtn'),
    story: document.getElementById('lensStoryBtn'),
    ritual: document.getElementById('lensRitualBtn')
  }
};

let currentIndex = -1;
const FAVORITES_KEY = 'unesco-favorites';
const favoriteIndexes = new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]'));
let touchStartX = 0;
let touchDeltaX = 0;
let activeLens = 'sense';

function randomIndex(exclude) {
  if (heritageSites.length < 2) {
    return 0;
  }

  let next = Math.floor(Math.random() * heritageSites.length);
  while (next === exclude) {
    next = Math.floor(Math.random() * heritageSites.length);
  }
  return next;
}

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

function updateFavoriteCount() {
  const completion = Math.round((favoriteIndexes.size / heritageSites.length) * 100);
  refs.favoriteCount.textContent = `Favorites saved: ${favoriteIndexes.size}/${heritageSites.length} (${completion}% explored deeply)`;

  if (favoriteIndexes.size === 0) {
    refs.favoritesList.textContent = 'Curator list: none yet. Press F to save a site you love.';
    return;
  }

  const names = [...favoriteIndexes].map((index) => heritageSites[index].name).slice(-3);
  refs.favoritesList.textContent = `Curator list: ${names.join(' · ')}`;
}

function setStatus(message) {
  refs.statusMessage.textContent = message;
}

function accentForCategory(category) {
  return category === 'Natural'
    ? { accent: '#89e7d1', soft: 'rgba(137, 231, 209, 0.26)' }
    : { accent: '#9bd1ff', soft: 'rgba(155, 209, 255, 0.24)' };
}

function renderHighlights(items) {
  refs.highlights.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    refs.highlights.append(li);
  });
}

function renderMoments(items) {
  refs.moments.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    refs.moments.append(li);
  });
}

function renderLens(site) {
  refs.lensBody.textContent = site.lenses[activeLens];
  Object.entries(refs.lensButtons).forEach(([key, button]) => {
    const selected = key === activeLens;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-selected', String(selected));
  });
}

function updatePosition(index) {
  refs.sitePosition.textContent = `${index + 1} / ${heritageSites.length}`;
}

function pulseLayer() {
  refs.contentLayer.classList.remove('is-transitioning');
  requestAnimationFrame(() => refs.contentLayer.classList.add('is-transitioning'));
}

function renderSite(index, direction = 'next') {
  const site = heritageSites[index];
  refs.card.classList.add('loading');
  refs.button.disabled = true;
  refs.button.setAttribute('aria-busy', 'true');

  const accent = accentForCategory(site.category);
  document.documentElement.style.setProperty('--accent', accent.accent);
  document.documentElement.style.setProperty('--accent-soft', accent.soft);

  setTimeout(() => {
    refs.card.dataset.direction = direction;
    refs.name.textContent = site.name;
    refs.location.textContent = site.location;
    refs.description.textContent = site.description;
    refs.year.textContent = site.year;
    refs.season.textContent = site.season;
    refs.significance.textContent = site.significance;
    refs.criteria.textContent = site.criteria.map((criterion) => `(${criterion})`).join(' ');
    refs.categoryBadge.textContent = site.category;
    refs.image.src = site.image;
    refs.image.alt = `${site.name}, ${site.location}`;
    renderHighlights(site.highlights);
    renderMoments(site.moments);
    renderLens(site);

    refs.favoriteButton.textContent = favoriteIndexes.has(index) ? 'Saved ✓' : 'Save favorite';
    updatePosition(index);
    pulseLayer();
    refs.card.classList.remove('loading');
    refs.button.disabled = false;
    refs.button.removeAttribute('aria-busy');
    setStatus(`Now exploring ${site.name}. Swipe or use ←/→ to navigate, Enter for surprise, F to toggle favorite.`);
  }, 170);

  currentIndex = index;
  const nextIndex = randomIndex(index);
  preloadImage(heritageSites[nextIndex].image);
}

refs.button.addEventListener('click', () => {
  renderSite(randomIndex(currentIndex), 'next');

  refs.button.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(0.97)' },
      { transform: 'scale(1.01)' },
      { transform: 'scale(1)' }
    ],
    {
      duration: 420,
      easing: 'cubic-bezier(.2,.8,.2,1)'
    }
  );
});

function stepSite(step) {
  if (currentIndex < 0) {
    return;
  }

  const nextIndex = (currentIndex + step + heritageSites.length) % heritageSites.length;
  renderSite(nextIndex, step < 0 ? 'prev' : 'next');
}

refs.prevButton.addEventListener('click', () => stepSite(-1));
refs.nextButton.addEventListener('click', () => stepSite(1));

refs.favoriteButton.addEventListener('click', () => {
  if (currentIndex < 0) {
    return;
  }

  const site = heritageSites[currentIndex];
  if (favoriteIndexes.has(currentIndex)) {
    favoriteIndexes.delete(currentIndex);
    setStatus(`Removed ${site.name} from your curator list.`);
    refs.favoriteButton.textContent = 'Save favorite';
  } else {
    favoriteIndexes.add(currentIndex);
    setStatus(`Saved ${site.name} to your curator list.`);
    refs.favoriteButton.textContent = 'Saved ✓';
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoriteIndexes]));
  updateFavoriteCount();
});

Object.entries(refs.lensButtons).forEach(([lens, button]) => {
  button.addEventListener('click', () => {
    activeLens = lens;
    if (currentIndex >= 0) {
      const site = heritageSites[currentIndex];
      renderLens(site);
      setStatus(`Lens changed to ${lens}.`);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    stepSite(-1);
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    stepSite(1);
  }

  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    refs.button.click();
  }

  if (event.key.toLowerCase() === 'f') {
    refs.favoriteButton.click();
  }

  if (['1', '2', '3'].includes(event.key)) {
    const lensMap = { '1': 'sense', '2': 'story', '3': 'ritual' };
    const targetLens = lensMap[event.key];
    refs.lensButtons[targetLens].click();
  }
});

refs.card.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchDeltaX = 0;
});

refs.card.addEventListener('touchmove', (event) => {
  touchDeltaX = event.changedTouches[0].clientX - touchStartX;
});

refs.card.addEventListener('touchend', () => {
  if (Math.abs(touchDeltaX) < 45) {
    return;
  }
  stepSite(touchDeltaX > 0 ? -1 : 1);
});

updateFavoriteCount();
setStatus('Tip: swipe or use ←/→ to navigate. Press Space/Enter to discover and F to favorite.');
renderSite(randomIndex(currentIndex), 'next');
