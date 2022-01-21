/**
Exercise 1: Where's Sausage Dog? New Game
Ines Pioselli

ideas:
- have sanrio plushies
-
Brief:
- change the images
- add start and end screens
- add the ability to restart
- add a countdown timer
- add more visuals to the game (have all animals make random sounds or make dog bark)
*/

"use strict";

const NUM_PLUSHY_IMAGES = 10;
const NUM_PLUSHIES = 200;

let plushyImages = [];
let plushies = [];

let scaryPlushyImage = undefined;
let scaryPlushy = undefined;

let goodSFX;
let badSFX;

let cuteFont;

let startBg;

let state = `start`;


/**
Preloads all the images for the plushies and the scary plush
*/
function preload() {

  for(let i = 0; i < NUM_PLUSHY_IMAGES; i++){
    let plushyImage = loadImage(`assets/images/plushy${i}.png`);
    plushyImages.push(plushyImage);
  }
  scaryPlushyImage = loadImage(`assets/images/scary-plushy.png`);

  //load music
  goodSFX = loadSound(`assets/sounds/good.mp3`);
  badSFX = loadSound(`assets/sounds/bad.mp3`);

  //load font
  cuteFont = loadFont(`assets/fonts/Sunny.otf`);

  //load backgrounds
  startBg = loadImage("assets/images/Start-Bg.png");

}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);

//create the plushies
for(let i = 0; i < NUM_PLUSHIES; i++){
    let x = random(0, width);
    let y = random(0, height);
    let plushyImage = random(plushyImages);
    let plushy = new Plushy(x, y, plushyImage, badSFX);
    plushies.push(plushy);
  }

  let x = random(0, width);
  let y = random(0, height);
  scaryPlushy = new ScaryPlushy(x, y, scaryPlushyImage, goodSFX);
}


/**
Description of draw()
*/
function draw() {

  if(state === `start`){
    start();
  }
  else if(state === `instructions`){
    instructions();
  }
  else if(state === `game`){
    game();
  }
  else if(state === `win`){
    win();
  }
}

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

function instructions(){
  background(0);
  push();
  textFont(cuteFont);
  textAlign(CENTER, CENTER);
  textSize(70);
  fill(255, 255, 255);
  text(`Catch the scary duck`, width / 2, height / 2);
  pop();
}

function game(){
  background(255, 204, 227);
  updatePlushies();
  updateScaryPlushy();

}

function win(){
  background(255);
}

function updatePlushies(){
  for (let i =0; i<plushies.length; i++){ //counting through all the animals in the array
    plushies[i].update();
  }
}

function updateScaryPlushy(){
  scaryPlushy.update();
}


function mousePressed() {
  if (state === `game`) { //can only click on the plushies in the game state

    scaryPlushy.mousePressed();

    for (let i = 0; i < plushies.length; i++) {
      plushies[i].mousePressed();
    }
  }
}

function keyPressed() {
  if (state === `start`) {
    if (keyCode === 32) { //keycode for spacebar
      state = `instructions`;
      badSFX.stop();
      goodSFX.stop();
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
