/**
Exercise 2: Slamina
Ines Pioselli

Brief:
- add start and end screens √
- add visuals when you get an answer right or wrong √
- add sound effects √
- add a score √
- add different words √

This program is a guessing fruit game inspired by Marina and the Diamonds ablum froot.
The female voice will say the names of the fruits backwards
and you will have to guess what the words are.
If you get 5 right you win and get a nice lil sparkling sound effect.
If you get 5 wrong you lose and get the yoshi blep sound.

*/

"use strict";

//https://github.com/dariusk/corpora/blob/master/data/foods/fruits.json
//array of fruit words
const fruits = [
        "apple",
        "apricot",
        "avocado",
        "banana",
        "bell pepper",
        "bilberry",
        "blackberry",
        "blackcurrant",
        "blood orange",
        "blueberry",
        "boysenberry",
        "breadfruit",
        "canary melon",
        "cantaloupe",
        "cherimoya",
        "cherry",
        "chili pepper",
        "clementine",
        "cloudberry",
        "coconut",
        "cranberry",
        "cucumber",
        "currant",
        "damson",
        "date",
        "dragonfruit",
        "durian",
        "eggplant",
        "elderberry",
        "feijoa",
        "fig",
        "goji berry",
        "gooseberry",
        "grape",
        "grapefruit",
        "guava",
        "honeydew",
        "huckleberry",
        "jackfruit",
        "jambul",
        "jujube",
        "kiwi fruit",
        "kumquat",
        "lemon",
        "lime",
        "loquat",
        "lychee",
        "mandarine",
        "mango",
        "mulberry",
        "nectarine",
        "nut",
        "olive",
        "orange",
        "papaya",
        "passionfruit",
        "peach",
        "pear",
        "persimmon",
        "physalis",
        "pineapple",
        "plum",
        "pomegranate",
        "pomelo",
        "purple mangosteen",
        "quince",
        "raisin",
        "rambutan",
        "raspberry",
        "redcurrant",
        "rock melon",
        "salal berry",
        "satsuma",
        "star fruit",
        "strawberry",
        "tamarillo",
        "tangerine",
        "tomato",
        "ugli fruit",
        "watermelon"
];

//fonts
let retroFont;
let mainFont;

//variables for bouncing fruits at the start state
let numStartFruitImages = 7;
let numStartFruits = 100;
let startFruitsImages = [];
let startFruits = [];
let gravityForce = 0.0025; //gravity

//variables for the game state
let currentFruit = ``;
let currentAnswer = ``;

//for correct answers
let rightAnswers = 0;
let maxRightAnswers = 5;

//for wrong answers
let wrongAnswers = 0;
let maxWrongAnswers = 5;

let goodSFX; // good sfx when you get the answer right
let badSFX; // bad sfx when you get the answer wrong
let song; // instructions song

let gameBg; // variable for the game state background
let winBg; // variable for the win state background

//declares variable for the angry fruit in the lose state
let angryFruit = {
  x: 400,
  y: 550,
  size: 0,
  grow: true,
  growAmount:3,
}

let canvas; //declares the canvas

let state = `enter`; //beginning state

//preloads all the images, sounds and fonts
function preload() {

  //loads an array of fruit images for the start state
  for (let i = 0; i < numStartFruitImages; i++) {
    let fruitImage = loadImage(`assets/images/fruit${i}.png`);
    startFruitsImages.push(fruitImage);
  }
  //load fonts
  retroFont = loadFont(`assets/fonts/neon.otf`);
  mainFont = loadFont(`assets/fonts/Bohemian Soul.otf`);

  //loads background images
  gameBg = loadImage("assets/images/game-bg.png");
  winBg = loadImage("assets/images/win-bg.png");

  //loads angry fruit image
  angryFruit.image = loadImage("assets/images/angryFruit.png");

  //load sounds
  goodSFX = loadSound(`assets/sounds/good.mp3`);
  badSFX = loadSound(`assets/sounds/bad.mp3`);
  song = loadSound(`assets/sounds/FROOT.mp3`);

}

