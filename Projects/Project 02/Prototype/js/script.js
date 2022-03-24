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



let state = `livingRoom`; // the prototype starts with the title state

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
  }
  else if (state === `menu`) {
    menu();
  }
  else if (state === `chooseEgg`) {
    chooseEgg();
  }
  else if (state === `livingRoom`) {
    livingRoom();
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

  push();
  background(186, 219, 205);
  pop();
  displayEnergy();
  displayEvolutionLVL();
  if(tamagotchiEgg === egg01){
    displayTamagotchiEgg01();
  }
  else if(tamagotchiEgg === egg02){
  displayTamagotchiEgg02();
  }

  else if(tamagotchiEgg === egg03){
    displayTamagotchiEgg03();
  }


}

function displayTamagotchiEgg01() {
  imageMode(CENTER, CENTER);
  image(egg01.image, egg01.x, egg01.y, egg01.size, egg01.size);
}
function displayTamagotchiEgg02() {
  imageMode(CENTER, CENTER);
  image(egg02.image, egg02.x, egg02.y, egg02.size, egg02.size);
}



function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
  //jitter the tamagotchi
  tamagotchiMenu.x = tamagotchiMenu.x + random(-1, 1);
}

function displayEnergy(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Energy: ${tamagotchiEnergy}`, width / 2 + 400, height / 2 - 300);
  pop();

}

function displayEvolutionLVL(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Evolution: ${tamagotchiLVL}`, width / 2 - 400, height / 2 - 300);
  pop();
}

//keyboard input
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //keycode for ENTER
      state = `menu`;
    }
  }
  if (state === `menu`) {
    if (keyCode === 32) {
      state = `chooseEgg`;
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 49) {
      tamagotchiEgg = egg01
      state = `livingRoom`;
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 50) {
      tamagotchiEgg = egg02;
      state = `livingRoom`;
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 51) {
      tamagotchiEgg = egg03;
      state = `livingRoom`;
    }
  }

}
