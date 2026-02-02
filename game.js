// game.js - Game Logic Controller
// Handles the core game mechanics - flower spawning, catching, collision detection

const gameLogic = {
    flowers: [],
    basket: null,
    canvas: null,
    ctx: null,
    animationFrame: null,
    keys: {},
    
    // Game settings
    settings: {
        flowerSpawnRate: 1200, // milliseconds between spawns
        flowerSpeed: 2,
        basketSpeed: 6,
        flowerSize: 40,
        basketWidth: 80,
        basketHeight: 60
    },
    
    spawnInterval: null,
    
    // Flower types with emojis
    flowerTypes: ['🌸', '🌺', '🌼', '🌻', '🌷', '🏵️', '🌹'],
    
    // Initialize game logic
    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 600;
        this.canvas.height = 500;
        
        this.setupKeyboardControls();
    },
    
    // Setup keyboard controls
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    },
    
    // Start the game
    start() {
        console.log('Game logic started');
        this.reset();
        
        // Initialize basket
        this.basket = {
            x: this.canvas.width / 2 - this.settings.basketWidth / 2,
            y: this.canvas.height - this.settings.basketHeight - 20,
            width: this.settings.basketWidth,
            height: this.settings.basketHeight,
            color: '#2d6a4f'
        };
        
        // Start spawning flowers
        this.startSpawning();
        
        // Start game loop
        this.gameLoop();
    },
    
    // Stop the game
    stop() {
        console.log('Game logic stopped');
        this.stopSpawning();
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    },
    
    // Reset game state
    reset() {
        this.flowers = [];
        this.basket = null;
        this.stopSpawning();
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        // Clear canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },
    
    // Start spawning flowers
    startSpawning() {
        this.spawnInterval = setInterval(() => {
            this.spawnFlower();
        }, this.settings.flowerSpawnRate);
    },
    
    // Stop spawning flowers
    stopSpawning() {
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
    },
    
    // Spawn a new flower
    spawnFlower() {
        const flower = {
            x: Math.random() * (this.canvas.width - this.settings.flowerSize),
            y: -this.settings.flowerSize,
            size: this.settings.flowerSize,
            speed: this.settings.flowerSpeed + Math.random() * 1,
            type: this.flowerTypes[Math.floor(Math.random() * this.flowerTypes.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1
        };
        
        this.flowers.push(flower);
    },
    
    // Main game loop
    gameLoop() {
        this.update();
        this.draw();
        
        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
    },
    
    // Update game state
    update() {
        // Update basket position
        if (this.basket) {
            if (this.keys['ArrowLeft'] && this.basket.x > 0) {
                this.basket.x -= this.settings.basketSpeed;
            }
            if (this.keys['ArrowRight'] && this.basket.x < this.canvas.width - this.basket.width) {
                this.basket.x += this.settings.basketSpeed;
            }
        }
        
        // Update flowers
        for (let i = this.flowers.length - 1; i >= 0; i--) {
            const flower = this.flowers[i];
            flower.y += flower.speed;
            flower.rotation += flower.rotationSpeed;
            
            // Check collision with basket
            if (this.checkCollision(flower, this.basket)) {
                // Flower caught!
                game.addScore(1);
                this.flowers.splice(i, 1);
                this.createCatchEffect(flower.x, flower.y);
                continue;
            }
            
            // Remove flower if it's off screen
            if (flower.y > this.canvas.height) {
                this.flowers.splice(i, 1);
            }
        }
    },
    
    // Check collision between flower and basket
    checkCollision(flower, basket) {
        if (!basket) return false;
        
        const flowerCenterX = flower.x + flower.size / 2;
        const flowerCenterY = flower.y + flower.size / 2;
        
        return (
            flowerCenterX > basket.x &&
            flowerCenterX < basket.x + basket.width &&
            flowerCenterY > basket.y &&
            flowerCenterY < basket.y + basket.height
        );
    },
    
    // Create visual effect when catching a flower
    createCatchEffect(x, y) {
        // Simple sparkle effect (will be enhanced by sketch.js)
        console.log('✨ Flower caught at', x, y);
    },
    
    // Draw everything
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw flowers
        this.flowers.forEach(flower => {
            this.drawFlower(flower);
        });
        
        // Draw basket
        if (this.basket) {
            this.drawBasket(this.basket);
        }
    },
    
    // Draw a flower
    drawFlower(flower) {
        this.ctx.save();
        this.ctx.translate(flower.x + flower.size / 2, flower.y + flower.size / 2);
        this.ctx.rotate(flower.rotation);
        this.ctx.font = `${flower.size}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(flower.type, 0, 0);
        this.ctx.restore();
    },
    
    // Draw the basket
    drawBasket(basket) {
        // Draw basket body
        this.ctx.fillStyle = basket.color;
        this.ctx.beginPath();
        this.ctx.moveTo(basket.x + 10, basket.y);
        this.ctx.lineTo(basket.x + basket.width - 10, basket.y);
        this.ctx.lineTo(basket.x + basket.width, basket.y + basket.height);
        this.ctx.lineTo(basket.x, basket.y + basket.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw basket rim
        this.ctx.strokeStyle = '#1a4d2e';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Draw basket pattern
        this.ctx.strokeStyle = '#52b788';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            const x = basket.x + (basket.width / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(x, basket.y);
            this.ctx.lineTo(x + 10, basket.y + basket.height);
            this.ctx.stroke();
        }
        
        // Draw basket emoji
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('🧺', basket.x + basket.width / 2, basket.y + basket.height / 2);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => gameLogic.init());
} else {
    gameLogic.init();
}