//setups annyang and all the fruits
function setup() {
  canvas = createCanvas(800, 800);
  windowResized(); //responsive window resizing
  setupFruits(); //sets up all the fruit images for the start state

  //setups annyang for speech recognition
  //checks if annyang is available
  if(annyang){
    //create the guessing command
    let commands = {
      'I think it is *fruit': guessFruit
    };
    //setup annyang and start
    annyang.addCommands(commands);
    annyang.start();

    //text defaults
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

//create fruit objects at random locations from the Fruit class for the start state
function setupFruits(){
  for(let i = 0; i < numStartFruits; i++){
      let x = random(0, width);
      let y = random(0, height);
      let fruitImage = random(startFruitsImages);
      let startFruit = new Fruit(x, y, fruitImage);
      startFruits.push(startFruit);
    }
}

//Pippins code for resizing the canvas
function windowResized(){
  let canvasRatio = height / width;
  let windowRatio = windowHeight / windowWidth;

  // Create variables to store the new width and height
  let newWidth = undefined;
  let newHeight = undefined;

  // If the window ratio is smaller, we'll use the window height to
  // set the basis of our new canvas dimensions.
  if (windowRatio < canvasRatio) {
    // Our canvas will fit by setting its height to the window height...
    newHeight = windowHeight;
    // ... and then scaling the width based on the ratio
    newWidth = windowHeight / canvasRatio;
  } else {
    // Our canvas will fit by setting its width to the window width...
    newWidth = windowWidth;
    // ... and then scaling the height based on the ratio
    newHeight = windowWidth * canvasRatio;
}
// Set the canvas's CSS width and height properties to the new values
  canvas.elt.style.width = `${newWidth}px`;
  canvas.elt.style.height = `${newHeight}px`;
}

//display all the states
function draw() {
  stateChange(); //function to change the states
}

//function to switch from state to state
function stateChange(){

  if(state === `enter`){ //added this state so the fruits would reset properly
    enter();
  }
  if (state === `start`){
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
  else if(state === `lose`){
    lose();
  }
}

//function before start state
// incorporates reset function so bouncing fruits can reset
function enter(){
  background(0);
  push();
  textFont(mainFont);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 255, 255);
  text(`ENTER`, width / 2, height / 2);
  pop();

  sparkles(); //sparkling effect
  reset(); //calls the reset function
}

// title screen
// shows the bouncing fruit with the title
// must press enter to move to the instructions
function start() {
  background(0);
  push();
  textFont(retroFont);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 255, 255);
  text(`FROOT GAME!`, width / 2, height / 2 -100);
  textFont(mainFont);
  textSize(20);
  fill(255, 255, 255);
  text(`Press SPACEBAR to Start`, width / 2, height / 2 +100 );
  pop();

  updateFruits(); //calls the function to move and display the fruits
  sparkles(); //calls the sparkles function for the static effect
}


//instructions state
//must press enter to start the game
function instructions(){
  background(0);
  push();
  textFont(mainFont);
  textSize(30);
  fill(255, 255, 255);
  textSize(40);
  text(`Instructions`, width / 2, height / 2 -200 );
  textSize(30);
  text(`1. Say the fruit names in their normal form`, width / 2, height / 2 -100 );
  text(`2. If you get more than 5 wrong you lose :(`, width / 2, height / 2 -50 );
  text(`3. If you get 5 right you win! :D`, width / 2, height / 2 );
  text(`4. Click on the screen to change word`, width / 2, height / 2 + 50 );
  text(`5. Make sure to say "I think it is"`, width / 2, height / 2 + 100 );
  textSize(15);
  text(`Press ENTER to continue`, width / 2, height / 2 + 200 );
  pop();

  sparkles(); //calls sparkles function

}

//game state
//displays all variables to play the game
function game(){
  background(0);
  imageMode(CENTER, CENTER);
  image(gameBg, width / 2, height / 2, 800,800 ); //background image

  sparkles(); //displays static sparkles
  displayFruitWords(); //displays the fruits that the female voice says
  displaycurrentAnswer(); //displays the user's answer
  displayGoodScore(); //displays the right answer score
  displayBadScore(); //displays the wrong answer score
}

//win state when you get 5 right answers
function win(){
  imageMode(CENTER, CENTER);
  image(winBg, width / 2, height / 2, 800,800 ); //background image
  push();
  textFont(mainFont);
  fill(255, 255,255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Congratulations!`, width/2, height/2 -200);
  textSize(30);
  text(`You are a FROOT expert!`, width/2, height/2 -100);
  textSize(20);
  text(`Press R to restart the game`, width/2, height/2);
  pop();

  updateFruits(); //displays bouncing fruit again
  sparkles(); //sparkling static effect

}

//lose state when you get 5 wrong answers
function lose(){
  background(0);
  push();
  textFont(mainFont);
  fill(255, 255,255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`RIP >:(`, width/2, height/2 -200);
  textSize(30);
  text(`You are not worthy of FROOTS`, width/2, height/2 -100);
  textSize(20);
  text(`Press R to restart the game`, width/2, height/2);
  pop();

  growAngryFruit(); //moves the angry fruit
  displayAngryFruit(); //displays the angry fruit
  sparkles(); //sparkling effect

}


//resets the variables for the game
function reset(){

  startFruits = []; //empties the array
  setupFruits();// setup fruit again

  fill(0);
  currentAnswer = ``;
  currentFruit = ``;
  rightAnswers = 0;
  wrongAnswers = 0;
}

//sparkling static effect
function sparkles(){
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}

//function to display and move the fruits
//calls the updateFruits function from the Fruit class
function updateFruits(){
  for (let i =0; i<startFruits.length; i++){ //counting through all the fruits in the array
    let startFruit = startFruits[i];
    startFruits[i].update();
  }

  //calls the gravity function from the Fruit class and passes gravityForce variable through it
  for (let i =0; i<startFruits.length; i++){ //counting through all the animals in the array
    let startFruit = startFruits[i];
    startFruits[i].gravity(gravityForce);
  }
}

//function to check the scores and display the correct states and sound effects
function checkScore(){
  if(currentAnswer === currentFruit){ //if the users answer is the same as the responsiveVoice
    fill(0, 255, 0); //the text becomes green
    rightAnswers++; //the right score goes up by 1
    goodSFX.play(); //plays the good sfx

    if(rightAnswers === maxRightAnswers){ //if the right score = 5
      state = `win`; //calls the win state
    }
    else{
      nextFruit(); //else continues the game
    }
  }
  else{ //if the users answer is different from the responsiveVoice
    fill(255, 0, 0); //the text becomes red
    wrongAnswers++; // wrong score goes up by 1
    badSFX.play(); //plays the bad sfx
    if(wrongAnswers === maxWrongAnswers){ //if the wrong score = 5
      state = `lose`; //calls the lose state
    }
  }
}

//function to grow the angryfruit in the lose state
function growAngryFruit(){
  if (angryFruit.size > 200) { //max size is 200
    angryFruit.grow = false;
  }
  if (angryFruit.size < 20) { //min size is 20
    angryFruit.grow = true;
  }

  if (angryFruit.grow === true) {
    angryFruit.size += angryFruit.growAmount; //if the size is at 20 it will grow
  }
  else {
    angryFruit.size -= angryFruit.growAmount //if the size is at 200 it will shrink
  }
}

//function to display the angry fruit image
function displayAngryFruit(){
  imageMode(CENTER, CENTER);
  image(angryFruit.image, angryFruit.x, angryFruit.y, angryFruit.size, angryFruit.size);
}

//displays the users answer
function displaycurrentAnswer(){
  push();
  textFont(mainFont);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`I think it is ${currentAnswer} `, width/2, height/2 + 200);
  pop();
}

//displays the fruits the responsiveVoice says backwards
function displayFruitWords(){
  push();
  fill(255, 255, 255);
  textFont(mainFont);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Current Fruit: `, width/2 - 150, height/2);
  text(reverseString(currentFruit), width/2 + 150, height/2); //displays reversed fruit
  pop();
}

//displays the right answer score
function displayGoodScore(){
  push();
  fill(255, 255, 255);
  textFont(retroFont);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Right: ${rightAnswers}`, width/2 -180, height/2 -250);
  pop();
}

//displays the wrong answer score
function displayBadScore(){
  push();
  fill(255, 255, 255);
  textFont(retroFont);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Wrong: ${wrongAnswers}`, width/2 + 180, height/2 -  250);
  pop();
}

//reverses the fruit's letters from the array of fruits and lets the responsiveVoice say them
function sayFruitBackwards(fruit){

    let reverseFruit = reverseString(currentFruit); //reserves the current Fruit
    responsiveVoice.speak(reverseFruit);
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

// Called by annyang when the user make a guess.
// fruit parameter contains the guess as a string.
// Sets the answer text to the guess.
function guessFruit(fruit) {
  //converts the letters to lower case
  currentAnswer = fruit.toLowerCase();
  checkScore(); // checks the score
}

//reset the answer text, get a new random fruit, say its name
function nextFruit() {
  currentFruit = random(fruits);
  sayFruitBackwards();
}

//when the user clicks go to the next fruit
function mousePressed() {
  if (state === `game`) {
    nextFruit(); //changes the fruit
  }
}

//handles keyboard input from the user
function keyPressed() {
  if(state === `enter`){
    if(keyCode === 13){ //keycode for enter
      state = `start`;
    }
  }
  if (state === `start`) {
    if (keyCode === 32) { //keycode for spacebar
      state = `instructions`;
      song.setVolume(0.05); //setup the volume
      song.play(); //plays the music
    }
  }

  if (state === `instructions`) {
    if (keyCode === 13) { //keycode for enter
      state = `game`;
      song.stop(); //stops music
    }
  }

  if (state === `win`) {
    if (keyCode === 82) { //keycode for R
      state = `enter`;
    }
  }
  if(state === `lose`){
    if(keyCode === 82){ //keycode for  R
      state = `enter`;
    }
  }
}
