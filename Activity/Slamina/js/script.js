/**
3.1  Responsive voice
Ines Pioselli

*/

"use strict";


function preload() {

}



function setup() {
  createCanvas(500,500);

}


function draw() {
  background(0);

}

function mousePressed(){
  responsiveVoice.speak("1 2 3", "UK English Male", {
    pitch:2,
    rate:1.5,
    volume: 1
  }); //says something when you click the canvas
}
