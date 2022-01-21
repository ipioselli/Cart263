/**
ScaryPlushy class
This is a class that extends the plushy class
This class allows the plushies to get displayed, check for overlap with the mouse
and rotate when found.
*/
class ScaryPlushy extends Plushy {
  constructor(x, y, image, sfx) { //calls the constructor
    super(x, y, image, sfx);

    this.found = false; //checks if its been found
    this.rotationSpeed = 0.25;
  }


  //calls the super update method and rotates the scary plushy when found
  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed; //spin overtime
    }
  }

  //stops the sounds when you get to the win state
  winState() {
    this.sfx.stop();
    state = `win`;
  }

  //check if its been pressed and adds a timer to change function
  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true;
      this.sfx.loop(); //loops the sound
      setTimeout(this.winState.bind(this), 3000); //3 seconds
    }
  }
}
