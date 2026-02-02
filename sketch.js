// Main p5.js sketch file
function setup() {
    let canvas = createCanvas(800, 650);
    canvas.parent('game-container');
    textFont('Arial');
}

function draw() {
    // Route to appropriate screen based on game state
    switch(gameState) {
        case 'start':
            drawStartScreen();
            break;
        case 'game':
            drawGameScreen();
            break;
        case 'win':
            drawWinScreen();
            break;
        case 'lose':
            drawLoseScreen();
            break;
    }
}

function mousePressed() {
    // Route clicks to appropriate handler
    switch(gameState) {
        case 'start':
            handleStartScreenClick();
            break;
        case 'game':
            handleGameScreenClick();
            break;
        case 'win':
            handleWinScreenClick();
            break;
        case 'lose':
            handleLoseScreenClick();
            break;
    }
}

// Utility function to draw buttons (used across all screens)
function drawButton(x, y, w, h, label, r, g, b) {
    // Check if mouse is hovering
    let isHovering = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    
    // Draw button background
    if (isHovering) {
        fill(r + 30, g + 30, b + 30);
    } else {
        fill(r, g, b);
    }
    
    stroke(r - 20, g - 20, b - 20);
    strokeWeight(3);
    rect(x, y, w, h, 10);
    
    // Draw button text
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    textStyle(BOLD);
    text(label, x + w / 2, y + h / 2);
}
