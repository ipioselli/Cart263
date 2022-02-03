/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  passWord: `**REDACTED**`
};

let instrumentData = undefined;
let objectData =  undefined;
let taroData = undefined;

function preload(){

  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);

  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);

  taroData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
}




function setup() {
  createCanvas(windowWidth, windowHeight);




}

function generateSpyProfile(){
  spyProfile.name = prompt(`Agent! What is your name?!`);
  let instrument =  random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);

  let card = random();
}

function draw() {

background(255);

let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! ** Name: ${spyProfile.name}
Alias: ${spyProfile.name}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.passWord}`;

push();
textFont(`Courier, monospace`);
textSize(24);
textAlign(LEFT, TOP);
text(profile, 100, 100);
pop();
}
