/**
Project 01 : A night at the movies
By: Ines Pioselli
Based on the movie Ratatouille


Ratatouille simulator
ideas:
  - make ingredients green when they have been added to the pot
  - start state -- √
  - menu -- √
  - backstory -- √
  - gustavo on the tv ---- √
  - hide from mousetrap and poison --√
  - meet linguini
  - handpose game --√
  - good ending
  - bad ending

*/

"use strict";

//fonts
let disneyFont;
let copperplateFont;
let dancingScript;

//handpose variables
let video = undefined;
let modelName = `HANDPOSE`;
let handpose = undefined;
let predictions = [];
let webcamRatio = {
  x: undefined,
  y: undefined
};

//background images
let startBg;
let menuBg;
let instructionsBg;
let storyBg;
let tvStoryBg;
let kitchenChaseInstructionsBg;
let kitchenChaseBg;
let kitchenBg;
let kitchenChaseWonBg;
let kitchenChaseLostBg;
let goodCookBg;
let badCookBg;

//songs
let menuSong;
let storySong;
let tvSong;
let kitchenChaseSong;
let cookingSong;

//button to start the game
let gameButton = {
  x: 1280/2,
  y: 720/2 + 120,
  size: 50,
  maxSize: 400,
  minSize: 300,

};

//button to get instructions/about section
let helpButton = {
  x: 1280/2,
  y: 720/2 + 220,
  size: 50,
  maxSize: 400,
  minSize: 300,
};

//tv knob on the tv state to call responsiveVoice
let tvKnob = {
  x: 1280/2 + 300,
  y: 720/2 - 150,
  size: 50,
  maxSize: 250,
  minSize: 200,
}


// ---- variables for chase minigame ---- //

//remi (main character) variables
let remi;
let remiImg;

//variables for the traps(knife) in kicthen chase game
let ratKnifeImg;
let ratKnives = [];
let numRatKnives = 0;
let maxRatKnives = 5;

//variables for rat poison in kitchen chase game
let ratPoisonImg;
let ratPoison;
let ratPoisonArray = [];
let numRatPoison = 0;
let maxRatPoison = 5;

//timer to push a new trap from the Rattrap class
let newTrapTimer = 0 ;
let timerTrapDelay = 80;

// ---- variables for cooking game ---- //

//timer for cooking game to call the bad cook state
let cookingTimer = 10000;
let cookingTimerDone = false;

//timer to delay the good cook state
let cookingTimerDelay = 100;
let cookingTimerDelayDone = false;

//poison variables for the cooking game
let poison;
let poisonImg;
let poisonCaught = 0;
let maxPoison = 1;

//tomato variables for cooking game
let tomatoImg;
let tomatoes = [];
let numTomatoes = 5;
let tomatoesInPot = 0;
let maxTomatoesInPot = 5;
let tomatoIsReady = false;
let tomatoRatio = ` /5`;

//zucchini variables for cooking game
let zucchiniImg;
let zucchinis = [];
let numZucchinis = 5;
let maxZucchinisInPot = 5;
let zucchinisInPot = 0;
let zucchiniIsReady = false;
let zucchiniRatio = ` /5`;

//pepper variables for the cooking game
let pepperImg;
let peppers = [];
let numPeppers = 5;
let peppersInPot = 0;
let maxPeppersInPot = 5;
let pepperIsReady = false;
let pepperRatio = ` /5`;

//eggplant variables for the cooking game
let eggplantImg;
let eggplants = [];
let numEggplants = 5;
let eggplantsInPot = 0;
let maxEggplantsInPot = 5;
let eggplantIsReady = false;
let eggplantRatio = ` /5`;

//squash variables for the cooking game
let squashImg;
let squashes = [];
let numSquashes = 5;
let squashesInPot = 0;
let maxSquashesInPot = 5;
let squashIsReady = false;
let squashRatio = ` /5`;

//veggie variables for floating veggies at the start state
let numVeggiesImages = 5;
let numVeggies = 30;
let veggieImages = [];
let veggies = [];

