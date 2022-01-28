/**
Activity 2: Slamina
Ines Pioselli
Brief:
- add start and end screens
- add visuals when you get an answer right or wrong
- add sound effects
- add a counter
- add different words

*/

"use strict";

//https://github.com/dariusk/corpora/blob/master/data/foods/fruits.json
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

let currentFruit = ``;
let currentAnswer = ``;

//for correct answers
let correctMaxScore = 5;
let currentScore = 0;

//for wrong answers
let currentLives = 5
let livesLeft = 0;


let state = `start`;

function preload() {

//load fonts
retroFont = loadFont(`assets/fonts/neon.otf`)
}



function setup() {
  canvas = createCanvas(800, 800);
  windowResized();

  if(annyang){
    let commands = {
      'I think it is *fruits': guessFruit
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }

}

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
  stateChange();


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
  textSize(40);
  fill(255, 255, 255);
  text(`FROOT GAME!`, width / 2, height / 2);
  pop();

  //adds sparkling effect
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}

function instructions(){
  background(0);

}

function game(){
  background(0);

  if(currentAnswer === currentFruit){
    fill(0, 255, 0);
  }
  else{
    fill(255, 0, 0);
  }
  text(currentAnswer, width/2, height/2);
}

function mousePressed(){
  if(state === `game`){ //only works when you are in the game state
    currentFruit = random(fruits); //chooses a random fruit
    let reverseFruit = reverseString(currentFruit); //reserves the current Fruit
    responsiveVoice.speak(reverseFruit);
  }
}

function guessFruit(fruit){
  currentAnswer = fruit.toLowerCase();
  console.log(currentAnswer);
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

function keyPressed() {
  if (state === `start`) {
    if (keyCode === 32) { //keycode for spacebar
      state = `instructions`;
    }
  }

  if (state === `instructions`) {
    if (keyCode === 13) { //keycode for enter
      state = `game`;
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
