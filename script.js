// Intersection Observer for Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    // Reveal elements on scroll
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Navbar background on scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});


    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    });
