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

let sparkles = [];

let canShoot = true;

let sparkleImg;

let angel;

let wand = {
  x: 0,
  y: 0,
  size: 100,
  image:undefined,
};

let angelKillSFX;
let gameSong;

let startBg;
let instructionsBg;
let gameBg;
let winBg;
let loseBg;

let angelImg;
let wandImg;
let angelsKilled = 0;
let maxAngelsKilled = 7; //lucky angel number

let timer = 10000;
let timerDone = false;

let titleFont;




function preload(){

  titleFont = loadFont(`assets/fonts/bodoni-mt-5.otf`);
  startBg = loadImage(`assets/images/startBg.png`);

  angelImg = loadImage(`assets/images/angel.png`);
  wandImg = loadImage(`assets/images/wand.png`);
  sparkleImg = loadImage(`assets/images/sparkle.png`);

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
      vy: -3,

    }

}

function draw(){
  changeState();
}

function changeState(){
  if(state === `start`){
    start();
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
  imageMode(CENTER, CENTER);
  image(startBg, width/2, height/2, 640, 480);
  push();
  textSize(50);
  textAlign(CENTER, CENTER);
  textFont(titleFont);
  fill(255, 255, 255);
  text(`Neon Genesis Magical Girl`, width/2, height/2);
  pop();

}

function instructions(){
  background(255, 255, 0);
}

function win(){
  background(0);



}


function loading(){
  background(255, 0, 0);

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
  text(`Loading ${modelName} ....,`, width/2, height/2);
  pop();

}

function game(){
  background(255, 0, 255);

  if(predictions.length>0){
    updateWand(predictions[0]);

    let d = dist(wand.x, wand.y, angel.x, angel.y);
    if(d < angel.size/2){

      angelsKilled++;
      angel.vy--;

      resetAngel();
    }
      displayWand();
  }
  //updateSparkles();
  checkScore();
  checkTimer();
  moveAngel();
  checkOutofBounds();
  displayAngel();
  displayScore();
  displayTimer();
}

function checkScore(){
  if(angelsKilled === maxAngelsKilled){
    state = `win`;
  }
}


function checkTimer(){
  timer -= 1;
  if(timer <=0){
    timer = true;
  }

  if (timerDone){
    state = `lose`;
  }
}

function displayTimer(){
  push();
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  text(`Timer: ${timer}`, width/2 + 200, height/2);
  pop();
}



function updateWand(prediction){
  wand.x = prediction.annotations.indexFinger[3][0];
  wand.y = prediction.annotations.indexFinger[3][1];
}

function resetAngel(){
  angel.x = random(width);
  angel.y = height;
}

function moveAngel(){
  angel.x += angel.vx;
  angel.y += angel.vy;
}

function checkOutofBounds(){
  if(angel.y < 0){
    resetAngel();
  }
}

function displayAngel(){
  imageMode(CENTER, CENTER);

  image(angelImg, angel.x, angel.y, angel.size, angel.size);

}

function displayWand(){
  push();
  stroke(255);
  strokeWeight(2);
  line(wand.x, wand.y,);
  pop();
  imageMode(CENTER, CENTER);
  image(wandImg, wand.x, wand.y, wand.size, wand.size);
}

function displayScore(){
  push();
  textSize(20);
  text(`Score: ${angelsKilled}`, width/2, height/2);
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
