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

function displayShowerButton() {
  imageMode(CENTER, CENTER);
  image(showerButton.image, showerButton.x, showerButton.y, showerButton.size, showerButton.size);
}

function displayBathroomButton() {
  imageMode(CENTER, CENTER);
  image(bathroomButton.image, bathroomButton.x, bathroomButton.y, bathroomButton.size, bathroomButton.size);
}


function displaySleepButton(){
  imageMode(CENTER, CENTER);
  image(sleepButton.image, sleepButton.x, sleepButton.y, sleepButton.size, sleepButton.size);
}

function displayPetButton(){
  imageMode(CENTER, CENTER);
  image(petButton.image, petButton.x, petButton.y, petButton.size, petButton.size);
}
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
function displayEvolutionLVL() {
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(88, 71, 173);
  textSize(40);
  text(`Evolution: ${tamagotchiLVL}`, width / 2 - 400, height / 2 - 300);
  pop();
}

function displaySchoolLesson01() {

  let lesson01 = `** Lesson 01 **
  English Translation: ${schoolLesson01.currentEnglishWord}
  Italian Translation: ${schoolLesson01.currentItalianWord}`;
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(20);
  text(lesson01, width / 2 , height / 2);
  pop();
}


function displayLesson01GoodScore(){
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(50);
  text(`Good Answers = ${schoolRightAnswers}`, width / 2 - 400, height / 2 - 250);
  pop();
}

function displayLesson01BadScore(){
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(50);
  text(`Bad Answers = ${schoolWrongAnswers}`, width / 2 + 400, height / 2 - 250);
  pop();
}

function displayCurrentAnswer(){
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(0);
  textSize(20);
  text(`Current Answer = ${currentItalianAnswer}`, width / 2, height / 2 + 250);
  pop();
}
//display the time of day
function displayTime() {
  push();
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(68, 55, 115);
  textSize(20);
  text(`Time:${hour}:00`, width / 2, height / 2 - 300);
  pop();
}
function displayShowerButton() {
  imageMode(CENTER, CENTER);
  image(showerButton.image, showerButton.x, showerButton.y, showerButton.size, showerButton.size);
}

function displayLivingRoomButton() {
  imageMode(CENTER, CENTER);
  image(livingRoomButton.image, livingRoomButton.x, livingRoomButton.y, livingRoomButton.size, livingRoomButton.size);
}

function displayKitchenButton(){
  imageMode(CENTER, CENTER);
  image(kitchenButton.image, kitchenButton.x, kitchenButton.y, kitchenButton.size, kitchenButton.size);
}

function displayBedroomButton(){
  imageMode(CENTER, CENTER);
  image(bedroomButton.image, bedroomButton.x, bedroomButton.y, bedroomButton.size, bedroomButton.size);
}

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

function displayFinger(){
  push();
  imageMode(CENTER, CENTER);
  image(fingerImg, finger.x,finger.y, finger.size, finger.size);
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
