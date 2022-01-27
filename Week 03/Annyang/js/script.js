/**
3.2  Annyang
Ines Pioselli
Annyang only works with chrome
Voice recognition

*/

"use strict";


function preload() {

}



function setup() {
  createCanvas(500,500);

  if(annyang){
    let commands = {
      'hello' : function(){
        alert(`Howdy!`);
      },
      'goodbye':function(){
        alert(`Ciao bella!`);
      }
    };

    annyang.addCommands(commands);
    annyang.start();
  }

}


function draw() {
  background(0);

}

function mousePressed(){

}
