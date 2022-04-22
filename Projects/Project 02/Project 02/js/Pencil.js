/***********************
Pencil class
- This class is for the floating cute pencils for the instruction
states of the school day 1 and 2
- Its purpose is to move the pencils randomly and display them
***********************/
class Pencil {
  constructor(x, y, image) {
    //pencil variables
    this.x = x; //x position
    this.y = y; //y position
    this.vx = random(-2, 2); //random vx
    this.vy = random(-2, 2); //random vy
    this.size = 50; //size
    this.image = image //image
  }

  //calls all the functions in the pencil class
  update() {
    this.move(); //to move the pencils
    this.display(); // to display the pencils

  }


  //function to move the pencils and constrain it to the canvas
  move() {
    this.x = this.x + this.vx; //update the x position with the vx velocity
    this.y = this.y + this.vy; //update the y position with the vx velocity

    //constrain the pencils to the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    //make the pencils bounce off the canvas
    if (this.x >= width || this.x <= 0) {
      this.vx = -this.vx;
    }
    if (this.y >= height || this.y <= 0) {
      this.vy = -this.vy;
    }
  }


  //display the pencils with an image
  display() {
    push();
    noFill();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();

  }
}
