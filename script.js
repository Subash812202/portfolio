const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const hoverTargets = document.querySelectorAll('a, button, .btn, .project-link, .nav-link');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
const typedRole = document.getElementById('typedRole');
const skillFills = document.querySelectorAll('.skill-fill');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');

const roles = [
  'Android Developer',
  'Mobile AI Enthusiast',
  'Kotlin Engineer',
  'App Problem Solver'
];

let currentRole = 0;
let currentChar = 0;
let isDeleting = false;
let typeTimeout;

function updateCursorPosition(event) {
  const { clientX, clientY } = event;
  if (cursor) {
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
  }
  if (cursorDot) {
    cursorDot.style.left = `${clientX}px`;
    cursorDot.style.top = `${clientY}px`;
  }
}

function toggleCursorHover(state) {
  if (!cursor) return;
  cursor.classList.toggle('hovering', state);
}

function bindCursorHover() {
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => toggleCursorHover(true));
    target.addEventListener('mouseleave', () => toggleCursorHover(false));
  });
}

function handleScroll() {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}

function setActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let activeId = '';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
}

function handleNavLinkClick(event) {
  const link = event.currentTarget;
  if (!link) return;
  if (navLinksContainer && navLinksContainer.classList.contains('open')) {
    navLinksContainer.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  }
}

function bindNavLinks() {
  navLinks.forEach((link) => {
    link.addEventListener('click', handleNavLinkClick);
  });
}

function toggleMenu() {
  if (!navLinksContainer || !hamburger) return;
  navLinksContainer.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function animateSkills() {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection || !skillFills.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        skillFills.forEach((fill) => {
          const width = fill.dataset.width || '0';
          fill.style.width = `${width}%`;
        });
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(skillsSection);
}

function typeRoleText() {
  const currentText = roles[currentRole];
  if (!typedRole) return;

  if (!isDeleting) {
    typedRole.textContent = currentText.slice(0, currentChar + 1);
    currentChar += 1;

    if (currentChar === currentText.length) {
      isDeleting = true;
      typeTimeout = setTimeout(typeRoleText, 1800);
      return;
    }
  } else {
    typedRole.textContent = currentText.slice(0, currentChar - 1);
    currentChar -= 1;

    if (currentChar === 0) {
      isDeleting = false;
      currentRole = (currentRole + 1) % roles.length;
    }
  }

  const delay = isDeleting ? 60 : 120;
  typeTimeout = setTimeout(typeRoleText, delay);
}

function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      return;
    }

    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\nName: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:subash948682@gmail.com?subject=${subject}&body=${body}`;
  });
}

function setCurrentYear() {
  if (!yearSpan) return;
  yearSpan.textContent = new Date().getFullYear();
}

function init() {
  document.documentElement.classList.add('custom-cursor-enabled');
  document.addEventListener('mousemove', updateCursorPosition);
  document.addEventListener('scroll', () => {
    handleScroll();
    setActiveNav();
  });

  bindCursorHover();
  bindNavLinks();
  revealOnScroll();
  animateSkills();
  setupContactForm();
  setCurrentYear();
  typeRoleText();

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  handleScroll();
  setActiveNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
