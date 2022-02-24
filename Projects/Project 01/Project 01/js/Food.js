class Food {
  constructor(x, y, image){
    this.x = x;
    this.y = y;

    this.vx = random(-1, 1);
    this.vy = random(-1,1);
    this.size = 80;
    this.image = image;
  }

  update(){
    this.display();
    this.move();
  }
  move(){

      //update the position with velocity
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //constrains the ball to the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    //makes the ball bounce off the canvas
    if (this.x >= width || this.x <= 0) {
      this.vx = -this.vx;
    }
    if (this.y >= height || this.y <= 0) {
      this.vy = -this.vy;
    }

  }

  display(){
    push();
    noStroke();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
