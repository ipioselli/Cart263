/**
4.2  Web Storage API
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let clicks = 0;




function setup() {
  createCanvas(windowWidth, windowHeight);
}


/**
Description of draw()
*/
function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(clicks);
  pop();

}

function mousePressed(){
  clicks++;
}
