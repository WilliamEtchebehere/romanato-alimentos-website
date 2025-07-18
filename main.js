// Enhanced JavaScript for Romanato Alimentos Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    
    // Enhanced Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a menu item
        const menuItems = navMenu.querySelectorAll('a');
        menuItems.forEach(function(item) {
            item.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Enhanced Smooth Scrolling
    const scrollLinks = document.querySelectorAll('a[data-scroll]');
    scrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.getAttribute('data-count'));
                animateCounter(target, 0, finalNumber, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(function(stat) {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (range * easeOutQuart));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Enhanced Image Loading with Error Handling
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        // Add loading placeholder
        img.style.backgroundColor = '#f0f0f0';
        
        img.addEventListener('load', function() {
            this.style.backgroundColor = 'transparent';
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            this.style.backgroundColor = '#e0e0e0';
            this.alt = 'Imagem não disponível';
        });
        
        // Lazy loading for better performance
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
    
    // Enhanced Product Items Interaction
    const productItems = document.querySelectorAll('.produto-item');
    productItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.03)';
            }, 150);
        });
    });
    
    // Enhanced Banner Items with Parallax Effect
    const bannerItems = document.querySelectorAll('.banner-item');
    bannerItems.forEach(function(item, index) {
        // Staggered animation delay
        item.style.animationDelay = (index * 0.1) + 's';
        
        // Parallax effect on scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.1;
            item.style.transform = `translateY(${parallax}px)`;
        });
    });
    
    // Contact Items Hover Effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Enhanced Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Performance Optimization: Throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        // Scroll-based animations can be added here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
        
        // Enter key on CTA button
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            e.target.click();
        }
    });
    
    // Form Enhancement (if contact forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            // Add form validation and submission handling here
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
            }
        });
    });
    
    // Error Handling for External Links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            try {
                // Analytics tracking could be added here
                console.log('External link clicked:', this.href);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            } catch (error) {
                console.warn('Error tracking external link:', error);
            }
        });
    });
    
    // Console welcome message
    console.log('%c🍞 Romanato Alimentos Website Loaded Successfully! 🍰', 
                'color: #d4a574; font-size: 16px; font-weight: bold;');
    console.log('Website features:');
    console.log('✅ Responsive Design');
    console.log('✅ Smooth Animations');
    console.log('✅ Interactive Elements');
    console.log('✅ Performance Optimized');
    console.log('Total elements loaded:', {
        images: images.length,
        bannerItems: bannerItems.length,
        productItems: productItems.length,
        contactItems: contactItems.length
    });
});

// Handle window resize events
window.addEventListener('resize', throttle(function() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (navMenu && menuToggle && window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Utility function for throttling
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be registered here for offline functionality
        console.log('Service Worker support detected');
    });
}
