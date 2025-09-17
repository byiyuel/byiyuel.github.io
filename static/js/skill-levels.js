// Skill Level Animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill level bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
        });
    };
    
    // Use Intersection Observer to trigger animation when skills section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkillBars, 500); // Delay for better effect
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
});

// Visitor Counter
class VisitorCounter {
    constructor() {
        this.storageKey = 'visitor_count';
        this.init();
    }
    
    init() {
        this.updateCounter();
        this.incrementCounter();
    }
    
    updateCounter() {
        const count = this.getCount();
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            this.animateCounter(counterElement, count);
        }
    }
    
    getCount() {
        return parseInt(localStorage.getItem(this.storageKey)) || 0;
    }
    
    incrementCounter() {
        const currentCount = this.getCount();
        const newCount = currentCount + 1;
        localStorage.setItem(this.storageKey, newCount.toString());
    }
    
    animateCounter(element, targetCount) {
        let currentCount = 0;
        const increment = Math.ceil(targetCount / 50); // Animation duration
        const duration = 2000; // 2 seconds
        
        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(timer);
            }
            element.textContent = currentCount.toLocaleString();
        }, duration / 50);
    }
}

// Initialize visitor counter
new VisitorCounter();


