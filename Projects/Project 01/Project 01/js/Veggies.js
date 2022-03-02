/*
Veggies class
This class displays the floating veggies in the start state.
*/
class Veggies {
  constructor(x, y, image) { //calls the constructor
    //position
    this.x = x;
    this.y = y;
    //speed
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = 50;
    //image
    this.image = image;

  }

  //calls all the functions in the veggies class
  update() {
    this.display();
    this.move();
  }

  move() {

    //update the position with velocity
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //constrains the veggies to the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    //makes the veggies bounce off the canvas
    if (this.x >= width || this.x <= 0) {
      this.vx = -this.vx;
    }
    if (this.y >= height || this.y <= 0) {
      this.vy = -this.vy;
    }

  }

  //display the veggies with images
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
