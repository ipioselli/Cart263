class Fruit {
  constructor(x, y, image){
    //position
    this.x = x;
    this.y = y;
    //velocity
    this.vx = 0;
    this.vy = 0;
    //acceleration
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 30;
    //size of the acorn
    this.size = 50;
    //the image for the acorn
    this.image = image;

  }

  update(){
    this.display();
    this.move();


  }

  //gravity force to the acceleration
  gravity(force) {
    this.ay = this.ay + force;
  }

  move() {
    //update velocity with acceleration
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    //constrain the velocity
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

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

    if (this.y >= width || this.y <= 0) {
      this.vy = -this.vy;
    }



    }

    display() {
      push();
      noStroke();
      image(this.image, this.x, this.y, this.size, this.size);
      pop();
    }



  }
