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
  powers:`**TOP SECRET**`,
  magicWand: `**TOP SECRET**`,
  birthPlace: `**TOP SECRET**`,
  password: `**TOP SECRET**`,

  sidekickName: `**TOP SECRET**`,
  sidekickPowers:`**TOP SECRET**`,
  sidekickBirthPlace:`**TOP SECRET**`,

};

let loveCraftData; //alias
let streetFighterData; //powers
let zodiacData; //zodiac sign
let artifactData; //wand
let planetData;
let gemstoneData; //password

let startFont;
let cuteFont;

let startBg;
let missionBg;
let gameBg;

let state = `start`;


function preload(){

  loveCraftData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/lovecraft.json`);
  streetFighterData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/games/street_fighter_ii.json`);
  zodiacData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/zodiac.json`);
  artifactData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  planetData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/science/minor_planets.json`);
  gemstoneData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json`);

  startBg = loadImage("assets/images/start-Bg.png");
  startFont = loadFont("assets/fonts/Chromate-Regular.otf");



}




function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`magical-girl-profile-data`));
    // if(data){
    //   let password = prompt(`Please enter your password.`);
    //   if(password === data.password){
    //     loadMagicalGirlData();
    //     loadSidekickData();
    //   }
    // }
    // else{
      generateMagicalGirlProfile();
    }


function loadMagicalGirlData(){
  magicalGirlProfile.name = data.name;
  magicalGirlProfile.alias = data.alias;
  magicalGirlProfile.powers = data.powers;
  magicalGirlProfile.magicWand = data.magicWand;
  magicalGirlProfile.birthPlace = data.birthPlace;
  magicalGirlProfile.password = data.password;
}

function loadSidekickData(){
  magicalGirlProfile.sidekickName = data.sidekickName;
  magicalGirlProfile.sidekickPowers = data.sidekickPowers;
  magicalGirlProfile.sidekickBirthPlace = data.sidekickBirthPlace;
}

function generateMagicalGirlProfile(){
  magicalGirlProfile.name = prompt(`Welcome! What is your name?`);
  magicalGirlProfile.alias =  random(loveCraftData.deities);

  let power01 = random(streetFighterData.characters);
  magicalGirlProfile.powers = random(power01.moves);


  magicalGirlProfile.magicWand =  random(artifactData.objects);


  magicalGirlProfile.birthPlace = random(planetData.minor_planets);

  magicalGirlProfile.password = random(gemstoneData.gemstones);

  generateSidekickProfile();


  localStorage.setItem(`magical-girl-profile-data`, JSON.stringify(magicalGirlProfile));
}


function generateSidekickProfile(){
  magicalGirlProfile.sidekickName = random(loveCraftData.supernatural_creatures);
  magicalGirlProfile.sidekickZodiac =  random(zodiacData.western_zodiac);
  let power02 = random(streetFighterData.characters);
  magicalGirlProfile.sidekickPowers = random(power02.moves);

  let planet02 = random(planetData.planets);
  magicalGirlProfile.sidekickBirthPlace = random(planet02.name);
}


function draw() {
changeState();


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
  imageMode(CENTER, CENTER);
  image(startBg, width/2, height/2, 1920, 1080);
  push();
  textFont(startFont);
  textSize(50);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(`Magical Girl Simulator!`, width/2, height/2 -100);
  textSize(40);
  text(`Press Enter to begin`, width/2, height/2 + 150);
  pop();

  sparkles();

}

function mission(){
background(0);
}

function game(){
  background(0);
  let profile01 = `** Magical Girl Profile **
  Name: ${magicalGirlProfile.name}
  Magical Girl name: ${magicalGirlProfile.alias}
  Powers: ${magicalGirlProfile.powers}
  Zodiac Sign:  ${magicalGirlProfile.zodiac}
  Magical Weapon: ${magicalGirlProfile.magicWand}
  Birth Place: ${magicalGirlProfile.birthPlace}
  password: ${magicalGirlProfile.password}`;

  let profile02 = ` ** Sidekick Profile **
  Name:  ${magicalGirlProfile.sidekickName}
  Birth Place:  ${magicalGirlProfile.sidekickBirthPlace}`;



  push();
  textFont(`startFont`);
  textSize(24);
  fill(255);
  textAlign(LEFT, TOP);
  text(profile01, 100, 100);
  text(profile02, 100, 500);
  pop();
}

function sparkles(){
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}


function keyPressed(){
  if(state === `start` && keyCode === 13){
    state = `mission`;
  }
  else if(state === `mission` && keyCode === 32){
    state = `game`;
  }
}
