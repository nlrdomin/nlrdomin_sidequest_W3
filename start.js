// Start screen functions
function drawStartScreen() {
    background(230, 245, 230);
    
    // Title
    fill(76, 175, 80);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('🍵 Matcha Cafe 🍵', width / 2, 80);
    
    // Subtitle
    fill(56, 142, 60);
    textSize(20);
    textStyle(NORMAL);
    text('Master the Art of Matcha Drinks', width / 2, 140);
    
    // Instructions box
    fill(255, 255, 255, 200);
    stroke(76, 175, 80);
    strokeWeight(3);
    rect(100, 180, 600, 300, 15);
    
    // Instructions
    fill(33, 33, 33);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text('How to Play:', 130, 200);
    
    textSize(16);
    let instructions = [
        '1. Choose a cup for your matcha drink',
        '2. Select a delicious syrup flavor',
        '3. Pick your preferred matcha powder',
        '4. Top it off with a creamy topping',
        '',
        'Your customer will rate your drink!',
        'Higher ratings = Better tips! 💰',
        '',
        'Can you create the perfect matcha drink?'
    ];
    
    let yPos = 240;
    for (let line of instructions) {
        text(line, 130, yPos);
        yPos += 30;
    }
    
    // Start button
    drawButton(width / 2 - 100, 520, 200, 50, 'START GAME', 76, 175, 80);
    
    // Decorative matcha elements
    fill(76, 175, 80, 100);
    noStroke();
    ellipse(50, 50, 40, 40);
    ellipse(750, 100, 50, 50);
    ellipse(100, 550, 30, 30);
    ellipse(700, 520, 45, 45);
}

function handleStartScreenClick() {
    // Check if start button was clicked
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > 520 && mouseY < 570) {
        resetGame();
        changeState('game');
    }
}
