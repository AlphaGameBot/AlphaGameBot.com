// JavaScript for AlphaGameBot website

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the typing animation
  initTypingAnimation();
  
  const scrollIndicator = document.getElementById('scroll-indicator');
  const revealedElements = new Set(); // Track elements that have been revealed
  
  // Make scroll indicator clickable to scroll to features section
  scrollIndicator.addEventListener('click', () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
      scrollIndicator.classList.add('hidden');
    }
  });
  
  // Handle scroll events
  window.addEventListener('scroll', () => {
    // Handle scroll indicator visibility
    if (window.scrollY > 10) {
      scrollIndicator.classList.add('hidden');
    } else {
      // We're at the top - reset animations and show indicator
      scrollIndicator.classList.remove('hidden');
      resetAnimations();
    }
  });

  // Reset animations when back at top
  function resetAnimations() {
    // Only reset if we have some revealed elements and we're truly at the top
    if (revealedElements.size > 0 && window.scrollY < 5) {
      revealedElements.forEach(element => {
        element.classList.remove('revealed');
      });
      
      // Clear the set since we've reset everything
      revealedElements.clear();
      
      // Re-observe elements so they can be revealed again
      document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        revealObserver.observe(element);
      });
    }
  }

  // Also hide when clicking on navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      scrollIndicator.classList.add('hidden');
    });
  });

  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add reveal-on-scroll class to elements we want to animate
  const sectionsToReveal = document.querySelectorAll('section');
  sectionsToReveal.forEach(section => {
    if (section.id !== 'hero') {
      section.classList.add('reveal-on-scroll');
    }
  });
  
  // Add reveal-on-scroll to feature cards with staggered delays
  const featureCards = document.querySelectorAll('#features .bg-gray-700');
  featureCards.forEach((card, index) => {
    card.classList.add('reveal-on-scroll');
    if (index === 1) card.classList.add('delay-200');
    if (index === 2) card.classList.add('delay-400');
  });
  
  // Add reveal-on-scroll to FAQ items with staggered delays
  const faqItems = document.querySelectorAll('#faq .bg-gray-700');
  faqItems.forEach((item, index) => {
    item.classList.add('reveal-on-scroll');
    item.classList.add(`delay-${index * 200}`);
  });

  // Intersection Observer for revealing elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Track this element as revealed
        revealedElements.add(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with reveal-on-scroll class
  document.querySelectorAll('.reveal-on-scroll').forEach(element => {
    revealObserver.observe(element);
  });
  
  // Add "back to top" button functionality
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Typing animation functionality
  function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    // List of phrases to type
    const phrases = [
      "the ultimate user engagement bot",
      "an open-source project",
      "a powerful leveling system",
      "your community's best friend",
      "a global leaderboard tracker",
      "a server engagement booster",
      "built by creators who listen",
      "a Discord bot for all"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeText() {
      const currentPhrase = phrases[phraseIndex];
      
      // If deleting, remove a character, otherwise add a character
      if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal speed when typing
      }
      
      // Determine next state
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing the current phrase
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting the current phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
        typingSpeed = 500; // Pause before typing next phrase
      }
      
      // Schedule next frame
      setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeText, 1000); // Start after 1 second
  }
});
