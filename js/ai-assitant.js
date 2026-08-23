/* ============================================
   AI ASSISTANT MODULE
   Conversation Flow & Responses
   ============================================ */

class AIAssistant {
    constructor() {
        this.conversationHistory = [];
        this.responses = this.initializeResponses();
        this.isTyping = false;
    }
    
    initializeResponses() {
        return {
            greetings: [
                "Hello! I'm Moe Kyaw Aung's AI assistant. How can I help you today?",
                "Hi there! Welcome to Moe's portfolio. What would you like to know?",
                "Greetings! I'm here to help you learn about Moe's work and expertise."
            ],
            
            skills: {
                keywords: ['skill', 'technolog', 'expert', 'profici', 'competenc'],
                response: `Moe Kyaw Aung's Technical Expertise:
                
                📱 **Android Development** (Expert - 95%)
                • Kotlin, Jetpack Compose, Android SDK
                • MVVM, MVI, Clean Architecture
                • Coroutines, Flow, Material 3
                
                🏗️ **Architecture & Patterns** (92%)
                • Clean Architecture
                • SOLID Principles
                • Multi-module applications
                
                ☁️ **Backend & Cloud** (88%)
                • Firebase (Auth, Firestore, Cloud Messaging)
                • REST APIs, Retrofit, OkHttp
                • Room Database
                
                🌐 **Web Development** (85%)
                • Next.js 15, React, TypeScript
                • Tailwind CSS, HTML5, CSS3
                
                🤖 **AI/ML** (78%)
                • Claude API integration
                • TFLite, On-Device ML
                • Python for ML
                
                🔐 **Cybersecurity** (75%)
                • Ethical Hacking
                • Linux, Kali Linux
                • Network Security
                
                🛠️ **DevOps** (90%)
                • Git, GitHub Actions
                • CI/CD pipelines
                • Docker, Jenkins`
            },
            
            projects: {
                keywords: ['project', 'app', 'github', 'repo', 'work', 'portfolio'],
                response: `Featured Projects:
                
                📱 **Social Dashboard** (Featured)
                Advanced social media analytics with real-time data
                Tech: Kotlin, Jetpack Compose, Firebase
                
                💼 **POS Ultimate Pro Max** (Legend)
                Enterprise-grade POS system with full features
                Tech: Kotlin, Firebase, Room DB
                
                🎯 **Video Player**
                Advanced media player with ExoPlayer
                Tech: Kotlin, ExoPlayer, Material 3
                
                🎮 **Game Collection**
                Multiple games including Snake
                Tech: Kotlin, Compose, Canvas
                
                🌤️ **Weather App**
                Real-time weather forecasting
                Tech: Kotlin, Retrofit, OpenWeather API
                
                🤖 **MoekyawTranslator**
                AI-powered translation app
                Tech: Kotlin, Claude API, TFLite
                
                🌐 **PWA App**
                Progressive Web App with offline support
                Tech: Next.js, React, Tailwind
                
                View all **551+ repositories** on GitHub!
                github.com/Dev-moe-kyawaung`
            },
            
            contact: {
                keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'collaborat'],
                response: `Contact Information:
                
                📧 **Email Addresses:**
                • Primary: moekyawaung@programmer.net
                • Tech: moekyawaung@technologist.com
                • Business: moekyawaung@engineer.com
                
                📱 **Phone:**
                • +95 9 889 000 889
                • +95 9 666 000 050
                
                📍 **Location:**
                • Tachileik, Myanmar 🇲🇲
                • Bangkok, Thailand 🇹🇭
                
                🌐 **Social Media:**
                • GitHub: github.com/Dev-moe-kyawaung
                • LinkedIn: linkedin.com/in/moe-kyaw-aung
                • YouTube: youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG
                • Gravatar: gravatar.com/moekyawaung2026
                
                💼 **Open to:**
                • Senior Android Developer roles
                • Freelance projects
                • Technical consulting
                • Mentorship opportunities`
            },
            
            experience: {
                keywords: ['experience', 'year', 'work', 'histor', 'background'],
                response: `Professional Experience:
                
                🏆 **Senior Android Developer**
                Microsoft · 2026 - Present
                • Production apps with Clean Architecture
                • Firebase integration at scale
                • CI/CD pipeline automation
                
                🎓 **Google Developers Launchpad**
                Graduate · 2024
                • Advanced Android Development
                • Best practices & modern patterns
                • Industry connections
                
                💻 **12+ Years Experience**
                • 2014: Started development journey
                • 2016: First Android app published
                • 2020: Senior developer role
                • 2024: 82+ certifications achieved
                • 2026: 551+ GitHub repositories
                
                📊 **Key Achievements:**
                • 82+ Technical Certificates
                • 551+ GitHub Repositories
                • 100+ Completed Projects
                • Google Developers Launchpad Graduate
                • Production-ready enterprise apps`
            },
            
            certifications: {
                keywords: ['certific', 'cert', 'qualif', 'credent'],
                response: `Certifications (82+ Total):
                
                **Programming Languages (13)**
                • C Programming
                • Kotlin Programming
                • Java Development
                • Python Programming
                • JavaScript & TypeScript
                • And 8 more...
                
                **Web Development (13)**
                • React Development
                • Next.js
                • HTML5 & CSS3
                • Node.js
                • And 9 more...
                
                **Mobile Development (7)**
                • Android Development
                • Jetpack Compose
                • Flutter
                • And 4 more...
                
                **AI & Machine Learning (11)**
                • Machine Learning Fundamentals
                • TensorFlow
                • Python for Data Science
                • And 8 more...
                
                **Security & DevOps (10)**
                • Cybersecurity Fundamentals
                • Ethical Hacking
                • Linux Administration
                • And 7 more...
                
                **Databases (6)**
                • SQL
                • PostgreSQL
                • MongoDB
                • And 3 more...
                
                **Blockchain (4)**
                • Blockchain Fundamentals
                • Smart Contracts
                • And 2 more...
                
                **Business & Marketing (11)**
                • Project Management
                • Agile Methodologies
                • And 9 more...
                
                All certificates verifiable on Programming Hub!`
            },
            
            roadmap: {
                keywords: ['roadmap', 'plan', 'goal', 'future', '2026', '2027', '2028'],
                response: `Android Development Roadmap 2026-2030:
                
                🚀 **2026 - Foundation & Mastery**
                ✓ Jetpack Compose Expert
                ✓ Clean Architecture Implementation
                ✓ Kotlin Coroutines & Flow
                ✓ Firebase Integration
                ✓ CI/CD Pipeline Setup
                ✓ Google Developers Launchpad Graduate
                
                📦 **2027 - Advanced Architecture**
                → Multi-Module Architecture
                → Dependency Injection (Hilt, Koin)
                → Performance Optimization
                → Advanced Testing Strategies
                
                🤖 **2028 - AI/ML Integration**
                → On-Device Machine Learning
                → AI API Integration (Claude, GPT)
                → NLP Features
                → TFLite Custom Models
                
                🌐 **2029 - Cross-Platform**
                → Kotlin Multiplatform
                → Compose Multiplatform
                → Full-Stack Development
                → Next.js & Ktor
                
                👑 **2030 - Senior Architect**
                → System Design Expertise
                → Technical Leadership
                → Open Source Contributions
                → Conference Speaking
                
                Philosophy: "Code with culture. Build with purpose."`
            },
            
            default: {
                response: `Thanks for your message! I'm Moe Kyaw Aung's AI assistant.
                
                I can help you learn about:
                
                📱 **Skills & Expertise**
                Ask about technical skills, technologies, and proficiency levels
                
                💼 **Projects & Portfolio**
                Learn about featured projects, GitHub repositories, and case studies
                
                📜 **Certifications**
                Explore 82+ professional certifications across 9 domains
                
                📞 **Contact Information**
                Get in touch for collaborations, opportunities, or inquiries
                
                🗺️ **Career Roadmap**
                Understand the 2026-2030 development plan
                
                What would you like to know?`
            }
        };
    }
    
    async processMessage(message) {
        this.conversationHistory.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });
        
        const response = this.findBestResponse(message);
        
        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date()
        });
        
        return response;
    }
    
    findBestResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check each category
        for (const [category, data] of Object.entries(this.responses)) {
            if (category === 'greetings' || category === 'default') continue;
            
            if (data.keywords && data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }
        
        // Check for greetings
        if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(lowerMessage)) {
            return this.responses.greetings[Math.floor(Math.random() * this.responses.greetings.length)];
        }
        
        return this.responses.default.response;
    }
    
    async sendMessage(message, onMessage, onTyping) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        onTyping(true);
        
        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        const response = await this.processMessage(message);
        
        onTyping(false);
        this.isTyping = false;
        
        onMessage(response);
    }
}

// Initialize AI Assistant
const aiAssistant = new AIAssistant();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIAssistant;
}
