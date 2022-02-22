/**
Project 01
Ines Pioselli

Requirements:
- must be interactive
- must use p5 √
- must use one other library
- must include an artist statement of 300 words

Ratatouille simulator
ideas:
  - chase remi with the broom
  - remi runs away from mouse traps
  - object identification to make meal
  - say ingredients with annyang to get 5 stars
  - pick up the ingredients in the kitchen without getting caught
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


//setup of the canvas
function setup() {
  createCanvas(800, 800);

}

//calls changeState function to switch from state to state
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
  text(`Ratatouille`, width/2, height/2+100);
  text(`ENTER to begin`, width/2, height/2+200);
  pop();
}

function menu(){
  background(0);
}

function keyPressed(){

  if(state === `start`){
    if(keyCode === 13){ //keycode for ENTER
      state = `menu`;
      menuSong.play();
    }
  }

}
