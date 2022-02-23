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
let instructionsBg;

let gameButton = { // button to access the tutorial state
  x: 400,
  y: 300,
  size: 600,

};


let menuSong;

let state = `start`;



function preload() {

  //fonts
  disneyFont = loadFont(`assets/fonts/waltograph42.otf`);

  //sounds
  menuSong = loadSound(`assets/sounds/Le-Festin.mp3`);

  //background images
  startBg = loadImage(`assets/images/StartBg.gif`);
  menuBg = loadImage(`assets/images/menuBg.png`);

  //buttons
  gameButton.image = loadImage(`assets/images/gameButton.png`);
}


//setup of the canvas
function setup() {
  createCanvas(1280, 720);

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
  else if(state === `instructions`){
    instructions();
  }
  else if(state === `game`){
    game();
  }
}


function start(){
  imageMode(CENTER, CENTER);
  image(startBg, width/2 , height/2, 1280, 720);

  push();
  textAlign(CENTER, CENTER);
  textFont(disneyFont);
  fill(255);
  textSize(50);
  text(`ENTER to begin`, width/2, height/2-300);
  pop();
}

function menu(){
  imageMode(CENTER, CENTER);
  image(menuBg, width/2 , height/2, 1280, 720);

  buttonGame();
  mouseOver();
}


function game(){
  background(255);
}

function buttonGame(){
  imageMode(CENTER, CENTER);
  image(gameButton.image, gameButton.x, gameButton.y, gameButton.size, gameButton.size);
}

function buttonInstructions(){

}

//hovering over button effect
function mouseOver(){
  let d = dist(mouseX, mouseY, gameButton.x, gameButton.y);
  if (state === `menu`) {
    if (d < gameButton.size / 2 - 250) { // -60 is added so the mouse only clicks on the button and not dead space around it
      gameButton.size = gameButton.size + 20;
      if(gameButton.size > 700){
        gameButton.size = 700;
      }

    }
    else (gameButton.size = 600);
  }
}


function mousePressed() {
  let d = dist(mouseX, mouseY, gameButton.x, gameButton.y);
  if (state === `menu`) {
    if (d < gameButton.size / 2 - 60) { // -60 is added so the mouse only clicks on the button and not dead space around it
      state = `game`;
    }
  }
}



function keyPressed(){

  if(state === `start`){
    if(keyCode === 13){ //keycode for ENTER
      state = `menu`;
      menuSong.play();
    }
  }

}
