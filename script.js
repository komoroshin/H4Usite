/* ========================================
   Healthy4You - Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initToggles();
  initScrollReveal();
  initSmoothScroll();
});

/* ----------------------------------------
   Navigation
   ---------------------------------------- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect for nav
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(255, 255, 255, 0.98)';
      nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.9)';
      nav.style.boxShadow = 'none';
    }
  });

  // Mobile menu toggle
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
  }
}

/* ----------------------------------------
   Toggle Components
   ---------------------------------------- */
function initToggles() {
  // Services Toggle (Patients/Clinics)
  const togglePatients = document.getElementById('togglePatients');
  const toggleClinics = document.getElementById('toggleClinics');
  const patientsContent = document.getElementById('patientsContent');
  const clinicsContent = document.getElementById('clinicsContent');

  if (togglePatients && toggleClinics) {
    togglePatients.addEventListener('click', () => {
      togglePatients.classList.add('active');
      toggleClinics.classList.remove('active');
      patientsContent.classList.add('active');
      clinicsContent.classList.remove('active');
    });

    toggleClinics.addEventListener('click', () => {
      toggleClinics.classList.add('active');
      togglePatients.classList.remove('active');
      clinicsContent.classList.add('active');
      patientsContent.classList.remove('active');
    });
  }

  // Testimonials Toggle (Clinicians/Patients)
  const toggleClinicians = document.getElementById('toggleClinicians');
  const togglePatientsTestimonials = document.getElementById('togglePatientsTestimonials');
  const cliniciansContent = document.getElementById('cliniciansContent');
  const patientsTestimonialsContent = document.getElementById('patientsTestimonialsContent');

  if (toggleClinicians && togglePatientsTestimonials) {
    toggleClinicians.addEventListener('click', () => {
      toggleClinicians.classList.add('active');
      togglePatientsTestimonials.classList.remove('active');
      cliniciansContent.classList.add('active');
      patientsTestimonialsContent.classList.remove('active');
    });

    togglePatientsTestimonials.addEventListener('click', () => {
      togglePatientsTestimonials.classList.add('active');
      toggleClinicians.classList.remove('active');
      patientsTestimonialsContent.classList.add('active');
      cliniciansContent.classList.remove('active');
    });
  }
}

/* ----------------------------------------
   Scroll Reveal Animation
   ---------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        // Add staggered delay for elements in the same row
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 50);
      }
    });
  };

  // Initial check
  revealOnScroll();

  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
}

/* ----------------------------------------
   Smooth Scroll for Anchor Links
   ---------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ----------------------------------------
   Animated Statistics Counter
   ---------------------------------------- */
function animateStats() {
  const stats = document.querySelectorAll('.stat-value[data-target]');

  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const text = stat.textContent;
    // Only use prefix if it's + or -
    const firstChar = text.charAt(0);
    const prefix = (firstChar === '+' || firstChar === '-') ? firstChar : '';
    const suffix = text.includes('%') ? '%' : '';
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      stat.textContent = prefix + Math.floor(current) + suffix;
    }, stepTime);
  });
}

// Trigger stats animation when trust section is visible
const trustSection = document.getElementById('trust');
if (trustSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(trustSection);
}
