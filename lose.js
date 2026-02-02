// Lose screen functions
function drawLoseScreen() {
    background(255, 240, 240);
    
    // Title
    fill(229, 115, 115);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('😅 Not Bad! 😅', width / 2, 80);
    
    // Customer feedback
    fill(198, 40, 40);
    textSize(24);
    text('Customer wasn\'t impressed...', width / 2, 140);
    
    // Show rating
    drawStars(width / 2, 200, customerRating);
    
    // Tip amount box
    fill(255, 255, 255, 230);
    stroke(229, 115, 115);
    strokeWeight(3);
    rect(250, 270, 300, 120, 15);
    
    fill(33, 33, 33);
    noStroke();
    textSize(22);
    text('Small Tip:', width / 2, 300);
    
    fill(255, 152, 0);
    textSize(42);
    textStyle(BOLD);
    text('$' + tipAmount + '.00', width / 2, 350);
    
    // Encouragement
    fill(33, 33, 33);
    textStyle(NORMAL);
    textSize(20);
    text('Keep practicing!', width / 2, 420);
    
    textSize(16);
    text('Every matcha master starts somewhere.', width / 2, 450);
    text('Try different combinations next time!', width / 2, 475);
    
    // Your drink combination
    textSize(14);
    fill(100, 100, 100);
    text('You made:', width / 2, 510);
    
    let summary = getCupName(selectedCup) + ' with ' + 
                  getSyrupName(selectedSyrup) + ', ' +
                  getMatchaName(selectedMatcha) + ' & ' +
                  getToppingName(selectedTopping);
    text(summary, width / 2, 530);
    
    // Buttons
    drawButton(150, 560, 200, 50, 'TRY AGAIN', 229, 115, 115);
    drawButton(450, 560, 200, 50, 'MAIN MENU', 100, 149, 237);
}

function handleLoseScreenClick() {
    // Try Again button
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
