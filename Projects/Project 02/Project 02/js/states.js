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

function loading(){
  background(129, 115, 189);
  push();
  textFont(pixelFont);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`One moment pls,`, width/2, height/2 -200);
  textSize(20);
  text(`Pet the tamagotchi with your index finger \n to increase the energy level `, width/2, height/2);
  pop();

  // checkHand();
}

//main room = living room
function livingRoom() {
  imageMode(CENTER, CENTER);
  image(livingRoomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  textSize(30);
  text(`Living Room`, width / 2, height / 2 - 250);

  pop();

  if(predictions.length >0 ){
    let hand = predictions[0];
    console.log(hand);
    updatehand(hand);

    overlapTamagotchi();
  }
  updateEgg02();
  tamagotchiEgg.move();
  tamagotchiEgg.position();
  displayFinger();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  displayPetButton();


}

//important for prototype
//feeding game
//on the right of the living room
function kitchen() {
  imageMode(CENTER, CENTER);
  image(kitchenBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(88, 71, 173);
  textSize(50);
  text(`Kitchen`, width / 2, height / 2 - 250)
  pop();

  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  displayFeedButton();
  displayGoodScore();
  displayBadScore();
  updateEgg02();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  tamagotchiEgg.getOnChair();


}

//bedroom on the left of the living room
//for the tamagotchi to sleep
function bedRoom() {
  imageMode(CENTER, CENTER);
  image(bedroomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(50);
  text(`Bedroom`, width / 2, height / 2 - 250)

  pop();
  checkBedTime();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  updateEgg02();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  displaySleepButton();



}
//on the bottom of the living room
//for the tamagotchi to wash himself
function bathroom() {
  imageMode(CENTER, CENTER);
  image(bathroomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Bathroom`, width / 2, height / 2 - 250);
  pop();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  updateEgg02();
  updateBubbles();
  updateShower();
  displayShowerButton();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  tamagotchiEgg.getInShower();
}

function schoolYard(){
  imageMode(CENTER, CENTER);
  image(schoolYardBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(30, 43, 130);
  textSize(50);
  text(`TIME FOR SCHOOL`, width / 2, height / 2 - 300);
  textSize(30);
  text(`School Yard`, width / 2, height / 2 + 250);
  textSize(50);
  text(`ENTER`, width / 2, height / 2 + 300);
  pop();

}

function lesson01Instructions(){
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(30, 43, 130);
  textSize(50);
  text(`FIRST DAY OF SCHOOL `, width / 2, height / 2 -300);
  textSize(30);
  text(schoolInstructions01, width / 2, height / 2);
  pop();

  updatePencils();
}

function schoolDay01(){
  push();
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(30);
  text(` `, width / 2, height / 2);
  pop();
  pop();
  displaySchoolLesson01();
  displayLesson01GoodScore();
  displayLesson01BadScore();
  displayCurrentAnswer()
}

function day02(){
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`DAY 2`, width / 2, height / 2);
  pop();
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
