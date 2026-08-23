/* ============================================
   THREE.JS 3D SPHERES ENGINE
   Holographic Sphere Visualizations
   ============================================ */

class SphereEngine {
    constructor(containerId, type = 'hero') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.type = type;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.particles = null;
        
        this.init();
    }
    
    init() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Create sphere based on type
        if (this.type === 'hero') {
            this.createHeroSphere();
        } else if (this.type === 'skills') {
            this.createSkillsSphere();
        }
        
        // Lights
        this.addLights();
        
        // Animation loop
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', this.onResize.bind(this));
    }
    
    createHeroSphere() {
        // Main sphere geometry
        const geometry = new THREE.SphereGeometry(2, 64, 64);
        
        // Holographic material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x00ffff) },
                color2: { value: new THREE.Color(0xff00ff) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    float pattern = sin(vUv.x * 20.0 + time) * cos(vUv.y * 20.0 + time);
                    float hologram = sin(vUv.y * 10.0 + time * 0.5);
                    
                    vec3 color = mix(color1, color2, vUv.x + sin(time) * 0.5);
                    float alpha = 0.5 + 0.5 * hologram;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        
        // Particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
            
            colors[i] = 0;
            colors[i + 1] = 1;
            colors[i + 2] = 1;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }
    
    createSkillsSphere() {
        // Skills visualization sphere
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0xff00ff,
            emissiveIntensity: 0.3,
            shininess: 100,
            transparent: true,
            opacity: 0.7,
            wireframe: true
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
    }
    
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Point lights
        const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const time = Date.now() * 0.001;
        
        if (this.sphere) {
            this.sphere.rotation.x = time * 0.1;
            this.sphere.rotation.y = time * 0.2;
            
            if (this.sphere.material.uniforms) {
                this.sphere.material.uniforms.time.value = time;
            }
        }
        
        if (this.particles) {
            this.particles.rotation.y = time * 0.05;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onResize() {
        if (!this.container) return;
        
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
    }
    
    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
        
        if (this.scene) {
            while(this.scene.children.length > 0) {
                this.scene.remove(this.scene.children[0]);
            }
        }
    }
}

// Initialize spheres
document.addEventListener('DOMContentLoaded', () => {
    // Hero sphere
    const heroSphere = new SphereEngine('hero-sphere-3d', 'hero');
    
    // Skills sphere
    const skillsSphere = new SphereEngine('skills-sphere-3d', 'skills');
    
    // Architecture spheres
    const archSpheres = document.querySelectorAll('.arch-sphere');
    archSpheres.forEach((sphere, index) => {
        setTimeout(() => {
            sphere.style.opacity = '1';
            sphere.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SphereEngine;
}
