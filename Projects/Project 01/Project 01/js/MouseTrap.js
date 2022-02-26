class MouseTrap{

  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.size: 100;
    this.vx: 0;
    this.vy: -3;

  }

    update(){
      this.move();
      this.checkOutofBounds();
      this.display();

    }
  move(){
    this.x += this.vx;
    this.y += this.vy;
  }

  checkOutofBounds(){
    if(this.x < 0 ){
      reset();
    }
  }

  reset(){
    this.x = width;
    this.y = random(height);
  }


  display(){
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }

}
