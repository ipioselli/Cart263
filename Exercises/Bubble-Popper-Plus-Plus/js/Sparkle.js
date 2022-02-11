class Sparkle{
  constructor(x, y, angle, image){
    this.x= x;
    this.y =y;
    this.angle = angle;
    this.image = image;
    this.size = 10;

  }


  update(){
    this.move();
    this.display();
  }

  move(){
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed *sin(this.angle);
    this.x += this.vx;
    this.y += this.vy;
  }
  display(){
     push();
     imageMode(CENTER);
     translate(this.x, this.y);
     rotate(this.angle);
     image(this.image, 0, 0);
     pop();
   }

}
