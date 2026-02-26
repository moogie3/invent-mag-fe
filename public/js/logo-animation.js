// public/js/logo-animation.js

document.addEventListener('DOMContentLoaded', () => {
  const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const logos = entry.target.querySelectorAll('.logo-item');
        logos.forEach((logo) => {
          logo.classList.remove('opacity-0', 'translate-y-4');
          logo.classList.add('opacity-50');
        });
      }
    });
  }, { threshold: 0.3 });

  const logoSection = document.querySelector('.logo-item')?.closest('section');
  if (logoSection) {
    logoObserver.observe(logoSection);
  }
});
