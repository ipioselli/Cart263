/**
Ines Pioselli
2.1 Constants


*/

"use strict";

const NUM_CIRCLES = 10;
let circleAlpha = 50;
let circleSizeIncrease = 50;


const PI = 3.14159; //constants cannot change value

const MY_FAVOURITE_PROGRAMMING_LANGUAGE = `Javascript`;


function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(500,500);

}


/**
Description of draw()
*/
function draw() {
  background(0);

  circleAlpha = map(mouseX, 0, width, 10, 100);
  circleSizeIncrease = map(mouseY, 0, height, 10, 100);

  for(let i=0; i <NUM_CIRCLES; i++){
    push();
    fill(255,circleAlpha);
    ellipse(width/2, height/2,i*circleSizeIncrease);
    pop();
  }

}
