/**
Project 2
Ines Pioselli

Tamagotchi Sim

*/

"use strict";

let tamagotchiMenu = { // button to access the tutorial state
  x: 1280 / 2,
  y: 720 / 2 ,
  size: 300,
}

const pinkFood = [
  "watermelon",
  "raspberry",
  "strawberry",
  "cherry",
  "peach",
  "fig",
];

let foodRightAnswer = 0;
// let maxFoodRightAnswer = 5;
let foodWrongAnswer = 0;

let feedInstructions = `Feed the tamagotchi by saying Eat some and then the name of the food. Hint The tamagotchi loves the colour pink`;

let state = `chooseEgg`; // the prototype starts with the title state

let tamagotchiEgg;
let tamagotchiImg;

let roomBg;
let floorPlanBg;

let egg01;
let egg01Img;
let egg02;
let egg02Img;
let egg03;
let egg03Img;

let hour = 6; //day starts at 6am

let feedButton = {
  x:1280/2,
  y:720/2 - 1500,
  size:300,

}




let energyCounter = 0;
let tamagotchiEnergy = 2000;
let tamagotchiLVL = 1;

let tamagotchi;

let chooseEggBG;

let pixelFont;
let song01;

/**
Description of preload
*/
function preload() {
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
  pixelFont = loadFont(`assets/fonts/dogica.otf`);

  chooseEggBG = loadImage(`assets/images/chooseEggBG.png`);
  egg01Img = loadImage(`assets/images/egg01.png`);
  egg02Img = loadImage(`assets/images/egg02.png`);
  egg03Img = loadImage(`assets/images/egg03.png`);
  song01 = loadSound(`assets/sounds/Cute.mp3`);
  roomBg = loadImage(`assets/images/roomBg.png`);
  floorPlanBg = loadImage(`assets/images/floorplan.png`)
  feedButton.image = loadImage(`assets/images/feedButton.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(1280, 720);

  setupEgg01();
  setupEgg02();
  setupEgg03();

  setupAnnyang();
}

function setupAnnyang(){
  if(annyang){

    let commands = {
      "Eat some *food" : feed
    };
    annyang.addCommands(commands);
    annyang.start();
    feed();
  }

}



function setupEgg01(){
  let x = width/2;
  let y= height/2 + 150;
  egg01 = new Tamagotchi(x, y, egg01Img)
}

function setupEgg02(){
  let x = width/2;
  let y= height/2 + 150;
  egg02 = new Tamagotchi(x, y, egg02Img)
}

function setupEgg03(){
  let x = width/2;
  let y= height/2 + 150;
  egg03 = new Tamagotchi(x, y, egg03Img)
}

//Draws all the states for the game
function draw() {
  setupStates();
}

function setupStates(){
  if (state === `start`) {
    start();
  }
  else if (state === `menu`) {
    menu();
  }
  else if(state ===  `instructions`){
    instructions();
  }
  else if(state === `floorPlan`){
    floorPlan();

  }
  else if (state === `chooseEgg`) {
    chooseEgg();
  }
  else if (state === `livingRoom`) {
    livingRoom();
  }
  else if (state === `kitchen`) {
    kitchen();
  } else if (state === `bathroom`) {
    bathroom();
  }
  else if(state === `bedRoom`){
    bedRoom();
  }
  else if(state === `dead`){
    dead();
  }

}

function feed(food){
if(state === `kitchen`){
  if(pinkFood.includes(food)){
    foodRightAnswer ++;
    tamagotchiEnergy+=10;
  }
  else{
    foodWrongAnswer++;
    tamagotchiEnergy-=10;
    }

  }
}


//title state : homepage
function start() {

  push();
  background(186, 219, 205);
  textFont(pixelFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255, 255, 255);
  text(`ENTER to start!`, width / 2, height / 2);
  pop();

}

function menu() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(50);
  text(`TAMAGOTCHI SIM`, width / 2, height / 2 - 300);
  textSize(20);
  text(`Press spacebar`, width / 2, height / 2 + 200);
  pop();
  displayTamagotchiMenu();
}

function instructions(){
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(30);
  text(`Instructions`, width / 2, height / 2 - 200);
  text(`You must choose an egg to raise! \n You are given a house and \nmust make sure its energy level stays up`, width / 2, height / 2 - 100)

  text(`Press Enter for Floor plans`, width / 2, height / 2 + 200);
  pop();
}

function floorPlan(){

  push();
  imageMode(CENTER, CENTER);
  image(floorPlanBg, width / 2, height / 2, 1280, 720);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(50);
  text(`FLOOR PLAN`, width / 2, height / 2 - 300);
  textSize(30);
  text(`SPACE when ready`, width / 2, height / 2 - 200);
  pop();

}

function chooseEgg() {
  imageMode(CENTER, CENTER);
  image(chooseEggBG, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(50);
  text(`Choose an Egg`, width / 2, height / 2 + 200);
  pop();
}

function livingRoom() {
  imageMode(CENTER, CENTER);
  image(roomBg, width/2, height/2, 1280, 720);
  push();

  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Living Room`, width / 2, height / 2 + 300)
  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  checkEgg();


}

