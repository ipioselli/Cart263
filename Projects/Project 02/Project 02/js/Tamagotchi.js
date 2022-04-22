class Tamagotchi {

  constructor(x, y, image01, image02, image03, image04, image05, image06) {
    this.x = x;
    this.y = y;
    this.size =150;
    this.vx = 1.5;
    this.vy = 0;
    this.image01 = image01;
    this.image02 = image02;
    this.image03 = image03;
    this.image04 = image04;
    this.image05 = image05;
    this.image06 = image06;
    this.dirt = [];
    this.newDirtTimer = 0;
    this.newDirtDelay = 100;
    this.showerX = 650;
    this.showerY = 360;
    this.bedX = 860;
    this.bedY = 460;
    this.chairX = 845;
    this.chairY = 460;
    this.classX = 1280/2 + 10;
    this.classY = 460;
    this.minX = 350;
    this.maxX = 950;

  }

  //calls all the functions for the tamagotchi
  update() {
    this.display();
    this.dirtTimer();
    this.removeDirt();
    this.checkDirt();
  }

  classroom(){
    this.dirt = [];
    tamagotchiEnergy = 2000;
    if(state === `schoolDay01` || `schoolDay02`){
      this.x = this.classX;
      this.y = this.classY;
    }

    if(tamagotchiLVL === 1){
      push();
      image(this.image01, this.x, this.y, this.size, this.size);
      pop();
    }
    if(tamagotchiLVL === 2){
      push();
      image(this.image04, this.x, this.y, this.size, this.size);
      pop();
    }

  }


  //move the tamagotchi back and forth in the rooms
  move() {

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;


    if (this.x >= this.maxX || this.x <= this.minX) {
      this.vx = -this.vx;

    }

    //constrain to width and height of the canvas
    this.y = constrain(this.y, 0, height);
    this.x = constrain(this.x, 0, width);

  }

  //function called when you touch the tamagotchi with handpose
  pet() {
    this.y = this.y + 10;


  }

  getInShower() {
    if (state === `bathroom`){
      this.x = this.showerX;
      this.y = this.showerY;
    }

  }
  getInBed(){
    if(state === `bedRoom`){
      this.x = this.bedX;
      this.y = this.bedY;

    }
  }

  getOnChair(){
    if(state === `kitchen`){
      this.x = this.chairX;
      this.y = this.chairY;
    }
  }

  //reset height position to the middle of the room
  position() {
    this.y = height / 2 + 150;
  }


  //add dirt
  addDirt() {
    let dirt = {
      x: random(-0.2, 0.2),
      y: random(-0.2, 0.2),
      size: random(5, 10)
    };
    this.dirt.push(dirt);
  }

  //add dirt to the tamagotchi with a timer
  dirtTimer() {
    this.newDirtTimer++;
    if (this.newDirtTimer >= this.newDirtDelay) {
      this.addDirt();

      this.newDirtTimer = 0;
    }
  }

  //remove the dirt from the tamagotchi
  removeDirt() {
    if (state === `bathroom`) {
      if (keyIsDown(83)) {
        this.dirt.pop();
      }
    }
  }

  resetDirt(){
    this.dirt = [];
  }

  checkDirt() {
    // console.log(tamagotchiEnergy, this.dirt.length);
    if (tamagotchiEnergy < 2000) {
      if (this.dirt.length <= 0) {
        tamagotchiEnergy += 10;
        tamagotchiEnergy = 2000;

      } else if (this.dirt.length >= 2) {
        tamagotchiEnergy -= 0.005;
      }

    }

  }

  talk() {
    if (this.dirt = 2) {
      responsiveVoice.speak(feedInstructions, "UK English Female");
    }
  }


  //display the tamagotchi
  display() {
    if(tamagotchiLVL === 1){
      if (tamagotchiEnergy <= 1990) {
        push();
        image(this.image03, this.x, this.y, this.size, this.size);
        pop();
      } else if (tamagotchiEnergy <= 1995) {
        push();
        image(this.image02, this.x, this.y, this.size, this.size);
        pop();
      } else if (tamagotchiEnergy <= 2000 || tamagotchiEnergy >= 2000) {
        push();
        image(this.image01, this.x, this.y, this.size, this.size);
        pop();
      }
    }

    if(tamagotchiLVL === 2){
      if (tamagotchiEnergy <= 1990) {
        push();
        image(this.image06, this.x, this.y, this.size, this.size);
        pop();
      } else if (tamagotchiEnergy <= 1995) {
        push();
        image(this.image05, this.x, this.y, this.size, this.size);
        pop();
      } else if (tamagotchiEnergy <= 2000 || tamagotchiEnergy >= 2000) {
        push();
        image(this.image04, this.x, this.y, this.size, this.size);
        pop();
      }
    }





    for (let i = 0; i < this.dirt.length; i++) {
      let dirt = this.dirt[i];
      let x = this.x + dirt.x * this.size;
      let y = this.y + dirt.y * this.size;
      noStroke();
      fill(100, 80, 80);
      ellipse(x, y, dirt.size);

    }
  }



}