//circles for fading circles at the story state
let circles = [];
let maxCircles = 400;
let totalCircles = 0;
let circleTimer = 0;
let newCircleDelay = 10;

//spoon for handpose
let spoon = {
  x:0,
  y:0,
  size:200,
  image:undefined,
};

//handpose `pin`
let spoonImg;



//narration for story state
let storyNarrative = `Once upon a time there was a rat named Remi. He lived in someone's house with his big family. He loved to eat yummy food from the kitchen.
Press space to continue`;

//narration for tvstory state
let storyNarrative02 = `He always snuck into the kitchen to watch Gusteau the chef on the tv. He wanted to become just like him. Sadly, he got caught and was chased
out of the house.`;

let storyNarrative03 = `Linguini saved Remi from dying and decided to help him become a chef. Remi also help Linguini become a better cook.`;

//initial state
let state = `kitchenChaseWon`;



function preload() {

  //floating veggies at the start state
  for (let i = 0; i < numVeggiesImages; i++) {
    let veggieImage = loadImage(`assets/images/veggie${i}.png`);
    veggieImages.push(veggieImage);
  }

  //single Images
  spoonImg = loadImage(`assets/images/spoon.png`);
  poisonImg = loadImage(`assets/images/poison.png`);
  remiImg = loadImage(`assets/images/remi.png`);
  ratKnifeImg = loadImage(`assets/images/knife.png`);
  ratPoisonImg = loadImage(`assets/images/poison.png`);

  //ratatouille ingredients
  tomatoImg = loadImage(`assets/images/veggie1.png`);
  zucchiniImg = loadImage(`assets/images/veggie3.png`);
  pepperImg = loadImage(`assets/images/veggie4.png`);
  eggplantImg = loadImage(`assets/images/veggie0.png`);
  squashImg = loadImage(`assets/images/veggie2.png`);
  remiImg = loadImage(`assets/images/remi.png`);

  //fonts
  disneyFont = loadFont(`assets/fonts/waltograph42.otf`);
  copperplateFont = loadFont(`assets/fonts/Copperplate.otf`);
  dancingScript =loadFont(`assets/fonts/DancingScript.ttf`);

  //sounds
  menuSong = loadSound(`assets/sounds/Le-Festin.mp3`);
  storySong = loadSound(`assets/sounds/Cast-Of-Cooks.mp3`);
  tvSong = loadSound(`assets/sounds/A-Real-Gourmet-Kitchen.mp3`);
  kitchenChaseSong = loadSound(`assets/sounds/Granny-Get-Your-Gun.mp3`);
  cookingSong = loadSound(`assets/sounds/Special-Order.mp3`);

  //background images
  startBg = loadImage(`assets/images/StartBg.gif`);
  menuBg = loadImage(`assets/images/menuBg.png`);
  instructionsBg = loadImage(`assets/images/instructionsBg.png`);
  storyBg = loadImage(`assets/images/storyBg.png`);
  kitchenBg = loadImage(`assets/images/kitchenBg.png`);
  tvStoryBg = loadImage(`assets/images/tvBg.png`);
  kitchenChaseInstructionsBg = loadImage(`assets/images/paris.png`);
  kitchenChaseBg = loadImage(`assets/images/chaseBg.png`);
  goodCookBg = loadImage(`assets/images/goodCookBg.png`);
  kitchenChaseWonBg = loadImage(`assets/images/kitchenWinBg.png`);

  //buttons
  gameButton.image = loadImage(`assets/images/gameButton.png`);
  helpButton.image = loadImage(`assets/images/helpButton.png`);
  tvKnob.image = loadImage(`assets/images/knob.png`);
}


//setup of the canvas
function setup() {
  createCanvas(1280, 720); // set canvas to 1280 x720

  //calls the functions to setup characters, veggies, ingredients and poison
  setupRemi();
  setupVeggies();
  setupTomato();
  setupZucchini();
  setupPepper();
  setupSquash();
  setupEggplant();
  setupPoison();

}

