const artworks = [
  { id: 1,  title: "Misty Mountains",   artist: "A. Rao",     category: "photography", img: "https://picsum.photos/id/1018/900/700" },
  { id: 2,  title: "Golden Valley",     artist: "S. Mehta",   category: "painting",    img: "https://picsum.photos/id/1039/900/700" },
  { id: 3,  title: "Neon Dreams",       artist: "K. Iyer",    category: "digital",     img: "https://picsum.photos/id/1043/900/700" },
  { id: 4,  title: "Quiet Lake",        artist: "P. Singh",   category: "photography", img: "https://picsum.photos/id/1016/900/700" },
  { id: 5,  title: "Autumn Path",       artist: "R. Nair",    category: "painting",    img: "https://picsum.photos/id/1036/900/700" },
  { id: 6,  title: "Digital Horizon",   artist: "T. Das",     category: "digital",     img: "https://picsum.photos/id/1048/900/700" },
  { id: 7,  title: "Ocean Whisper",     artist: "M. Khan",    category: "photography", img: "https://picsum.photos/id/1011/900/700" },
  { id: 8,  title: "Forest Light",      artist: "L. Sharma",  category: "painting",    img: "https://picsum.photos/id/1020/900/700" },
  { id: 9,  title: "Urban Pulse",       artist: "D. Joshi",   category: "digital",     img: "https://picsum.photos/id/1067/900/700" },
  { id: 10, title: "Desert Calm",       artist: "V. Patel",   category: "photography", img: "https://picsum.photos/id/1056/900/700" },
  { id: 11, title: "Winter Silence",    artist: "H. Bose",    category: "painting",    img: "https://picsum.photos/id/1038/900/700" },
  { id: 12, title: "Abstract Waves",    artist: "N. Reddy",   category: "digital",     img: "https://picsum.photos/id/1062/900/700" },
];

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const nav = document.getElementById("nav");

let visible = [...artworks]; // 
let current = 0;             

function renderGallery(list) {
  grid.innerHTML = "";
  list.forEach((art, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${art.img}" alt="${art.title}" loading="lazy">
      <div class="overlay">
        <h3>${art.title}</h3>
        <span>${art.artist} &middot; ${art.category}</span>
      </div>`;
    card.addEventListener("click", () => openLightbox(index));
    grid.appendChild(card);
  });
}

filters.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter")) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");

  const f = e.target.dataset.filter;
  visible = f === "all" ? [...artworks] : artworks.filter(a => a.category === f);
  renderGallery(visible);
});


function openLightbox(index) {
  current = index;
  showImage();
  lightbox.classList.add("open");
}
function showImage() {
  const art = visible[current];
  lbImg.src = art.img;
  lbImg.alt = art.title;
  lbCap.textContent = `${art.title} — ${art.artist}`;
}
function closeLightbox() { lightbox.classList.remove("open"); }
function next() { current = (current + 1) % visible.length; showImage(); }
function prev() { current = (current - 1 + visible.length) % visible.length; showImage(); }

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbNext").addEventListener("click", next);
document.getElementById("lbPrev").addEventListener("click", prev);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});


document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("show"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("show")));


function animateCount(el, target) {
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(timer); }
    el.textContent = n;
  }, 30);
}

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("formMsg");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  msg.className = "form-msg";
  if (!name || !email || !message) {
    msg.textContent = "Please fill in all fields.";
    msg.classList.add("error");
  } else if (!emailOk) {
    msg.textContent = "Please enter a valid email address.";
    msg.classList.add("error");
  } else {
    msg.textContent = `Thank you, ${name}! Your message has been sent.`;
    msg.classList.add("success");
    e.target.reset();
  }
});


renderGallery(visible);
animateCount(document.getElementById("count-art"), artworks.length);
