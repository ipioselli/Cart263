class Dirt {
  constructor(x, y, image) {

    this.x = x;
    this.y = y;
    this.size = 50;
    this.image = image;

  }


  //constrain dirt to stay on the tamagotchi
  constrain(tamagotchi){
    this.x = constrain(this.x, tamagotchi.x, tamagotchi.width );
    this.y =  constrain(this.y, tamagotchi.y, tamagotchi.height);
  }

  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
