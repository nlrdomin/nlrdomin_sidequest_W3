// Global game state and variables
let gameState = 'start'; // 'start', 'game', 'win', 'lose'

// Player selections
let selectedCup = null;
let selectedSyrup = null;
let selectedMatcha = null;
let selectedTopping = null;

// Game progress
let currentStep = 1; // 1: cup, 2: syrup, 3: matcha, 4: topping
let customerRating = 0;
let tipAmount = 0;

// Cup options
const cups = [
    { name: 'Whimsical Cup', id: 'whimsical' },
    { name: 'Glass Jar', id: 'jar' },
    { name: 'Plastic Cup', id: 'plastic' }
];

// Syrup options with colors
const syrups = [
    { name: 'Earl Grey Syrup', id: 'earlgrey', color: '#8B7355' },
    { name: 'Matcha Puree', id: 'matcha', color: '#7CB342' },
    { name: 'Ube Puree', id: 'ube', color: '#9575CD' }
];

// Matcha powder options
const matchaPowders = [
    { name: 'Ceremonial Grade', id: 'ceremonial', color: '#6B8E23' },
    { name: 'Hojicha', id: 'hojicha', color: '#A0522D' }
];

// Topping options
const toppings = [
    { name: 'Sweet Cream', id: 'sweet', color: '#FFF8DC' },
    { name: 'Coconut Cream', id: 'coconut', color: '#FFFAF0' },
    { name: 'Ube Cream', id: 'ubecream', color: '#E1BEE7' }
];

// Reset game function
function resetGame() {
    selectedCup = null;
    selectedSyrup = null;
    selectedMatcha = null;
    selectedTopping = null;
    currentStep = 1;
    customerRating = 0;
    tipAmount = 0;
}

// Change game state
function changeState(newState) {
    gameState = newState;
}
