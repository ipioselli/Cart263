/**
Project 2 prototype
Ines Pioselli

Tamagotchi Sim

CAPPUGOTCHI
- you are given a cute lil coffee bean as a pet.

Today:
- make all 9 drawings
- finish bed room
- finish living room

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

let pencilImg;
let numPencils = 20;
let pencils = [];


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
  size: 50,
  image:undefined,
};

let fingerImg;


//kitchen variables
let italianFood = [ //array of the tamagotchi's favourite gelato flavours
  "pasta",
  "pizza",
  "gelato",
  "nutella",
  "cannoli",
  "ravioli",
  "lasagna",
  "spaghetti",
  "polenta",
  "arancini",
  "tiramisu",
  "carbonara",
  "risotti"

];

let foodRightAnswer = 0;
let foodWrongAnswer = 0;

//school variables
//DAY 1
let schoolLesson01 = {
  currentEnglishWord: ``,
  currentItalianWord: ``,


};

let currentItalianAnswer = ``;
let italianData;
let englishData;

let schoolRightAnswers = 0;
let schoolMaxRightAnswers = 5;
let schoolWrongAnswers = 0;
let schoolMaxWrongAnswers = 10;

//bedtime
let bedTimeTimerDelay = 500;
let bedTimeTimerDone = false;

let feedButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 150,
}

let showerButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 150,
}

let sleepButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 150,
}

let petButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 150,
}

let livingRoomButton = {
  x: 1280/5,
  y: 720 / 2 + 300,
  size: 100,
}

let kitchenButton = {
  x: 1280/5 *2,
  y: 720 / 2 + 300,
  size: 100,
}

let bedroomButton = {
  x: 1280/5 *3,
  y: 720 / 2 + 300,
  size: 100,
}

let bathroomButton = {
  x: 1280/5 *4,
  y: 720 / 2 + 300,
  size: 100,
}

let englishButton = {
  x: 1280 / 2 - 200,
  y: 720 / 2 + 40,
  size: 100,
}

let italianButton = {
  x: 1280 / 2 + 200,
  y: 720 / 2 + 40,
  size: 100,
}


let feedInstructions = `Feed the tamagotchi by saying the name of the food. Hint The tamagotchi loves italian food`;
let showerInstructions = `Press the letter S on the keypad to wash away all the dirt`;
let sleepInstructions01 = `It's not time for bed yet`;
let sleepInstructions02 = `Time for bed`;
let petInstructions = `Hover your index finger over the tamagotchi to pet it and increase the energy level`;
let schoolInstructions01 = `It's your tamagotchi's first day of italian school. \n You must help it learn italian by saying the words in italian. \n Your first lesson will be about food. \n Get 10 right in order to advance. \nIf you get 10 wrong your tamagotchi will not evolve.`

//background image variables
let roomBg;
let floorPlanBg;
let chooseEggBG;
let bathroomBg;
let bedroomBg;
let kitchenBg;
let livingRoomBg;
let schoolYardBg;
let classroomBg;

//fonts
let pixelFont;
let cuteFont;

//sounds
let song01;
let blingSfx;
let badSfx;
let petSfx;

let state = `floorPlan`; // the prototype starts with the start state

//loads all the variables
function preload() {

  pixelFont = loadFont(`assets/fonts/dogicaBold.otf`);
  cuteFont = loadFont(`assets/fonts/bubble.ttf`);


  chooseEggBG = loadImage(`assets/images/chooseEggBg.png`);
  egg01Img = loadImage(`assets/images/egg01.png`);
  egg02Img = loadImage(`assets/images/tamagotchi_01.png`);
  egg02Img02 = loadImage(`assets/images/tamagotchi_02.png`);
  egg02Img03 = loadImage(`assets/images/tamagotchi_03.png`);
  fingerImg = loadImage(`assets/images/heart.png`);

  egg03Img = loadImage(`assets/images/egg03.png`);

  roomBg = loadImage(`assets/images/roomBg.png`);
  floorPlanBg = loadImage(`assets/images/floorplan.png`)
  bathroomBg = loadImage(`assets/images/bathroom.png`)
  bedroomBg = loadImage(`assets/images/bedroom.png`);
  kitchenBg = loadImage(`assets/images/kitchen.png`);
  livingRoomBg = loadImage(`assets/images/livingRoomBg.png`);
  schoolYardBg = loadImage(`assets/images/schoolyardBg.png`);
  classroomBg = loadImage(`assets/images/classroomBg.png`);


  bubbleImg = loadImage(`assets/images/bubble.png`);
  pencilImg = loadImage(`assets/images/pencil.png`);

  //buttons
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
  feedButton.image = loadImage(`assets/images/feedButton.png`);
  showerButton.image = loadImage(`assets/images/washButton.png`);
  livingRoomButton.image = loadImage(`assets/images/livingRoomButton.png`);
  bathroomButton.image = loadImage(`assets/images/bathroomButton.png`);
  bedroomButton.image = loadImage(`assets/images/bedroomButton.png`);
  kitchenButton.image = loadImage(`assets/images/kitchenButton.png`);
  sleepButton.image = loadImage(`assets/images/sleepButton.png`);
  petButton.image = loadImage(`assets/images/petButton.png`);
  englishButton.image = loadImage(`assets/images/englishButton.png`);
  italianButton.image = loadImage(`assets/images/italianButton.png`);

  //school
  englishData = loadJSON(`data/lesson_01.json`);
  italianData = loadJSON(`data/lesson_01.json`);

  //sounds
  song01 = loadSound(`assets/sounds/Cute.mp3`);
  blingSfx = loadSound(`assets/sounds/bling.mp3`);
  badSfx = loadSound(`assets/sounds/bad.mp3`);
  petSfx = loadSound(`assets/sounds/pet.mp3`);

}


//setup the canvas
function setup() {
  createCanvas(1280, 720);


  setupEgg02();
  setupBubbles();
  setupPencils();
  setupShower();

  setupAnnyang(); //setup for annyang

}

function setupAnnyang() {
  if (annyang) {
    // annyang.setLanguage('en-US');
    // annyang.setLanguage('it-IT');

    let commands = {

        "eat some *food": feed,
        "the answer is *phrase": guessAnswer
    };
    annyang.addCommands(commands);
    annyang.start();
    feed(); //calls function to check the score


    // annyang.setLanguage('en-US');
  }


}

//setup tamagotchi
function setupEgg02() {
  let x = width / 2;
  let y = height / 2 + 150;
  tamagotchiEgg = new Tamagotchi(x, y, egg02Img, egg02Img02, egg02Img03)
}

function setupHeart(){
  let x = width/2;
  let y =height / 2 + 150;
  heart = new Heart(x,y, heartImg);
}

//setup the bubbles for the bathroom
function setupBubbles(){

  for(let i = 0; i<numBubbles; i++){
    let x = width/2;
    let y = height/2;
    let bubble = new Bubble(x, y, bubbleImg);
    bubbles.push(bubble);
  }

}

function setupPencils(){
  for(let i = 0; i<numPencils; i++){
    let x = random(0, width);
    let y = random(0, height);
    let pencil = new Pencil(x, y, pencilImg);
    pencils.push(pencil);
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

  video.hide();
  // Start the Handpose model and switch to our livingroom state when it loads
  //calculate ratio of the canvas to the webcam
  webcamRatio.x = width / video.elt.videoWidth; //change the webcam x ratio to the x of the canvas
  webcamRatio.y = height / video.elt.videoHeight; //change the webcam y ratio to the y of the canvas
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



function generateLesson01(){



  let italianTranslation = random(italianData.lesson01);
  schoolLesson01.currentItalianWord = italianTranslation.italian.toLowerCase();

  let englishTranslation = italianTranslation;
  schoolLesson01.currentEnglishWord = englishTranslation.english.toLowerCase();

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
  else if(state === `schoolYard`){
    schoolYard();
  }
  else if(state === `lesson01Instructions`){
    lesson01Instructions();
  }
  else if(state === `schoolDay01`){
    schoolDay01();
  }
  else if(state === `schoolDay02`){
    schoolDay02();
  }
  else if(state === `day02`){
    day02();
  }
  else if (state === `dead`) {
    dead();
  }
  else if(state === `win`){
    win();
  }

}

//function to check through array of food in the kitchen state
function feed(food) {
  if (state === `kitchen`) {
    if (italianFood.includes(food)) { //if right increase the score and energy
      foodRightAnswer++;
      tamagotchiEnergy += 10;
      blingSfx.play(); //play good sound if you guess the right flavour
      if(tamagotchiEnergy >2000) {
        tamagotchiEnergy = 2000;
      }
    }
    else {
      foodWrongAnswer++; //if wrong increase wrong score and decrease energy
      tamagotchiEnergy -= 10;
      badSfx.play();
    }
  }
}

function guessAnswer(phrase){

  currentItalianAnswer = phrase.toLowerCase();
  checkLesson01Score();
}

function overlapTamagotchi(){
  let d = dist(finger.x, finger.y, tamagotchiEgg.x, tamagotchiEgg.y);
  if(d < tamagotchiEgg.size/2){
    tamagotchiEgg.pet();
    petSfx.setVolume(0.1);
    petSfx.play();
    tamagotchiEnergy+=5;
    tamagotchiEnergy = 2000;
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
  if (hour === 7) {
    state = `schoolYard`; //if the time is 12 pm then its time for school

  }
}


function checkLesson01Score(){

  if(currentItalianAnswer === schoolLesson01.currentEnglishWord){
    schoolRightAnswers++;
    nextQuestion();

    if(schoolRightAnswers === schoolMaxRightAnswers){
      state = `bedRoom`;
      hour = 20;
    }

  }
  else if(currentItalianAnswer !== schoolLesson01.currentItalianWord){
    schoolWrongAnswers++;
    if(schoolWrongAnswers === schoolMaxWrongAnswers){
      state = `dead`;
    }
  }
}



function nextQuestion(){
  if(state === `schoolDay01`){
    generateLesson01();
  }
}

function readyForBed(){

  let d = dist(mouseX, mouseY, sleepButton.x, sleepButton.y);
  if (state === `bedRoom`) {
    if (d < sleepButton.size / 2) {
      if(hour < 21 ){
        tamagotchiEgg.move();
        tamagotchiEgg.position();
        responsiveVoice.speak(sleepInstructions01, "UK English Female");
      }
      else{
        responsiveVoice.speak(sleepInstructions02, "UK English Female");

      }
    }
  }
}

function checkBedTime(){
if(state === `livingRoom` || state === `bedRoom` || state === `kitchen` || state === `bathroom`){
  if(tamagotchiLVL === 1){
    if(hour < 13){
      tamagotchiEgg.move();
      tamagotchiEgg.position();
    }
    else{
        tamagotchiEgg.getInBed();

          bedTimeTimerDelay -=5;
          if(bedTimeTimerDelay <=0){
            bedTimeTimerDone = true;
          }
          if(bedTimeTimerDone){
            state = `day02`;
          }
        }
    }
    else if(tamagotchiLVL === 2){
      if(hour < 20){
        tamagotchiEgg.move();
        tamagotchiEgg.position();
      }
    }
}

}


//update tamagotchi
function updateEgg02() {
  tamagotchiEgg.update();
}


function updateHeart(){
  heart.update();
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

function updatePencils(){
  for(let i=0; i<numPencils; i++){
    let pencil = pencils[i];
    pencils[i].update();
  }
}

function moveShower(){
  for(let i =0; i<numShowerWater; i++){
    let shower = showerWater[i];
   showerWater[i].move();
  }
}

function petMe(){
  if(state === `livingRoom`){
    let d = dist(mouseX, mouseY, petButton.x, petButton.y);
    if(d<petButton.size/2){
      responsiveVoice.speak(petInstructions, "UK English Female");
    }
  }
}

function englishInstructions(){
  if(state === `schoolDay01` || state === `schoolDay02`){
    let d = dist(mouseX, mouseY, englishButton.x, englishButton.y);
    if(d < englishButton.size/2){
        responsiveVoice.speak(schoolLesson01.currentEnglishWord, "UK English Female");
    }
  }
}

function italianInstructions(){
  if(state === `schoolDay01` || state === `schoolDay02`){
    let d = dist(mouseX, mouseY, italianButton.x, italianButton.y);
    if(d < italianButton.size/2){
        responsiveVoice.speak(schoolLesson01.currentItalianWord, "Italian Male");
    }
  }
}


//mousepressed to trigger responsiveVoice
function mousePressed() {

  readyForBed();
  petMe();
  englishInstructions();
  italianInstructions();

  let d = dist(mouseX, mouseY, feedButton.x, feedButton.y);
  if (state === `kitchen`) {
    if (d < feedButton.size / 2) {

      responsiveVoice.speak(feedInstructions, "UK English Female");
    }
  }

  let d2 = dist(mouseX, mouseY, showerButton.x, showerButton.y);
  if(state === `bathroom`){
    if(d2 < showerButton.size/2){
      responsiveVoice.speak(showerInstructions, "UK English Female");
    }
  }

  let d3 = dist(mouseX, mouseY, livingRoomButton.x,  livingRoomButton.y);
  if(d3 < livingRoomButton.size/2){
    state = `loading`;
    video = createCapture(VIDEO, setupHandpose);
  }

  let d4 = dist(mouseX, mouseY, tamagotchiEgg.x, tamagotchiEgg.y);
  if(d4 < tamagotchiEgg.size/2){
  }

  let d5 = dist(mouseX, mouseY, bathroomButton.x, bathroomButton.y);
  if(d5 < bathroomButton.size/2){
    state = `bathroom`;
  }

  let d6 = dist(mouseX, mouseY, kitchenButton.x, kitchenButton.y);
  if(d6 < kitchenButton.size/2){
    state = `kitchen`;
  }

  let d7 = dist(mouseX, mouseY, bedroomButton.x, bedroomButton.y);
  if(d7 < bedroomButton.size/2){
    state= `bedRoom`;
  }
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
  if(state === `schoolYard`){
    if(keyCode === 13){
      state = `lesson01Instructions`;
    }
  }
  if(state === `lesson01Instructions`){
    if(keyCode === 32){
      state = `schoolDay01`;
      generateLesson01(); //generates the english and italian words
    }
  }
  if(state === `day02`){
    if(keyCode === 13){ //keycode for enter
      state = `bedRoom`;
      hour = 6;
      tamagotchiLVL = 2;
      tamagotchiEnergy = 2000;
      tamagotchiEgg.resetDirt();
    }
  }
}
