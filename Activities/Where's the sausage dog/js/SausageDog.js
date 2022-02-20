class SausageDog extends Animal {
  constructor(x, y, image, sfx) {
    super(x, y, image, sfx);

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed; //spin overtime
    }
  }

  winState() {
    this.sfx.stop();
    state = `win`;
  }

  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true;
      this.barkSFX.loop();
      setTimeout(this.winState.bind(this), 3000); //3 seconds
      //state = `win`;
    }
  }
}
