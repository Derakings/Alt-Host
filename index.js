

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupTypingEffect();
    this.setupBackToTop();
    this.setupProjectCards();
    this.setupContactForm();
    this.setupParticles();
  }

  // Loading Screen Animation
  setupLoadingScreen() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }
      }, 1500);
    });
  }

  // Navigation Functionality
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navLinks) {
          navLinks.classList.toggle('active');
        }
      });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Scroll-triggered Animations
  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.bio-item, .project-card, .education-item').forEach(el => {
      observer.observe(el);
    });
  }

  // CSS Animation Classes
  setupAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      .bio-item, .project-card, .education-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
      }
      
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .hamburger.active span:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      @media (max-width: 1024px) {
        .nav-links.active {
          display: flex;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          flex-direction: column;
          padding: 20px;
          gap: 15px;
          border-top: 1px solid var(--border-color);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Typing Effect for Name
  setupTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = 'Chidera Ojimba';
    const speed = 150;
    let i = 0;

    typingText.textContent = '';

    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
  }

  // Back to Top Button
  setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Interactive Project Cards
  setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });

      // Click effect for project cards
      card.addEventListener('click', () => {
        const projectName = card.querySelector('h4').textContent;
        this.showProjectModal(projectName, card);
      });
    });
  }

  // Project Modal (Simple Alert for Now)
  showProjectModal(projectName, card) {
    const projectData = {
      'Alt-school Projects': {
        description: 'A collection of frontend development projects showcasing responsive design and modern web technologies.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        status: 'Completed'
      },
      'ClicKart': {
        description: 'A revolutionary e-commerce platform with 3D product rendering capabilities, built on AWS cloud infrastructure.',
        technologies: ['AWS', 'Cloud Architecture', '3D Rendering', 'Microservices'],
        status: 'In Development'
      },
      'VPC Design': {
        description: 'Multi-tier network architecture with public/private subnets, NAT gateways, and security groups.',
        technologies: ['AWS VPC', 'Networking', 'Security Groups', 'Route Tables'],
        status: 'Completed'
      },
      'Python To-Do Suite': {
        description: 'Comprehensive task management applications including terminal, GUI, and web-based interfaces.',
        technologies: ['Python', 'Tkinter', 'Flask', 'SQLite'],
        status: 'Completed'
      }
    };

    const project = projectData[projectName];
    if (project) {
      alert(`📋 ${projectName}\n\n${project.description}\n\n🛠️ Technologies: ${project.technologies.join(', ')}\n\n📊 Status: ${project.status}`);
    }
  }

  // Contact Form Enhancements
  setupContactForm() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
      method.addEventListener('click', (e) => {
        const href = method.getAttribute('href');
        if (href.startsWith('mailto:')) {
          e.preventDefault();
          this.showEmailModal();
        } else if (href.startsWith('tel:')) {
          e.preventDefault();
          this.showCallModal();
        }
      });
    });
  }

  showEmailModal() {
    const message = `📧 Email Contact\n\nThank you for your interest in connecting!\n\nYou can reach me at: chidera@clickart.com\n\nI'll get back to you within 24 hours.`;
    alert(message);
  }

  showCallModal() {
    const message = `📞 Phone Contact\n\nI'd love to hear from you!\n\nPlease note: Phone number will be provided upon request for security reasons.\n\nFeel free to email me first at chidera@clickart.com`;
    alert(message);
  }

  // Particle Animation Enhancement
  setupParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Add more particles dynamically
    setInterval(() => {
      if (document.querySelectorAll('.particle').length < 15) {
        this.createParticle();
      }
    }, 2000);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    }
  }

  // Easter Egg - Konami Code
  setupEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];

    document.addEventListener('keydown', (e) => {
      userInput.push(e.keyCode);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }
      
      if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
        this.activateEasterEgg();
      }
    });
  }

  activateEasterEgg() {
    alert('🎉 Easter Egg Activated!\n\nYou found the secret Konami code!\n\nHere\'s a fun fact: This portfolio was built with passion for cloud engineering and web development!\n\n🚀 Keep exploring the future of ClicKart!');
    
    // Add rainbow effect to the page
    document.body.style.animation = 'rainbow 2s linear infinite';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }

  // Performance Monitoring
  monitorPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 ClicKart Portfolio loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
          console.warn('⚠️ Page load time is above 3 seconds. Consider optimization.');
        }
      });
    }
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  console.log('🎯 ClicKart Portfolio initialized successfully!');
});

// Service Worker Registration for PWA (Optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('🔧 Service Worker registered successfully');
      })
      .catch(error => {
        console.log('❌ Service Worker registration failed');
      });
  });
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}