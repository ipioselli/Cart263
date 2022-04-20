class Tamagotchi {

  constructor(x, y, image, image02, image03) {
    this.x = x;
    this.y = y;
    this.size =150;
    this.vx = 2;
    this.vy = 0;
    this.image = image;
    this.image02 = image02;
    this.image03 = image03;
    this.dirt = [];
    this.newDirtTimer = 0;
    this.newDirtDelay = 100;
    this.showerX = 650;
    this.showerY = 360;
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


  //move the tamagotchi back and forth in the rooms
  move() {

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;


    if (this.x >= this.maxX || this.x <= this.minX) {
      this.vx = -this.vx;

    }


    this.y = constrain(this.y, 0, height);
    this.x = constrain(this.x, 0, width);

  }

  //function called when you touch the tamagotchi with handpose
  pet() {
    this.y = this.y + 10;
    this.position();

  }

  getInShower() {
    if (state === `bathroom`){
      this.x = this.showerX;
      this.y = this.showerY;
    }

  }

  //reset position to the middle of the room
  position() {

    this.y = height / 2 + 150;
  }





  //check position of the tamagotchi relative to the living room
  checkPosition() {
    if (state === `bedRoom`) {
      if (this.x > width) {
        state = `kitchen`;
        this.position();
      }
    }

    if (state === `bedRoom`) {
      if (this.x < 0) {
        // state = `loading`;
        // video = createCapture(VIDEO, setupHandpose);
      }
    }

    if (state === `livingRoom`) {
      this.position();
    }

    if (state === `bedRoom`) {
      if (this.y > height) {
        state = `bathroom`;
        this.position();
      }
    }
    if (state === `kitchen`) {
      if (this.x < 0) {
        state = `bedRoom`;
        this.position();
      }
    }
    if (state === `livingRoom`) {
      if (this.x > width) {
        state = `bedRoom`;
        this.position();
      }
    }
    if (state === `bathroom`) {
      if (this.y < 0) {
        state = `bedRoom`;
        // this.position();
      }
    }

  }
  //handle user input
  // handleInput() {
  //   if (keyIsDown(LEFT_ARROW)) {
  //     this.vx = -this.speed;
  //   } else if (keyIsDown(RIGHT_ARROW)) {
  //     this.vx = this.speed;
  //   } else {
  //     this.vx = 0;
  //   }
  //
  //   if (keyIsDown(UP_ARROW)) {
  //     this.vy = -this.speed;
  //   } else if (keyIsDown(DOWN_ARROW)) {
  //     this.vy = this.speed;
  //
  //   } else {
  //     this.vy = 0;
  //   }
  // }

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
      image(this.image, this.x, this.y, this.size, this.size);
      pop();
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
