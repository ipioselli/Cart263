/**
Project 2 prototype
Ines Pioselli

Tamagotchi Sim

Today:
- fix shower
- fix images
- add handpose

*/

"use strict";

let tamagotchiMenu = { // tamagotchi on the menu page
  x: 1280 / 2,
  y: 720 / 2,
  size: 300,
}

//main game variables
let tamagotchiEgg;
let tamagotchiImg;
let egg01;
let egg01Img;
let egg02;
let egg02Img;
let egg02Img02;
let egg02Img03;
let egg03;
let egg03Img;
let energyCounter = 0;
let tamagotchiEnergy = 2000;
let tamagotchiLVL = 1;
let tamagotchi;
let hour = 6; //day starts at 6am

//bathroom variables
let bubbleImg;
let numBubbles = 10;
let bubbles = [];
let numShowerWater = 200
let showerWater = [];


//living room variables
let video = undefined;
let modelName = `HANDPOSE`;
let handpose = undefined;
let predictions = [];
let webcamRatio = {
  x: undefined,
  y: undefined
};

let finger = {
  x:undefined,
  y:undefined,
  size: 200,
}





//kitchen variables
const pinkFood = [ //array of the tamagotchi's favourite food
  "watermelon",
  "raspberry",
  "strawberry",
  "cherry",
  "peach",
  "fig",
];

let foodRightAnswer = 0;
let foodWrongAnswer = 0;

let feedButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 300,
}

let showerButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 300,
}

let feedInstructions = `Feed the tamagotchi by saying Eat some and then the name of the food. Hint The tamagotchi loves the colour pink`;

//background image variables
let roomBg;
let floorPlanBg;
let chooseEggBG;
let bathroomBg;

//fonts
let pixelFont;

//sounds
let song01;

let state = `floorPlan`; // the prototype starts with the start state

//loads all the variables
function preload() {
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
  pixelFont = loadFont(`assets/fonts/dogica.otf`);
  chooseEggBG = loadImage(`assets/images/chooseEggBg.png`);
  egg01Img = loadImage(`assets/images/egg01.png`);
  egg02Img = loadImage(`assets/images/tamagotchi_01.png`);
  egg02Img02 = loadImage(`assets/images/tamagotchi_02.png`);
  egg02Img03 = loadImage(`assets/images/tamagotchi_03.png`);

  egg03Img = loadImage(`assets/images/egg03.png`);
  song01 = loadSound(`assets/sounds/Cute.mp3`);
  roomBg = loadImage(`assets/images/roomBg.png`);
  floorPlanBg = loadImage(`assets/images/floorplan.png`)
  bathroomBg = loadImage(`assets/images/bathroom.png`)
  feedButton.image = loadImage(`assets/images/feedButton.png`);
  bubbleImg = loadImage(`assets/images/bubble.png`);
  showerButton.image = loadImage(`assets/images/washButton.png`);
}


//setup the canvas
function setup() {
  createCanvas(1280, 720);

  //setup all the eggs
  // setupEgg01();
  setupEgg02();
  // setupEgg03();
  setupBubbles();
  setupShower();
  setupAnnyang(); //setup for annyang
}

function setupAnnyang() {
  if (annyang) {

    let commands = {
      "Eat some *food": feed //detects for food
    };
    annyang.addCommands(commands);
    annyang.start();
    feed(); //calls function to check the score
  }

}

//setup egg 1
function setupEgg01() {
  let x = width / 2;
  let y = height / 2 + 150;
  egg01 = new Tamagotchi(x, y, egg01Img, )
}

//setup egg 2
function setupEgg02() {
  let x = width / 2;
  let y = height / 2 + 150;
  tamagotchiEgg = new Tamagotchi(x, y, egg02Img, egg02Img02, egg02Img03)
}

//setup egg 3
function setupEgg03() {
  let x = width / 2;
  let y = height / 2 + 150;
  egg03 = new Tamagotchi(x, y, egg03Img)
}

function setupBubbles(){

  for(let i = 0; i<numBubbles; i++){
    let x = width/2;
    let y = height/2;
    let bubble = new Bubble(x, y, bubbleImg);
    bubbles.push(bubble);
  }

}

function setupShower(){
  for(let i=0; i<numShowerWater; i++){
    let x = random(480, 760);
    let y = random(0, -height);
    let shower =  new Shower(x, y);
    showerWater.push(shower);
  }
}

function setupHandpose() {

  // video.hide();
  // Start the Handpose model and switch to our livingroom state when it loads
  //calculate ratio of the canvas to the webcam
  webcamRatio.x = width / video.elt.videoWidth;
  webcamRatio.y = height / video.elt.videoHeight;
  handpose = ml5.handpose(video, {
    flipHorizontal: true //flips camera
  }, function() {
    state = `livingRoom` //calls the living room state
  });
  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });
}


//Draws all the states for the game
function draw() {
  setupStates();
}

