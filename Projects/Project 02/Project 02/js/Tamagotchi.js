/***********************
Tamagotchi class
- This class is the most important and handles everthing for the tamagotchi
- It handles all the interactions, movements, positioning, dirt and display
***********************/
class Tamagotchi {
  constructor(x, y, image01, image02, image03, image04, image05, image06, image07) {
    //tamagotchi variables
    this.x = x; //x position
    this.y = y; // y position
    this.size = 150; //size
    this.vx = 1.5; //velocity on the x axis
    this.vy = 0; //velocity on the y (doesn't move up or down)
    //all the emotion and evolution images
    //evolution level 1
    this.image01 = image01; //happy
    this.image02 = image02; //neutral
    this.image03 = image03; //sad
    //evolution level 2
    this.image04 = image04; //happy
    this.image05 = image05; //neutral
    this.image06 = image06; //sad
    //evolution level 3
    this.image07 = image07; //happy

    //dirt variables
    this.dirt = []; //dirt array
    this.maxDirt = 20;
    //timer to add dirt
    this.newDirtTimer = 0;
    this.newDirtDelay = 100;

    //energy amounts for displaying emotions
    this.maxEnergy = 2000; //happy
    this.middleEnergy = 1800; //neutral
    this.minEnergy = 1600; //sad

    //All positions
    this.showerX = 650; //x position in the bathroom
    this.showerY = 360; //position in the bathroom
    this.bedX = 860; // x position in the bedroom
    this.bedY = 460; // y position in the bedroom
    this.chairX = 845; //x position in the kitchen
    this.chairY = 460; // y position in the kitchen
    this.classX = 1280 / 2 + 10; //x position in the school
    this.classY = 460; //y position in the school
    this.minX = 350; // min x of the house walls
    this.maxX = 950; // max x of the house walls
  }

  //calls all the functions for the tamagotchi
  update() {
    this.display(); //displays the tamagotchi
    this.dirtTimer(); //dirt timer to add dirt
    this.removeDirt(); //function to remove dirt
    this.checkDirt(); //function to check if theres dirt on the tamagotchi
  }

  //function to display the tamagotchi in the school day 1 and day 2
  classroom() {
    this.dirt = []; //empties the array
    tamagotchiEnergy = 2000; //sets the energy bax to the max
    /**if its day 1 or 2 of school then place the tamagotchi in
    the chair of the school classroom**/
    if (state === `schoolDay01` || `schoolDay02`) {
      this.x = this.classX; //update x position
      this.y = this.classY; //update y position
    }
    //if the evolution level is 1 then display the first tamagotchi
    if (tamagotchiLVL === 1) {
      push();
      image(this.image01, this.x, this.y, this.size, this.size);
      pop();
    }
    //if the evolution level is 2 then display the 2nd tamagotchi (Espressogotchi)
    if (tamagotchiLVL === 2) {
      push();
      image(this.image04, this.x, this.y, this.size, this.size);
      pop();
    }
  }


  //move the tamagotchi back and forth in the rooms
  move() {

    this.x = this.x + this.vx; //update x position with x velocity
    this.y = this.y + this.vy; //update y position with y velocity

    //bounces off the walls of the room
    if (this.x >= this.maxX || this.x <= this.minX) {
      this.vx = -this.vx;
    }

    //constrain to width and height of the canvas
    this.y = constrain(this.y, 0, height);
    this.x = constrain(this.x, 0, width);
  }

  //function called when you touch the tamagotchi with handpose
  //called in the living room state
  pet() {
    this.y = this.y + 10; //increases y position by 10
  }

  //function to place the tamagotchi in the shower
  //called in the bathroom state
  getInShower() {
    if (state === `bathroom`) {
      this.x = this.showerX; //update x position
      this.y = this.showerY; //update y position
    }
  }

  //function to place the tamagotchi in bed
  //called in the bedroom state when its time for bed
  getInBed() {
    if (state === `bedroom`) {
      this.x = this.bedX; //update x position
      this.y = this.bedY; //update y position
    }
  }

  //function to place the tamagotchi on the chair
  //called in the kitchen state
  getOnChair() {
    if (state === `kitchen`) {
      this.x = this.chairX; //update x position
      this.y = this.chairY; //update y position
    }
  }

  //reset height position to the middle of the room
  position() {
    this.y = height / 2 + 150;
  }


