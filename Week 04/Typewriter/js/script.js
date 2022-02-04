/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let string = `All work and no play makes Jack a dull boy`;

let lastCharacter = 0;
let cursorVisible = true;


function preload() {

}


function setup() {

  createCanvas(500, 500);

}


function draw() {

background(200);

let x = 10;
let y = 100;

let currentString = string.substring(0, lastCharacter);

push();
textSize(18);
pop();
}
