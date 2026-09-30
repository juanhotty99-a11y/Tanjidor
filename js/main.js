/* =========================================================
   Tanjidor — Brand Ambassador Telkom University
   ========================================================= */

/* ---------- Data Ambassador (silakan ubah sesuai tim Anda) ----------
   foto: taruh file di assets/images/ lalu tulis namanya di sini.
   tim : "inti" untuk pengurus inti, "anggota" untuk anggota. */
const AMBASSADORS = [
  { nama: "Nama Ambassador 1", peran: "Ketua",            fakultas: "Fakultas Informatika",                 tim: "inti",    foto: "ambassador-1.jpg" },
  { nama: "Nama Ambassador 2", peran: "Wakil Ketua",      fakultas: "Fakultas Komunikasi dan Ilmu Sosial",  tim: "inti",    foto: "ambassador-2.jpg" },
  { nama: "Nama Ambassador 3", peran: "Sekretaris",       fakultas: "Fakultas Ekonomi dan Bisnis",          tim: "inti",    foto: "ambassador-3.jpg" },
  { nama: "Nama Ambassador 4", peran: "Bendahara",        fakultas: "Fakultas Rekayasa Industri",           tim: "inti",    foto: "ambassador-4.jpg" },
  { nama: "Nama Ambassador 5", peran: "Ambassador",       fakultas: "Fakultas Teknik Elektro",              tim: "anggota", foto: "ambassador-5.jpg" },
  { nama: "Nama Ambassador 6", peran: "Ambassador",       fakultas: "Fakultas Industri Kreatif",            tim: "anggota", foto: "ambassador-6.jpg" },
  { nama: "Nama Ambassador 7", peran: "Ambassador",       fakultas: "Fakultas Ilmu Terapan",                tim: "anggota", foto: "ambassador-7.jpg" },
  { nama: "Nama Ambassador 8", peran: "Ambassador",       fakultas: "Fakultas Informatika",                 tim: "anggota", foto: "ambassador-8.jpg" },
];

const IMG_DIR = "assets/images/";
const LOGO_PLACEHOLDER = IMG_DIR + "logo-placeholder.svg";

/* Placeholder SVG untuk foto yang belum diunggah */
function photoPlaceholder(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#b6252a"/><stop offset="1" stop-color="#5a0f12"/></linearGradient></defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <text x="400" y="310" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#fff" opacity=".6">${label}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function initialsAvatar(name) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#f3e3e3"/>
    <circle cx="200" cy="200" r="120" fill="#b6252a"/>
    <text x="200" y="228" text-anchor="middle" font-family="sans-serif" font-size="90" font-weight="700" fill="#fff">${initials}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* Jika gambar belum ada, ganti otomatis dengan placeholder */
function attachFallback(img) {
  img.addEventListener("error", () => {
    if (img.dataset.failed) return;
    img.dataset.failed = "1";
    const type = img.dataset.fallback;
    if (type === "photo") img.src = photoPlaceholder("Tempat foto kampus");
    else if (type === "avatar") img.src = initialsAvatar(img.alt || "?");
    else img.src = LOGO_PLACEHOLDER;
  });
  // Tangani gambar yang sudah gagal dimuat sebelum listener terpasang
  if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event("error"));
}

/* ---------- Render tim ---------- */
const teamEl = document.getElementById("team");
teamEl.innerHTML = AMBASSADORS.map(a => `
  <article class="member reveal" data-team="${a.tim}">
    <img src="${IMG_DIR + a.foto}" alt="${a.nama}" data-fallback="avatar" loading="lazy">
    <div class="member-body">
      <p class="role">${a.peran}</p>
      <h3>${a.nama}</h3>
      <p class="fac">${a.fakultas}</p>
    </div>
  </article>`).join("");

document.querySelectorAll("img[data-fallback]").forEach(attachFallback);

/* ---------- Filter tim ---------- */
document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === btn));
  const f = btn.dataset.filter;
  teamEl.querySelectorAll(".member").forEach(m => {
    m.classList.toggle("hide", f !== "all" && m.dataset.team !== f);
  });
});

/* ---------- Navbar ---------- */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40 || navLinks.classList.contains("open"));
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  onScroll();
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    onScroll();
  }
});

/* Tandai menu aktif sesuai section yang sedang dilihat */
const sections = [...document.querySelectorAll("section[id]")];
const linkFor = id => navLinks.querySelector(`a[href="#${id}"]:not(.btn)`);
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    const link = linkFor(en.target.id);
    if (link && en.isIntersecting) {
      navLinks.querySelectorAll("a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

/* ---------- Animasi muncul & angka statistik ---------- */
document.querySelectorAll(".card, .values li, .g-item, .agenda-item, .about-media, .about-text, .join-form")
  .forEach(el => el.classList.add("reveal"));

const revealer = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("show"); revealer.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealer.observe(el));

function countUp(el) {
  const target = +el.dataset.count;
  const start = performance.now();
  const dur = 1400;
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counter = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { countUp(en.target); counter.unobserve(en.target); }
  });
});
document.querySelectorAll("[data-count]").forEach(el => counter.observe(el));

/* ---------- Lightbox galeri ---------- */
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector("p");
document.getElementById("gallery").addEventListener("click", e => {
  const fig = e.target.closest(".g-item");
  if (!fig) return;
  const img = fig.querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = fig.querySelector("figcaption")?.textContent || "";
  lb.hidden = false;
});
const closeLb = () => { lb.hidden = true; };
lb.addEventListener("click", e => { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

/* ---------- Form pendaftaran ---------- */
const form = document.getElementById("joinForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("input, select, textarea").forEach(f => {
    const ok = f.checkValidity() && f.value.trim() !== "";
    f.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    msg.className = "form-msg err";
    msg.textContent = "Mohon lengkapi semua kolom dengan benar (NIM 8–12 digit angka).";
    return;
  }
  // TODO: hubungkan ke backend / Google Form / Google Sheets sesuai kebutuhan.
  const nama = form.nama.value.trim().split(" ")[0];
  msg.className = "form-msg ok";
  msg.textContent = `Terima kasih, ${nama}! Pendaftaranmu sudah kami terima.`;
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
