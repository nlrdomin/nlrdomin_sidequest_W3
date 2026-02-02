# Matcha Cafe Game

An interactive matcha drink-making game built with p5.js where players create custom matcha drinks and receive ratings from customers.

## 📁 File Structure

```
matcha-cafe-game/
├── index.html          # Main HTML file that loads all scripts
├── style.css           # Styling for the game canvas
├── main.js            # Global variables and game state management
├── start.js           # Start screen with instructions
├── game.js            # Main gameplay and drink building logic
├── win.js             # Win state (4-5 star rating)
├── lose.js            # Lose state (3 stars or below)
└── sketch.js          # Main p5.js sketch coordinator
```

## 🎮 How to Play

1. **Choose a Cup**: Select from Whimsical Cup, Glass Jar, or Plastic Cup
2. **Pick a Syrup**: Choose Earl Grey Syrup, Matcha Puree, or Ube Puree
3. **Select Matcha Powder**: Ceremonial Grade or Hojicha
4. **Add a Topping**: Sweet Cream, Coconut Cream, or Ube Cream
5. **Get Rated**: Customer rates your drink 1-5 stars
6. **Earn Tips**: Your rating = your tip amount in dollars!

## 🏗️ Code Organization

### main.js
- Contains all global variables
- Defines game state ('start', 'game', 'win', 'lose')
- Stores ingredient options with colors
- Manages player selections
- Reset game function

### start.js
- `drawStartScreen()` - Renders the start screen
- `handleStartScreenClick()` - Handles click interactions
- Displays game instructions and title

### game.js
- `drawGameScreen()` - Main game interface
- `drawProgressIndicator()` - Shows current step (1-4)
- `drawOptions()` - Displays ingredient choices
- `drawDrinkPreview()` - Shows drink being built in real-time
- `drawCup()` - Renders different cup styles
- `handleGameScreenClick()` - Manages ingredient selection and progression

### win.js
- `drawWinScreen()` - Victory screen with confetti
- `drawStars()` - Displays star rating
- `drawConfetti()` - Animated celebration particles
- Helper functions to display ingredient names

### lose.js
- `drawLoseScreen()` - Encouragement screen for low ratings
- Shows rating and feedback
- Motivates player to try again

### sketch.js
- Main p5.js `setup()` and `draw()` functions
- Routes to appropriate screen based on `gameState`
- `mousePressed()` - Delegates clicks to correct handler
- `drawButton()` - Utility function used across all screens

## 🎨 Features

- **Interactive Drink Building**: Visual feedback as you add each ingredient
- **Layer Visualization**: See your drink fill up from bottom to top
- **3 Different Cup Styles**: Each with unique visual design
- **Color-Coded Ingredients**: Syrups, matcha, and toppings have distinct colors
- **Dynamic Rating System**: Random customer ratings (3-5 stars)
- **Multiple Game States**: Branching story with win/lose conditions
- **Smooth Transitions**: State management between screens

## 🚀 Running the Game

1. Open `index.html` in a web browser
2. No server required - runs entirely in the browser!
3. All p5.js loaded from CDN

## 📋 Assignment Requirements Met

✅ Multiple game states (start, game, win, lose)
✅ Files organized by function (start.js, game.js, win.js, lose.js, etc.)
✅ Interactive story that branches based on customer rating
✅ Decision tree structure (cup → syrup → matcha → topping → rating)
✅ Clean, organized code in VS Code-friendly structure

## 🎯 Tips for High Ratings

- Experiment with different combinations!
- Each rating is randomly generated (3-5 stars)
- Higher ratings = bigger tips
- Have fun creating unique matcha drinks!

## 🛠️ Technologies Used

- **p5.js** - Creative coding library
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript ES6** - Game logic

Enjoy making matcha drinks! ☕✨
