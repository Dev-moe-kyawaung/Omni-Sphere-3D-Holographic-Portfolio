/* ============================================
   HOLOGRAPHIC EFFECTS ENGINE
   Advanced Visual Effects & Animations
   ============================================ */

class HologramEffects {
    constructor() {
        this.effects = {
            scanline: true,
            flicker: true,
            chromatic: true,
            distortion: true
        };
        
        this.init();
    }
    
    init() {
        this.createScanlines();
        this.createFlickerEffect();
        this.createChromaticAberration();
        this.createDistortionField();
        this.animate();
    }
    
    createScanlines() {
        const scanlines = document.createElement('div');
        scanlines.className = 'hologram-scanlines';
        scanlines.innerHTML = `
            <style>
                .hologram-scanlines {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 0.15),
                        rgba(0, 0, 0, 0.15) 1px,
                        transparent 1px,
                        transparent 2px
                    );
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.3;
                }
            </style>
        `;
        document.body.appendChild(scanlines);
    }
    
    createFlickerEffect() {
        const flickerOverlay = document.createElement('div');
        flickerOverlay.className = 'hologram-flicker';
        flickerOverlay.innerHTML = `
            <style>
                .hologram-flicker {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 255, 255, 0.02);
                    pointer-events: none;
                    z-index: 9998;
                    animation: hologram-flicker 0.15s infinite;
                }
                
                @keyframes hologram-flicker {
                    0% { opacity: 0.02; }
                    50% { opacity: 0.05; }
                    100% { opacity: 0.02; }
                }
            </style>
        `;
        document.body.appendChild(flickerOverlay);
    }
    
    createChromaticAberration() {
        const aberration = document.createElement('div');
        aberration.className = 'hologram-chromatic';
        aberration.innerHTML = `
            <style>
                .hologram-chromatic {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9997;
                    mix-blend-mode: screen;
                }
                
                .hologram-chromatic::before,
                .hologram-chromatic::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                
                .hologram-chromatic::before {
                    background: rgba(255, 0, 0, 0.03);
                    transform: translateX(-2px);
                }
                
                .hologram-chromatic::after {
                    background: rgba(0, 255, 255, 0.03);
                    transform: translateX(2px);
                }
            </style>
        `;
        document.body.appendChild(aberration);
    }
    
    createDistortionField() {
        const distortion = document.createElement('div');
        distortion.className = 'hologram-distortion';
        distortion.innerHTML = `
            <style>
                .hologram-distortion {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9996;
                    background: transparent;
                    filter: url(#distortion-filter);
                }
            </style>
        `;
        document.body.appendChild(distortion);
        
        // Add SVG filter
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.width = '0';
        svg.style.height = '0';
        
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'distortion-filter');
        
        const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
        turbulence.setAttribute('type', 'fractalNoise');
        turbulence.setAttribute('baseFrequency', '0.01 0.02');
        turbulence.setAttribute('numOctaves', '1');
        turbulence.setAttribute('result', 'noise');
        
        const displacement = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        displacement.setAttribute('in', 'SourceGraphic');
        displacement.setAttribute('in2', 'noise');
        displacement.setAttribute('scale', '3');
        
        filter.appendChild(turbulence);
        filter.appendChild(displacement);
        svg.appendChild(filter);
        document.body.appendChild(svg);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Animate hologram cards
        document.querySelectorAll('.hologram-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = (window.innerWidth / 2 - centerX) / 50;
            const mouseY = (window.innerHeight / 2 - centerY) / 50;
            
            card.style.transform = `
                perspective(1000px)
                rotateY(${mouseX}deg)
                rotateX(${mouseY}deg)
                translateZ(${Math.sin(time) * 5}px)
            `;
        });
    }
    
    toggleEffect(effect) {
        this.effects[effect] = !this.effects[effect];
        console.log(`${effect}: ${this.effects[effect] ? 'ON' : 'OFF'}`);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.hologramEffects = new HologramEffects();
});
