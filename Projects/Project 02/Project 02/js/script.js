/**
Project 2
Ines Pioselli

Tamagotchi Sim
CAPPUGOTCHI

How to play:
- you are given a cute lil italian coffee bean as a pet.
- you must wash it, give it love with handpose and feed it with annyang
- it also goes to school which it will learn english with annyang
- after school is done it will go back home and go to bed
- once it goes to bed, a new day begins and it evolves into something cooler!
- its final form is CAPPUGOTCHI a delicious cappucino
- there are 3 evolutions!

*/

"use strict";

//main game variables
let tamagotchiEgg; //this is the variable used for the tamagotchi

//all images for the tamagotchis emotions and evolutions
let tamagotchiImg01;
let tamagotchiImg02;
let tamagotchiImg03;
let tamagotchiImg04;
let tamagotchiImg05;
let tamagotchiImg06;
let tamagotchiImg07;

//header info
let energyCounter = 0;
let tamagotchiEnergy = 2000; //max energy amount
let tamagotchiLVL = 1; //starts at evolution level 1
let hour = 6; //day starts at 6am

//bathroom variables
let bubbleImg; //image for bubbles
let numBubbles = 10; //number of bubbles
let bubbles = []; //bubble array
let numShowerWater = 200 //number of water droplets in the shower
let showerWater = []; //shower array

//floating pencils for lesson instructions
let pencilImg; //pencil image
let numPencils = 20; //number of pencils
let pencils = []; //pencil array


//living room variables
//handpose variables
let video = undefined; //user's webcam
let modelName = `HANDPOSE`; //name of my model
let handpose = undefined; //handpose object
let predictions = []; //array of predictions once handpose is running
//get the ratio of the user's webcam
let webcamRatio = {
  x: undefined,
  y: undefined
};

//index finger for handpose
let finger = {
  x: undefined,
  y: undefined,
  size: 50,
  image: undefined,
};
//image for the index finger
let fingerImg;


