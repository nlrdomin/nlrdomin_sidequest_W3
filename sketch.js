// sketch.js - Visual Effects and Rendering Controller
// Handles additional visual effects, particles, and rendering enhancements

const sketch = {
    particles: [],
    
    // Initialize sketch system
    init() {
        console.log('Sketch system initialized');
        this.setupParticleSystem();
    },
    
    // Setup particle system for visual effects
    setupParticleSystem() {
        // Particle system ready for catch effects, etc.
    },
    
    // Create particles at a position
    createParticles(x, y, count = 10, color = '#95d5b2') {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 2,
                life: 1.0,
                decay: 0.02,
                size: Math.random() * 4 + 2,
                color: color
            });
        }
    },
    
    // Update particles
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    },
    
    // Draw particles
    drawParticles(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    },
    
    // Create sparkle effect
    createSparkle(x, y) {
        this.createParticles(x, y, 15, '#f1faee');
        this.createParticles(x, y, 10, '#95d5b2');
        this.createParticles(x, y, 5, '#d4a574');
    },
    
    // Draw background decorations
    drawBackgroundEffects(ctx, canvas) {
        // Could add subtle floating petals in background
        // or other atmospheric effects
    },
    
    // Reset all visual effects
    reset() {
        this.particles = [];
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sketch.init());
} else {
    sketch.init();
}

// Enhance game logic with visual effects when it's available
setTimeout(() => {
    if (typeof gameLogic !== 'undefined') {
        // Override the createCatchEffect to use sketch particles
        const originalCreateCatchEffect = gameLogic.createCatchEffect;
        gameLogic.createCatchEffect = function(x, y) {
            originalCreateCatchEffect.call(this, x, y);
            sketch.createSparkle(x, y);
        };
        
        // Override draw to include particles
        const originalDraw = gameLogic.draw;
        gameLogic.draw = function() {
            originalDraw.call(this);
            sketch.updateParticles();
            sketch.drawParticles(this.ctx);
        };
        
        // Override reset to clear particles
        const originalReset = gameLogic.reset;
        gameLogic.reset = function() {
            originalReset.call(this);
            sketch.reset();
        };
    }
}, 100);
