/*
Rat Obstacle class
This class is for the cooking game at the end. It is used to create
all the ingredients in the Ratatouille recipe.
It allows them to move, be added to a pot and get displayed with an image.
*/

class RatObstacle {

  constructor(x, y, image) { //calls the constructor
    //position
    this.x = x;
    this.y = y;
    this.size = 100;
    //speed
    this.vx = random(-5, -2);
    this.vy = random(-5, -2);
    this.speed = 5;
    //image
    this.image = image;
  }

  //calls all the functions in the rat obstacle class
  update() {
    this.move();
    this.checkOutofBounds();
    this.display();

  }

  //allows the obstacles to move
  move() {
    this.x = this.x + this.vx; //move only along the x axis
    this.y = constrain(this.y, 0, height); //constrain from moving beyond the height
  }

  //check if the obstacles is off the canvas and call the reset function
  checkOutofBounds() {
    if (this.x < 0) {
      this.reset();
    }
  }

  //reset the starting position to the width and a random y position
  reset() {
    this.x = width;
    this.y = random(0, height);
  }


  //display the obstacles
  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }

}
