/**
Ines Pioselli
Exercise 03: Spy Profile Generator Plus

Brief:
- improve the visual display of the PROFILE --check
- add more categories to the PROFILE --check
- add the ability to change specific categories in their PROFILE --- check

In this program, the user must enter their name. Their magical girl profile will be loaded as well as their sidekick profile.
They must remember their password to access their data. However, if they are unhappy they can regenerate both profiles.


*/

"use strict";

//declares all variables  for magical girl profile
let magicalGirlProfile = {
  name: `**TOP SECRET**`,
  alias: `**TOP SECRET**`,
  powers: `**TOP SECRET**`,
  magicWand: `**TOP SECRET**`,
  quality: `**TOP SECRET**`,
  birthPlace: `**TOP SECRET**`,
  password: `**TOP SECRET**`,

  //sidekick profile
  sidekickName: `**TOP SECRET**`,
  sidekickQuality: `**TOP SECRET**`,
  sidekickPowers: `**TOP SECRET**`,
  sidekickBirthPlace: `**TOP SECRET**`,

};

let titanData; //sidekick name
let streetFighterData; //powers data
let objectData; //wand
let countryData; //birth place
let flowerData; //password
let characterData; // quality
let romanData; //alias

let mainFont; //font used for main text
let cuteFont; //font used for headers

let startBg; //variable for start state background image
let missionBg; //vairbale for mission state background
let gameBg; //variable for game state background

let data; //data variable for storing data

let state = `start`; //first state

let canvas; //declares canvas variable


