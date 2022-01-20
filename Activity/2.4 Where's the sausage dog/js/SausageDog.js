class SausageDog extends Animal {
  constructor(x, y, image){
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update(){
    super.update();

    if(this.found){
      this.angle += this.rotationSpeed; //spin overtime
    }
  }

  mousePressed(){
    if(this.overlap(mouseX, mouseY)) {
        this.found = true;

    }
  }

}
