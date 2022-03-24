/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// let evolutionlvl = 1;
// let evolutions = 3;



let tamagotchiMenu = {
  x: 1280 / 2,
  y: 720 / 2,
  size: 50,
}

//fonts
let pixelFont;
let pixelFontBold;
let state = `start`;

/**
Description of preload
*/
function preload() {
  pixelFont = loadFont(`assets/fonts/dogica.otf`);
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
}


/**
Description of setup
*/
function setup() {
createCanvas(1280, 720);
}


/**
Description of draw()
*/
function draw() {
  if (state === `start`) {
      start();
    }
    else if (state === `menu`) {
      menu();
    }
    else if(state === `test`){
      test();
    }
}


function start() {
  background(64, 175, 222);

  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(80);
  text(`ENTER to begin`, width / 2, height / 2);
}

function menu() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(80);
  text(`Press spacebar`, width / 2, height / 2);
  pop();
  displayTamagotchiMenu();

}
function test(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(80);
  text(`hallo`, width / 2, height / 2);
  pop();
  displayTamagotchiMenu();

}
function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
}


function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //enter
      state = `menu`;
    }
  }
  if(state === `menu`){
    if(keyCode === 32){
      state = `test`;
    }
  }
}
