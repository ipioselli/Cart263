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
  - make ingredients green when they have been added to the pot
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

let tvKnob = {
  x: 1280/2 + 300,
  y: 720/2 - 150,
  size: 50,
  maxSize: 250,
  minSize: 200,
}

let cookingTimer = 10000;
let  cookingTimerDone = false;

let cookingTimerDelay = 100;
let cookingTimerDelayDone = false;

let poison;
let poisonImg;
let poisonCaught = 0;
let maxPoison = 1;

let tomatoImg;
let tomatoes = [];
let numTomatoes = 5;
let tomatoesInPot = 0;
let maxTomatoesInPot = 1;
let tomatoIsReady = false;
let tomatoRatio = ` /5`;

let zucchiniImg;
let zucchinis = [];
let numZucchinis = 5;
let maxZucchinisInPot = 1;
let zucchinisInPot = 0;
let zucchiniIsReady = false;
let zucchiniRatio = ` /5`;

let pepperImg;
let peppers = [];
let numPeppers = 5;
let peppersInPot = 0;
let maxPeppersInPot = 1;
let pepperIsReady = false;
let pepperRatio = ` /5`;

let eggplantImg;
let eggplants = [];
let numEggplants = 5;
let eggplantsInPot = 0;
let maxEggplantsInPot = 1;
let eggplantIsReady = false;
let eggplantRatio = ` /5`;

let squashImg;
let squashes = [];
let numSquashes = 5;
let squashesInPot = 0;
let maxSquashesInPot = 1;
let squashIsReady = false;
let squashRatio = ` /5`;

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
  size:200,
  image:undefined,
};

let spoonImg;

//songs
let menuSong;
let storySong;
let tvSong;
let chaseSong;
let cookingSong;

let storyNarrative = `Once upon a time there was a rat named remi. \n He loved to eat yummy food from the kitchen. \n But one day something terrible happened. Click space to continue`;

let storyNarrative02 = `He always snuck into the kitchen to watch Gustavo the chef on the tv. He wanted to become just like him. Sadly, he got caught and was chased
out of the house.`;

let state = `start`;



function preload() {

  //floating veggies at the start state
  for (let i = 0; i < numVeggiesImages; i++) {
    let veggieImage = loadImage(`assets/images/veggie${i}.png`);
    veggieImages.push(veggieImage);
  }

  //icons
  spoonImg = loadImage(`assets/images/spoon.png`);

  poisonImg = loadImage(`assets/images/poison.png`);

  //ratatouille ingredients
  tomatoImg = loadImage(`assets/images/veggie1.png`);
  zucchiniImg = loadImage(`assets/images/veggie3.png`);
  pepperImg = loadImage(`assets/images/veggie4.png`);
  eggplantImg = loadImage(`assets/images/veggie0.png`);
  squashImg = loadImage(`assets/images/veggie2.png`);

  //fonts
  disneyFont = loadFont(`assets/fonts/waltograph42.otf`);
  copperplateFont = loadFont(`assets/fonts/Copperplate.otf`);

  //sounds
  menuSong = loadSound(`assets/sounds/Le-Festin.mp3`);
  storySong = loadSound(`assets/sounds/Cast-Of-Cooks.mp3`);
  tvSong = loadSound(`assets/sounds/A-Real-Gourmet-Kitchen.mp3`);
  chaseSong = loadSound(`assets/sounds/Granny-Get-Your-Gun.mp3`);
  cookingSong = loadSound(`assets/sounds/Special-Order.mp3`);

  //background images
  startBg = loadImage(`assets/images/StartBg.gif`);
  menuBg = loadImage(`assets/images/menuBg.png`);
  instructionsBg = loadImage(`assets/images/instructionsBg.png`);
  storyBg = loadImage(`assets/images/storyBg.png`);
  kitchenBg =loadImage(`assets/images/kitchenBg.png`);
  tvBg = loadImage(`assets/images/tvBg.png`);

  //buttons
  gameButton.image = loadImage(`assets/images/gameButton.png`);
  helpButton.image = loadImage(`assets/images/helpButton.png`);
  tvKnob.image = loadImage(`assets/images/knob.png`);
}


//setup of the canvas
function setup() {
  createCanvas(1280, 720);

  setupVeggies();
  setupTomato();
  setupZucchini();
  setupPepper();
  setupSquash();
  setupEggplant();
  setupPoison();

}

function setupPoison(){
  let x = random(0, width);
  let y = random(0, height);
  poison = new Food(x, y, poisonImg);
}

function setupTomato(){
  for(let i = 0; i<numTomatoes; i++){
    let x = random(0, width);
    let y = random(0, height);
    let ingredient01 = new Food(x, y, tomatoImg);
    tomatoes.push(ingredient01);
  }
}

function setupZucchini(){
  for(let i = 0; i<numZucchinis; i++){
    let x = random(0, width);
    let y = random(0, height);
    let ingredient02 = new Food(x, y, zucchiniImg);
    zucchinis.push(ingredient02);
  }
}

