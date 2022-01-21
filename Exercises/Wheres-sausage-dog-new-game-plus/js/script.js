/**
Exercise 1: Where's Sausage Dog? New Game
Ines Pioselli

ideas:
- have sanrio plushies
-
Brief:
- change the images
- add start and end screens
- add the ability to restart
- add a countdown timer
- add more visuals to the game (have all animals make random sounds or make dog bark)
*/

"use strict";

const NUM_PLUSHY_IMAGES = 10;
const NUM_PLUSHIES = 100;

let plushyImages = [];
let plushies = [];

let scaryPlushyImage = undefined;
let scaryPlushy = undefined;

let goodSFX = undefined;
let badSFX = undefined;

let state = `start`


/**
Preloads all the images for the plushies and the scary plush
*/
function preload() {

  for(let i = 0; i < NUM_PLUSHY_IMAGES; i++){
    let plushyImage = loadImage(`assets/images/plushy${i}.png`);
    plushyImages.push(plushyImage);
  }
  scaryPlushyImage = loadImage(`assets/images/scary-plushy.png`);
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);

//create the plushies
for(let i = 0; i < NUM_PLUSHIES;i++){
    let x = random(0, width);
    let y = random(0, height);
    let plushyImage = random(plushyImages);
    let plushy = new Plushy(x, y, plushyImage, badSFX);
    plushies.push(plushy);
  }

  let x = random(0, width);
  let y = random(0, height);
  scaryPlushy = new ScaryPlushy(x, y, scaryPlushyImage, goodSFX);
}


/**
Description of draw()
*/
function draw() {

  if(state === `start`){
    start();
  }
  else if(state === `instructions`){
    instructions();
  }
  else if(state === `game`){
    game();
  }
  else if(state === `win`){

  }
}

function start(){

}

function updatePlushies(){
  for (let i =0; i<plushies.length; i++){ //counting through all the animals in the array
    plushies[i].update();
  }
}

function updateScaryPlushy(){
  scaryPlushy.update();
}
