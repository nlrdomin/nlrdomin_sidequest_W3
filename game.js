// Game screen functions
function drawGameScreen() {
    background(245, 245, 245);
    
    // Header
    fill(76, 175, 80);
    textAlign(CENTER, CENTER);
    textSize(32);
    textStyle(BOLD);
    text('Create Your Matcha Drink', width / 2, 40);
    
    // Progress indicator
    drawProgressIndicator();
    
    // Current step display
    fill(33, 33, 33);
    textSize(24);
    let stepText = '';
    switch(currentStep) {
        case 1: stepText = 'Step 1: Choose Your Cup'; break;
        case 2: stepText = 'Step 2: Select a Syrup'; break;
        case 3: stepText = 'Step 3: Pick Your Matcha'; break;
        case 4: stepText = 'Step 4: Add a Topping'; break;
    }
    text(stepText, width / 2, 100);
    
    // Draw cup preview on the right
    drawDrinkPreview();
    
    // Draw options based on current step
    drawOptions();
}

function drawProgressIndicator() {
    let spacing = 150;
    let startX = width / 2 - (spacing * 1.5);
    let y = 70;
    
    for (let i = 1; i <= 4; i++) {
        if (i < currentStep) {
            fill(76, 175, 80);
        } else if (i === currentStep) {
            fill(129, 199, 132);
        } else {
            fill(200, 200, 200);
        }
        noStroke();
        ellipse(startX + (i - 1) * spacing, y, 30, 30);
        
        fill(255);
        textSize(16);
        text(i, startX + (i - 1) * spacing, y);
    }
}

function drawOptions() {
    let options = [];
    let yStart = 150;
    let spacing = 100;
    
    switch(currentStep) {
        case 1:
            options = cups;
            break;
        case 2:
            options = syrups;
            break;
        case 3:
            options = matchaPowders;
            break;
        case 4:
            options = toppings;
            break;
    }
    
    // Draw option buttons
    for (let i = 0; i < options.length; i++) {
        let x = 80;
        let y = yStart + (i * spacing);
        let w = 300;
        let h = 70;
        
        // Check if this option is selected
        let isSelected = false;
        switch(currentStep) {
            case 1: isSelected = selectedCup === options[i].id; break;
            case 2: isSelected = selectedSyrup === options[i].id; break;
            case 3: isSelected = selectedMatcha === options[i].id; break;
            case 4: isSelected = selectedTopping === options[i].id; break;
        }
        
        // Draw button
        if (isSelected) {
            fill(76, 175, 80);
        } else if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
            fill(200, 230, 201);
        } else {
            fill(255);
        }
        
        stroke(76, 175, 80);
        strokeWeight(3);
        rect(x, y, w, h, 10);
        
        // Draw color swatch if applicable
        if (options[i].color) {
            fill(options[i].color);
            noStroke();
            ellipse(x + 30, y + h / 2, 30, 30);
        }
        
        // Draw text
        fill(33, 33, 33);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(18);
        text(options[i].name, x + 60, y + h / 2);
    }
    
    // Draw next/confirm button if selection is made
    if ((currentStep === 1 && selectedCup) ||
        (currentStep === 2 && selectedSyrup) ||
        (currentStep === 3 && selectedMatcha) ||
        (currentStep === 4 && selectedTopping)) {
        
        let buttonText = currentStep === 4 ? 'SERVE DRINK' : 'NEXT';
        drawButton(80, 500, 300, 50, buttonText, 76, 175, 80);
    }
}

