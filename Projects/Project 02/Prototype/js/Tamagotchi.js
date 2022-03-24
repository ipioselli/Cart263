class Tamagotchi{

  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.size = 200;

    this.vx = 0;
    this.vy = 0;
    this.speed = 4;

    this.image = image;
  }

  update(){
    this.move();
    this.handleInput();
    this.display();
    this.checkPosition();
  }

  move(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

  }

  checkPosition(){
    if(state === `livingRoom`){
      if(this.x > width){
        state = `kitchen`;
        this.x = width/2;
        this.y = height/2;
      }
    }
    if(state === `kitchen`){
      if(this.x < 0){
        state = `livingRoom`;
        this.x = width/2;
        this.y = height/2;
      }
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
