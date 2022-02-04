/**
Ines Pioselli
Exercise 03: Spy Profile Generator Plus

Brief:
- improve the visual display of the PROFILE
- add more categories to the PROFILE
- add the ability to change specific categories in their PROFILE
- use voice synthesis and voice recognition for identification
- ask for a username and password instead of just a password


magicalGirlProfile = spyProfile
*/

"use strict";

let magicalGirlProfile = {
  name: `**TOP SECRET**`,
  magicalGirlAlias: `**TOP SECRET**`,
  zodiac: `**TOP SECRET**`,
  powers:`**TOP SECRET**`,
  magicWand: `**TOP SECRET**`,
  password: `**TOP SECRET**`
};

let sideKickProfile = {
  name: `**TOP SECRET**`,
  zodiac: `**TOP SECRET**`,
  powers:`**TOP SECRET**`,
  birthPlace:`**TOP SECRET**`,
}

let instrumentData;
let objectData;
let taroData;

function preload(){

  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);

  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);

  taroData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
}




function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if(data){
    let password = prompt(`Agent! What is your password?!`);
    if(password === data.password){
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }
  }
  else{
    generateSpyProfile();
  }
}

function generateSpyProfile(){
  spyProfile.name = prompt(`Agent! What is your name?!`);
  let instrument =  random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);

  let card = random(taroData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

function draw() {

background(255);

let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **
Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
password: ${spyProfile.password}`;

push();
textFont(`Courier, monospace`);
textSize(24);
textAlign(LEFT, TOP);
text(profile, 100, 100);
pop();
}

function changeState(){
  if(state === `start`){
    start();
  }
  else if(state === `mission`){
    mission();
  }
  else if(state === `game`){
    game();
  }
}

function start(){

  push();
  pop();

  sparkles();

}

function mission(){

}

function sparkles(){
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}
