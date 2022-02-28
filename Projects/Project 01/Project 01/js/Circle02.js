class Circle02{

constructor(x, y){
      this.x = x;
      this.y = y;
      this.size = random(50, 150);
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
  noFill();
   stroke(this.fill.r, this.fill.g, this.fill.b, this.fade);
   ellipse(this.x, this.y, this.size, this.size);
   pop();
}

}
