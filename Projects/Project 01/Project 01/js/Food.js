class Food {
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.minX = 0;
    this.minY = 0;
    this.maxX = width;
    this.maxY = height;

    this.vx = random(-5, 5);
    this.vy = random(-5,5);
    this.size = 80;
    this.image = image;
    this.added = false;

  }

  update(){
    this.display();
    this.move();
  }
  move(){
    this.x = constrain(this.x, this.minX, this.maxX);
      //update the position with velocity
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //constrains the ball to the canvas
    this.x = constrain(this.x, this.minX, this.maxX);
    this.y = constrain(this.y, this.minY, this.maxY);

    //makes the ball bounce off the canvas
    if (this.x >= this.maxX || this.x <= this.minX) {
      this.vx = -this.vx;
    }
    if (this.y >= this.maxY || this.y <= this.minY) {
      this.vy = -this.vy;
    }

  }

  addedInPot(x, y, w, h){
  this.added = true;

  this.x = random(x, x + w);
  this.y = random(y, y + h);

  this.minX = x;
  this.maxX = x + w;

  this.minY = y;
  this.maxY = y + h;

  }

  display(){
    push();
    noStroke();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