function drawDrinkPreview() {
    // Background for preview
    fill(255, 255, 255, 230);
    stroke(76, 175, 80);
    strokeWeight(3);
    rect(450, 130, 300, 400, 15);
    
    fill(33, 33, 33);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Your Drink', 600, 155);
    
    // Draw the glass/cup at center
    let glassX = 600;
    let glassY = 350;
    
    // Draw cup based on selection
    if (selectedCup) {
        drawCup(glassX, glassY, selectedCup);
    } else {
        // Empty glass outline
        stroke(150);
        strokeWeight(2);
        noFill();
        rect(glassX - 50, glassY - 60, 100, 120, 5);
    }
    
    // Fill the glass from bottom to top with layers
    let fillY = glassY + 50;
    let layerHeight = 30;
    
    // Syrup layer (bottom)
    if (selectedSyrup) {
        let syrup = syrups.find(s => s.id === selectedSyrup);
        fill(syrup.color);
        noStroke();
        rect(glassX - 45, fillY - layerHeight, 90, layerHeight, 0, 0, 5, 5);
        fillY -= layerHeight;
    }
    
    // Matcha layer (middle)
    if (selectedMatcha) {
        let matcha = matchaPowders.find(m => m.id === selectedMatcha);
        fill(matcha.color);
        noStroke();
        rect(glassX - 45, fillY - layerHeight, 90, layerHeight);
        fillY -= layerHeight;
    }
    
    // Topping layer (top)
    if (selectedTopping) {
        let topping = toppings.find(t => t.id === selectedTopping);
        fill(topping.color);
        noStroke();
        rect(glassX - 45, fillY - layerHeight, 90, layerHeight, 5, 5, 0, 0);
    }
}

function drawCup(x, y, cupType) {
    stroke(100);
    strokeWeight(3);
    fill(255, 255, 255, 100);
    
    switch(cupType) {
        case 'whimsical':
            // Curved whimsical cup
            beginShape();
            vertex(x - 50, y + 60);
            bezierVertex(x - 55, y, x - 30, y - 60, x, y - 60);
            bezierVertex(x + 30, y - 60, x + 55, y, x + 50, y + 60);
            vertex(x - 50, y + 60);
            endShape(CLOSE);
            // Handle
            noFill();
            arc(x + 60, y, 40, 50, -HALF_PI, HALF_PI);
            break;
            
        case 'jar':
            // Mason jar style
            rect(x - 50, y - 60, 100, 120, 5);
            // Lid threads
            stroke(100);
            line(x - 50, y - 50, x + 50, y - 50);
            line(x - 50, y - 40, x + 50, y - 40);
            break;
            
        case 'plastic':
            // Simple plastic cup (trapezoid)
            quad(x - 45, y - 60, x + 45, y - 60, x + 50, y + 60, x - 50, y + 60);
            // Lid
            ellipse(x, y - 60, 90, 20);
            break;
    }
}

function handleGameScreenClick() {
    let options = [];
    let yStart = 150;
    let spacing = 100;
    
    switch(currentStep) {
        case 1: options = cups; break;
        case 2: options = syrups; break;
        case 3: options = matchaPowders; break;
        case 4: options = toppings; break;
    }
    
    // Check option clicks
    for (let i = 0; i < options.length; i++) {
        let x = 80;
        let y = yStart + (i * spacing);
        let w = 300;
        let h = 70;
        
        if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
            switch(currentStep) {
                case 1: selectedCup = options[i].id; break;
                case 2: selectedSyrup = options[i].id; break;
                case 3: selectedMatcha = options[i].id; break;
                case 4: selectedTopping = options[i].id; break;
            }
            return;
        }
    }
    
    // Check next/serve button
    if (mouseX > 80 && mouseX < 380 && mouseY > 500 && mouseY < 550) {
        if (currentStep === 1 && selectedCup) {
            currentStep = 2;
        } else if (currentStep === 2 && selectedSyrup) {
            currentStep = 3;
        } else if (currentStep === 3 && selectedMatcha) {
            currentStep = 4;
        } else if (currentStep === 4 && selectedTopping) {
            // Generate random rating (1-5 stars)
            customerRating = floor(random(3, 6)); // 3-5 stars for better gameplay
            tipAmount = customerRating;
            
            // Determine win or lose
            if (customerRating >= 4) {
                changeState('win');
            } else {
                changeState('lose');
            }
        }
    }
}
