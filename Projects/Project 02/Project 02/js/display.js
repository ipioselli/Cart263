//------------------------------------------------------//
//---------***********DISPLAY BUTTONS***********---------//
//------------------------------------------------------//

//display the tamagotchi on the menu state
function displayTamagotchiMenu() {
  imageMode(CENTER, CENTER);
  image(tamagotchiMenu.image, tamagotchiMenu.x, tamagotchiMenu.y, tamagotchiMenu.size, tamagotchiMenu.size);
  //jitter the tamagotchi egg image
  tamagotchiMenu.x = tamagotchiMenu.x + random(-1, 1);
}

//display feeding instructions in the kitchen
function displayFeedButton() {
  imageMode(CENTER, CENTER);
  image(feedButton.image, feedButton.x, feedButton.y, feedButton.size, feedButton.size);
}

//display button for shower instructions in the bathroom
function displayShowerButton() {
  imageMode(CENTER, CENTER);
  image(showerButton.image, showerButton.x, showerButton.y, showerButton.size, showerButton.size);
}

//display button for petting instructions in the living room
function displayPetButton(){
  imageMode(CENTER, CENTER);
  image(petButton.image, petButton.x, petButton.y, petButton.size, petButton.size);
}

//display button to know when its time for bed time in the bedroom
function displaySleepButton(){
  imageMode(CENTER, CENTER);
  image(sleepButton.image, sleepButton.x, sleepButton.y, sleepButton.size, sleepButton.size);
}


//---------------------------------------------------------------//
//---------***********DISPLAY IMPORTANT ICONS***********---------//
//--------------------------------------------------------------//

//display button to get to the bathroom state
function displayBathroomButton() {
  imageMode(CENTER, CENTER);
  image(bathroomButton.image, bathroomButton.x, bathroomButton.y, bathroomButton.size, bathroomButton.size);
}

//display button to get to the living room state
function displayLivingRoomButton() {
  imageMode(CENTER, CENTER);
  image(livingRoomButton.image, livingRoomButton.x, livingRoomButton.y, livingRoomButton.size, livingRoomButton.size);
}

//display button to get to the kitchen state
function displayKitchenButton(){
  imageMode(CENTER, CENTER);
  image(kitchenButton.image, kitchenButton.x, kitchenButton.y, kitchenButton.size, kitchenButton.size);
}

//display button to get to the bedroom state
function displayBedroomButton(){
  imageMode(CENTER, CENTER);
  image(bedroomButton.image, bedroomButton.x, bedroomButton.y, bedroomButton.size, bedroomButton.size);
}

//---------------------------------------------------------------//
//---------***********DISPLAY HEADER INFO***********------------//
//--------------------------------------------------------------//

//display the energy amount
function displayEnergy() {
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(40);
  text(`Energy: ${ceil(tamagotchiEnergy)}`, width / 2 + 400, height / 2 - 300);
  pop();
}

//display the evolution level
//starts at evolution level 1
function displayEvolutionLVL() {
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(88, 71, 173);
  textSize(40);
  text(`Evolution: ${tamagotchiLVL}`, width / 2 - 400, height / 2 - 300);
  pop();
}

//display the time in hours
function displayTime() {
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(68, 55, 115);
  textSize(20);
  text(`Time:${hour}:00`, width / 2, height / 2 - 300);
  pop();
}

//---------------------------------------------------------------//
//---------***********DISPLAY KITCHEN PARAMETERS***********------//
//--------------------------------------------------------------//

//display bad score for the food
function displayBadScore() {
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(20);
  text(`Food Thrown Up = ${foodWrongAnswer}`, width / 2 + 400, height / 2 - 250);
  pop();
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

//---------------------------------------------------------------//
//---------***********DISPLAY HANDPOSE PARAMATERS***********------//
//--------------------------------------------------------------//

//display finger image for handpose in the living room
function displayFinger(){
  push();
  imageMode(CENTER, CENTER);
  image(fingerImg, finger.x,finger.y, finger.size, finger.size);
  pop();
}

//---------------------------------------------------------------//
//---------***********SCHOOL LESSON 01***********----------------//
//--------------------------------------------------------------//

function displaySchoolLesson01() {

  let lesson01 = `** Lesson 01: Food**
  
  Italian Translation: ${schoolLesson01.currentItalianWord}`;
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(30);
  text(lesson01, width / 2 , height / 2 -150);
  pop();
}


function displayLesson01GoodScore(){
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(40);
  text(`Good Answers = ${schoolRightAnswers}`, width / 2 - 400, height / 2 - 300);
  pop();
}

function displayLesson01BadScore(){
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(40);
  text(`Bad Answers = ${schoolWrongAnswers}`, width / 2 + 400, height / 2 - 300);
  pop();
}

function displayCurrentAnswer(){
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(20);
  text(`Current Answer = ${currentItalianAnswer}`, width / 2, height / 2 -50);
  pop();
}
function displayEnglishButton(){
  imageMode(CENTER, CENTER);
  image(englishButton.image, englishButton.x, englishButton.y, englishButton.size, englishButton.size);
}
function displayItalianButton(){
  imageMode(CENTER, CENTER);
  image(italianButton.image, italianButton.x, italianButton.y, italianButton.size, italianButton.size);
}
