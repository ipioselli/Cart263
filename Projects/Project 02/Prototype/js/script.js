/**
Project 2 prototype
Ines Pioselli
Tamagotchi Sim

*/

"use strict";

let tamagotchiMenu = { // button to access the tutorial state
  x: 1280 / 2,
  y: 720 / 2,
  size: 300,
}



let state = `start`; // the prototype starts with the title state

let tamagotchiEgg;
let newTamagotchiEgg;
let egg01 = {
  x: 1280 / 2,
  y: 720 / 2,
  size: 300,
}
let egg02 = {
  x: 1280 / 2,
  y: 720 / 2,
  size: 300,
}
let egg03 = {
  x: 1280 / 2,
  y: 720 / 2,
  size: 300,
}

let tamagotchiEnergy = 2000;
let tamagotchiLVL = 1;

let tamagotchi;

let chooseEggBG;

let pixelFont;

/**
Description of preload
*/
function preload() {
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
  pixelFont = loadFont(`assets/fonts/dogica.otf`);

  chooseEggBG = loadImage(`assets/images/chooseEggBG.png`);
  egg01.image = loadImage(`assets/images/egg01.png`);
  egg02.image = loadImage(`assets/images/egg02.png`);
  egg03.image = loadImage(`assets/images/egg03.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(1280, 720);


}


//Draws all the states for the game
function draw() {
  if (state === `start`) {
    start();
  } else if (state === `menu`) {
    menu();
  }
  else if(state === `chooseEgg`){
    chooseEgg();
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
  text(`Press spacebar`, width / 2, height / 2 + 200);
  pop();
  displayTamagotchiMenu();
}

function chooseEgg(){
  imageMode(CENTER, CENTER);
  image(chooseEggBG, width/2, height/2, 1280, 720);
  push();
  pop();
}

function livingRoom(){
  
}

function displayTamagotchiEgg(){

}


function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
  //jitter the tamagotchi
  tamagotchiMenu.x = tamagotchiMenu.x + random(-1, 1);
}

//keyboard input
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //keycode for ENTER
      state = `menu`;
    }
  }
  if(state === `menu`){
    if(keyCode === 32){
      state = `chooseEgg`;
    }
  }
  if(state === `chooseEgg`){
      if(keyCode === 49){
        tamagotchiEgg === egg01;
        state = `livingRoom`;
      }
  }
  if(state === `chooseEgg`){
      if(keyCode === 50){
        tamagotchiEgg === egg02;
        state = `livingRoom`;
      }
  }
  if(state === `chooseEgg`){
      if(keyCode === 51){
        tamagotchiEgg === egg03;
        state = `livingRoom`;
      }
  }




}
