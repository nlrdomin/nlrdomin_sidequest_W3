// start.js - Start Screen Controller
// Handles the start screen state and animations

const startScreen = {
    // Initialize start screen
    init() {
        console.log('Start screen initialized');
        this.setupAnimations();
    },
    
    // Setup any additional animations for start screen
    setupAnimations() {
        const petals = document.querySelectorAll('.floating-petal');
        
        // Add random animation variations
        petals.forEach((petal, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 2;
            petal.style.animationDelay = `${randomDelay}s`;
            petal.style.animationDuration = `${randomDuration}s`;
        });
    },
    
    // Show start screen
    show() {
        const startScreenElement = document.getElementById('start-screen');
        if (startScreenElement) {
            startScreenElement.classList.add('active');
        }
    },
    
    // Hide start screen
    hide() {
        const startScreenElement = document.getElementById('start-screen');
        if (startScreenElement) {
            startScreenElement.classList.remove('active');
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => startScreen.init());
} else {
    startScreen.init();
}
