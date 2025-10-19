// Modern Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.id === 'stats') {
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-category, .stat-card, .project-card, .repo, #stats');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form handled by contact.js - removed duplicate
    
    // Parallax effect for hero section (subtle)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.2; // Reduced rate for smoother effect
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        lastScrollTop = scrolled;
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project cards stagger animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${scrollPercent}%`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Add particle effect to hero section
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(16, 185, 129, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            
            heroSection.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes animateIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: animateIn 0.6s ease-out forwards;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
        
        .particle {
            animation: float 15s linear infinite;
        }
    `;
    document.head.appendChild(style);
});



