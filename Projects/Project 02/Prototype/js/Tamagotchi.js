class Tamagotchi {

  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.size = 200;

    this.vx = 0;
    this.vy = 0;
    this.speed = 4;

    this.image = image;
  }

  //calls all the functions for the tamagotchi
  update() {
    this.move();
    this.handleInput();
    this.display();
    this.checkPosition();

  }

  //move the tamagotchi
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

  }

  //reset position to the middle of the room
  position() {
    this.x = width / 2;
    this.y = height / 2 + 150;
  }

  //check position of the tamagotchi relative to the living room
  checkPosition() {
    if (state === `livingRoom`) {
      if (this.x > width) {
        state = `kitchen`;
        this.position();
      }
    }

    if (state === `livingRoom`) {
      if (this.x < 0) {
        state = `bedRoom`;
        this.position();
      }
    }

    if (state === `livingRoom`) {
      if (this.y > height) {
        state = `bathroom`;
        this.position();
      }
    }
    if (state === `kitchen`) {
      if (this.x < 0) {
        state = `livingRoom`;
        this.position();
      }
    }
    if (state === `bedRoom`) {
      if (this.x > width) {
        state = `livingRoom`;
        this.position();
      }
    }
    if (state === `bathroom`) {
      if (this.y < 0) {
        state = `livingRoom`;
        this.position();
      }
    }

  }
  //handle user input
  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      this.vy = -this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  //display the tamagotchi
  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
