// ── Cursor ──
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
document.addEventListener('mousemove', (e) => {
  if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
  if (cursorDot) { cursorDot.style.left = e.clientX + 'px'; cursorDot.style.top = e.clientY + 'px'; }
});

// ── Navbar scroll + active link ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function handleScroll() {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);

  const sections = document.querySelectorAll('section[id]');
  let activeId = '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
      activeId = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}
window.addEventListener('scroll', handleScroll);

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navLinks.forEach((link) => link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    hamburger.classList.remove('open');
  }));
}

// ── Typewriter ──
const roles = ['Developer', 'ML Engineer', 'Android Developer', 'UI/Graphic Designer'];
let ri = 0, ci = 0, deleting = false;
const typedRoleEl = document.getElementById('typedRole');
function type() {
  if (!typedRoleEl) return;
  const word = roles[ri];
  if (!deleting) {
    typedRoleEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    typedRoleEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Reveal on scroll ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach((r) => revealObserver.observe(r));

// ── Skill bars animate when visible ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach((bar) => {
        bar.style.width = bar.dataset.w + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-category').forEach((c) => barObserver.observe(c));

// ── Year ──
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ── Contact form: submit to Netlify Forms via fetch, fall back to mailto ──
function encodeFormData(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const name = document.getElementById('senderName')?.value.trim() || '';
    const email = document.getElementById('senderEmail')?.value.trim() || '';
    const opp = document.getElementById('oppType')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(contactForm),
    })
      .then(() => {
        if (formNote) {
          formNote.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
          formNote.classList.add('success');
        }
        contactForm.reset();
      })
      .catch(() => {
        // Fallback: open the user's email client with the message pre-filled
        const subject = encodeURIComponent((opp || 'Opportunity') + ' — via SCB Portfolio');
        const body = encodeURIComponent(
          'Hi Subash,\n\n' + message + '\n\n—\n' + name + '\n' + email + (opp ? '\nOpportunity: ' + opp : '')
        );
        window.location.href = 'mailto:subash948682@gmail.com?subject=' + subject + '&body=' + body;
        if (formNote) {
          formNote.textContent = 'Opening your email client instead...';
          formNote.classList.add('error');
        }
      })
      .finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }
      });
  });
}
