/**
Project 01
Ines Pioselli

Ratatouille simulator
ideas:
  - chase remi with the broom
  - remi runs away from mouse traps
  - object identification to make meal
  -
*/

"use strict";

let disneyFont;

let startBg;
let menuBg;

let menuSong;

let state = `start`;



function preload() {

  disneyFont = loadFont(`assets/fonts/waltograph42.otf`);

  menuSong = loadSound(`assets/sounds/Le-Festin.mp3`);

}


/**
Description of setup
*/
function setup() {
  createCanvas(800, 800);

}


function draw() {

changeState();
}


function changeState(){
  if (state === `start`){
    start();
  }
  else if(state === `menu`){
    menu();
  }
}


function start(){
  background(0);

  push();
  textAlign(CENTER, CENTER);
  textFont(disneyFont);
  fill(255);
  textSize(50);
  text(`Ines Pioselli Presents`, width/2, height/2);
  pop();
}

function keyPressed(){

  if(state === `start`){
    if(keyCode === 13){ //keycode for ENTER
      state = `menu`;
      menuSong.play();
    }
  }

}
