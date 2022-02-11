/**
Exercise 4: Bubble popper
Ines Pioselli

Brief:
- count the bubbles that have been popped √
- improve visuals and add sound effects (sound when popped) √
- add states: title, loading and ending √
- make it harder to pop the bubble over time √

Game:

Inspired by neon genesis evangelion. The user must kill the angel with the red pin.
There are seven angels to kill and you have 5 seconds to kill them all. Each time you
kill one angel, the speed gets faster and the angel gets smaller. After you win or lose
you can restart the game.

I wanted to include an image for the pin but it lagged way too much T-T

*/

"use strict";

let state = `start`; //start state

let video = undefined; //user's webcame
let modelName = `HANDPOSE`; //name of the model
let handpose = undefined;// handpose object

let predictions = []; //array of predictions made by handpose

let angel; // angel to kill

//pin that stabs the angel
let pin = {
  tip: {
    x: undefined,
    y: undefined
  },
  head: {
    x: undefined,
    y: undefined,
    size: 20
  }
};

let angelKillSFX; //sfx for when you stab the angel
let instructionsSong; //song for the instructions state

//image background variables
let startBg;
let instructionsBg;
let gameBg;
let winBg;
let loseBg;

//angel image
let angelImg;

//variables for counter
let angelsKilled = 0; //number of angels killed
let maxAngelsKilled = 7; //lucky angel number

//variables for the counter
let timer = 5000; //5 seconds
let timerDone = false;

let titleFont; //main font


//loads all the assets for this project
function preload() {

  //loads background images
  startBg = loadImage(`assets/images/startBg.png`);
  instructionsBg = loadImage(`assets/images/instructionsBg.png`);
  gameBg = loadImage(`assets/images/gameBg.png`);
  loseBg = loadImage(`assets/images/loseBg.png`);

  //fonts
  titleFont = loadFont(`assets/fonts/bodoni-mt-5.otf`);

  //angel
  angelImg = loadImage(`assets/images/angel.png`);

  //sounds
  angelKillSFX = loadSound(`assets/sounds/kill.mp3`);
  instructionsSong = loadSound(`assets/sounds/win.mp3`);
}


function setup() {
  createCanvas(640, 480);//canvas

  //variables for the angel
  angel = {
    x: random(width),
    y: height,
    size: 150,
    vx: 0,
    vy: -3,
  }
}

//calls the function the change states
function draw() {
  changeState();
}

//function to change all the states
function changeState() {
  if (state === `start`) {
    start();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `loading`) {
    loading();
  } else if (state === `game`) {
    game();
  } else if (state === `win`) {
    win();
  } else if (state === `lose`) {
    lose();
  }
}

//start state
function start() {
  imageMode(CENTER, CENTER);
  image(startBg, width / 2, height / 2, 640, 480);
  push();
  textSize(50);
  textAlign(CENTER, CENTER);
  textFont(titleFont);
  fill(255, 255, 255);
  text(`DEFEAT THE ANGELS`, width / 2, height / 2 - 100);
  textSize(30);
  text(`Press ENTER to start`, width / 2, height / 2 - 50);
  pop();
}

//instructions state
function instructions() {
  imageMode(CENTER, CENTER);
  image(instructionsBg, width / 2, height / 2, 640, 480);
  push();
  fill(255);
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(`INSTRUCTIONS`, width / 2, height / 2 - 200);
  text(`1. Place your index in front of the camera and stab \n the angel with the pin. \n 2. Kill 7 angels to win the game \n 3. If you take too long you lose.`, width / 2, height / 2 - 100);

  textSize(20);
  text(`Press SPACEBAR to continue`, width / 2, height / 2);
  pop();

  sparkles(); //adds sparkle effects
}

//loading state
function loading() {
  background(0);

  // Start the Handpose model and switch to our game state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true //flips camera
  }, function() {
    state = `game` //calls the game state
  });
  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  //text
  push();
  textFont(titleFont);
  fill(255);
  textSize(40);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`LOADING ${modelName} ...`, width / 2, height / 2);
  pop();

}

