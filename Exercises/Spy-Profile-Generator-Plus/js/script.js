/**
Ines Pioselli
Exercise 03: Spy Profile Generator Plus

Brief:
- improve the visual display of the PROFILE --check
- add more categories to the PROFILE --check
- add the ability to change specific categories in their PROFILE
- use voice synthesis and voice recognition for identification
- ask for a username and password instead of just a password


*/

"use strict";


let magicalGirlProfile = {
  name: `**TOP SECRET**`,
  alias: `**TOP SECRET**`,
  powers:`**TOP SECRET**`,
  magicWand: `**TOP SECRET**`,
  quality: `**TOP SECRET**`,
  birthPlace: `**TOP SECRET**`,
  password: `**TOP SECRET**`,

  sidekickName: `**TOP SECRET**`,
  sidekickQuality: `**TOP SECRET**`,
  sidekickPowers:`**TOP SECRET**`,
  sidekickBirthPlace:`**TOP SECRET**`,

};

let loveCraftData; //alias
let streetFighterData; //powers
let artifactData; //wand
let planetData;
let gemstoneData; //password
let characterData;

let startFont;
let cuteFont;

let startBg;
let missionBg;
let gameBg;

let state = `start`;


function preload(){

  loveCraftData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/lovecraft.json`);
  streetFighterData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/games/street_fighter_ii.json`);
  artifactData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  planetData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/science/minor_planets.json`);
  gemstoneData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json`);
  characterData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/archetypes/character.json`);

  startBg = loadImage("assets/images/start-Bg.png");
  missionBg = loadImage("assets/images/mission-Bg.png");
  startFont = loadFont("assets/fonts/Chromate-Regular.otf");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`magical-girl-profile-data`));
    if(data){
      let password = prompt(`Please enter your password.`);
      if(password === data.password){
        loadMagicalGirlData();
        loadSidekickData();
      }
    }
    else{
      generateMagicalGirlProfile();
    }
  }


function loadMagicalGirlData(){
  magicalGirlProfile.name = data.name;
  magicalGirlProfile.alias = data.alias;
  magicalGirlProfile.powers = data.powers;
  magicalGirlProfile.magicWand = data.magicWand;
  magicalGirlProfile.birthPlace = data.birthPlace;
  magicalGirlProfile.quality = data.quality;
  magicalGirlProfile.password = data.password;

}

function loadSidekickData(){
  magicalGirlProfile.sidekickName = data.sidekickName;
  magicalGirlProfile.sidekickPowers = data.sidekickPowers;
  magicalGirlProfile.sidekickQuality = data.sidekickQuality;
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

  let quality01 = random(characterData.characters);
  magicalGirlProfile.quality = random(quality01.qualities);

  generateSidekickProfile();


  localStorage.setItem(`magical-girl-profile-data`, JSON.stringify(magicalGirlProfile));
}


function generateSidekickProfile(){
  magicalGirlProfile.sidekickName = random(loveCraftData.supernatural_creatures);
  let power02 = random(streetFighterData.characters);

  let quality02 = random(characterData.characters);
  magicalGirlProfile.sidekickQuality = random(quality02.qualities);

  magicalGirlProfile.sidekickPowers = random(power02.moves);

  magicalGirlProfile.sidekickBirthPlace = random(planetData.minor_planets);
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
  imageMode(CENTER, CENTER);
  image(missionBg, width/2, height/2, 1920, 1080);
}

function game(){
  background(0);

  let profile01 = `** Magical Girl Profile **
  Name: ${magicalGirlProfile.name}
  Magical Girl name: ${magicalGirlProfile.alias}
  Powers: ${magicalGirlProfile.powers}
  Main Quality:  ${magicalGirlProfile.quality}
  Magical Weapon: ${magicalGirlProfile.magicWand}
  Birth Place: ${magicalGirlProfile.birthPlace}
  password: ${magicalGirlProfile.password}`;

  let profile02 = ` ** Sidekick Profile **
  Name:  ${magicalGirlProfile.sidekickName}
  Powers: ${magicalGirlProfile.sidekickPowers}
  Main Quality: ${magicalGirlProfile.sidekickQuality}
  Birth Place:  ${magicalGirlProfile.sidekickBirthPlace}`;




  push();
  textFont(startFont);
  textSize(24);
  fill(255);
  textAlign(LEFT, TOP);
  textLeading(40);
  text(profile01, 100, 100);
  text(profile02, 100, 600);
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
