class Veggies {
  constructor(x,y, image){
    this.x = x;
    this.y = y;

    this.vx = 1;
    this.vy =1;

    this.ax = 0;
    this.ay= 0;
    this.maxSpeed = 10;
    this.size = 50;
    this.image = image;
    this.angle = 0;
  }


  update(){
    this.display();
    this.move();
  }

  move(){

    // this.vx = this.vx + this.ax;
    // this.vy = this.vy + this.ay;

    // //constrain the velocity
    // this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    // this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
  
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
