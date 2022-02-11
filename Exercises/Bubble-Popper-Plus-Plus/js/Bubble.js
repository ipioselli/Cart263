class Bubble{
  constructor(x, y, image, sfx){
    this.x = x;
    this.y = y;
    this.image= image;
    this.vx =0;
    this.vy = -2;
    this.sfx = sfx;
  }

reset(){
  this.x = random(width);
  this.y = height;
}
moveBubble(){
  this.x += this.vx;
  this.y += this.vy;
}

checkOutofBounds(bubble){
  if(this.y < 0)
}
}
