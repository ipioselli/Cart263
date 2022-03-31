class Shower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = random(10, 20);
    this.gravity = 1.05;

  }

  update() {
    this.restart();
    this.display();

  }

  move() {

    this.y = this.y + this.vy*this.gravity;


  }

  restart(){
    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
    }
  }

  display() {
    push();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(5, 10), random(5, 10));
    pop();
  }

}