  //function to add dirt to the tamagotchi overtime
  addDirt() {
    let dirt = {
      x: random(-0.2, 0.2), //random x position
      y: random(-0.2, 0.2), //random y position
      size: random(5, 10) //random size
    };
    //adds dirt to dirt array
    this.dirt.push(dirt);
  }

  //add dirt to the tamagotchi with a timer
  dirtTimer() {
    //increment timer
    this.newDirtTimer++;
    //if the timer is >= to the delay then add dirt
    if (this.newDirtTimer >= this.newDirtDelay) {
      this.addDirt(); //calls the addDirt function to add dirt to tamagotchi
      //reset timer back to 0
      this.newDirtTimer = 0;
    }
  }

  //remove the dirt from the tamagotchi on keydown
  removeDirt() {
    //if tamagotchi is in the bathroom
    if (state === `bathroom`) {
      if (keyIsDown(83)) { //keycode for S (S for shower >:) )
        this.dirt.pop(); //remove dirt with pop
      }
    }
  }

  //function to reset dirt array
  resetDirt() {
    this.dirt = []; //empties the array
  }

  //function to decrement energy when the dirt length reaches a certain amount
  checkDirt() {
    if (tamagotchiEnergy < 2000) {
      if (this.dirt.length <= 0) { //if the array is empty then increase the energy
        tamagotchiEnergy += 10; //increase by 10 until it reaches 2000
        tamagotchiEnergy = 2000; //energy back to 2000 so it doesnt go over that amount
      }
      //if dirt length is greater than the max dirt
      else if (this.dirt.length >= this.maxDirt) {
        //decrement by a small amount
        tamagotchiEnergy -= 0.005;
      }
    }
  }
  //function to display tamagotchi on day02 state
  //just wanted an image without dirt
  displayTamagotchiDay02() {
    if (tamagotchiLVL === 2) {
      this.size = 200; //new size only for this state
      push();
      image(this.image04, this.x, this.y, this.size, this.size);
      pop();
    }
  }

  //function to display the tamagotchi on day03 state
  // just wanted an image without any dirt
  displayTamagotchiDay03() {
    if (tamagotchiLVL === 3) {
      this.size = 200; //new size only for this state
      //display with an image
      push();
      image(this.image07, this.x, this.y, this.size, this.size);
      pop();
    }
  }




  //display the tamagotchi for all the rooms in the game
  display() {
    //at evolution level 1
    if (tamagotchiLVL === 1) {
      //display all the emotions
      //display sad tamagotchi
      if (tamagotchiEnergy <= this.minEnergy) {
        push();
        image(this.image03, this.x, this.y, this.size, this.size);
        pop();
      }
      //display neutral tamagotchi
      else if (tamagotchiEnergy <= this.middleEnergy) {
        push();
        image(this.image02, this.x, this.y, this.size, this.size);
        pop();
      }
      //display happy tamagotchi
      else if (tamagotchiEnergy <= this.maxEnergy || tamagotchiEnergy >= this.maxEnergy) {
        push();
        image(this.image01, this.x, this.y, this.size, this.size);
        pop();
      }
    }

    //at evolution level 2
    if (tamagotchiLVL === 2) {
      //display all Espressogotchi emotions
      //display sad tamagotchi
      if (tamagotchiEnergy <= this.minEnergy) {
        push();
        image(this.image06, this.x, this.y, this.size, this.size);
        pop();
      }
      //display neutral tamagotchi
      else if (tamagotchiEnergy <= this.middleEnergy) {
        push();
        image(this.image05, this.x, this.y, this.size, this.size);
        pop();
      }
      //display happy tamagotchi
      else if (tamagotchiEnergy <= this.maxEnergy || tamagotchiEnergy >= this.maxEnergy) {
        push();
        image(this.image04, this.x, this.y, this.size, this.size);
        pop();
      }
    }
    //dirt array to display dirt on the tamagotchi
    for (let i = 0; i < this.dirt.length; i++) {
      let dirt = this.dirt[i];
      let x = this.x + dirt.x * this.size; //position dirt x on the tamagotchi
      let y = this.y + dirt.y * this.size; //position dirt y on the tamagotchi
      //display dirt with a brown colour
      noStroke();
      fill(100, 80, 80);
      ellipse(x, y, dirt.size);
    }
  }
}
