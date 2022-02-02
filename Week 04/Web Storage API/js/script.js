/**
4.2  Web Storage API Part 1
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let clicks = 0;

let gameData = {
  highScore: 0
};



function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`click-attack-game-data`));
  if(data !== null){
    gameData =  data;
  }
}


function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(clicks, width/2 , height/2 );
  pop();

  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  fill(0);
  text(`High score: ${gameData.highScore}`, 100, 100);
  pop();

}

function mousePressed(){
  clicks++;

  if(clicks > gameData.highScore){
    gameData.highScore = clicks; //updates game data
    localStorage.setItem(`click-attack-game-data`, JSON.stringify(gameData)); //name should always be specific
  }
}

function keyPressed(){
  if(key === `c`){
    localStorage.removeItem(`click-attack-game-data`); //deletes the data after you reload
  }
}
