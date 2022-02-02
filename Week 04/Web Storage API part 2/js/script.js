/**
4.2  Web Storage API Part 1
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let userData = {
  name: `stranger`
};



function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`web-storage-name`));
  if(data !== null){
    userData.name = data.name;
  }
  else{
    userData.name = prompt(`what's your name?`);
    localStorage.setItem(`web-storage-name`, JSON.stringify(userData));
  }
}


function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER);
  textStyle(BOLD);
  text(`Howdy, ${userData.name}!`, width/2 , height/2 );
  pop();


}
