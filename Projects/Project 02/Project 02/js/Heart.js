//When the tamagotchi is pet a hear appears

class Heart{
constructor(x, y, image){

    this.x = x;
    this.y = y;
    this.vy = 2;
    this.image = image;
}

jitter(){
  this.y = this.y + random(-2,2);
}

display(){
  push();
  image(this.image, this.x, this.y, this.size, this.size);
  pop();

}

move(){
  this.y = this.y + this.vy;
}


}
