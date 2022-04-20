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
  background(0);
  push();
  textFont(pixelFont);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`LOADING ${modelName} ...,`, width/2, height/2);
  pop();

  // checkHand();
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

  if(predictions.length >0 ){
    let hand = predictions[0];
    console.log(hand);
    updatehand(hand);

    overlapTamagotchi();
  }
  displayFinger();
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  updateEgg02();

  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();


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
  updateEgg02();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();

}

//bedroom on the left of the living room
//for the tamagotchi to sleep
function bedRoom() {
  imageMode(CENTER, CENTER);
  image(bedroomBg, width / 2, height / 2, 1280, 720);
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
  updateEgg02();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  tamagotchiEgg.move();
tamagotchiEgg.position();





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
  text(`^`, width / 2, height / 2 + 280);
  text(`Bathroom`, width / 2, height / 2 + 300);
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
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(30);
  text(`Time for school`, width / 2, height / 2);
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