//game state
function game() {
  //background image
  imageMode(CENTER, CENTER);
  image(gameBg, width / 2, height / 2, 640, 480)

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // If yes, then get the positions of the tip and base of the index finger
    updatepin(predictions[0]);

    //check if the tip of the pin is touching the angel
    let d = dist(pin.tip.x, pin.tip.y, angel.x, angel.y);
    if (d < angel.size / 2) {
      angelKillSFX.play(); //plays the sfx
      angelsKilled++; //counter goes up by 1
      angel.vy = angel.vy - 2; //speeds up by 2 everytime you hit it
      angel.size = angel.size - 5; //gets smaller by 5px whenever you hit it

      resetAngel(); //resets angel position
    }
    displaypin(); //displays the pin
  }

  checkScore(); //calls function to check the score
  checkTimer(); //calls function to check the timer
  moveAngel(); //function to move the angel
  checkOutofBounds(); //check if the angel is outside of the canvas
  displayAngel(); //displays the angel
  displayScore(); //displays the score
  displayTimer(); //displays the timer
}

//function for the win state
function win() {
  background(0);

  push();
  fill(255);
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(`YAY YOU DEFEATED THE ANGELS`, width/2, height/2 -100);
  textSize(30);
  text(`Press R to restart the game`, width/2, height/2 );
  pop();

  sparkles(); //sparkle effects
  resetGame(); //resets the game variables after reloading
}

//function for the lose state
function lose(){
  //background image
  imageMode(CENTER, CENTER);
  image(loseBg, width/2, height/2, 640, 480);
  //text
  push();
  fill(255);
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(`RIP THE WORLD ENDED`, width/2, height/2 +50);
  textSize(30);
  text(`Press R to restart the game`, width/2, height/2 +100 );
  pop();

}

//function to check the score
function checkScore() {
  if (angelsKilled === maxAngelsKilled) {
    state = `win`; //if the score = 7 win state is called
  }
}

//calls the lose state once the timer is over
function checkTimer() {
  timer -= 1; //timer goes down by 1
  if (timer <= 0) {
    timer = true; //changes timer to true when it reaches 0
  }
  
  if (timerDone) {
    state = `lose`; //calls the lose state once its true
  }
}

//function to add sparkling effect
function sparkles() {
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}

//Updates the position of the pin according to the latest prediction
function updatepin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

//resets angel position
function resetAngel() {
  angel.x = random(width);
  angel.y = height;
}

//resets angel velocity
function moveAngel() {
  angel.x += angel.vx;
  angel.y += angel.vy;
}

//checks if the angel is off the canvas
function checkOutofBounds() {
  if (angel.y < 0) {
    resetAngel();
  }
}

//reset game variables
function resetGame(){
  angelsKilled = 0;
  timer = 5000;
}

//displays the angel with an image
function displayAngel() {
  imageMode(CENTER, CENTER);
  image(angelImg, angel.x, angel.y, angel.size, angel.size);

}

//function to display the pin
function displaypin() {
  //pin tip
  push();
  stroke(255, 0, 0);
  strokeWeight(4);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();

  //pin head
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}

//displays the score
function displayScore() {
  push();
  textSize(50);
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  text(`SCORE: ${angelsKilled}`, width / 2 - 200, height / 2 - 200);
  pop();
}

//displays the timer
function displayTimer() {
  push();
  textSize(50);
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  text(`TIMER: ${timer}`, width / 2 + 200, height / 2 - 200);
  pop();
}

//handles keyboard input
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //keycode for enter
      state = `instructions`;
      instructionsSong.play();
    }
  }
  if (state === `instructions`) {
    if (keyCode === 32) { //keycode for spacebar
      state = `loading`;
      instructionsSong.stop();
      video = createCapture(VIDEO);
      video.hide();
    }
  }
  if(state === `win`){
    if(keyCode === 82){ //keycode for R
      state = `start`;
    }
  }
  if(state === `lose`){
    if(keyCode === 82){ //keycode for R
      state = `start`;
    }
  }
}
