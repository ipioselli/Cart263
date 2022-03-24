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
    this.handleInout();
    this.display();
  }

  move(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

  }

  checkPosition(){
    
  }
}
