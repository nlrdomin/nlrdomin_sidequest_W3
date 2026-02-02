// main.js - Main Game Controller
// Manages game state transitions and overall game flow

const game = {
    state: 'START', // START, PLAYING, WIN, LOSE
    score: 0,
    timeLeft: 25,
    timerInterval: null,
    
    // Initialize the game
    init() {
        console.log('Game initialized');
        this.setupEventListeners();
        this.showScreen('START');
    },
    
    // Setup keyboard event listeners
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.state === 'START') {
                if (e.key === 's' || e.key === 'S' || e.key === ' ') {
                    e.preventDefault();
                    this.startGame();
                }
            }
        });
    },
    
    // Start the game
    startGame() {
        console.log('Starting game...');
        this.state = 'PLAYING';
        this.score = 0;
        this.timeLeft = 25;
        
        this.updateScore(0);
        this.updateTimer(25);
        
        this.showScreen('PLAYING');
        
        // Start the timer
        this.startTimer();
        
        // Initialize game logic
        if (typeof gameLogic !== 'undefined') {
            gameLogic.start();
        }
    },
    
    // Start the countdown timer
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer(this.timeLeft);
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    },
    
    // Stop the timer
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },
    
    // Update score display
    updateScore(points) {
        this.score = points;
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    },
    
    // Add points to score
    addScore(points) {
        this.score += points;
        this.updateScore(this.score);
    },
    
    // Update timer display
    updateTimer(seconds) {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = seconds;
        }
    },
    
    // End the game
    endGame() {
        console.log('Game ended with score:', this.score);
        this.stopTimer();
        
        if (typeof gameLogic !== 'undefined') {
            gameLogic.stop();
        }
        
        // Determine win or lose (win if score >= 10)
        if (this.score >= 10) {
            this.state = 'WIN';
            this.showWinScreen();
        } else {
            this.state = 'LOSE';
            this.showLoseScreen();
        }
    },
    
    // Show win screen
    showWinScreen() {
        document.getElementById('final-score-win').textContent = this.score;
        this.showScreen('WIN');
    },
    
    // Show lose screen
    showLoseScreen() {
        document.getElementById('final-score-lose').textContent = this.score;
        this.showScreen('LOSE');
    },
    
    // Restart the game
    restart() {
        console.log('Restarting game...');
        this.state = 'START';
        this.score = 0;
        this.timeLeft = 25;
        this.stopTimer();
        
        if (typeof gameLogic !== 'undefined') {
            gameLogic.reset();
        }
        
        this.showScreen('START');
    },
    
    // Show specific screen
    showScreen(screenName) {
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        // Show the requested screen
        switch(screenName) {
            case 'START':
                document.getElementById('start-screen').classList.add('active');
                document.getElementById('game-container').style.display = 'none';
                break;
            case 'PLAYING':
                document.getElementById('game-container').style.display = 'block';
                break;
            case 'WIN':
                document.getElementById('win-screen').classList.add('active');
                document.getElementById('game-container').style.display = 'none';
                break;
            case 'LOSE':
                document.getElementById('lose-screen').classList.add('active');
                document.getElementById('game-container').style.display = 'none';
                break;
        }
    }
};

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    game.init();
});
