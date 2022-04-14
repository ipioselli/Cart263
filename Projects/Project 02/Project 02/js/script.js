/**
Project 2 prototype
Ines Pioselli

Tamagotchi Sim

Instructions are in the readme file
important:
- go to the kitchen for the prototype mini game
- say "Eat some .." for annyang

*/

"use strict";

let tamagotchiMenu = { // tamagotchi on the menu page
  x: 1280 / 2,
  y: 720 / 2,
  size: 300,
}

//main game variables
let tamagotchiEgg;
let tamagotchiImg;
let egg01;
let egg01Img;
let egg02;
let egg02Img;
let egg03;
let egg03Img;
let energyCounter = 0;
let tamagotchiEnergy = 2000;
let tamagotchiLVL = 1;
let tamagotchi;
let hour = 6; //day starts at 6am

//bathroom variables
let dirt = [];
let newDirtTimer = 0;
let newDirtDelay = 1000;
let dirtImg;


//kitchen variables
const pinkFood = [ //array of the tamagotchi's favourite food
  "watermelon",
  "raspberry",
  "strawberry",
  "cherry",
  "peach",
  "fig",
];

let foodRightAnswer = 0;
let foodWrongAnswer = 0;

let feedButton = {
  x: 1280 / 2,
  y: 720 / 2 - 150,
  size: 300,
}

let feedInstructions = `Feed the tamagotchi by saying Eat some and then the name of the food. Hint The tamagotchi loves the colour pink`;

//background image variables
let roomBg;
let floorPlanBg;
let chooseEggBG;

//fonts
let pixelFont;

//sounds
let song01;

let state = `chooseEgg`; // the prototype starts with the start state

//loads all the variables
function preload() {
  tamagotchiMenu.image = loadImage("assets/images/tamagotchi.png");
  pixelFont = loadFont(`assets/fonts/dogica.otf`);
  chooseEggBG = loadImage(`assets/images/chooseEggBg.png`);
  egg01Img = loadImage(`assets/images/egg01.png`);
  egg02Img = loadImage(`assets/images/egg02.png`);
  egg03Img = loadImage(`assets/images/egg03.png`);
  song01 = loadSound(`assets/sounds/Cute.mp3`);
  roomBg = loadImage(`assets/images/roomBg.png`);
  floorPlanBg = loadImage(`assets/images/floorplan.png`)
  feedButton.image = loadImage(`assets/images/feedButton.png`);
}


//setup the canvas
function setup() {
  createCanvas(1280, 720);

  //setup all the eggs
  setupEgg01();
  setupEgg02();
  setupEgg03();

  setupAnnyang(); //setup for annyang
}

function setupAnnyang() {
  if (annyang) {

    let commands = {
      "Eat some *food": feed //detects for food
    };
    annyang.addCommands(commands);
    annyang.start();
    feed(); //calls function to check the score
  }

}

//setup egg 1
function setupEgg01() {
  let x = width / 2;
  let y = height / 2 + 150;
  egg01 = new Tamagotchi(x, y, egg01Img)
}

//setup egg 2
function setupEgg02() {
  let x = width / 2;
  let y = height / 2 + 150;
  egg02 = new Tamagotchi(x, y, egg02Img)
}

//setup egg 3
function setupEgg03() {
  let x = width / 2;
  let y = height / 2 + 150;
  egg03 = new Tamagotchi(x, y, egg03Img)
}

//Draws all the states for the game
function draw() {
  setupStates();
}

//function to change all the states
function setupStates() {
  if (state === `start`) {
    start();
  } else if (state === `menu`) {
    menu();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `floorPlan`) {
    floorPlan();

  } else if (state === `chooseEgg`) {
    chooseEgg();
  } else if (state === `livingRoom`) {
    livingRoom();
  } else if (state === `kitchen`) {
    kitchen();
  } else if (state === `bathroom`) {
    bathroom();
  } else if (state === `bedRoom`) {
    bedRoom();
  } else if (state === `dead`) {
    dead();
  }

}

//function to check through array of pink food in the kitchen state
function feed(food) {
  if (state === `kitchen`) {
    if (pinkFood.includes(food)) { //if right increase the score and energy
      foodRightAnswer++;
      tamagotchiEnergy += 10;
    } else {
      foodWrongAnswer++; //if wrong increase wrong score and decrease energy
      tamagotchiEnergy -= 10;
    }
  }
}


//start state
function start() {
  push();
  background(186, 219, 205);
  textFont(pixelFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255, 255, 255);
  text(`ENTER to start!`, width / 2, height / 2);
  pop();

}

//menu state with tamagotchi illustration
function menu() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(50);
  text(`TAMAGOTCHI SIM`, width / 2, height / 2 - 300);
  textSize(30);
  text(`Press spacebar`, width / 2, height / 2 + 200);
  pop();
  displayTamagotchiMenu();
}

//instructions for prototype
function instructions() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(30);
  text(`INSTRUCTIONS`, width / 2, height / 2 - 250);
  text(`You must choose an egg to raise! \n You are given a house and \nmust make sure its energy level stays up`, width / 2, height / 2 - 100);
  text(`For the prototype go to the kitchen.`, width / 2, height / 2);
  text(`Press Enter for Floor plans`, width / 2, height / 2 + 200);
  pop();
}

