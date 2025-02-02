// Fade-in Effects on Hero Section
window.addEventListener('DOMContentLoaded', () => {
    // Elements
    const contentElements = document.querySelectorAll('.content h1, .content p, .cta-button');
  
    // Add animation on load
    contentElements.forEach((el, index) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'all 1s ease-out';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, index * 300); // Stagger the animations
    });
  });