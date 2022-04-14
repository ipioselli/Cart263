class Shower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed =  random(5, 10);
    this.gravity = 1.05;
    this.falling = false;

  }

  update() {
    this.move();
    this.restart();
    this.display();

  }

  move() {
    if(keyIsDown(83)){
        this.y = this.y + this.speed*this.gravity;
    }
      else{
        this.reset();
      }

  }

  restart(){
    if (this.y > height) {
      this.y = random(0, 5);
      this.gravity = 1;
    }
  }

  reset(){

      this.y = random(-10, -height);
      this.gravity = 1;

  }

  display() {
    push();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(5, 10), random(5, 10));
    pop();
  }

}
