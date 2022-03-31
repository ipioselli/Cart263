class Shower {
  constructor(){
    this.x = random(0, width);
    this.y = random(0, -height);
  }

  display(){
    push();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(1,5), random(1, 5));
    pop();
  }

}
