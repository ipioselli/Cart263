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
  alias: `**TOP SECRET**`,
  zodiac: `**TOP SECRET**`,
  powers:`**TOP SECRET**`,
  magicWand: `**TOP SECRET**`,
  birthPlace: `**TOP SECRET**`,
  password: `**TOP SECRET**`
};

let sideKickProfile = {
  name: `**TOP SECRET**`,
  zodiac: `**TOP SECRET**`,
  powers:`**TOP SECRET**`,
  birthPlace:`**TOP SECRET**`,
}

let loveCraft; //alias
let streetFighterData; //powers
let zodiacData; //zodiac sign
let artifactData; //wand
let planets;
let gemstones; //password


let cuteFont;

let startBg;
let missionBg;
let gameBg;

let state = `start`;

function preload(){

  loveCraft = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/lovecraft.json`);
  streetFighterData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/games/street_fighter_ii.json`);
  zodiacData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/zodiac.json`);
  artifactData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/archetypes/artifact.json`);
  planets = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/science/planets.json`);
  gemstones = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json`);
}




function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`magical-girl-profile-data`));

  if(data !==null){
    let password = prompt(`Please enter your password.`);
    if(password === data.password){
      magicalGirlProfile.name = data.name;
      magicalGirlProfile.alias = data.alias;
      magicalGirlProfile.zodiac = data.zodiac;
      magicalGirlProfile.powers = data.powers;
      magicalGirlProfile.magicWand = data.magicWand;
      magicalGirlProfile.birthPlace = data.birthPlace;
      magicalGirlProfile.password = data.password;
    }
  }
  else{
    generateMagicalGirlProfile();
  }
}

function generateMagicalGirlProfile(){
  magicalGirlProfile.name = prompt(`Welcome! What is your name?`);
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
