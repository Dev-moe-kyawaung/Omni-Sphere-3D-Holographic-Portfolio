/* ============================================
   NAVIGATION & ROUTING SYSTEM
   Smooth Scrolling & Page Transitions
   ============================================ */

class NavigationSystem {
    constructor() {
        this.currentSection = 'hero';
        this.sections = [];
        this.scrollLocked = false;
        
        this.init();
    }
    
    init() {
        // Get all sections
        this.sections = document.querySelectorAll('.section');
        
        // Setup intersection observer
        this.setupObserver();
        
        // Setup keyboard navigation
        this.setupKeyboard();
        
        // Setup progress indicator
        this.setupProgress();
        
        // Setup breadcrumbs
        this.setupBreadcrumbs();
    }
    
    setupObserver() {
        const options = {
            root: null,
            rootMargin: '-50% 0px',
            threshold: 0
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                    this.updateNavigation();
                    this.updateProgress();
                    this.updateBreadcrumbs();
                }
            });
        }, options);
        
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    updateNavigation() {
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${this.currentSection}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update URL without scroll
        if (history.pushState) {
            history.pushState(null, null, `#${this.currentSection}`);
        }
    }
    
    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) return;
            
            switch(e.key) {
                case 'Home':
                    this.scrollToSection('hero');
                    e.preventDefault();
                    break;
                case 'End':
                    this.scrollToSection('contact');
                    e.preventDefault();
                    break;
                case 'PageDown':
                    this.scrollToNext();
                    e.preventDefault();
                    break;
                case 'PageUp':
                    this.scrollToPrev();
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (e.altKey) {
                        this.scrollToNext();
                        e.preventDefault();
                    }
                    break;
                case 'ArrowUp':
                    if (e.altKey) {
                        this.scrollToPrev();
                        e.preventDefault();
                    }
                    break;
            }
        });
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    scrollToNext() {
        const currentIndex = Array.from(this.sections).findIndex(
            s => s.id === this.currentSection
        );
        
        if (currentIndex < this.sections.length - 1) {
            this.scrollToSection(this.sections[currentIndex + 1].id);
        }
    }
    
    scrollToPrev() {
        const currentIndex = Array.from(this.sections).findIndex(
            s => s.id === this.currentSection
        );
        
        if (currentIndex > 0) {
            this.scrollToSection(this.sections[currentIndex - 1].id);
        }
    }
    
    setupProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.innerHTML = `
            <style>
                #scroll-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 0%;
                    height: 3px;
                    background: linear-gradient(90deg, #00ffff, #ff00ff);
                    z-index: 10000;
                    transition: width 0.3s ease;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                }
            </style>
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
    }
    
    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    setupBreadcrumbs() {
        const breadcrumbs = document.createElement('div');
        breadcrumbs.id = 'breadcrumbs';
        breadcrumbs.className = 'breadcrumbs';
        breadcrumbs.innerHTML = `
            <style>
                .breadcrumbs {
                    position: fixed;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.5rem;
                    z-index: 100;
                    background: rgba(10, 10, 15, 0.9);
                    backdrop-filter: blur(10px);
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    border: 1px solid rgba(0, 255, 255, 0.2);
                }
                
                .breadcrumb-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .breadcrumb-dot:hover {
                    background: rgba(0, 255, 255, 0.5);
                    transform: scale(1.2);
                }
                
                .breadcrumb-dot.active {
                    background: #00ffff;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                }
            </style>
        `;
        document.body.appendChild(breadcrumbs);
        
        // Create dots for each section
        this.sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'breadcrumb-dot';
            dot.dataset.section = section.id;
            dot.addEventListener('click', () => {
                this.scrollToSection(section.id);
            });
            breadcrumbs.appendChild(dot);
        });
    }
    
    updateBreadcrumbs() {
        document.querySelectorAll('.breadcrumb-dot').forEach(dot => {
            if (dot.dataset.section === this.currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.navigationSystem = new NavigationSystem();
});
