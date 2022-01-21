/**
Exercise 1: Where's Sausage Dog? New Game
Ines Pioselli

In the exercise, the user must click the scary plushy among all the cute plushies
to win the game. They can also click on the other plushies to hear a weird sound.
*/

"use strict";

//constants for the plushy images
const NUM_PLUSHY_IMAGES = 10;
const NUM_PLUSHIES = 200;

let plushyImages = []; //array for the plushy images
let plushies = []; //array for the plushy objects

let scaryPlushyImage; //image for the scary plushy
let scaryPlushy; //scary plushy object

let goodSFX; //sound for when you click on the scary plushy
let badSFX; //sound for when you click the cute plushies

let cuteFont; //font

//images for the backgrounds for all the states
let startBg;
let instructionsBg;
let winBg;

//starting state
let state = `start`;



/**
Preloads all the images for the plushies, the scary plushy and all the backgrounds
*/
function preload() {

  //loads the cute plushies
  for (let i = 0; i < NUM_PLUSHY_IMAGES; i++) {
    let plushyImage = loadImage(`assets/images/plushy${i}.png`);
    plushyImages.push(plushyImage);
  }
  //loads scary plushy image
  scaryPlushyImage = loadImage(`assets/images/scary-plushy.png`);

  //load music
  goodSFX = loadSound(`assets/sounds/good.mp3`);
  badSFX = loadSound(`assets/sounds/bad.mp3`);

  //load font
  cuteFont = loadFont(`assets/fonts/Sunny.otf`);

  //load backgrounds
  startBg = loadImage("assets/images/Start-Bg.png");
  instructionsBg = loadImage("assets/images/Instructions-Bg.png");
  winBg = loadImage("assets/images/Win-Bg.png");

}


/**
Setups the objects for the game
*/
function setup() {
createCanvas(windowWidth, windowHeight);

//create the plushies and randomize location
for(let i = 0; i < NUM_PLUSHIES; i++){
    let x = random(0, width);
    let y = random(0, height);
    let plushyImage = random(plushyImages);
    let plushy = new Plushy(x, y, plushyImage, badSFX);
    plushies.push(plushy);
  }

  //create scary plushy and give it a random spot
  let x = random(0, width);
  let y = random(0, height);
  scaryPlushy = new ScaryPlushy(x, y, scaryPlushyImage, goodSFX);
}



//calls the state change function
function draw() {
  stateChange();
}

//changes all the states
function stateChange() {
  if (state === `start`) {
    start();
  }
  else if (state === `instructions`) {
    instructions();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `win`) {
    win();
  }
}

//function to load the title screen
function start(){
  imageMode(CENTER, CENTER);
  image(startBg, width / 2, height / 2, windowWidth, windowHeight );
  push();
  textFont(cuteFont);
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(255, 255, 255);
  text(`Welcome to the Sanrio Amusement Park!`, width / 2, height - 700);
  textSize(80);
  fill(255, 255, 255);
  text(`Press the spacebar to continue!`, width / 2, height - 500);
  pop();
}

//function to load the instructions for the game
function instructions(){
  image(instructionsBg, width / 2, height / 2, windowWidth, windowHeight );
  push();
  textFont(cuteFont);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 255, 255);
  text(`You work in an amusement park and notice strange activity in the claw machine.`, width / 2, height - 300);
  text(`You must find the scary looking plushy among all the cute ones before anyone see's it.`, width / 2, height - 250);
  textSize(40);
  text(`Press ENTER to continue`, width / 2, height - 150);
  pop();
}

//function for the game
function game(){
  background(255, 204, 227);
  updatePlushies();
  updateScaryPlushy();
}

//function when you finally find the scary plushy
function win(){
  imageMode(CENTER, CENTER);
  image(winBg, width / 2, height / 2, windowWidth, windowHeight );
  push();
  textFont(cuteFont);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 255, 255);
  text(`YAY you cought the scary plushy!`, width / 2, height - 300);
  text(`Press R to restart the game!`, width / 2, height - 200);
  pop();
}


//calls the update method for the plushies
function updatePlushies(){
  for (let i =0; i<plushies.length; i++){ //counting through all the animals in the array
    plushies[i].update();
  }
}

//calls the update method for the scary plushy
function updateScaryPlushy(){
  scaryPlushy.update();
}

//function
function mousePressed() {
  if (state === `game`) { //can only click on the plushies in the game state

    scaryPlushy.mousePressed(); //calls mousePressed method for scaryPlushy

    for (let i = 0; i < plushies.length; i++) {
      plushies[i].mousePressed();  //calls mousePressed method for the plushies
    }
  }
}

//get keyboard input from the user
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 32) { //keycode for spacebar
      state = `instructions`;
    }
  }

  if (state === `instructions`) {
    if (keyCode === 13) { //keycode for enter
      state = `game`;
    }
  }
  
  if (state === `win`) {
    if (keyCode === 82) { //keycode for R
      state = `start`;
    }
  }
}
