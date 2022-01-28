/**
Activity 2: Slamina
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
let currentScore = 0;
let maxRightAnswers = 5;

//for wrong answers
let wrongAnswers = 0;
let maxWrongAnswers = 5;

let goodSFX; // good sfx when you get the answer right
let badSFX; // bad sfx when you get the answer wrong
let song;

let gameBg; // variable for the game state background
let winBg;

let angryFruit = {
  x: 400,
  y: 450,
  size: 0,
  grow: true,
  growAmount:3,
}

let canvas; //declares the canvas

let state = `start`; //beginning state

function preload() {

  for (let i = 0; i < numStartFruitImages; i++) {
    let fruitImage = loadImage(`assets/images/fruit${i}.png`);
    startFruitsImages.push(fruitImage);
  }
  //load fonts
  retroFont = loadFont(`assets/fonts/neon.otf`);
  mainFont = loadFont(`assets/fonts/Bohemian Soul.otf`);

  gameBg = loadImage("assets/images/game-bg.png");
  winBg = loadImage("assets/images/win-bg.png");
  angryFruit.image = loadImage("assets/images/angryFruit.png");

  //load sounds
  goodSFX = loadSound(`assets/sounds/good.mp3`);
  badSFX = loadSound(`assets/sounds/bad.mp3`);
  song = loadSound(`assets/sounds/FROOT.mp3`);

}



function setup() {
  canvas = createCanvas(800, 800);
  windowResized();
  setupFruits();

  if(annyang){
    let commands = {
      'I think it is a *fruit': guessFruit
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }

}
//
// function reset(){
//
// }

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


function draw() {
  stateChange(); //function to change the states

}

function stateChange(){
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

  updateFruits();
  sparkles();
}

//sparkling static effect from cart 253
function sparkles(){
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}

function updateFruits(){
  for (let i =0; i<startFruits.length; i++){ //counting through all the animals in the array
    let startFruit = startFruits[i];
    startFruits[i].update();
  }

  for (let i =0; i<startFruits.length; i++){ //counting through all the animals in the array
    let startFruit = startFruits[i];
    startFruits[i].gravity(gravityForce);

  }
}

function instructions(){
  background(0);
  push();
  textFont(mainFont);
  textSize(30);
  fill(255, 255, 255);
  textSize(30);
  text(`Instructions`, width / 2, height / 2 -200 );
  textSize(20);
  text(`1. Say the fruit names in their normal form`, width / 2, height / 2 -100 );
  text(`2. If you get more than 5 wrong you lose :(`, width / 2, height / 2 -50 );
  text(`3. If you get 5 right you win! :D`, width / 2, height / 2 );
  text(`4. Click on the screen to change word`, width / 2, height / 2 + 50 );
  text(`5. Make sure to say "I think it is a"`, width / 2, height / 2 + 100 );
  textSize(15);
  text(`Press ENTER to continue`, width / 2, height / 2 + 200 );
  pop();

  sparkles();

}

function game(){
  background(0);
  imageMode(CENTER, CENTER);
  image(gameBg, width / 2, height / 2, 800,800 );

  sparkles();

  displayFruitWords();
  displaycurrentAnswer();
  displayGoodScore();
  displayLivesLeft();
}

function checkScore(){
  if(currentAnswer === currentFruit){
    fill(0, 255, 0);
    currentScore++;
    goodSFX.play();

    if(currentScore === maxRightAnswers){
      state = `win`;
    }
    else{
      nextFruit();
    }
  }

  else{
    fill(255, 0, 0);
    wrongAnswers++;
    badSFX.play();
    if(wrongAnswers === maxWrongAnswers){
      state = `lose`;
    }
  }
}

function win(){
  imageMode(CENTER, CENTER);
  image(winBg, width / 2, height / 2, 800,800 );
  push();
  textFont(mainFont);
  fill(255, 255,255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Congratulations!`, width/2, height/2 -200);
  textSize(30);
  text(`You are a FROOT expert!`, width/2, height/2 -100);
  pop();

  updateFruits();

  sparkles();
}

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
  pop();

  moveAngryFruit();
  displayAngryFruit();

  sparkles();
}

function moveAngryFruit(){
  if (angryFruit.size > 200) { //max size is 30
    angryFruit.grow = false;
  }
  if (angryFruit.size < 20) {
    angryFruit.grow = true;
  }

  if (angryFruit.grow === true) {
    angryFruit.size += angryFruit.growAmount; //if the size is at 0 it will grow
  }
  else {
    angryFruit.size -= angryFruit.growAmount //if the size is at 30 it will shrink
  }

}

function displayAngryFruit(){
  imageMode(CENTER, CENTER);
  image(angryFruit.image, angryFruit.x, angryFruit.y, angryFruit.size, angryFruit.size);
}

function displaycurrentAnswer(){
  push();
  textFont(retroFont);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`I think it is a ${currentAnswer} `, width/2, height/2 + 200);
  pop();

}

function displayFruitWords(){
  push();
  fill(255, 255, 255);
  textFont(mainFont);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Current Fruit: `, width/2 - 150, height/2);
  text(reverseString(currentFruit), width/2 + 150, height/2); //displays reversed word
  pop();
}

function displayGoodScore(){
  push();
  fill(255, 255, 255);
  textFont(retroFont);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Right: ${currentScore}`, width/2 -180, height/2 -250);
  pop();

}

function displayLivesLeft(){
  push();
  fill(255, 255, 255);
  textFont(retroFont);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Wrong: ${wrongAnswers}`, width/2 + 180, height/2 -  250);
  pop();
}

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

function guessFruit(fruit) {
  currentAnswer = fruit.toLowerCase();
  checkScore();
}

function nextFruit() {

  currentFruit = random(fruits);
  sayFruitBackwards();
}

function mousePressed() {
  if (state === `game`) {
    nextFruit();
  }
}



function keyPressed() {
  if (state === `start`) {
    if (keyCode === 32) { //keycode for spacebar
      state = `instructions`;
      song.setVolume(0.05);
      song.play();
    }
  }

  if (state === `instructions`) {
    if (keyCode === 13) { //keycode for enter
      state = `game`;
      song.stop();
    }
  }

  if (state === `win`) {
    if (keyCode === 82) { //keycode for R
      state = `start`;
    }
  }
  if(state === `lose`){
    if(keyCode === 82){ //keycode for  R
      state = `start`;
    }
  }
}
