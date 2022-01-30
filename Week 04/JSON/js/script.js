/**
4.1 intro to JSON
Ines Pioselli


*/

"use strict";

let taroData = undefined;
let fortune = `No fortune found yet`;

//loads everything
function preload() {
  //taroData = loadJSON(`assets/data/tarot_interpretations.json`);
}


function setup() {
  createCanvas(windowWidth, windowHeight);



}


function draw() {
  background(255);
  // let firstShadowMeaning = taroData.tarot_interpretations[0].meanings.shadow[0];

  push();
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text(fortune, width /2, height/2);
  pop();
}

//when you click it gives you a random fortune
function mousePressed(){
  loadJSON(`assets/data/tarot_interpretations.json`, tarotLoaded) //same as preload
}

function tarotLoaded(data){
  taroData = data;
  let card  = random(taroData.tarot_interpretations);
  fortune = random(card.fortune_telling);
}
