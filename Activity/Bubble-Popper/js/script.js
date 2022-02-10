/**
Activity 4 : Bubble popper
Ines Pioselli

*/

"use strict";


let video = undefined;

let handpose =  undefined;

let predictions = [];
/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  handpose = ml5.handpose(video,{
    fliphorizontal: true //flips camera
    }, function(){
      console.log(`Model loaded.`);
    });


}


/**
Description of draw()
*/
function draw() {

}
