/* ============================================================
   SUBASH CHANDRA BOSE THANGARASU — Software Engineer Portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING ANIMATION FOR ROLES
  const typedRoleSpan = document.getElementById('typedRole');
  const roles = [
    'Software Engineer',
    'Machine Learning Developer',
    'Android Application Developer',
    'Full-Stack Developer',
    'Problem Solver (250+ LeetCode)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const delayBetweenRoles = 2000;

  function typeEffect() {
    if (!typedRoleSpan) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedRoleSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedRoleSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
    } else {
      setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  typeEffect();

  // 2. NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 3. HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 4. SCROLL REVEAL ANIMATION
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('visible');
      }
    });

    // Animate skill bars
    document.querySelectorAll('.bar-fill').forEach(bar => {
      const top = bar.getBoundingClientRect().top;
      if (top < windowHeight - 50) {
        const targetWidth = bar.getAttribute('data-w');
        if (targetWidth) {
          bar.style.width = targetWidth + '%';
        }
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // 5. CUSTOM CURSOR (DESKTOP)
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  // 6. FOOTER YEAR
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
