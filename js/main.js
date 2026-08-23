
/* ============================================
   OMNI-SPHERE PORTFOLIO - MAIN JAVASCRIPT
   Core Functionality & Interactions
   ============================================ */

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const menuToggle = document.getElementById('menu-toggle');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// State
let currentTheme = 'cyberpunk';
let currentLang = 'en';
let isLoading = true;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        isLoading = false;
    }, 3000);
    
    // Initialize components
    initNavigation();
    initScrollEffects();
    initThemeToggle();
    initLanguageToggle();
    initChatAssistant();
    initParticles();
    initAnimations();
    initCertificateSearch();
    initProjectFilters();
}

// Navigation
function initNavigation() {
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Scroll to top button
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Fade-up animations on scroll
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeUpElements.forEach(el => observer.observe(el));
}

// Theme Toggle
function initThemeToggle() {
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-float');
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTheme = currentTheme === 'cyberpunk' ? 'futuristic' : 'cyberpunk';
            document.body.className = `${currentTheme}-theme`;
            
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = currentTheme === 'cyberpunk' ? 'fas fa-moon' : 'fas fa-sun';
            }
            
            // Save preference
            localStorage.setItem('theme', currentTheme);
        });
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.className = `${savedTheme}-theme`;
    }
}

// Language Toggle
function initLanguageToggle() {
    const langToggleBtns = document.querySelectorAll('#lang-toggle, #lang-toggle-float');
    
    langToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'mm' : 'en';
            
            const langCurrent = btn.querySelector('.lang-current');
            const langAlt = btn.querySelector('.lang-alt');
            
            if (langCurrent && langAlt) {
                langCurrent.textContent = currentLang.toUpperCase();
                langAlt.textContent = currentLang === 'en' ? 'မြန်' : 'EN';
            }
            
            // Update content
            updateLanguage(currentLang);
            
            // Save preference
            localStorage.setItem('language', currentLang);
        });
    });
    
    // Load saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }
}

function updateLanguage(lang) {
    const translations = {
        en: {
            hero: 'Hero',
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact'
        },
        mm: {
            hero: 'မိတ်ဆက်',
            about: 'အကြောင်း',
            skills: 'ကျွမ်းကျင်မှု',
            projects: 'ပရောဂျက်များ',
            contact: 'ဆက်သွယ်ရန်'
        }
    };
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        const key = link.getAttribute('href').replace('#', '');
        if (translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });
}

// Chat Assistant
function initChatAssistant() {
    if (!chatInput || !chatSend) return;
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Quick questions
    document.querySelectorAll('.quick-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = type === 'bot' 
        ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>'
        : '<div class="message-avatar"><i class="fas fa-user"></i></div>';
    
    messageDiv.innerHTML = `
        ${avatar}
        <div class="message-content">
            <div class="message-header">
                <strong>${type === 'bot' ? 'AI Assistant' : 'You'}</strong>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="message-text">${text}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technolog')) {
        return `Moe Kyaw Aung's main skills include:
        • Kotlin & Jetpack Compose (Expert level)
        • Clean Architecture & MVVM/MVI patterns
        • Firebase integration (Auth, Firestore, Cloud Messaging)
        • REST APIs with Retrofit & OkHttp
        • CI/CD pipelines (GitHub Actions, Azure DevOps)
        • Next.js, React, TypeScript for web development
        • AI/ML integration (Claude API, TFLite)`;
    }
    
    if (lowerMessage.includes('project')) {
        return `Featured projects include:
        • Social Dashboard - Real-time analytics platform
        • POS Ultimate Pro Max - Enterprise POS system
        • Video Player - Advanced media player with ExoPlayer
        • Game Collection - Multiple games including Snake
        • Weather App - Real-time forecasting
        • AI Translator - Claude API integration
        
        View all 551+ repositories on GitHub!`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        return `Contact Information:
        📧 Email: moekyawaung@programmer.net
        📱 Phone: +95 9 889 000 889
        📍 Location: Tachileik, Myanmar 🇲🇲
        
        Also available on:
        • GitHub: github.com/Dev-moe-kyawaung
        • LinkedIn: linkedin.com/in/moe-kyaw-aung
        • Gravatar: gravatar.com/moekyawaung2026`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('year')) {
        return `Professional Experience:
        • 12+ years in Android development
        • Senior Android Developer at Microsoft
        • Google Developers Launchpad Graduate
        • 82+ technical certifications
        • 551+ GitHub repositories
        • Expert in Clean Architecture & production-ready apps`;
    }
    
    return `Thanks for your message! I'm Moe Kyaw Aung's AI assistant.
    
    I can help you learn about:
    • Technical skills and expertise
    • Projects and repositories
    • Certifications and achievements
    • Contact information
    
    What would you like to know?`;
}

// Certificate Search
function initCertificateSearch() {
    const searchInput = document.getElementById('cert-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const certCards = document.querySelectorAll('.cert-card');
        
        certCards.forEach(card => {
            const certName = card.querySelector('.cert-info h4').textContent.toLowerCase();
            const certCategory = card.getAttribute('data-category');
            
            if (certName.includes(searchTerm) || certCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Particles.js Initialization
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-hero', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00ffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// GSAP Animations
function initAnimations() {
    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate stats counters
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    let count = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            stat.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(count);
                        }
                    }, 30);
                }
            });
        });
    }
}

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    });
}

// Console Easter Egg
console.log(`
╔════════════════════════════════════════╗
║   OMNI-SPHERE 3D PORTFOLIO            ║
║   Developer: Moe Kyaw Aung            ║
║   Senior Android Developer            ║
╚════════════════════════════════════════╝

🚀 Built with:
• HTML5, CSS3, JavaScript
• Three.js for 3D effects
• GSAP for animations
• Particles.js for background

💼 Skills:
• Kotlin, Jetpack Compose
• Clean Architecture, MVVM
• Firebase, REST APIs
• Next.js, React, TypeScript

📧 Contact:
moekyawaung@programmer.net

🌐 GitHub:
github.com/Dev-moe-kyawaung
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page Load Time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        }, 1000);
    });
}
