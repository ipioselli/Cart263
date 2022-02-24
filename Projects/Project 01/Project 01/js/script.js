/**
Project 01
Ines Pioselli

Requirements:
- must be interactive
- must use p5 √
- must use one other library
- must include an artist statement of 300 words

Ratatouille simulator
ideas:
  - chase remi with the broom
  - remi runs away from mouse traps
  - object identification to make meal
  - say ingredients with annyang to get 5 stars
  - pick up the ingredients in the kitchen without getting caught
  - responsive voice read the story at the beginning
*/

"use strict";

//fonts
let disneyFont;
let copperplateFont;

//background images
let startBg;
let menuBg;
let instructionsBg;
let storyBg;
let tvBg;

let gameButton = { // button to access the game state
  x: 1280/2,
  y: 720/2 + 120,
  size: 50,
  maxSize: 400,
  minSize: 300,

};

let helpButton = { // button to access the instructions state
  x: 1280/2,
  y: 720/2 + 220,
  size: 50,
  maxSize: 400,
  minSize: 300,

};

let numVeggiesImages = 5;
let numVeggies = 30;
let veggieImages = [];
let veggies = [];

let circles = [];
let maxCircles = 400;
let totalCircles = 0;
let circleTimer = 0;
let newCircleDelay = 10;


let menuSong;
let storySong;


let storyNarrative = `Once upon a time there was a rat named remi. \n He loved to eat yummy food from the kitchen. \n But one day something terrible happened. Click space to continue`;

let state = `start`;



function preload() {
  //floating veggies
  for (let i = 0; i < numVeggiesImages; i++) {
    let veggieImage = loadImage(`assets/images/veggie${i}.png`);
    veggieImages.push(veggieImage);
  }
  //fonts
  disneyFont = loadFont(`assets/fonts/waltograph42.otf`);
  copperplateFont = loadFont(`assets/fonts/Copperplate.otf`);

  //sounds
  menuSong = loadSound(`assets/sounds/Le-Festin.mp3`);
  storySong = loadSound(`assets/sounds/Cast-Of-Cooks.mp3`);

  //background images
  startBg = loadImage(`assets/images/StartBg.gif`);
  menuBg = loadImage(`assets/images/menuBg.png`);
  instructionsBg = loadImage(`assets/images/instructionsBg.png`);
  storyBg = loadImage(`assets/images/storyBg.png`);

  //buttons
  gameButton.image = loadImage(`assets/images/gameButton.png`);
  helpButton.image = loadImage(`assets/images/helpButton.png`);
}


//setup of the canvas
function setup() {
  createCanvas(1280, 720);

  setupVeggies();

  //circles.push(new Circle01(random(0, width), random(0, height)));

}

function setupVeggies(){
  for(let i = 0; i < numVeggies; i++){
      let x = random(0, width);
      let y = random(0, height);
      let veggieImage = random(veggieImages);
      let veggie = new Veggies(x, y, veggieImage);
      veggies.push(veggie);
    }
}

//calls changeState function to switch from state to state
function draw() {

changeState();
}


function changeState(){
  if (state === `start`){
    start();
  }
  else if(state === `menu`){
    menu();
  }
  else if(state === `instructions`){
    instructions();
  }
  else if(state === `story`){
    story();
  }
  else if(state === `tv`){
    tv();
  }
}


function start(){
  imageMode(CENTER, CENTER);
  image(startBg, width/2 , height/2, 1280, 720);

  push();
  textAlign(CENTER, CENTER);
  textFont(disneyFont);
  fill(255);
  textSize(50);
  text(`ENTER to begin`, width/2, height/2-300);
  pop();

  updateVeggies();
}

function menu(){
  imageMode(CENTER, CENTER);
  image(menuBg, width/2 , height/2, 1280, 720);

  buttonGame();
  buttonInstructions();
  mouseOver();
}

function instructions(){

  imageMode(CENTER, CENTER);
  image(instructionsBg, width/2 , height/2, 1280, 720);

  push();
  textAlign(CENTER, CENTER);
  textFont(copperplateFont);
  textSize(30);
  fill(0);
  text(`A Night at the Movies`, width/2, height/2);
  textSize(20);
  text(`Follow the story of the lil rat chef, Remi \n and learn about his adventures in Paris`, width/2, height/2 +100);
  textSize(30);
  textFont(disneyFont);
  text(`press BACK to go to the menu`, width/2, height/2 + 200);
  pop();
}




function story(){
  imageMode(CENTER, CENTER);
  image(storyBg, width/2 , height/2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  fill(255);
  textFont(copperplateFont);
  textSize(30);
  text(`click the screen for a surprise`, width/2, height/2 -250);
  pop();

  circleTimer++;
  totalCircles++;
  if(totalCircles <= maxCircles){
    if(circleTimer >= newCircleDelay){
        circles.push(new Circle01(random(0, width), random(0, height)));
        circles.push(new Circle02(random(0, width), random(0, height)));
      circleTimer = 0;
    }
  }


  for(let i =0; i<circles.length; i ++){
    let circle = circles[i];
    circle.display();
    circle.fadeAnimation();
  }
}

function updateVeggies(){
  for(let i=0; i<veggies.length; i++){
    let veggie = veggies[i];
    veggies[i].update();
  }
}

function buttonGame(){
  imageMode(CENTER, CENTER);
  image(gameButton.image, gameButton.x, gameButton.y, gameButton.size, gameButton.size);
}

function buttonInstructions(){
  imageMode(CENTER, CENTER);
  image(helpButton.image, helpButton.x, helpButton.y, helpButton.size, helpButton.size);

}

//hovering over button effect
function mouseOver(){
  let d = dist(mouseX, mouseY, gameButton.x, gameButton.y);
  if (state === `menu`) {
    if (d < gameButton.size / 2 - 120) { // -60 is added so the mouse only clicks on the button and not dead space around it
      gameButton.size = gameButton.size + 20;
      if(gameButton.size > gameButton.maxSize){
        gameButton.size = gameButton.maxSize;
      }

    }
    else (gameButton.size = gameButton.minSize);
  }

  let d2 = dist(mouseX, mouseY, helpButton.x, helpButton.y);
  if(state === `menu`){
    if( d2 < helpButton.size/2  - 120){
      helpButton.size = helpButton.size + 20;
      if(helpButton.size > helpButton.maxSize){
        helpButton.size = helpButton.maxSize;
      }
    }
    else (helpButton.size = helpButton.minSize);
  }
}


function mousePressed() {

  if(state === `story`){
    responsiveVoice.speak(storyNarrative, "French Female");
  }


  let d = dist(mouseX, mouseY, gameButton.x, gameButton.y);
  if (state === `menu`) {
    if (d < gameButton.size / 2 - 60) { // -60 is added so the mouse only clicks on the button and not dead space around it
      state = `story`;
      menuSong.stop();
      storySong.loop();
      storySong.setVolume(0.05);
    }
  }

  let d2 = dist(mouseX, mouseY, helpButton.x, helpButton.y);
  if(state === `menu`){
    if(d2 < helpButton.size /2 - 60){
      state = `instructions`;
    }
  }


}



function keyPressed(){

  if(state === `start`){
    if(keyCode === 13){ //keycode for ENTER
      state = `menu`;
      menuSong.play();
    }
  }
  if(state === `instructions`){
    if(keyCode === 8) {//keycode for backspace
      state = `menu`;
    }
  }

  if(state === `story`){
    if(keyCode === 32){
      state = `tv`;
    }
  }

}
