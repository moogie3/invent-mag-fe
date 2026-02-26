// public/js/stats-animation.js

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
      
      counter.querySelector('.counter-value').textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.querySelector('.counter-value').textContent = target;
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countersInSection = entry.target.querySelectorAll('.counter');
        countersInSection.forEach((counter, index) => {
          setTimeout(() => {
            animateCounter(counter);
          }, index * 150);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const statsSection = document.querySelector('.counter')?.closest('section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
