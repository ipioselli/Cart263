class Remi{

  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.size = 200;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.image = image;
  }

  update(){
    this.move();
    this.remiAlive();
    this.handleInput();
    this.display();
  }

  move(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    //constrain only on the y axis
    this.y = constrain(this.y, 0 , height);

  }

  remiAlive(){
    if(this.x > width){
      state = `chaseWon`;
    }
  }


  handleInput(){

    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      this.vy = -this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  display(){
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }

}