function setupPepper(){
  for(let i = 0; i<numPeppers; i++){
    let x = random(0, width);
    let y = random(0, height);
    let ingredient03 = new Food(x, y, pepperImg);
    peppers.push(ingredient03);
  }
}

function setupEggplant(){
  for(let i =0; i<numEggplants; i++){
    let x = random(0, width);
    let y = random(0, height);
    let ingredient04 = new Food(x, y, eggplantImg);
    eggplants.push(ingredient04);
  }
}

function setupSquash(){
  for(let i =0; i<numSquashes; i++){
    let x = random(0, width);
    let y = random(0, height);
    let ingredient05 = new Food(x, y, squashImg);
    squashes.push(ingredient05);
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

function setupHandpose(){
  video = createCapture(VIDEO);
  video.hide();
  // Start the Handpose model and switch to our game state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true //flips camera
  }, function() {
    state = `cookingGame` //calls the game state
  });
  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });
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
  else if(state === `cookingGame`){
    cookingGame();
  }
  // else if(state === `chase`){
  //   chase();
  // }
  else if(state === `loading`){
    loading();
  }
  else if(state === `goodCook`){
    goodCook();
  }
  else if(state === `badCook`){
    badCook();
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

function tv(){
  imageMode(CENTER, CENTER);
  image(tvBg, width/2, height/2, 1280, 720);

  push();
  textFont(copperplateFont);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30)
  text(`click the TV knob`, width/2, height/2 - 320);
  pop();

  mouseOver();
  tvButton();
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


function cookingGame() {
  imageMode(CENTER, CENTER);
  image(kitchenBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(copperplateFont);
  textSize(30);
  text(`Make Ratatouille with remi`, width/2, height/2-300);
  pop();


  if (predictions.length > 0) {
    updatespoon(predictions[0]);

    overlapTomatoes();
    overlapZucchinis();
    overlapPeppers();
    overlapEggplants();
    overlapSquashes();
    overlapPoison();

  }
  displayspoon();


  updateTomatoes();
  updateZucchinis();
  updatePeppers();
  updateEggplants();
  updateSquashes();
  updatePoison();
  checkTimer();
  checkScore();
  recipeDone();
  displayScore();
  displayCookingTimer();
}

function badCook(){
  background(0, 255, 0);
}



function goodCook(){
  background(255, 0, 0);
}

function overlapPoison(){
  let d6 = dist(spoon.x, spoon.y, poison.x, poison.y);
  if(d6 < poison.size /2){
    if(poisonCaught < maxPoison){
        state = `badCook`;
    }

  }
}


function overlapTomatoes() {

  for (let i = 0; i < numTomatoes; i++) {
    let d = dist(spoon.x, spoon.y, tomatoes[i].x, tomatoes[i].y);
    if (d < tomatoes[i].size / 2) {
      if (tomatoesInPot < maxTomatoesInPot) {
        tomatoes[i].addedInPot(915, 450, 250, 250);
        tomatoesInPot++;
      }
    }
  }
}

function overlapZucchinis(){
  for (let i = 0; i<numZucchinis; i++){
    let d2 = dist(spoon.x, spoon.y, zucchinis[i].x, zucchinis[i].y);
    if(d2 < zucchinis[i].size /2){
      if(zucchinisInPot < maxZucchinisInPot && !zucchinis[i].added){
        zucchinis[i].addedInPot(915, 450, 250, 250);
        zucchinisInPot++;
      }
    }
  }
}

function overlapPeppers() {

  for (let i = 0; i < numPeppers; i++) {
    let d3 = dist(spoon.x, spoon.y, peppers[i].x, peppers[i].y);
    if (d3 < peppers[i].size / 2) {
      if (peppersInPot < maxPeppersInPot) {
        peppers[i].addedInPot(915, 450, 250, 250);
        peppersInPot++;
      }
    }
  }
}

function overlapEggplants() {

  for (let i = 0; i < numEggplants; i++) {
    let d4 = dist(spoon.x, spoon.y, eggplants[i].x, eggplants[i].y);
    if (d4 < eggplants[i].size / 2) {
      if (eggplantsInPot < maxEggplantsInPot) {
        eggplants[i].addedInPot(915, 450, 250, 250);
        eggplantsInPot++;
      }
    }
  }
}

function overlapSquashes() {

  for (let i = 0; i < numSquashes; i++) {
    let d5 = dist(spoon.x, spoon.y, squashes[i].x, squashes[i].y);
    if (d5 < squashes[i].size / 2) {
      if (squashesInPot < maxSquashesInPot) {
        squashes[i].addedInPot(915, 450, 250, 250);
        squashesInPot++;
      }
    }
  }
}


function updatespoon(prediction) {
  spoon.x = prediction.annotations.indexFinger[3][0];
  spoon.y = prediction.annotations.indexFinger[3][1];
}


function checkScore(){
  if(zucchinisInPot === maxZucchinisInPot){
    zucchiniIsReady = true;
    zucchinisInPot = `READY`;
    zucchiniRatio = ``;
  }
  if(tomatoesInPot === maxTomatoesInPot){
    tomatoIsReady = true;
    tomatoesInPot = `READY`;
    tomatoRatio = ``;
  }
  if(peppersInPot === maxPeppersInPot){
    pepperIsReady = true;
    peppersInPot = `READY`;
    pepperRatio = ``;
  }
  if(eggplantsInPot === maxEggplantsInPot){
    eggplantIsReady = true;
    eggplantsInPot = `READY`;
    eggplantRatio = ``;
  }
  if(squashesInPot === maxSquashesInPot){
    squashIsReady = true;
    squashesInPot = `READY`;
    squashRatio = ``;
  }
}

function checkTimer(){
  cookingTimer -= 1;
  if(cookingTimer <= 0){
    cookingTimer = true;
  }
  if(cookingTimerDone){
    state = `BadCook`;
  }
}

function recipeDone(){
  if(zucchiniIsReady && tomatoIsReady && pepperIsReady && eggplantIsReady && squashIsReady){
    fill(0, 255, 0);
    cookingTimerDelay -= 5;
    if(cookingTimerDelay <= 0){
      cookingTimerDelayDone = true;
    }
    if(cookingTimerDelayDone){
      state = `goodCook`;
    }
  }
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
    let ingredient01 = tomatoes[i];
    tomatoes[i].update();
  }
}

function updateZucchinis(){
  for(let i = 0; i<numZucchinis; i++){
    let ingredient02 = zucchinis[i];
    zucchinis[i].update();
  }
}

function updatePeppers(){
  for(let i = 0; i< numPeppers; i++){
    let ingredient03 = peppers[i];
    peppers[i].update();
  }
}

function updateEggplants(){
  for(let i = 0; i< numEggplants; i++){
    let ingredient04 = eggplants[i];
    eggplants[i].update();
  }
}

function updateSquashes(){
  for(let i = 0; i< numSquashes; i++){
    let ingredient05 = squashes[i];
    squashes[i].update();
  }
}
function updatePoison(){
  poison.update();
}

function displayspoon(){
  push();
  imageMode(CENTER, CENTER);
  image(spoonImg, spoon.x, spoon.y, spoon.size, spoon.size);
  pop();

}

function displayScore(){
  push();
  textSize(20);
  text(`Zucchini = ${zucchinisInPot}${zucchiniRatio}`, width/2-520, height/2-160);
  text(`Tomato = ${tomatoesInPot}${tomatoRatio}`, width/2-520, height/2 -120);
  text(`Pepper = ${peppersInPot}${pepperRatio}`, width/2-520, height/2 -80);
  text(`Eggplant = ${eggplantsInPot}${eggplantRatio}`, width/2-520, height/2 -40);
  text(`Squash = ${squashesInPot}${squashRatio}`, width/2-520, height/2);
  pop();

}

function displayCookingTimer(){
  push();
  textSize(20);
  text(`Timer: ${cookingTimer}`, width/2 + 400, height/2 - 300);
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

function tvButton(){
  imageMode(CENTER, CENTER);
  image(tvKnob.image,tvKnob.x, tvKnob.y, tvKnob.size, tvKnob.size );
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

  let d3 = dist(mouseX, mouseY, tvKnob.x, tvKnob.y);
  if(state === `tv`){
    if(d3 < tvKnob.size/2 - 50){
      tvKnob.size = tvKnob.size + 20;
      if(tvKnob.size > tvKnob.maxSize){
        tvKnob.size  = tvKnob.maxSize;
      }
    }
    else(tvKnob.size = tvKnob.minSize);
  }
}



function mousePressed() {

  if(state === `story`){
    responsiveVoice.speak(storyNarrative, "French Female");
  }

  if(state === `tv`){

  }


  let d = dist(mouseX, mouseY, gameButton.x, gameButton.y);
  if (state === `menu`) {
    if (d < gameButton.size / 2 - 60) { // -60 is added so the mouse only clicks on the button and not dead space around it
      state = `story`;
      menuSong.stop();
      storySong.loop();
      storySong.setVolume(0.1);
    }
  }
  let d2 = dist(mouseX, mouseY, helpButton.x, helpButton.y);
  if (state === `menu`) {
    if (d2 < helpButton.size / 2 - 60) {
      state = `instructions`;
    }
  }

  let d3 = dist(mouseX, mouseY, tvKnob.x, tvKnob.y);
  if(state === `tv`){
    if(d3 < tvKnob.size/2 - 50){
      responsiveVoice.speak(storyNarrative02, "French Female");
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
      storySong.stop();
      tvSong.loop();
      tvSong.setVolume(0.5);
    }
  }

  if(state === `tv`){
    if(keyCode === 13){
      state = `loading`;
      tvSong.stop();
      cookingSong.loop();
      setupHandpose();
    }
  }

}
