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
  - start state -- √
  - menu -- √
  - backstory -- √
  - gustavo on the tv
  - swim to catch friends
  - meet linguini
  - handpose game
  - ending

*/

"use strict";

//fonts
let disneyFont;
let copperplateFont;

let video = undefined;
let modelName = `HANDPOSE`;
let handpose = undefined;

let predictions = [];




//background images
let startBg;
let menuBg;
let instructionsBg;
let storyBg;
let tvBg;
let kitchenBg;

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
let tomatoImg;
let tomatoes = [];
let numTomatoes = 5;

let numVeggiesImages = 5;
let numVeggies = 30;
let veggieImages = [];
let veggies = [];

let circles = [];
let maxCircles = 400;
let totalCircles = 0;
let circleTimer = 0;
let newCircleDelay = 10;

let spoon = {
  x:0,
  y:0,
  size:100,
  image:undefined,
};

let spoonImg;
let menuSong;
let storySong;
let tvSong;


let storyNarrative = `Once upon a time there was a rat named remi. \n He loved to eat yummy food from the kitchen. \n But one day something terrible happened. Click space to continue`;

let state = `start`;



function preload() {
  //floating veggies
  for (let i = 0; i < numVeggiesImages; i++) {
    let veggieImage = loadImage(`assets/images/veggie${i}.png`);
    veggieImages.push(veggieImage);
  }

  //icons
  spoonImg = loadImage(`assets/images/spoon.png`);

  tomatoImg = loadImage(`assets/images/veggie1.png`);
  //fonts
  disneyFont = loadFont(`assets/fonts/waltograph42.otf`);
  copperplateFont = loadFont(`assets/fonts/Copperplate.otf`);

  //sounds
  menuSong = loadSound(`assets/sounds/Le-Festin.mp3`);
  storySong = loadSound(`assets/sounds/Cast-Of-Cooks.mp3`);
  tvSong = loadSound(`assets/sounds/Granny-Get-Your-Gun.mp3`);

  //background images
  startBg = loadImage(`assets/images/StartBg.gif`);
  menuBg = loadImage(`assets/images/menuBg.png`);
  instructionsBg = loadImage(`assets/images/instructionsBg.png`);
  storyBg = loadImage(`assets/images/storyBg.png`);
  kitchenBg =loadImage(`assets/images/kitchenBg.png`);

  //buttons
  gameButton.image = loadImage(`assets/images/gameButton.png`);
  helpButton.image = loadImage(`assets/images/helpButton.png`);
}


//setup of the canvas
function setup() {
  createCanvas(1280, 720);

  setupVeggies();
  setupFood();

  //circles.push(new Circle01(random(0, width), random(0, height)));

}

function setupFood(){
  for(let i = 0; i<numTomatoes; i++){
    let x = random(0, width);
    let y = random(0, height);
    let ingredient01 = new Food(x, y, tomatoImg);
    tomatoes.push(ingredient01);
  }
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
  // else if(state === `chase`){
  //   chase();
  // }
  else if(state === `loading`){
    loading();
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

  setupCircles();
}

function loading(){
  background(0);

  push();
  textFont(disneyFont);
  fill(255);
  textSize(40);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`LOADING ${modelName} ...`, width / 2, height / 2);
  pop();
}

function tv() {
  imageMode(CENTER, CENTER);
  image(kitchenBg, width / 2, height / 2, 1280, 720);

  if (predictions.length > 0) {
    updatespoon(predictions[0]);

    for (let i = 0; i < numTomatoes; i++) {
      let d = dist(spoon.x, spoon.y, tomatoes[i].x, tomatoes[i].y);
      if (d < tomatoes[i].size / 2) {
        tomatoes[i].y = 0;
        tomatoes[i].x = 0;
      }
      displayspoon();
    }

  }
  updateTomatoes();
}


function updatespoon(prediction) {
  spoon.x = prediction.annotations.indexFinger[3][0];
  spoon.y = prediction.annotations.indexFinger[3][1];
}



function setupCircles(){
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

function updateTomatoes(){
  for(let i = 0; i<numTomatoes; i++){
    let inegredient01 = tomatoes[i];
    tomatoes[i].update();
  }
}

function displayspoon(){
  push();
  imageMode(CENTER, CENTER);
  image(spoonImg, spoon.x, spoon.y, spoon.size, spoon.size);
  pop();

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
  if (state === `menu`) {
    if (d2 < helpButton.size / 2 - 60) {
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
      state = `loading`;
      storySong.stop();
      tvSong.loop();
      tvSong.setVolume(0.05);

      video = createCapture(VIDEO);
      video.hide();
      // Start the Handpose model and switch to our game state when it loads
      handpose = ml5.handpose(video, {
        flipHorizontal: true //flips camera
      }, function() {
        state = `tv` //calls the game state
      });
      // Listen for prediction events from Handpose and store the results in our
      // predictions array when they occur
      handpose.on(`predict`, function(results) {
        predictions = results;
      });
    }
  }
  // if(state === `tv`){
  //   if(keyCode === 13){
  //     state = `chase`;
  //     tvSong.stop();
  //   }
  // }

}