//function to setup Remi in the kitchen chase game
function setupRemi(){
  let x = 0; //starts at 0 on the left side
  let y = height/2; //starts in the middle on y-axis
  remi = new Remi(x, y, remiImg);
}

//function to setup tomatoes in kitchen game
function setupTomato(){
  for(let i = 0; i<numTomatoes; i++){
    //random width and height
    let x = random(0, width);
    let y = random(0, height);
    let ingredient01 = new Ratatouille(x, y, tomatoImg);
    tomatoes.push(ingredient01);
  }
}

//function to setup the zucchini in the kitchen game
function setupZucchini(){
  for(let i = 0; i<numZucchinis; i++){
    //random width and height
    let x = random(0, width);
    let y = random(0, height);
    let ingredient02 = new Ratatouille(x, y, zucchiniImg);
    zucchinis.push(ingredient02);
  }
}

//function to setup the peppers in the kitchen game
function setupPepper(){
  for(let i = 0; i<numPeppers; i++){
    //random width and height
    let x = random(0, width);
    let y = random(0, height);
    let ingredient03 = new Ratatouille(x, y, pepperImg);
    peppers.push(ingredient03);
  }
}

//setup eggplants in the kitchen game
function setupEggplant(){
  for(let i =0; i<numEggplants; i++){
    //random width and height
    let x = random(0, width);
    let y = random(0, height);
    let ingredient04 = new Ratatouille(x, y, eggplantImg);
    eggplants.push(ingredient04);
  }
}

//setup squash in the kitchen game
function setupSquash(){
  for(let i =0; i<numSquashes; i++){
    //random width and height
    let x = random(0, width);
    let y = random(0, height);
    let ingredient05 = new Ratatouille(x, y, squashImg);
    squashes.push(ingredient05);
  }
}

function setupPoison(){
  //random width and height
  let x = random(0, width);
  let y = random(0, height);
  poison = new Ratatouille(x, y, poisonImg);
}

//function to setup veggies for the start state
function setupVeggies(){
  for(let i = 0; i < numVeggies; i++){
      let x = random(0, width);
      let y = random(0, height);
      let veggieImage = random(veggieImages);
      let veggie = new Veggies(x, y, veggieImage);
      veggies.push(veggie);
    }
}

//function to setup handpose for the cooking game
function setupHandpose(){

  video.hide();
  // Start the Handpose model and switch to our cookingGame state when it loads
  //calculate ratio of the canvas to the webcam
  webcamRatio.x = width / video.elt.videoWidth;
  webcamRatio.y = height / video.elt.videoHeight;
  handpose = ml5.handpose(video, {
    flipHorizontal: true //flips camera
  }, function() {
    state = `cookingGame` //calls the cookingGame state
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

//function to create all the states for the game
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
  else if(state === `tvStory`){
    tvStory();
  }
  else if(state === `kitchenChaseInstructions`){
    kitchenChaseInstructions();
  }
  else if(state === `kitchenChase`){
    kitchenChase();
  }
  else if(state === `kitchenChaseWon`){
    kitchenChaseWon();
  }
  else if(state === `kitchenChaseLost`){
    kitchenChaseLost();
  }
  else if(state === `cookingInstructions`){
    cookingInstructions();
  }
  else if(state === `loading`){
    loading();
  }
  else if(state === `cookingGame`){
    cookingGame();
  }
  else if(state === `goodCook`){
    goodCook();
  }
  else if(state === `badCook`){
    badCook();
  }
}


//start state with title and floating veggies
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

  //calls function to display floating veggies
  updateVeggies();
}

//menu state to lead to game or instructions page
function menu(){
  imageMode(CENTER, CENTER);
  image(menuBg, width/2 , height/2, 1280, 720);

  buttonGame();  //displays game button
  buttonInstructions(); //displays instructions button
  mouseOver(); //calls mouseOver function to check if mouse hovered over the buttons
}

//instructions for the entire game
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

//backstory
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

  setupCircles(); //setup the fading circles in the background
}

