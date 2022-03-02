/*
Ratatouille class
This class is for the cooking game at the end. It is used to create
all the ingredients in the Ratatouille recipe.
Allows them to move, be added to a pot and get displayed with an image.
*/


class Ratatouille {
  constructor(x, y, image) { //calls the constructor
    //position
    this.x = x;
    this.y = y;
    //min and max of the canvas
    this.minX = 0;
    this.minY = 0;
    this.maxX = width;
    this.maxY = height;
    //speed
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.size = 80;
    this.image = image;
    this.added = false; //check if the ingredient has been added to the pot
  }

  //calls all the functions in the ratatouille class
  update() {
    this.display();
    this.move();
  }
  move() {

    //update the position with velocity
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //constrains the ingredient to the canvas
    this.x = constrain(this.x, this.minX, this.maxX);
    this.y = constrain(this.y, this.minY, this.maxY);

    //makes the ingredient bounce off the canvas
    if (this.x >= this.maxX || this.x <= this.minX) {
      this.vx = -this.vx;
    }
    if (this.y >= this.maxY || this.y <= this.minY) {
      this.vy = -this.vy;
    }
  }

  //function to add the ingredient to the pot
  addedInPot(x, y, w, h) {
    this.added = true; //change boolean to true once added

    this.x = random(x, x + w); //update x position to the new x position of the pot
    this.y = random(y, y + h); //update y position to the new y position of the pot

    //constrains the ingredient to the x and y coordinates of the pot
    this.minX = x;
    this.maxX = x + w;

    this.minY = y;
    this.maxY = y + h;

  }

//displays the ingredients with an image
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
