/*
Small circle class
This class is for the story state.
It fades the small circles and displays them.
*/
class SmallCircle {

  constructor(x, y) { //calls the constructor
    this.x = x;
    this.y = y;
    this.size = random(20, 50); //random size
    //gets random rgb values for fill
    this.fill = {
      r: random(255),
      g: random(255),
      b: random(255),
    }
    this.fade = 0; //fade starts at 0
    this.fadeAmount = 1; //fade by 1
  }

  //fade circles in and out from 0-255
  fadeAnimation() {
    if (this.fade < 0) { //if fade is less than 0
      this.fadeAmount = 1; //increase fade by 1
    }
    if (this.fade > 255) { //if fade is greater than 255
      this.fadeAmount = -10; //decrease fade by -10
    }
    this.fade += this.fadeAmount; //add fade to fadeamount

  }

  //display circles with a fill
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fade);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }

}
