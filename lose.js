// lose.js - Lose Screen Controller
// Handles the lose screen state and feedback

const loseScreen = {
    // Initialize lose screen
    init() {
        console.log('Lose screen initialized');
    },
    
    // Show lose screen with score
    show(finalScore) {
        const loseScreenElement = document.getElementById('lose-screen');
        const scoreElement = document.getElementById('final-score-lose');
        
        if (scoreElement) {
            scoreElement.textContent = finalScore;
        }
        
        if (loseScreenElement) {
            loseScreenElement.classList.add('active');
        }
        
        this.provideFeedback(finalScore);
    },
    
    // Hide lose screen
    hide() {
        const loseScreenElement = document.getElementById('lose-screen');
        if (loseScreenElement) {
            loseScreenElement.classList.remove('active');
        }
    },
    
    // Provide feedback based on score
    provideFeedback(score) {
        let message = '';
        
        if (score === 0) {
            message = 'The flowers drifted past like dreams...';
        } else if (score < 5) {
            message = 'A few petals caught, many more to gather';
        } else {
            message = 'So close to a blooming garden!';
        }
        
        console.log(`💐 Game Over - ${message}`);
        
        // Update message if you want dynamic feedback
        const messageElement = document.querySelector('#lose-screen .result-message');
        if (messageElement && score < 10) {
            // Keep default message or update based on score
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loseScreen.init());
} else {
    loseScreen.init();
}