//lods all JSON data, fonts and background images
function preload() {

  //JSON data
  romanData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/roman_deities.json`);
  titanData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/greek_titans.json`);
  streetFighterData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/games/street_fighter_ii.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  countryData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries.json`);
  flowerData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/flowers.json`);
  characterData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/archetypes/character.json`);

  //images
  startBg = loadImage("assets/images/start-Bg.png");
  missionBg = loadImage("assets/images/mission-Bg.png");
  gameBg = loadImage(`assets/images/game-Bg.png`);

  //fonts
  mainFont = loadFont("assets/fonts/Chromate-Regular.otf");
  cuteFont = loadFont(`assets/fonts/Marshland_Beauty.otf`);

}

function setup() {
  //create canvas
  canvas = createCanvas(1920, 1080);
  windowResized(); //calls resizing function

  //tries to load data
  data = JSON.parse(localStorage.getItem(`magical-girl-profile-data`));
  //checks if there is data to load
  if (data !== null) {
    //if so ask for the password
    let password = prompt(`Please enter your password.`);
    //check if password is correct
    if (password === data.password) {
      //if so then set up both profiles
      loadMagicalGirlData();
      loadSidekickData();
    }
  } else {
    //if there is no data then setup the profile with data
    generateMagicalGirlProfile();
  }
}

//Pippins code for resizing the canvas
function windowResized() {
  let canvasRatio = height / width;
  let windowRatio = windowHeight / windowWidth;

  // Create variables to store the new width and height
  let newWidth = undefined;
  let newHeight = undefined;

  // If the window ratio is smaller, we'll use the window height to
  // set the basis of our new canvas dimensions.
  if (windowRatio < canvasRatio) {
    // Our canvas will fit by setting its height to the window height...
    newHeight = windowHeight;
    // ... and then scaling the width based on the ratio
    newWidth = windowHeight / canvasRatio;
  } else {
    // Our canvas will fit by setting its width to the window width...
    newWidth = windowWidth;
    // ... and then scaling the height based on the ratio
    newHeight = windowWidth * canvasRatio;
  }
  // Set the canvas's CSS width and height properties to the new values
  canvas.elt.style.width = `${newWidth}px`;
  canvas.elt.style.height = `${newHeight}px`;
}


//loads all the variables into data for the magical girl profile
function loadMagicalGirlData() {
  magicalGirlProfile.name = data.name;
  magicalGirlProfile.alias = data.alias;
  magicalGirlProfile.powers = data.powers;
  magicalGirlProfile.magicWand = data.magicWand;
  magicalGirlProfile.birthPlace = data.birthPlace;
  magicalGirlProfile.quality = data.quality;
  magicalGirlProfile.password = data.password;

}

//loads all the variables into data for the sidekick profile
function loadSidekickData() {
  magicalGirlProfile.sidekickName = data.sidekickName;
  magicalGirlProfile.sidekickPowers = data.sidekickPowers;
  magicalGirlProfile.sidekickQuality = data.sidekickQuality;
  magicalGirlProfile.sidekickBirthPlace = data.sidekickBirthPlace;
}

//generates a magical girl profile from JSON data
function generateMagicalGirlProfile() {
  magicalGirlProfile.name = prompt(`Welcome! What is your name?`);
  magicalGirlProfile.alias = random(romanData.roman_deities);

  let power01 = random(streetFighterData.characters);
  magicalGirlProfile.powers = random(power01.moves);

  magicalGirlProfile.magicWand = random(objectData.objects);

  magicalGirlProfile.birthPlace = random(countryData.countries);

  magicalGirlProfile.password = random(flowerData.flowers);

  let quality01 = random(characterData.characters);
  magicalGirlProfile.quality = random(quality01.qualities);

  generateSidekickProfile(); //calls function to generate sidekick profile

  //save the resulting profile into local storage
  localStorage.setItem(`magical-girl-profile-data`, JSON.stringify(magicalGirlProfile));
}


//generates just your sidekick profile from JSON data
function generateSidekickProfile() {

  magicalGirlProfile.sidekickName = random(titanData.greek_titans);
  let power02 = random(streetFighterData.characters);

  let quality02 = random(characterData.characters);
  magicalGirlProfile.sidekickQuality = random(quality02.qualities);

  magicalGirlProfile.sidekickPowers = random(power02.moves);

  magicalGirlProfile.sidekickBirthPlace = random(countryData.countries);

  localStorage.setItem(`magical-girl-profile-data`, JSON.stringify(magicalGirlProfile));
}


//function to draw all the states
function draw() {
  changeState();

}


//function to change all the states
function changeState() {
  if (state === `start`) {
    start();
  }
  else if (state === `mission`) {
    mission();
  }
  else if (state === `game`) {
    game();
  }
}


//function to load the start state
function start() {
  imageMode(CENTER, CENTER);
  image(startBg, width / 2, height / 2, 1920, 1080);
  push();
  textFont(cuteFont);
  textSize(60);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(`Magical Girl Simulator`, width / 2, height / 2 - 100);
  textFont(mainFont);
  textSize(40);
  text(`Press Enter to begin`, width / 2, height / 2 + 150);
  pop();

  sparkles(); //calls function to create sparkling effect

}


//function to load instructions/mission
function mission() {
  imageMode(CENTER, CENTER);
  image(missionBg, width / 2, height / 2, 1920, 1080);
  textFont(cuteFont);
  textSize(60);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255);
  text(`Secret Mission`, width / 2, height / 2 - 200);
  textFont(mainFont);
  textSize(35);
  text(`You are given a top secret mission to save the world from evil. \n
      You will be given a new magical girl identity and sidekick to help you. \n
      Make sure to remember your password to access your data again.`, width / 2, height / 2);
  textSize(30);
  text(`Press SPACEBAR to continue`, width / 2, height / 2 + 300);

  sparkles();//calls function to create sparkling effect
}

//game state that loads all the profiles
function game() {

  imageMode(CENTER, CENTER);
  image(gameBg, width / 2, height / 2, 1920, 1080);

  //magical girl profile
  let profile01 = `** Magical Girl Profile **
  Name: ${magicalGirlProfile.name}
  Magical Girl name: ${magicalGirlProfile.alias}
  Powers: ${magicalGirlProfile.powers}
  Main Quality:  ${magicalGirlProfile.quality}
  Magical Weapon: ${magicalGirlProfile.magicWand}
  Birth Place: ${magicalGirlProfile.birthPlace}
  password: ${magicalGirlProfile.password}`;

  //sidekick profile
  let profile02 = ` ** Sidekick Profile **
  Name:  ${magicalGirlProfile.sidekickName}
  Powers: ${magicalGirlProfile.sidekickPowers}
  Main Quality: ${magicalGirlProfile.sidekickQuality}
  Birth Place:  ${magicalGirlProfile.sidekickBirthPlace}`;

  push();
  textAlign(LEFT, TOP);
  textFont(cuteFont);
  textSize(60);
  fill(255);
  text(`Profiles`, width / 2, height / 2 - 400);
  textFont(mainFont);
  textSize(24);
  fill(255);

  textLeading(50);
  text(profile01, width / 2 - 320, 300);
  text(profile02, width / 2 + 320, 300);
  textSize(30);
  text(`Press A to change your entire profile`, width / 2 - 320, height / 2 + 300);
  text(`Press B to change only your sidekick profile`, width / 2 - 320, height / 2 + 350);
  pop();

  sparkles(); //calls function to create sparkling effect

}

//function that creates sparkling effect
function sparkles() {
  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(400);
    point(x, y);
  }
}


//handles keyboard input
function keyPressed() {
  if (state === `start` && keyCode === 13) { //keycode for enter
    state = `mission`;
  }
  else if (state === `mission` && keyCode === 32) { //keycode for spacebar
    state = `game`;
  }

  if (state === `game` && keyCode === 65) { //keycode for A
    generateMagicalGirlProfile(); //allows you to change entire profile
  }
  if (state === `game` && keyCode === 66) //keycode for B
    generateSidekickProfile(); //allows you to change sidekick profile
}
