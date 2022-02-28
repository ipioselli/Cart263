class MouseTrap{

  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.vx= random(-5, -2);
    this.vy=  random(-5, -2);
    this.speed = 5;
    this.image = image;



  }

    update(){
      this.move();
      this.checkOutofBounds();
      this.display();

    }

  move(){
    this.x = this.x + this.vx;
    // this.y = this.y + this.vy;

    this.y = constrain(this.y, 0 , height);
  }

  checkOutofBounds(){
    if(this.x < 0 ){
      this.reset();
    }
  }



  reset(){
    this.x = width;
    this.y = random(0, height);
  }


  display(){
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }

}
