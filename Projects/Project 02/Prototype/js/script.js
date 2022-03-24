/**
Project 2 Prototype
Long Leg Fishy Dating Simulator
Ines Pioselli

This is a prototype of my love simulator. The first few states show examples of how the style will look.
The minigame is a very rough and small scale of what will happen. The user will have an array of balls bouncing around and they must doge them and
get to their fish lover to win their heart back. For now I just used 3 ellipses to show what will happen.


*/

"use strict";

let tamagotchiMenu = { // button to access the tutorial state
  x:1280/2,
  y:720/2,
  size:200,
}




let state = `start`; // the prototype starts with the title state

let pixelFont;

/**
Description of preload
*/
function preload() {
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
  pixelFont = loadFont(`assets/fonts/dogica.otf`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(1280, 720);


}


//Draws all the states for the game
function draw() {
  if(state === `start`){
    start();
  }
  else if(state === `menu`){
    menu();
  }

}


//title state : homepage
function start(){


  push();
  background(64, 175, 222);
  textFont(pixelFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255, 255, 255);
  text(`Press ENTER to start!`, width / 2 + 50, height / 2+350);

  pop();

}


//When you hover over the tutorial button it will bring you to the tutorial state
function menu(){
  push();
  background(64, 175, 222);
  textAlign(CENTER, CENTER);
    textFont(pixelFont);
    fill(255);
    textSize(80);
    text(`Press spacebar`, width / 2, height / 2);
  pop();
  displayTamagotchiMenu();
}


//displays the first page with the main character
function displayTamagotchiMenu() {
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
}

//keyboard input
function keyPressed(){
  if(state === `start`){
    if (keyCode === 13){ //keycode for ENTER
      state = `menu`;
    }
  }



}
