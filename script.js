// Smooth active link + mobile burger
const links = [...document.querySelectorAll('.nav__link')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');

burger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  burger.setAttribute('aria-expanded', String(!open));
});

// Intersection Observer for active link highlight
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const idx = sections.indexOf(entry.target);
    if (idx >= 0 && entry.isIntersecting) {
      links.forEach(l => l.classList.remove('is-active'));
      links[idx].classList.add('is-active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sec && io.observe(sec));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Respect reduced motion for potential future animations
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[style*="animation"], [class*="chip--"]').forEach(el => {
    el.style.animation = 'none';
  });
}
