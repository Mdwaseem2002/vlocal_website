/**
 * Vlocal Group — V2 Ultra-Premium Interaction Engine
 * Inspired by Linear, Stripe, Framer micro-interactions
 */

document.addEventListener("DOMContentLoaded", () => {

  // ── 1. Initialize Lucide Icons ──
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ── 2. Scroll Reveal (Staggered IntersectionObserver) ──
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger each element's reveal by 80ms
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── 3. Sticky Glass Navbar ──
  const navbar = document.querySelector(".navbar");

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // ── 4. Mobile Menu ──
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');

      const icon = mobileMenuBtn.querySelector('i');
      if (navLinksContainer.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }

      if (typeof lucide !== 'undefined') lucide.createIcons();
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    });
  }

  // ── 5. Card Spotlight Effect (Stripe-style) ──
  // Creates a radial gradient spotlight that follows the cursor on glass cards
  const glassCards = document.querySelectorAll('.glass-card');

  glassCards.forEach(card => {
    // Create spotlight overlay element
    const spotlight = document.createElement('div');
    spotlight.classList.add('card-spotlight');
    card.appendChild(spotlight);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 94, 0, 0.06), transparent 40%)`;
    });

    card.addEventListener('mouseleave', () => {
      spotlight.style.background = 'none';
    });
  });

  // ── 6. Bento Item Spotlight Effect ──
  const bentoItems = document.querySelectorAll('.bento-item');

  bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);

      // Glow border via ::before
      item.style.background = `
        radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 94, 0, 0.04), transparent 40%),
        var(--bg-surface-elevated)
      `;
    });

    item.addEventListener('mouseleave', () => {
      item.style.background = 'var(--bg-surface-elevated)';
    });
  });

  // ── 7. Parallax Glow Orbs ──
  const orbs = document.querySelectorAll('.glow-orb');
  if (orbs.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      orbs.forEach(orb => {
        const speed = orb.classList.contains('primary') ? 25 : -25;
        orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
      });
    }, { passive: true });
  }

  // ── 8. Smooth Section Transitions (Fade on scroll) ──
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(section => {
    if (!section.classList.contains('hero')) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      sectionObserver.observe(section);
    }
  });

});
