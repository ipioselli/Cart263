/**
Title of Project
Author Name


*/

let bgColor = `#ff0000`;

"use strict";

function preload() {

}


function setup() {
  createCanvas(500, 500);

  setTimeout(changeBg,2000); //waits 2 sec to change color,

}

function draw() {
background(bgColor);

}

function changeBg(){
  bgColor = `#ffff00`;
}
