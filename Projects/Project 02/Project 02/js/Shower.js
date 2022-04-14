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
        //   if(keyIsDown(83)){
        //
        //   }
        // else{
        //   this.y = random(0, 5);
        //   this.gravity = 0;
        // }
    }





  }

  restart(){
    if (this.y > height) {
      this.y = random(0, 5);
      this.gravity = 1;
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
