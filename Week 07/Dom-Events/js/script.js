//DOM events
//video 6.4

let paragraph = document.getElementById(`paragraph`);
//let originalText = paragraph.innerText;


document.addEventListener(`keydown`, function(event){
  paragraph.innerText = paragraph.innerText + event.key;
});


// //press enter to change color
// document.addEventListener(`keydown`, function(event){
//   if(event.keyCode === 32){
//
//   }
//   paragraph.style[`color`] = `#ff0000`;
// });



////hover over with mouse
// paragraph.addEventListener(`mouseenter`, function(event){
//   event.target.innerText = `SECRET MESSAGE`;
// });

// paragraph.addEventListener(`contextmenu`, function(event){
//   event.target.innerText = `SECRET MESSAGE`;
// });
//
// paragraph.addEventListener(`mouseleave`, function(event){
//   event.target.innerText = originalText;
// });



// let mainHeading = document.getElementById(`main-heading`);
// let subHeading = document.getElementById(`sub-heading`);
//
// mainHeading.addEventListener(`click`, setRedTextColor);
// subHeading.addEventListener(`click`, setRedTextColor);
// paragraph.addEventListener(`click`, setRedTextColor);
//
// function setRedTextColor(event){
//   event.target.style[`color`] = `#ff0000`;
// }





// //----------------------//
// //--- Opacity effect ---//
// //----------------------//
// let opacity = 1;
// fadeOut();
//
// function fadeOut(){
//   opacity -= 0.01;
//   paragraph.style[`opacity`] = opacity;
//
//   if(opacity > 0){
//     requestAnimationFrame(fadeOut);
//   }
// }

// //------------------------------//
// //--- Color changing effect ---//
// //----------------------------//
// //changes the color to red after 3 secs
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
