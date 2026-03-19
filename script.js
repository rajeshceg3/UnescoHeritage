const heritageSites = [
  {
    name: 'Machu Picchu',
    location: 'Cusco Region, Peru',
    year: '1983',
    category: 'Cultural',
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
  category: document.getElementById('siteCategory'),
  image: document.getElementById('siteImage'),
  button: document.getElementById('shuffleBtn')
};

let currentIndex = -1;

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

function renderSite(index) {
  const site = heritageSites[index];
  refs.card.classList.add('loading');

  setTimeout(() => {
    refs.name.textContent = site.name;
    refs.location.textContent = site.location;
    refs.description.textContent = site.description;
    refs.year.textContent = site.year;
    refs.category.textContent = site.category;
    refs.image.src = site.image;
    refs.image.alt = `${site.name}, ${site.location}`;
    refs.card.classList.remove('loading');
  }, 220);

  currentIndex = index;
}

refs.button.addEventListener('click', () => {
  renderSite(randomIndex(currentIndex));

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

renderSite(randomIndex(currentIndex));
