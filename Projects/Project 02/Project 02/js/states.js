//------------------------------------------------------//
//---------***********STATE FUNCTIONS***********--------//
//------------------------------------------------------//
//This js file contains all the information for the states in chronological order//

//start state
//first state of the tamagotchi game
//press enter to begin
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
//this is the title page
//press spacebar to continue
function menu() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(50);
  text(`TAMAGOTCHI SIM`, width / 2, height / 2 - 300);
  textSize(30);
  text(`Cappugotchi`, width / 2, height / 2 - 200);
  textSize(30);
  text(`Press spacebar`, width / 2, height / 2 + 200);
  pop();
  displayTamagotchiMenu(); //displays the tamagotchi illustration that jitters
}

//instructions state for the main instructions of the game
//press enter to start the actual game
function instructions() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(30);
  text(`INSTRUCTIONS`, width / 2, height / 2 - 250);
  textSize(20);
  text(tamagotchiInstructions, width / 2, height / 2 - 100);
  text(tamagotchiInstructions02, width / 2, height / 2);
  text(`Press ENTER to start`, width / 2, height / 2 + 200);
  pop();
}

//this is the loading state that is called with you click on the heart icon in the game
// its purpose is to allow handpose to load
//there are also instructions for how handpose works
function loading() {
  background(129, 115, 189);
  push();
  textFont(pixelFont);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`One moment pls,`, width / 2, height / 2 - 200);
  textSize(20);
  text(`Pet the tamagotchi with your index finger \n to increase the energy level `, width / 2, height / 2);
  pop();

}

