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

}



function setup() {
  createCanvas(500,500);

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


function draw() {
  stateChange();

  if(currentAnswer === currentFruit){
    fill(0, 255, 0);
  }
  else{
    fill(255, 0, 0);
  }
  text(currentAnswer, width/2, height/2);
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

function mousePressed(){
  currentAnimal = random(fruits); //chooses a random fruit
  let reverseFruit = reverseString(currentFruit); //reserves the current Fruit
  responsiveVoice.speak(reverseFruit);

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