//tv backstory for Gusteau's Restaurant
function tvStory(){
  imageMode(CENTER, CENTER);
  image(tvStoryBg, width/2, height/2, 1280, 720);

  push();
  textFont(copperplateFont);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30)
  text(`click the TV knob`, width/2, height/2 - 320);
  textSize(20);
  text(`Press ENTER to skip`, width/2, height/2 + 300);
  pop();

  mouseOver(); //call mouseover to check if you hover over the tv knob
  tvStoryButton(); // display tv knob button
}

//instructions for kitchen chase game
function kitchenChaseInstructions(){
  imageMode(CENTER, CENTER);
  image(kitchenChaseInstructionsBg, width/2, height/2, 1280, 720);

  push();
  textAlign( CENTER);
  fill(255);
  textSize(50);
  textFont(copperplateFont);
  text(`Kitchen Chase`, width/2, height/2 -300);
  textSize(30);
  text(`After getting chased out of the house, \n you make your way to Gusteau's Restaurant in Paris.`, width/2, height/2 -200);
  text(`Sadly, you get caught in the kitchen and \n must dodge all the traps.`, width/2, height/2 -100);
  textSize(20);
  text(`Use the arrow keys to navigate to the edge of the screen`, width/2, height/2 -0);
  text(`Press R when ready`, width/2, height/2 +70);
  pop();
}

