class Bubble {
  constructor(x, y, image){

    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = 50;
    this.image = image
  }

  update(){
    this.jitter();
    this.move();
    this.display();
  }

  move(){
    this.x= this.x + this.vx;
    this.y = this.y + this.vy;

    this.x = constrain(this.x, 480,760);
    this.y = constrain(this.y, 200, 400);

    if(this.x >= 760 || this.x <= 480){
      this.vx = -this.vx;
    }
    if(this.y >= 400 || this.y <= 200){
      this.vy = -this.vy;
    }
  }
  
  jitter(){
    this.x = this.x + random(-2, 2);
  }

  display(){
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();

  }

}
