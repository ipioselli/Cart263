//DOM events

let paragraph = document.getElementById(`paragraph`);

let opacity = 1;
fadeOut();

function fadeOut(){
  opacity -= 0.01;
  paragraph.style[`opacity`] = opacity;

  if(opacity > 0){
    requestAnimationFrame(fadeOut);
  }
}

// //------------------------------//
// //--- Color changing effect ---//
// //----------------------------//
//changes the color to red after 3 secs
// setTimeout(function(){
//   paragraph.style[`color`] = `#ff0000`;
//   }, 3000);



// //----------------------//
// //--- blinking effect ---//
// //----------------------//
// setInterval(blink,500);
//
// //changes opacity from 0 to 1
// function blink(){
//   let opacity =paragraph.style[`opacity`];
//   if(opacity === `1`){
//     paragraph.style[`opacity`] = `0`;
//   }
//   else{
//     paragraph.style[`opacity`] = `1`;
//   }
//
// }
