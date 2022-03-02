/*
Remi class
This class is for the first mini game in which Remi, the rat, has to dodge
all the obstacles. This class allows Remi to move with keyboard input,
check for overlaps with other objects and to be displayed.
*/

class Remi {

  constructor(x, y, image) { //calls the constructor
    //position
    this.x = x;
    this.y = y;
    this.size = 200;
    //speed
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    //image
    this.image = image;
    this.isRemiAlive = true; //checks if remi is alive
  }

  //calls all the functions in remi's class
  update() {
    this.move();
    this.remiAlive();
    this.handleInput();
    this.display();
  }

  //allows remi to move
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //constrain only on the y axis
    this.y = constrain(this.y, 0, height);

  }

  //check if remi has moved off the canvas and calls the win state
  remiAlive() {
    if (this.x > width) { //if his position is off the canvas
      state = `kitchenChaseWon`; //he wins the game
    }
  }

  //check for overlap with any obstacle
  checkOverlap(obstacle) {
    let d = dist(this.x, this.y, obstacle.x, obstacle.y);
    if (d < this.size / 2 - 100 + obstacle.size / 2) {
      this.isRemiAlive = false; //if he overlaps with an obstacle he is no longer alive
      this.speed = 0; //stops him from moving after dying
    }

  }

  //move Remi with keyboard arrows
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

  //display remi with an image
  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }

}
