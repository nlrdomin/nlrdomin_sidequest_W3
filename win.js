// Win screen functions
function drawWinScreen() {
    background(230, 255, 230);
    
    // Celebratory background elements
    drawConfetti();
    
    // Title
    fill(76, 175, 80);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('🎉 Great Job! 🎉', width / 2, 80);
    
    // Customer is happy
    fill(56, 142, 60);
    textSize(24);
    text('Your customer loved it!', width / 2, 140);
    
    // Show rating
    drawStars(width / 2, 200, customerRating);
    
    // Tip amount box
    fill(255, 255, 255, 230);
    stroke(76, 175, 80);
    strokeWeight(3);
    rect(250, 270, 300, 120, 15);
    
    fill(33, 33, 33);
    noStroke();
    textSize(22);
    text('Tip Earned:', width / 2, 300);
    
    fill(255, 193, 7);
    textSize(42);
    textStyle(BOLD);
    text('$' + tipAmount + '.00', width / 2, 350);
    
    // Drink summary
    fill(33, 33, 33);
    textStyle(NORMAL);
    textSize(18);
    text('Your Perfect Creation:', width / 2, 420);
    
    textSize(16);
    let summary = [
        getCupName(selectedCup),
        getSyrupName(selectedSyrup),
        getMatchaName(selectedMatcha),
        getToppingName(selectedTopping)
    ];
    
    let yPos = 450;
    for (let item of summary) {
        text('✓ ' + item, width / 2, yPos);
        yPos += 25;
    }
    
    // Buttons
    drawButton(150, 560, 200, 50, 'PLAY AGAIN', 76, 175, 80);
    drawButton(450, 560, 200, 50, 'MAIN MENU', 100, 149, 237);
}

function drawStars(x, y, rating) {
    let starSize = 40;
    let spacing = 50;
    let startX = x - (spacing * 2);
    
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            fill(255, 193, 7);
        } else {
            fill(200, 200, 200);
        }
        noStroke();
        drawStar(startX + (i * spacing), y, starSize / 2, starSize / 4, 5);
    }
}

function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
        let sx = x + cos(a) * radius1;
        let sy = y + sin(a) * radius1;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius2;
        sy = y + sin(a + halfAngle) * radius2;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function drawConfetti() {
    // Animated confetti particles
    for (let i = 0; i < 30; i++) {
        let x = (frameCount * 2 + i * 50) % (width + 100);
        let y = (i * 20 + frameCount) % (height + 50);
        
        fill(random([
            [255, 193, 7],
            [76, 175, 80],
            [156, 39, 176],
            [244, 67, 54],
            [33, 150, 243]
        ]));
        noStroke();
        
        push();
        translate(x, y);
        rotate(frameCount * 0.05 + i);
        rect(0, 0, 10, 10);
        pop();
    }
}

function handleWinScreenClick() {
    // Play Again button
    if (mouseX > 150 && mouseX < 350 && mouseY > 560 && mouseY < 610) {
        resetGame();
        changeState('game');
    }
    
    // Main Menu button
    if (mouseX > 450 && mouseX < 650 && mouseY > 560 && mouseY < 610) {
        resetGame();
        changeState('start');
    }
}

// Helper functions to get names
function getCupName(id) {
    let cup = cups.find(c => c.id === id);
    return cup ? cup.name : '';
}

function getSyrupName(id) {
    let syrup = syrups.find(s => s.id === id);
    return syrup ? syrup.name : '';
}

function getMatchaName(id) {
    let matcha = matchaPowders.find(m => m.id === id);
    return matcha ? matcha.name : '';
}

function getToppingName(id) {
    let topping = toppings.find(t => t.id === id);
    return topping ? topping.name : '';
}