//function to change all the states
function setupStates() {
  if (state === `start`) {
    start();
  }
  else if (state === `menu`) {
    menu();
  }
  else if (state === `instructions`) {
    instructions();
  }
  else if (state === `floorPlan`) {
    floorPlan();
  }
  else if (state === `chooseEgg`) {
    chooseEgg();
  }
  else if (state === `bedRoom`) {
    bedRoom();
  }
  else if(state === `loading`){
    loading();
  }
  else if (state === `livingRoom`) {
    livingRoom();
  }
  else if (state === `kitchen`) {
    kitchen();
  }
  else if (state === `bathroom`) {
    bathroom();
  }
else if (state === `dead`) {
    dead();
  }

}

//function to check through array of pink food in the kitchen state
function feed(food) {
  if (state === `kitchen`) {
    if (pinkFood.includes(food)) { //if right increase the score and energy
      foodRightAnswer++;
      tamagotchiEnergy += 10;
    } else {
      foodWrongAnswer++; //if wrong increase wrong score and decrease energy
      tamagotchiEnergy -= 10;
    }
  }
}

function overlapTamagotchi(){
  let d = dist(finger.x, finger.y, tamagotchiEgg.x, tamagotchiEgg.y);
  if(d < tamagotchiEgg.size/2){
    tamagotchiEgg.pet();
  }

}


function updatehand(hand){
  let index =  hand.annotations.indexFinger[3];
  finger.x = index[0] * webcamRatio.x;
  finger.y = index[1] * webcamRatio.y;
}


function checkHand(){
  if(state === `loading`){
    video = createCapture(VIDEO, setupHandpose);
  }
}

//function to decrease the energy and check if its under 0 or over 2000
function checkCounter() {
  tamagotchiEnergy-= 5; //decreases by 5

  if (tamagotchiEnergy <= 0) {
    state = `dead`;
  }
  if(tamagotchiEnergy >= 2000){
    tamagotchiEnergy = 2000;
  }
}

//function to increase the hour of the day
function checkHour() {
  hour++;
  // if (hour >= 12) { //time for school (not implemented yet)
  //
  // }
}

//update all 3 egg function below


function updateEgg02() {
  tamagotchiEgg.update();
}



function updateBubbles(){
  for(let i=0; i<numBubbles; i++){
    let bubble = bubbles[i];
    bubbles[i].update();
  }
}

function updateShower(){
  for(let i =0; i<numShowerWater; i++){
    let shower = showerWater[i];
   showerWater[i].update();
  }
}

function moveShower(){
  for(let i =0; i<numShowerWater; i++){
    let shower = showerWater[i];
   showerWater[i].move();
  }
}



//display feeding instructions in the kitchen
function displayFeedButton() {
  imageMode(CENTER, CENTER);
  image(feedButton.image, feedButton.x, feedButton.y, feedButton.size, feedButton.size);
}

//display the tamagotchi on the menu state
function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
  //jitter the tamagotchi
  tamagotchiMenu.x = tamagotchiMenu.x + random(-1, 1);
}

function displayShowerButton() {
  imageMode(CENTER, CENTER);
  image(showerButton.image, showerButton.x, showerButton.y, showerButton.size, showerButton.size);
}

//display the energy amount
function displayEnergy() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Energy: ${tamagotchiEnergy}`, width / 2 + 400, height / 2 - 300);
  pop();

}

function displayFinger(){
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(finger.x, finger.y, finger.size);
  pop();
}

//display the evolution level
function displayEvolutionLVL() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Evolution: ${tamagotchiLVL}`, width / 2 - 400, height / 2 - 300);
  pop();
}

//display the time of day
function displayTime() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Time:${hour}:00`, width / 2, height / 2 - 300);
  pop();
}
function displayShowerButton() {
  imageMode(CENTER, CENTER);
  image(showerButton.image, showerButton.x, showerButton.y, showerButton.size, showerButton.size);
}
//mousepressed to trigger responsiveVoice


function mousePressed() {

  let d = dist(mouseX, mouseY, feedButton.x, feedButton.y);
  if (state === `kitchen`) {
    if (d < feedButton.size / 2) {

      responsiveVoice.speak(feedInstructions, "UK English Female");
    }
  }

  let d2 = dist(mouseX, mouseY, showerButton.x, showerButton.y);
  if(state === `bathroom`){
      // updateShower();
  }
}

//display good score for the food
function displayGoodScore() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Food Eaten = ${foodRightAnswer}`, width / 2 - 400, height / 2 - 250);
  pop();

}

//display bad score for the food
function displayBadScore() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Food Thrown Up = ${foodWrongAnswer}`, width / 2 + 400, height / 2 - 250);
  pop();
}


//keyboard input from the user
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //keycode for ENTER
      state = `menu`;
      song01.play();
      song01.setVolume(0.2);
    }
  }
  if (state === `menu`) {
    if (keyCode === 32) { //spacebar
      state = `instructions`;
    }
  }
  if (state === `instructions`) {
    if (keyCode === 13) { //
      state = `floorPlan`;
    }
  }
  if (state === `floorPlan`) {
    if (keyCode === 32) {
      state = `bedRoom`;
      setInterval(checkCounter, 3000); //every 3 seconds
      setInterval(checkHour, 10000); //every 10 seconds
    }
  }


}
