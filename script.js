// script.js — small, dependency-free UX helpers

// Current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Active link highlight on scroll
const links = [...document.querySelectorAll('.nav__link')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const setActive = () => {
  let idx = 0, fromTop = window.scrollY + 100;
  sections.forEach((sec, i) => {
    if (sec.offsetTop <= fromTop) idx = i;
  });
  links.forEach((l, i) => l.classList.toggle('active', i === idx));
};
setActive();
window.addEventListener('scroll', setActive, { passive: true });

// Smooth “internal” anchor scroll (for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});
