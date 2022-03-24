/**
Prototype Project 02
Ines Pioselli

Tamagotchi simulator prototype
*/

"use strict";


let evolutionlvl= 1;
let evolutions = 3;

let state = `livingroom`;

function preload() {

}



function setup() {

}



function draw() {

}


function setupStates(){
  if(state === `start`){
    start();
  }
  else if(state === `menu`){
    menu();
  }
}