//kitchen variables
//array of the tamagotchi's favourite italian food
let italianFood = [
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

let foodRightAnswer = 0; //the amount of right answers guessed by the user
let foodWrongAnswer = 0; //the amount of wrong answers guessed by the user

//school variables
//school day 01 lesson 01
let schoolLesson01 = {
  currentEnglishWord: ``,
  currentItalianWord: ``,
};

//school day 02 lesson 02
let schoolLesson02 = {
  currentEnglishWord02: ``,
  currentItalianWord02: ``,
}
//current answers said by the user
let currentLessonAnswer01 = ``;
let currentLessonAnswer02 = ``;
//data from json file
let italianData;
let englishData;

//scores for right and wrong answers in lesson 01 and lesson 02
let schoolRightAnswers = 0;
let schoolMaxRightAnswers = 5;

let schoolWrongAnswers = 0;
let schoolMaxWrongAnswers = 10;


//timer variables to check if its time for bed
let bedTimeTimerDelay = 700;
let bedTimeTimerDone = false;


//background image variables
let bathroomBg; //for the bathroom
let bedroomBg; //for the bedroom
let kitchenBg; //for the kitchen
let livingRoomBg; //for the living room
let schoolYardBg; //for the school yard
let classroomBg; //for the class

//fonts
let pixelFont; //pixelated font
let cuteFont; //bubble font

//sounds
let song01; //main song
let blingSfx; //sfx for right answers
let badSfx; //sfx for wrong answers
let petSfx; //sound for when you pet the tamagotchi

let state = `start`; // the project starts with the start state


//------------------------------------------------------//
//---------***********PRELOAD***********----------------//
//------------------------------------------------------//

//loads all images, sounds, fonts and json for the game
function preload() {

  //load all the fonts
  pixelFont = loadFont(`assets/fonts/dogica.otf`);
  cuteFont = loadFont(`assets/fonts/bubble.ttf`);

  //loads all the tamagotchi's evolutions and emotions
  tamagotchiImg01 = loadImage(`assets/images/tamagotchi_01.png`);
  tamagotchiImg02 = loadImage(`assets/images/tamagotchi_02.png`);
  tamagotchiImg03 = loadImage(`assets/images/tamagotchi_03.png`);
  tamagotchiImg04 = loadImage(`assets/images/tamagotchi_04.png`);
  tamagotchiImg05 = loadImage(`assets/images/tamagotchi_05.png`);
  tamagotchiImg06 = loadImage(`assets/images/tamagotchi_06.png`);
  tamagotchiImg07 = loadImage(`assets/images/tamagotchi_07.png`);

  //load finger img for handpose
  fingerImg = loadImage(`assets/images/heart.png`);


  //load all the background images
  bathroomBg = loadImage(`assets/images/bathroom.png`)
  bedroomBg = loadImage(`assets/images/bedroom.png`);
  kitchenBg = loadImage(`assets/images/kitchen.png`);
  livingRoomBg = loadImage(`assets/images/livingRoomBg.png`);
  schoolYardBg = loadImage(`assets/images/schoolyardBg.png`);
  classroomBg = loadImage(`assets/images/classroomBg.png`);

  //load small icon images
  bubbleImg = loadImage(`assets/images/bubble.png`);
  pencilImg = loadImage(`assets/images/pencil.png`);

  //load button images
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

  //load json data
  englishData = loadJSON(`data/school_lesson.json`);
  italianData = loadJSON(`data/school_lesson.json`);

  //load sounds
  song01 = loadSound(`assets/sounds/Cute.mp3`);
  blingSfx = loadSound(`assets/sounds/bling.mp3`);
  badSfx = loadSound(`assets/sounds/bad.mp3`);
  petSfx = loadSound(`assets/sounds/pet.mp3`);

}

//------------------------------------------------------//
//---------***********SETUP***********------------------//
//------------------------------------------------------//

//Setup all the classes, annyang, and create the canvas
function setup() {
  createCanvas(1280, 720);

  setupTamagotchi(); //setup tamagotchi
  setupBubbles(); //setup floating bubbles
  setupPencils(); //setup floating pencils
  setupShower(); //setup shower water
  setupAnnyang(); //setup for annyang
}

//function to setup annyang
function setupAnnyang() {
  //checks if annyang is available
  if (annyang) {
    //create the guessing command
    let commands = {

      "eat some *food": feed,
      "the answer is *phrase": guessAnswer
    };
    //setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
    feed(); //calls function to check if one of the foods guessed is part of the list of foods

  }
}

//setup tamagotchi from tamagotchi class
function setupTamagotchi() {
  let x = width / 2; //start in middle of canvas
  let y = height / 2 + 150; //start on the floor of the room
  //get all the images for all the evolutions and emotions
  tamagotchiEgg = new Tamagotchi(x, y, tamagotchiImg01, tamagotchiImg02, tamagotchiImg03, tamagotchiImg04, tamagotchiImg05, tamagotchiImg06, tamagotchiImg07);
}

//setup the bubbles for the bathroom from the Bubble class
function setupBubbles() {
  //loop through all the bubbles
  for (let i = 0; i < numBubbles; i++) {
    //middle of canvas
    let x = width / 2;
    let y = height / 2;
    //create bubble with an image
    let bubble = new Bubble(x, y, bubbleImg);
    bubbles.push(bubble);
  }
}

//setup pencils from pencil class
//used in the school lesson instructions
function setupPencils() {
  //loop through all the pencils
  for (let i = 0; i < numPencils; i++) {
    //random x and y position
    let x = random(0, width);
    let y = random(0, height);
    //create pencils with an image
    let pencil = new Pencil(x, y, pencilImg);
    pencils.push(pencil);
  }
}

//setup shower from the shower class
//used in the bathroom state when the user washes the tamagotchi
function setupShower() {
  //loop through all the water in the shower
  for (let i = 0; i < numShowerWater; i++) {
    let x = random(480, 780); //random position in the width of the tub
    let y = random(0, -height); //random y position
    //create shower
    let shower = new Shower(x, y);
    showerWater.push(shower);
  }
}

//function to setup handpose for the living room state
//used when the user pets the tamagotchi with their index finger
function setupHandpose() {
  //hide the user's webcam
  video.hide();
  // Start the Handpose model and switch to our livingroom state when it loads
  //calculate ratio of the canvas to the webcam
  webcamRatio.x = width / video.elt.videoWidth; //change the user's webcam x ratio to the x of the canvas
  webcamRatio.y = height / video.elt.videoHeight; //change the user's webcam y ratio to the y of the canvas
  handpose = ml5.handpose(video, {
    flipHorizontal: true //flips camera
  }, function() {
    state = `livingRoom` //calls the living room state
  });
  /**Listen for prediction events from Handpose and store the results in our
  predictions array when they occur **/
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
  else if (state === `bedroom`) {
    bedroom();
  }
  else if (state === `loading`) {
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
  else if (state === `schoolYard`) {
    schoolYard();
  }
  else if (state === `lesson01Instructions`) {
    lesson01Instructions();
  }
  else if (state === `lesson02Instructions`) {
    lesson02Instructions();
  }
  else if (state === `schoolDay01`) {
    schoolDay01();
  }
  else if (state === `schoolDay02`) {
    schoolDay02();
  }
  else if (state === `day02`) {
    day02();
  }
  else if (state === `day03`) {
    day03();
  }
  else if (state === `dead`) {
    dead();
  }
}

//function to generate all the lesson 01 words from the json file
//convert them all to lowercase so that the user's answer matches the words
function generateLesson01() {
  //get the italian words in lesson 01 array
  let italianTranslation = random(italianData.lesson01);
  //get the current italian word from the italian words
  schoolLesson01.currentItalianWord = italianTranslation.italian.toLowerCase();

  //get the english words in lesson 01 array
  let englishTranslation = italianTranslation;
  //get the current english word from the english words
  schoolLesson01.currentEnglishWord = englishTranslation.english.toLowerCase();

}

//function to generate all the lesson 02 words from the json file
//convert them all to lowercase so that the user's answer matches the words
function generateLesson02() {
  //get the italian words in lesson 02 array
  let italianTranslation = random(italianData.lesson02);
  schoolLesson02.currentItalianWord02 = italianTranslation.italian.toLowerCase();
  //get the italian words in lesson 02 array
  let englishTranslation = italianTranslation;
  schoolLesson02.currentEnglishWord02 = englishTranslation.english.toLowerCase();
}

/**function to check through array of food in the kitchen state and
see if it matches with what the user says **/
function feed(food) {
  if (state === `kitchen`) { // if the user is in the kitchen
    if (italianFood.includes(food)) { //if the user's food guess is part of the the food array
      foodRightAnswer++; // if it is right then increase the score by 1
      tamagotchiEnergy += 10; //decrement the energy by 10
      blingSfx.play(); //play good sound if you guess the right food
      //make sure the energy stays below 2000
      if (tamagotchiEnergy > 2000) {
        tamagotchiEnergy = 2000;
      }
    }
    //if the guess is not part of the food array
    else {
      foodWrongAnswer++; //if wrong increase wrong score by 1
      tamagotchiEnergy -= 10; //decrease energy by 10
      badSfx.play(); //play bad sfx
    }
  }
}

//function to guess the answer in the school day 1 and 2
//calls the checkscore function to see if its user answers correctly
function guessAnswer(phrase){
  if(state === `schoolDay01`){
    currentLessonAnswer01 = phrase.toLowerCase(); //convert to lower case
    checkLessonScore(); //checks lesson score
  }
  else if(state === `schoolDay02`){
    currentLessonAnswer02 = phrase.toLowerCase(); //convert to lower case
    checkLessonScore(); //checks lesson score
  }
}

//function to check if the finger overlaps with the tamagotchi in the living room
function overlapTamagotchi(){
  let d = dist(finger.x, finger.y, tamagotchiEgg.x, tamagotchiEgg.y);
  if(d < tamagotchiEgg.size/2){
    tamagotchiEgg.pet(); //calls pet function from tamagotchi class
    petSfx.setVolume(0.1); //set volume of pet sound
    petSfx.play(); //play pet sound
    tamagotchiEnergy+=5; //increase energy by 5
    tamagotchiEnergy = 2000; //max energy is 200
  }
}

/*Updates the position of the finger according to the latest prediction and
 matches it to the ratio of the camera*/
function updatehand(hand){
  let index =  hand.annotations.indexFinger[3];
  finger.x = index[0] * webcamRatio.x; //updates finger x position with the user's webcam ratio
  finger.y = index[1] * webcamRatio.y; //updates finger y position with the user's webcam ratio
}


//function to decrease the energy and check if its under 0 or over 2000
function checkCounter() {
  tamagotchiEnergy -= 5; //decreases by 5 overtime
  //if the energy reaches 0 then the tamagotchi dies
  if (tamagotchiEnergy <= 0) {
    state = `dead`;
  }
  //make sure energy doesn't go over 2000
  if (tamagotchiEnergy >= 2000) {
    tamagotchiEnergy = 2000;
  }
}

//function to increase the hour of the day and bring you to school at 1pm
function checkHour() {
  hour++; //increase hour by 1
  if (hour === 13) {
    state = `schoolYard`; //if the time is 13 pm then its time for school
  }
}

//function to check the lesson score for school day 01 and 02
function checkLessonScore() {
  //if the school day is 01
  if (state === `schoolDay01`) {
    //if the user's answer matches the current english word
    if (currentLessonAnswer01 === schoolLesson01.currentEnglishWord) {
      schoolRightAnswers++; //increase the score by 1
      blingSfx.play(); //play a bling sound
      nextQuestion(); //move on to the next question
      //if the number of right answers = the max right answer
      if (schoolRightAnswers === schoolMaxRightAnswers) {
        state = `bedroom`; //go back to the bedroom
        hour = 20; //set the time to 8 pm
      }
    }
    //if the answer is not the same as the current english word
    else if (currentLessonAnswer01 !== schoolLesson01.currentEnglishWord) {
      schoolWrongAnswers++; //increase wrong answer score by 1
      badSfx.play(); //play bad sfx
      //if the # of wrong answers = max wrong answers
      if (schoolWrongAnswers === schoolMaxWrongAnswers) {
        //tamagotchi dies
        state = `dead`;
      }
    }
  }
  //if the school day is 01
  if (state === `schoolDay02`) {
    //if the user's answer matches the current english word
    if (currentLessonAnswer02 === schoolLesson02.currentEnglishWord02) {
      schoolRightAnswers++; //increase the score by 1
      blingSfx.play(); //play a bling sound
      nextQuestion(); //move onto next question
      //if the number of right answers = the max right answer
      if (schoolRightAnswers === schoolMaxRightAnswers) {
        state = `bedroom`; //go back to the bedroom
        hour = 20; //set the time to 8 pm
      }
      //if the answer is not the same as the current english word
      else if (currentLessonAnswer02 !== schoolLesson02.currentEnglishWord02) {
        schoolWrongAnswers++; //increase wrong answer score by 1
        badSfx.play(); //play bad sfx
        //if the # of wrong answers = max wrong answers
        if (schoolWrongAnswers === schoolMaxWrongAnswers) {
          //tamagotchi dies
          state = `dead`;
        }
      }
    }
  }
}

//function to generate the lesson based on the school day
function nextQuestion() {
  //generate lesson 01 on school day 01
  if (state === `schoolDay01`) {
    generateLesson01();
  }
  //generate lesson 02 on school day 02
  if (state === `schoolDay02`) {
    generateLesson02();
  }
}

//function for responsive voice to say if its time for bed or not
function readyForBed() {
  //check if the sleep button is clicked
  let d = dist(mouseX, mouseY, sleepButton.x, sleepButton.y);
  if (state === `bedroom`) {
    if (d < sleepButton.size / 2) {
      if (hour < 21) { //if the time is less than 9
        tamagotchiEgg.move(); //move the tamagotchi
        tamagotchiEgg.position(); //set y position
        //say the its not time for bed
        responsiveVoice.speak(sleepInstructions01, "UK English Female");
      }
      else {
        //say its time for bed if its 9 or over
        responsiveVoice.speak(sleepInstructions02, "UK English Female");
      }
    }
  }
}

//check if
function checkBedTime() {
  //if the tamagotchi is in 1 of the 4 rooms
  if (state === `livingRoom` || state === `bedroom` || state === `kitchen` || state === `bathroom`) {
    //when the tamagotchi is level 01 evolution
    if (tamagotchiLVL === 1) {
      //if hour is less than 9 pm
      if (hour < 21) {
        //move the tamagotchi
        tamagotchiEgg.move();
        tamagotchiEgg.position();
      }
      //if the hour is 9
      else if (hour === 21) {
        //put the tamagotchi in bed
        tamagotchiEgg.getInBed();

        //bed delay timer to call day 02 state
        bedTimeTimerDelay -= 5; //decrease timer by 5
        if (bedTimeTimerDelay <= 0) { //if the timer reaches 0
          bedTimeTimerDone = true; //change the boolean to true
        }
        //when the timer is done call day02 state
        if (bedTimeTimerDone) {
          state = `day02`;

        }
      }
    }
    //when the tamagotchi is level 02 evolution
    else if (tamagotchiLVL === 2) {
      //if hour is less than 9
      if (hour < 21) {
        //move the tamagotchi
        tamagotchiEgg.move();
        tamagotchiEgg.position();
      }
      //if the hour is 9
      else if (hour === 21) {
        //put the tamagotchi in bed
        tamagotchiEgg.getInBed();

        //bed delay timer to call day 03 state
        bedTimeTimerDelay -= 5; //decrease timer by 5
        if (bedTimeTimerDelay <= 0) { //if the timer reaches 0
          bedTimeTimerDone = true; //change the boolean to true
        }
        //when the timer is done call day03 state
        if (bedTimeTimerDone) {
          state = `day03`;

        }
      }
    }
  }
}

//function to update tamagotchi
//calls update function from tamagotchi class
//displays, add dirts, removes dirt and checks for dirt
function updateTamagotchi() {
  tamagotchiEgg.update();
}


//function to update bubbles in the bathroom
//calls update function from bubble class
//moves, jitters and displays the bubbles
function updateBubbles(){
  //loops through all the bubbles
  for(let i=0; i<numBubbles; i++){
    let bubble = bubbles[i];
    bubbles[i].update();
  }
}

//function to update shower in the bathroom
//calls update function from shower class
//moves, loops and displays shower
function updateShower(){
  //loops through all the water
  for(let i =0; i<numShowerWater; i++){
    let shower = showerWater[i];
   showerWater[i].update();
  }
}

//function to update pencils in the lessonsInstructions
//calls update function from pencil class
//moves and displays the pecils
function updatePencils(){
  //loops through all the pencils
  for(let i=0; i<numPencils; i++){
    let pencil = pencils[i];
    pencils[i].update();
  }
}

//check if the petme button in the living room overlaps with the mouse
function petMe(){
  //in the living room state
  if(state === `livingRoom`){
    let d = dist(mouseX, mouseY, petButton.x, petButton.y);
    if(d<petButton.size/2){
      //if it is does, then responsiveVoice says the pet instructions
      responsiveVoice.speak(petInstructions, "UK English Female");
    }
  }
}


//function to reset all the game variables to their original values when day02 is called
function resetDay02(){
  hour = 6;
  tamagotchiLVL = 2; //changes evolution to 2 when its day02
  tamagotchiEnergy = 2000; //energy set to 2000
  tamagotchiEgg.resetDirt(); //calls reset dirt function
  //set all the scores to 0
  foodRightAnswer = 0;
  foodWrongAnswer = 0;
  schoolRightAnswers = 0;
  schoolWrongAnswers = 0;
}

//function to check if the mouse overlaps with the english button
//in the school day 01 and day 02 state
function englishInstructions() {
  //if its day 01 of school
  if (state === `schoolDay01`) {
    let d = dist(mouseX, mouseY, englishButton.x, englishButton.y);
    if (d < englishButton.size / 2) {
      //says the current english word from lesson 01
      responsiveVoice.speak(schoolLesson01.currentEnglishWord, "UK English Female");
    }
  }
  //if its day 02 of school
  else if (state === `schoolDay02`) {
    let d = dist(mouseX, mouseY, englishButton.x, englishButton.y);
    if (d < englishButton.size / 2) {
      //say the current english word from lesson 02
      responsiveVoice.speak(schoolLesson02.currentEnglishWord02, "UK English Female");
    }
  }
}

//function to check if the mouse overlaps with the italian button
//in the school day 01 and day 02 state
function italianInstructions(){
  //if its day 01 of school
  if(state === `schoolDay01`){
    let d = dist(mouseX, mouseY, italianButton.x, italianButton.y);
    if(d < italianButton.size/2){
        responsiveVoice.speak(schoolLesson01.currentItalianWord, "Italian Male");
    }
  }
  //if its day 02 of school
  if(state === `schoolDay02`){
    let d = dist(mouseX, mouseY, italianButton.x, italianButton.y);
    if(d < italianButton.size/2){
        responsiveVoice.speak(schoolLesson02.currentItalianWord02, "Italian Male");
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
    state= `bedroom`;
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
      state = `bedroom`;
      setInterval(checkCounter, 3000); //every 3 seconds
      setInterval(checkHour, 10000); //every 10 seconds
    }
  }

  if(state === `schoolYard`){
    if(tamagotchiLVL === 1){
      if(keyCode === 13){
        state = `lesson01Instructions`;
      }
    }
      else if(tamagotchiLVL ===2 ){
        if(keyCode === 13){
          state = `lesson02Instructions`;
        }
      }
    }

  if(state === `lesson01Instructions`){
    if(keyCode === 32){
      state = `schoolDay01`;
      generateLesson01(); //generates the english and italian words
    }
  }
  if(state === `lesson02Instructions`){
    if(keyCode === 32){
      state = `schoolDay02`;
      generateLesson02();
    }
  }
  if(state === `day02`){
    if(keyCode === 13){ //keycode for enter
      state = `bedroom`;
      setInterval(checkCounter, 3000); //every 3 seconds
      setInterval(checkHour, 10000); //every 10 seconds
      resetDay02();
    }
  }
}
