//When the tamagotchi is pet a hear appears

class Pencil{
constructor(x, y, image){

  this.x = x;
  this.y = y;
  this.vx = random(-2, 2);
  this.vy = random(-2, 2);
  this.size = 50;
  this.image = image
}

update(){
  this.move();
  this.display();

}


move(){
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;

  this.x = constrain(this.x, 0, width);
  this.y = constrain(this.y, 0, height);

  if (this.x >= width || this.x <= 0) {
    this.vx = -this.vx;
  }
  if (this.y >= height || this.y <= 0) {
    this.vy = -this.vy;
  }
}



display(){
  push();
  noFill();
  image(this.image, this.x, this.y, this.size, this.size);
  pop();

}



}
