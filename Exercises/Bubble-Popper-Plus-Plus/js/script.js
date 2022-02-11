/**
Exercise 4: Bubble popper
Ines Pioselli

Brief:
- count the bubbles that have been popped
- improve visuals and add sound effects (sound when popped)
- add states: title, loading and ending
- make it harder to pop the bubble over time
in update increase the velocity
- add many bubbles

steps:
- add bubble js file
- bubble images

Game:
- have bubble move across the screen and get faster eachtime
if the pin is too close it change the position. Time limit and if you pop a certain amount of bubbles
you win if not you lose.
-


*/

"use strict";


let video = undefined;

let handpose =  undefined;

let predictions = [];

let bubble = undefined;
let bubblesImages = [];
let bubbles = [];


let bubblePopSFX;




function preload(){

}
/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  handpose = ml5.handpose(video,{
    flipHorizontal: true //flips camera
    }, function(){
      console.log(`Model loaded.`);
    });

    handpose.on(`predict`, function(results){
      predictions = results;
    });


}


/**
Description of draw()
*/
function draw() {

  background(0);

  if(predictions.length>0){
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if(d < bubble.size/2){
      bubble.x = random(width);
      bubble.y = height;

    }
  }

  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if(bubble.y < 0){
    bubble.x = random(width);
    bubble.y = height;
  }

  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();

}
