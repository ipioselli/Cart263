class Circle01{

constructor(x, y){
      this.x = x;
      this.y = y;
      this.size = 50;
      this.fill = {
      r: random(255),
      g: random(255),
      b: random(255),
    }
    this.fade = 0;
    this.fadeAmount =1;
}

fadeAnimation() {
  if (this.fade < 0) {
    this.fadeAmount = 1;
  }
  if (this.fade > 255) {
    this.fadeAmount = -10;
  }
  this.fade += this.fadeAmount;

}

display() {
  push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fade);
   noStroke();
   ellipse(this.x, this.y, this.size, this.size);
   pop();
}

}