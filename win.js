// win.js - Win Screen Controller
// Handles the win screen state and celebrations

const winScreen = {
    // Initialize win screen
    init() {
        console.log('Win screen initialized');
    },
    
    // Show win screen with score
    show(finalScore) {
        const winScreenElement = document.getElementById('win-screen');
        const scoreElement = document.getElementById('final-score-win');
        
        if (scoreElement) {
            scoreElement.textContent = finalScore;
        }
        
        if (winScreenElement) {
            winScreenElement.classList.add('active');
        }
        
        this.celebrateWin();
    },
    
    // Hide win screen
    hide() {
        const winScreenElement = document.getElementById('win-screen');
        if (winScreenElement) {
            winScreenElement.classList.remove('active');
        }
    },
    
    // Add celebration effects
    celebrateWin() {
        console.log('🎉 Victory! Garden blooming!');
        
        // You could add particle effects or additional animations here
        // For now, we'll rely on the CSS animations
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => winScreen.init());
} else {
    winScreen.init();
}
