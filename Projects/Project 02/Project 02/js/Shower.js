// Shower class
// Used in the bathroom state when the tamagotchi must wash off all the dirt
// displays water droplets on a keypressed

class Shower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(5, 10);
    this.gravity = 1;
    this.falling = false;

  }

  //calls all the function in the shower class
  update() {
    this.move();
    this.restart();
    this.display();

  }

  //moves the water droplets when you press the letter S on the keyboard
  move() {
    //if keydown is S then move the water droplets down the page
    if (keyIsDown(83)) {
      this.y = this.y + this.speed * this.gravity;
    }
    //else if the key is not pressed the water droplets reset back to their original position
    else {
      this.reset(); //calls the reset function
    }
  }

  //restart function to always loop the flow of the droplets
  restart() {
    if (this.y > height) { //if the droplets are off the canvas
      this.y = random(0, 5); //set the y in a random spot between 0 and 5
      this.gravity = 1; //set gravity back to 1
    }
  }

  //reset the water droplets when the S key is not pressed
  //the water moves back to their original position at the top of the canvas
  reset() {
    this.y = random(-10, -height); //sets the droplets a bit above the canvas height so we dont see them when the key is not pressed
    this.gravity = 1; //sets gravity back to 1

  }

  //displays the water droplets
  display() {
    push();
    noStroke();
    fill(255);
    //randomizes the size of the water droplets
    ellipse(this.x, this.y, random(5, 10), random(5, 10));
    pop();
  }

}
