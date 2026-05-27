/**
 * Vlocal Group - 2026 UI/UX Interaction Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Advanced Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay if multiple elements enter at once
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Animate only once for premium feel
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Dynamic Sticky Glass Navbar
    const navbar = document.querySelector(".navbar");
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    
    // Initial check and scroll event listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 4. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Toggle Icon between Menu and Close(X)
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // Close mobile menu when a link is clicked
        const navLinks = navLinksContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }

    // 5. Parallax effect for glow orbs (Optional advanced UX)
    const orbs = document.querySelectorAll('.glow-orb');
    if (orbs.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            orbs.forEach(orb => {
                const speed = orb.classList.contains('primary') ? 30 : -30;
                const x = (mouseX * speed);
                const y = (mouseY * speed);
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
});
