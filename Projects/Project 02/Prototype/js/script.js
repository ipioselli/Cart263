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
let tamagotchiImg;

let egg01;
let egg01Img;
let egg02;
let egg02Img;
let egg03;
let egg03Img;

let energyCounter = 0;
let energyTimerDone = false;
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
  egg01Img = loadImage(`assets/images/egg01.png`);
  egg02Img = loadImage(`assets/images/egg02.png`);
  egg03Img = loadImage(`assets/images/egg03.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(1280, 720);

  setupEgg01();
  setupEgg02();
  setupEgg03();

}

function setupEgg01(){
  let x = width/2;
  let y= height/2;
  egg01 = new Tamagotchi(x, y, egg01Img)
}

function setupEgg02(){
  let x = width/2;
  let y= height/2;
  egg02 = new Tamagotchi(x, y, egg02Img)
}

function setupEgg03(){
  let x = width/2;
  let y= height/2;
  egg03 = new Tamagotchi(x, y, egg03Img)
}

//Draws all the states for the game
function draw() {
  if (state === `start`) {
    start();
  } else if (state === `menu`) {
    menu();
  } else if (state === `chooseEgg`) {
    chooseEgg();
  } else if (state === `livingRoom`) {
    livingRoom();
  } else if (state === `kitchen`) {
    kitchen();
  } else if (state === `bathroom`) {
    bathroom();
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
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Living Room`, width / 2, height / 2 + 300)
  pop();
  displayEnergy();
  displayEvolutionLVL();


  if (tamagotchiEgg === egg01) {
    updateEgg01();
  } else if (tamagotchiEgg === egg02) {
    updateEgg02();
  } else if (tamagotchiEgg === egg03) {
    updateEgg03();
  }


}

function kitchen() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Kitchen`, width / 2, height / 2 + 300)

  pop();

  displayEnergy();
  displayEvolutionLVL();

  if (tamagotchiEgg === egg01) {
    updateEgg01();
    tamagotchiEgg = egg01;
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

function updateEgg01(){
  egg01.update();
}

function updateEgg02(){
  egg02.update();
}

function updateEgg03(){
  egg03.update();
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
      setInterval(checkCounter, 2000);
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 50) {
      tamagotchiEgg = egg02;
      state = `livingRoom`;
      setInterval(checkCounter, 2000);
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 51) {
      tamagotchiEgg = egg03;
      state = `livingRoom`;
      setInterval(checkCounter, 2000);
    }
  }

}
