//When the tamagotchi is pet a hear appears

class Heart{
constructor(x, y, image){

    this.x = x;
    this.y = y;
    this.vy = 2;
    this.image = image;
    this.fade =0;
    this.fadeAmount=1;
    this.size = 100;
}

update(){
  this.jitter();

  this.display();

}

jitter(){
  this.y = this.y + random(-2,2);
}


display(){
  push();
  noFill();
  image(this.image, this.x, this.y, this.size, this.size);
  pop();

}

move(){
  this.y = this.y + this.vy;
}


}