//function to show the floor plan
function floorPlan() {
  push();
  imageMode(CENTER, CENTER);
  image(floorPlanBg, width / 2, height / 2, 1280, 720);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(50);
  text(`FLOOR PLAN`, width / 2, height / 2 - 300);
  textSize(30);
  text(`press SPACE when ready`, width / 2, height / 2 - 200);
  pop();

}

//function to ask the user to choose which egg they want to raise
function chooseEgg() {
  imageMode(CENTER, CENTER);
  image(chooseEggBG, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(50);
  text(`Choose an Egg`, width / 2, height / 2 + 200);
  pop();
}

//main room = living room
function livingRoom() {
  imageMode(CENTER, CENTER);
  image(roomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`<- Living Room ->`, width / 2, height / 2 + 300)
  text(`v`, width / 2, height / 2 + 340)
  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  checkEgg();


}

//important for prototype
//feeding game
//on the right of the living room
function kitchen() {
  imageMode(CENTER, CENTER);
  image(roomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`<- Kitchen`, width / 2, height / 2 + 300)
  pop();

  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  displayFeedButton();
  displayGoodScore();
  displayBadScore();
  checkEgg();

}

//bedroom on the left of the living room
//for the tamagotchi to sleep
function bedRoom() {
  imageMode(CENTER, CENTER);
  image(roomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Bedroom ->`, width / 2, height / 2 + 300)

  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  checkEgg();


}
//on the bottom of the living room
//for the tamagotchi to wash himself
function bathroom() {
  imageMode(CENTER, CENTER);
  image(roomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`^`, width / 2, height / 2 + 280);
  text(`Bathroom`, width / 2, height / 2 + 300);
  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  checkEgg();
}

//function when the tamagotchi dies because the energy is less than 0
function dead() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`RIP You killed them!`, width / 2, height / 2);
  pop();
}

//function to check which egg the user chose
function checkEgg() {
  if (tamagotchiEgg === egg01) {
    updateEgg01();
  }
  else if (tamagotchiEgg === egg02) {
    updateEgg02();
  }
  else if (tamagotchiEgg === egg03) {
    updateEgg03();
  }
}

//function to decrease the energy and check if its under 0 or over 2000
function checkCounter() {
  tamagotchiEnergy-= 5; //decreases by 5

  if (tamagotchiEnergy <= 0) {
    state = `dead`;
  }
  if(tamagotchiEnergy >= 2000){
    tamagotchiEnergy = 2000;
  }
}

//function to increase the hour of the day
function checkHour() {
  hour++;
  // if (hour >= 12) { //time for school (not implemented yet)
  //
  // }
}

//update all 3 egg function below
function updateEgg01() {
  egg01.update();
}

function updateEgg02() {
  egg02.update();
}

function updateEgg03() {
  egg03.update();
}

//display feeding instructions in the kitchen
function displayFeedButton() {
  imageMode(CENTER, CENTER);
  image(feedButton.image, feedButton.x, feedButton.y, feedButton.size, feedButton.size);
}

//display the tamagotchi on the menu state
function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
  //jitter the tamagotchi
  tamagotchiMenu.x = tamagotchiMenu.x + random(-1, 1);
}

//display the energy amount
function displayEnergy() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Energy: ${tamagotchiEnergy}`, width / 2 + 400, height / 2 - 300);
  pop();

}

//display the evolution level
function displayEvolutionLVL() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Evolution: ${tamagotchiLVL}`, width / 2 - 400, height / 2 - 300);
  pop();
}

//display the time of day
function displayTime() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(255);
  textSize(20);
  text(`Time:${hour}:00`, width / 2, height / 2 - 300);
  pop();
}

//mousepressed to trigger responsiveVoice
function mousePressed() {

  let d = dist(mouseX, mouseY, feedButton.x, feedButton.y);
  if (state === `kitchen`) {
    if (d < feedButton.size / 2) {

      responsiveVoice.speak(feedInstructions, "UK English Female")
    }
  }
}

//display good score for the food
function displayGoodScore() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Food Eaten = ${foodRightAnswer}`, width / 2 - 400, height / 2 - 250);
  pop();

}

//display bad score for the food
function displayBadScore() {
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Food Thrown Up = ${foodWrongAnswer}`, width / 2 + 400, height / 2 - 250);
  pop();
}


//keyboard input from the user
function keyPressed() {
  if (state === `start`) {
    if (keyCode === 13) { //keycode for ENTER
      state = `menu`;
      song01.play();
      song01.setVolume(0.2);
    }
  }
  if (state === `menu`) {
    if (keyCode === 32) { //spacebar
      state = `instructions`;
    }
  }
  if (state === `instructions`) {
    if (keyCode === 13) { //
      state = `floorPlan`;
    }
  }
  if (state === `floorPlan`) {
    if (keyCode === 32) {
      state = `chooseEgg`;
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 49) {
      tamagotchiEgg = egg01
      state = `livingRoom`;
      setInterval(checkCounter, 3000); //every 3 seconds
      setInterval(checkHour, 10000); //every 10 seconds
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 50) {
      tamagotchiEgg = egg02;
      state = `livingRoom`;
      setInterval(checkCounter, 3000);
      setInterval(checkHour, 10000);
    }
  }
  if (state === `chooseEgg`) {
    if (keyCode === 51) {
      tamagotchiEgg = egg03;
      state = `livingRoom`;
      setInterval(checkCounter, 3000);
      setInterval(checkHour, 10000);
    }
  }

  if(state === `bathroom`){
    if(keyCode === 83){



    }
  }
}