//kitchen chase game
function kitchenChase(){
  imageMode(CENTER, CENTER);
  image(kitchenChaseBg, width/2, height/2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  fill(51, 30, 77);
  textSize(40);
  textStyle(BOLD);
  text(`KITCHEN NIGHTMARE`, width/2, height/2 -310);
  pop();

  updateRemi(); //display remi
  updateRatObstacles(); //displays obstacles
  createRatKnives(); //creates all the knives
  createRatPoison(); //creates the poison
  remiOverlapObstacle(); //check overlap with remi and the obstacles
}

//win state for winning kitchen chase game
function kitchenChaseWon(){
  imageMode(CENTER, CENTER);
  image(kitchenChaseWonBg, width/2, height/2, 1280, 720);

  push();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(60);
  textFont(dancingScript);
  fill(255);
  text(`You were saved by Linguini`, width/2, height/2-300);
  textSize(40);
  text(`Click the screen for more`, width/2, height/2-100);
  text(`Press ENTER to skip`, width/2, height/2 + 300);
  pop();
}

function kitchenChaseLost(){
  background(0, 255,0 );

  push();
  fill(0);
  text(`lose`, width/2, height/2);
  pop();
}



function cookingInstructions(){
  background(278);
  push();
  textFont(copperplateFont);
  text(`ENTER`, width/2, height/2);
  pop();
}

function loading(){
  background(0);

  push();
  textFont(copperplateFont);
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
    let hand = predictions[0];
    updatespoon(hand);

    //calls all the overlap functions
    overlapTomatoes();
    overlapZucchinis();
    overlapPeppers();
    overlapEggplants();
    overlapSquashes();
    overlapPoison();
  }
  //displays the spoon image
  displayspoon();

  //calls update function for all the food and poison
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
  imageMode(CENTER, CENTER);
  image(goodCookBg, width/2, height/2, 1280, 720);
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

function overlapPoison(){
  let d6 = dist(spoon.x, spoon.y, poison.x, poison.y);
  if(d6 < poison.size /2){
    if(poisonCaught < maxPoison){
        state = `badCook`;
    }
  }
}

function updatespoon(hand) {
  let index = hand.annotations.indexFinger[3];
  spoon.x = index[0] * webcamRatio.x;
  spoon.y = index[1] * webcamRatio.y;

}

//display score for ingredients  : ingredient / 5
//if each ingredient is = to their max then they are READY
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
    cookingTimerDone = true;
  }
  if(cookingTimerDone){
    state = `badCook`;
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

//function setup circle in story state
function setupCircles(){
  circleTimer++;
  totalCircles++;
  if(totalCircles <= maxCircles){
    if(circleTimer >= newCircleDelay){
        circles.push(new SmallCircle(random(0, width), random(0, height)));
        circles.push(new BigCircle(random(0, width), random(0, height)));
      circleTimer = 0;
    }
  }

  for(let i =0; i<circles.length; i ++){
    let circle = circles[i];
    circle.display(); //display circles
    circle.fadeAnimation(); //fade circles
  }
}

//calls update from Remi class
function updateRemi(){
  remi.update();
}

//calls update from Rat obstacle class
function updateRatObstacles(){
  //updates knives
  for(let i = 0; i< ratKnives.length; i++){
    let knife = ratKnives[i];
    knife.update();
  }

  //updates posion
  for(let i = 0; i< ratPoisonArray.length; i++){
    let ratPoison = ratPoisonArray[i];
    ratPoison.update();
  }
}

//check for remi for overlap with the knife
function remiOverlapObstacle() {
  for (let i = 0; i < ratKnives.length; i++) {
    let knife = ratKnives[i];
    remi.checkOverlap(knife);
  }
  for (let i = 0; i < ratPoisonArray.length; i++) {
    let poison = ratPoisonArray[i];
    remi.checkOverlap(poison);

    if (!remi.isRemiAlive) {
      kitchenChaseLost();
    }

  }
}

function createRatKnives(){
  newTrapTimer ++;
  if(newTrapTimer >= timerTrapDelay){
    numRatKnives++;
    if(numRatKnives <= maxRatKnives){
      ratKnives.push(new RatObstacle(width, random(0, height), ratKnifeImg ));
      newTrapTimer = 0;
    }

  }
}

function createRatPoison(){
  newTrapTimer ++;
  if(newTrapTimer >= timerTrapDelay){
    numRatPoison++;
    if(numRatPoison <= maxRatPoison){
      ratPoisonArray.push(new RatObstacle(width, random(0, height), ratPoisonImg));
      newTrapTimer = 0;
    }
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


//function to display all the scores for the ingredients
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

function tvStoryButton(){
  imageMode(CENTER, CENTER);
  image(tvKnob.image,tvKnob.x, tvKnob.y, tvKnob.size, tvKnob.size );
}

//hovering over button effect
function mouseOver(){
  let d = dist(mouseX, mouseY, gameButton.x, gameButton.y);
  if (state === `menu`) {
    if (d < gameButton.size / 2 - 120) { // -120 is added so the mouse only clicks on the button and not dead space around it
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
  if(state === `tvStory`){
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
  if(state === `tvStory`){
    if(d3 < tvKnob.size/2 - 50){
      responsiveVoice.speak(storyNarrative02, "French Female");
    }
  }
  if(state === `kitchenChaseWon`){
    responsiveVoice.speak(storyNarrative03, "French Female");
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
    if(keyCode === 32){ //keycode for spacebar
      state = `tvStory`;
      storySong.stop();
      tvSong.loop();
      tvSong.setVolume(0.5);
    }
  }

  if(state === `tvStory`){
    if(keyCode === 13){ //keycode for enter
      state = `kitchenChaseInstructions`;
      tvSong.stop();
      kitchenChaseSong.play();
      kitchenChaseSong.setVolume(0.5);
    }
  }
  if(state === `kitchenChaseInstructions`){
    if(keyCode === 82){ //keycode for R
      state = `kitchenChase`;
    }
  }

  if(state === `kitchenChaseWon`){
    if(keyCode === 13){ //enter
      state = `cookingInstructions`
      kitchenChaseSong.stop();
    }
  }

  if(state === `cookingInstructions`){
    if(keyCode === 32){
      state = `loading`; //keycode for space
      tvSong.stop();
      cookingSong.loop();
      video = createCapture(VIDEO, setupHandpose);
    }
  }

}
