/**
Prototype Project 02
Ines Pioselli

Tamagotchi simulator prototype
*/

"use strict";


let evolutionlvl= 1;
let evolutions = 3;

let state = `start`;

let tamagotchiMenu = {
  x: 1280/2,
  y: 720/2,
  size: 50,
}

//fonts
let pixelFont;
let pixelFontBold;

function preload() {

  pixelFont = loadFont(`assets/fonts/dogica.otf`);

  tamagotchiMenu.image = loadImage(`assets/images/tamagotchi.png`);

}



function setup() {

  createCanvas(1280, 720);

}



function draw() {
  setupStates();
}


function setupStates(){
  if(state === `start`){
    start();
  }
  else if(state === `menu`){
    menu();
  }
}


function start(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(80);
  text(`ENTER to begin`, width/2, height/2);
  pop();
}

function menu(){

}


function keyPressed(){
  if(state === `start`){
    if(keyCode === 13){
      state = `menu`;
    }
  }
}