//main room
//this is the bed room where the tamagotchi sleeps
// you can only go to sleep when its 9 pm
function bedroom() {
  imageMode(CENTER, CENTER);
  image(bedroomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(30);
  text(`Bedroom`, width / 2, height / 2 - 250)
  pop();

  checkBedTime(); //check when its time for bed
  displayTime(); //display the time in top middle
  displayEnergy(); //display the energy at the top right
  displayEvolutionLVL(); //display the evolution level at the top left
  updateTamagotchi(); //call the update function for the tamagotchi

  //displays all the buttons
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  displaySleepButton();

}

//living room state
// you can get here once you click on the heart icon
// this function uses handpose to pet the tamagotchi and give it some love
function livingRoom() {
  imageMode(CENTER, CENTER);
  image(livingRoomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(30);
  text(`Living Room`, width / 2, height / 2 - 250);
  pop();

  //check if there are currently any predictions to display
  if (predictions.length > 0) {
    //if yes, then get the positions of the index finger
    let hand = predictions[0];
    console.log(hand);
    updatehand(hand);

    //checks if the finger overlaps with the tamagotchi
    overlapTamagotchi();
  }
  //calls update function and allows tamagotchi to move and go back original y position
  updateTamagotchi();
  tamagotchiEgg.move();
  tamagotchiEgg.position();

  //display all the functions below
  displayFinger(); //displays the index finger in the form of a heart
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  //display all the buttons
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
  //displays bg image
  imageMode(CENTER, CENTER);
  image(kitchenBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  stroke(255);
  fill(88, 71, 173);
  textSize(30);
  text(`Kitchen`, width / 2, height / 2 - 250);
  pop();

  //displays all header information
  displayTime();
  displayEnergy();
  displayEvolutionLVL();

  //displays all the scores for annyang
  displayGoodScore();
  displayBadScore();
  //calls update from tamagotchi class
  updateTamagotchi();
  //displays all the buttons
  displayFeedButton();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  //calls getOnchair from the tamagotchi class to place the tamagotchi on the chair
  tamagotchiEgg.getOnChair();

}


//on the bottom of the living room
//for the tamagotchi to wash himself with the shower
function bathroom() {
  imageMode(CENTER, CENTER);
  image(bathroomBg, width / 2, height / 2, 1280, 720);
  push();
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  stroke(255);
  textSize(30);
  text(`Bathroom`, width / 2, height / 2 - 250);
  pop();
  //display header info
  displayTime();
  displayEnergy();
  displayEvolutionLVL();
  //call all the update functions
  updateTamagotchi();
  updateBubbles();
  updateShower();
  //display all the buttons
  displayShowerButton();
  displayLivingRoomButton();
  displayBathroomButton();
  displayKitchenButton();
  displayBedroomButton();
  //function to place the tamagotchi in the tub when its in the shower state
  tamagotchiEgg.getInShower();
}

//function for the school yard
//this function is called when the hour is 13 (1 pm)
//displays an image of the outside of the school
function schoolYard() {
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

//function for the lesson 01 instructions on day 1 of school
//is shown after the schoolyard function on the first evolution of the tamagotchi
function lesson01Instructions() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(30, 43, 130);
  textSize(50);
  text(`FIRST DAY OF SCHOOL `, width / 2, height / 2 - 300);
  textSize(30);
  text(schoolInstructions01, width / 2, height / 2);
  textSize(40);
  text(`Press SPACEBAR to continue`, width / 2, height / 2 + 200);
  pop();

  //call update function for the pencil class to float the lil pencils
  updatePencils();

}

//function for the lesson 02 instructions on day 2 of school
//is shown after the schoolyard function only on day 2 of school and 2nd evolution of the tamagotchi
function lesson02Instructions() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(30, 43, 130);
  textSize(50);
  text(`SECOND DAY OF SCHOOL `, width / 2, height / 2 - 300);
  textSize(30);
  text(schoolInstructions02, width / 2, height / 2);
  textSize(40);
  text(`Press SPACEBAR to continue`, width / 2, height / 2 + 200);
  pop();
  //call update function for the pencil class to float the lil pencils
  updatePencils();

}

//first day of school
//guessing game with annyang
//guess all the words in english when only the italian translations are displayed
//there are 2 buttons for hints in case it is too hard
function schoolDay01() {
  push();
  imageMode(CENTER, CENTER);
  image(classroomBg, width / 2, height / 2, 1280, 720);
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(30);
  text(` `, width / 2, height / 2);
  pop();
  //function to position tamagotchi on the chair
  tamagotchiEgg.classroom();
  //display all the variables for lesson 01
  displaySchoolLesson01();
  displayLesson01GoodScore();
  displayLesson01BadScore();
  displayCurrentAnswer()
  //display buttons for english and italian translation
  displayEnglishButton();
  displayItalianButton();
}

//second day of school
//guessing game with annyang
//guess all the words in english when only the italian translations are displayed
//there are 2 buttons for hints in case it is too hard
function schoolDay02() {
  push();
  imageMode(CENTER, CENTER);
  image(classroomBg, width / 2, height / 2, 1280, 720);
  textAlign(CENTER, CENTER);
  textFont(cuteFont);
  fill(0);
  textSize(30);
  text(` `, width / 2, height / 2);
  pop();
  //function to position tamagotchi on the chair
  tamagotchiEgg.classroom();
  //display all the variables for lesson 02
  displaySchoolLesson02();
  displayLesson01GoodScore();
  displayLesson01BadScore();
  displayCurrentAnswer();
  //display buttons for english and italian translation
  displayEnglishButton();
  displayItalianButton();
}

//function to display day 02
//this function is shown with a timer delay when the hour is 21 (9 pm)
//tamagotchi evolves into its 2nd evolution : Espressogotchi
function day02() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  textSize(30);
  text(`DAY 2`, width / 2, height / 2 - 200);
  textSize(20);
  text(`YAY your tamagotchi evolved into Espressogotchi`, width / 2, height / 2 - 100);
  text(`Press ENTER to continue`, width / 2, height / 2);

  //functions to move the tamagotchi
  tamagotchiEgg.move();
  tamagotchiEgg.position();
  //function to only display the 2nd tamagotchi
  tamagotchiEgg.displayTamagotchiDay02();
  pop();
}

//function to display day 03
//this function is shown with a timer delay when the hour is 21 (9 pm)
//tamagotchi evolves into its 3rd evolution : Cappugotchi
function day03() {
  push();
  background(186, 219, 205);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  fill(88, 71, 173);
  textSize(30);
  text(`DAY 3`, width / 2, height / 2 - 200);
  textSize(20);
  text(`YAY your tamagotchi evolved into Cappugotchi!`, width / 2, height / 2 - 100);
  text(`They also graduated school!`, width / 2, height / 2);
  pop();
  //move the tamagotchi
  tamagotchiEgg.move();
  tamagotchiEgg.position();
  //display only the 3rd tamagotchi
  tamagotchiEgg.displayTamagotchiDay03();
}

/**function when the tamagotchi dies because the energy is less than 0
    or if you fail school**/
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
