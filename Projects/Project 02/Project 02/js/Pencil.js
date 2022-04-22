/***********************
Pencil class
- This class is for the floating cute pencils for the instruction
states of the school day 1 and 2
- Its purpose is to move the pencils randomly and display them
***********************/
class Pencil{
constructor(x, y, image){
  //pencil variables
  this.x = x; //x position
  this.y = y; //y position
  this.vx = random(-2, 2); //random vx
  this.vy = random(-2, 2); //random vy
  this.size = 50; //size
  this.image = image //image
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
