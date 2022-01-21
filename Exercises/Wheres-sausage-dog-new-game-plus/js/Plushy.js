/**
 Plushy class
This is a class to create the plushies for the game
This class allows the plushies to get displayed and check for overlap with the mouse.
*/
class Plushy {
  constructor(x, y, image, sfx) {
    //position
    this.x = x;
    this.y = y;
    //image
    this.image = image;
    
    this.angle = 0;
    this.sfx = sfx;
  }

  update() {
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  overlap(x, y) {
    if (x > this.x - this.image.width / 2 &&
      x < this.x + this.image.width / 2 &&
      y > this.y - this.image.height / 2 &&
      y < this.y + this.image.height / 2) {
      return true;
    } else {
      return false;
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.x += 10;
      this.y += 10;
      this.sfx.play();
    }
  }
}
