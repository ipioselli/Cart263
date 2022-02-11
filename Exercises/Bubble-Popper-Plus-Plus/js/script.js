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
- neon genesis and sailor moon crossover
- kill the angels with your magic wand
- add a counter for how many angels you kill
- have bubble move across the screen and get faster eachtime
- Time limit and if you pop a certain amount of bubbles
you win if not you lose.




*/

"use strict";

let state = `start`;

let video = undefined;
let modelName = `Handpose`;
let handpose =  undefined;

let predictions = [];

let angel = undefined;

let wand = {
  x: undefined,
  y: undefined,
  size: 20,
};

let bubblePopSFX;
let gameSong;

let startBg;
let instructionsBg;
let gameBg;
let winBg;
let loseBg;

let angelsKilled = 0;
let maxAngelsKilled = 0;




function preload(){

  angel.image = loadImage(`assets/images/angel.png`);
  wand.image = loadImage(`assets/images/wand.png`);

}
/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);





    angel = {
      x: random(width),
      y: height,
      size: 100,
      vx:0,
      vy: -2
    }

}

function draw(){
  changeState();
}

function changeState(){
  if(state === `start`){
    state();
  }
  else if(state === `instructions`){
    instructions();
  }
  else if(state === `loading`){
    loading();
  }
  else if(state === `game`){
    game();
  }
  else if(state === `win`){
    win();
  }
  else if(state === `lose`){
    lose();
  }
}


function start(){
  background(0);

}

function instructions(){
  background(255, 255, 0);
}

function loading(){
  handpose = ml5.handpose(video,{
    flipHorizontal: true //flips camera
    }, function(){
      state = `game`
    });

    handpose.on(`predict`, function(results){
      predictions = results;
    });

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName} ....,` width/2, height/2);
  pop();

}

function game(){
  background(0);
  
  if(predictions.length>0){
    updateWand(predictions[0]);

    let d = dist(wand.x, wand.y, angel.x, angel.y);
    if(d < angel.size/2){
      resetAngel();
    }
    displayWand();
  }
  moveAngel();
  checkOutofBounds();
  displayAngel();
}

function updateWand(prediction){
  angel.x = prediction.annotations.indexFinger[3][0];
  angel.y = prediction.annotations.indexFinger[3][1];
}

function resetAngel(){
  bubble.x = random(width);
  bubble.y = height;
}

function moveAngel(){
  angel.x += angel.vx;
  angel.y += angel.vy;
}

function displayAngel(){
  push();
  image(angel.image, angel.x, angel.y, angel.size, angel.size);
  pop();
}

function displayWand(){
  push();
  image(wand.image, wand.x, wand.y, wand.size, wand.size);
  pop();
}

function displayScore(){
  push();
  textSize(20);
  text()
  pop();
}



  function keyPressed(){
    if(state === `start`){
      if(keyCode === 13){  //keycode for enter
        state = `instructions`;
      }
    }
    if(state === `instructions`){
      if(keyCode === 32){ //keycode for spacebar
        state = `loading`;
        video = createCapture(VIDEO);
        video.hide();

      }

    }

  }