function kitchen() {
  imageMode(CENTER, CENTER);
  image(roomBg, width/2, height/2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Kitchen`, width / 2, height / 2 + 300)

  pop();


  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  displayFeedButton();
  displayGoodScore();
  displayBadScore();
  checkEgg();

}

function bedRoom(){
  imageMode(CENTER, CENTER);
  image(roomBg, width/2, height/2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Bedroom`, width / 2, height / 2 + 300)

  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  checkEgg();


}

function bathroom(){
  imageMode(CENTER, CENTER);
  image(roomBg, width/2, height/2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Bathroom`, width / 2, height / 2 + 300)

  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();

  checkEgg();
}

function checkEgg(){
  if (tamagotchiEgg === egg01) {
    updateEgg01();

  }
  else if (tamagotchiEgg === egg02) {
    updateEgg02();
  }
  else if (tamagotchiEgg === egg03) {
    updateEgg03();
  }
}

function checkCounter() {

  tamagotchiEnergy--;
}

function checkHour(){
  hour++;
  if(hour >= 12){ //time for school

  }
}

function updateEgg01(){
  egg01.update();
}

function updateEgg02(){
  egg02.update();
}

function updateEgg03(){
  egg03.update();
}


function displayFeedButton(){
  imageMode(CENTER,CENTER);
  image(feedButton.image, feedButton.x, feedButton.y, feedButton.size, feedButton.size );
}

function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
  //jitter the tamagotchi
  tamagotchiMenu.x = tamagotchiMenu.x + random(-1, 1);
}

function displayEnergy() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Energy: ${tamagotchiEnergy}`, width / 2 + 400, height / 2 - 300);
  pop();

}

function displayEvolutionLVL() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Evolution: ${tamagotchiLVL}`, width / 2 - 400, height / 2 - 300);
  pop();
}

function displayTime() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Time:${hour}:00`, width / 2, height / 2 - 300);
  pop();
}


function mousePressed(){

  let d = dist(mouseX, mouseY, feedButton.x, feedButton.y);
  if(state === `kitchen`){
    if(d< feedButton.size /2){
      displayGoodScore();
      responsiveVoice.speak(feedInstructions, "UK English Female")
    }
  }
}

function displayGoodScore(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Food Eaten = ${foodRightAnswer}`, width / 2 -400, height / 2 - 250);
  pop();

}

function displayBadScore(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Food Thrown Up = ${foodWrongAnswer}`, width / 2 +400, height / 2 - 250);
  pop();
}


//keyboard input
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //keycode for ENTER
      state = `menu`;
      song01.play();
      // song01.setVolume(0.5);
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
      state = `chooseEgg`;
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 49) {
      tamagotchiEgg = egg01
      state = `livingRoom`;
      setInterval(checkCounter, 2000);
      setInterval(checkHour, 10000);
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 50) {
      tamagotchiEgg = egg02;
      state = `livingRoom`;
      setInterval(checkCounter, 2000);
      setInterval(checkHour, 10000);
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 51) {
      tamagotchiEgg = egg03;
      state = `livingRoom`;
      setInterval(checkCounter, 2000);
      setInterval(checkHour, 10000);
    }
  }

}
