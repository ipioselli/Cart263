/***********************
Bubble class
-This class is for the bubbles that float around the bathub
in the bathroom state
- Its purpose is to move the bubbles, jitter them and display them
***********************/

class Bubble {
  constructor(x, y, image) {
    //bubble variables
    this.x = x; //x position
    this.y = y; //y position
    this.bathX = 480; //min x of the bath
    this.bathMaxX = 760; //max x of the bath
    this.bathY = 200; //main y of the bath
    this.bathMaxY = 400; //max y of the bath
    this.vx = random(-1, 1); //random vx
    this.vy = random(-1, 1); //random vy
    this.size = 50; //size
    this.image = image //image
  }

  //calls all the functions in the bubble class
  update() {
    this.jitter(); //to jitter the bubles
    this.move(); //move the bubbles
    this.display(); //display the bubbles
  }

  move() {
    this.x = this.x + this.vx; //move the bubbles on x axis
    this.y = this.y + this.vy; //move bubbles on y axis

    //contrains bubbles to the minX, maxX, minY, maxY of the bathub
    this.x = constrain(this.x, this.bathX, this.bathMaxX);
    this.y = constrain(this.y, this.bathY, this.bathMaxY);

    //move bubbles in the position direction if it touches the constrains
    if (this.x >= this.bathMaxX || this.x <= this.bathX) {
      this.vx = -this.vx;
    }
    if (this.y >= this.bathMaxY || this.y <= this.bathY) {
      this.vy = -this.vy;
    }
  }

  //jitter the movement of the bubbles for cool effect
  jitter() {
    this.x = this.x + random(-2, 2);
  }

  //display the bubbles with an image
  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();

  }

}
