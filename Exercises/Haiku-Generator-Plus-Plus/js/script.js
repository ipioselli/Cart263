/**
Activity 5: Haiku Generator
Ines Pioselli

Generates a random haiku based on existing arrays of lines.
You can swap lines by clicking on them which also activates responsive voice.
If you hover the main title, the words get moved all over the canvas.

Brief:
 - tidy up the program
 - improve html and css
 - add a title for the poem
 - add css animations
 - add synthesized voice read the poem --> check


*/

"use strict";

let maxSpeed = 3;

let words = `Haiku Generator by Ines Pioselli`;

//pre-made haiku lines
let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
];

let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
];

//pre-made titles
let titles = [
  `Cold Butterfly`,
  `The Invisible Crying`,
  `Ice of Willow`,
  `The Light's Beginning`,
  `Dragon of Doors`,
  `Forgotten Destiny`,
  `The coolest Frog`

];

//4 elements on the page for the lines and title of the poem
let poemTitle = document.getElementById(`title`);
let line1P = document.getElementById(`line-1`);
let line2P =  document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

//set up the starting lines and title
setupLines();
//setup the main title
setupMainTitle();

//listen for click events
addListeners();


function setupMainTitle(){

  let text = document.getElementById(`mainTitle`);

  let chars = words.split(``);

  for(let i = 0; i< chars.length; i++){
    let span = document.createElement(`span`);
    if(chars[i] === ` `){
      span.innerHTML = `&nbsp`;
    }
    else {
      span.innerHTML = chars[i];
    }
    span.classList.add(`character`);
   // Call "fly" on mouse enter (only once)
   span.addEventListener(`mouseenter`, fly, {
     once: true
   });
   // Add the span to the text
   text.appendChild(span);

  }
}

function fly(event){
  let vx = maxSpeed / 2 - Math.random() * maxSpeed;
  let vy = maxSpeed / 2 - Math.random() * maxSpeed;
  // On the next frame
  requestAnimationFrame(function() {
    // Start the element moving at this velocity from its starting position of 0,0
    move(event.target, 0, 0, vx, vy);
  })
}

function move(element, x, y, vx, vy) {
  // Move the position
  x += vx;
  y += vy;
  // Set the transform to the new position
  element.style[`transform`] = `translate(${x}px,${y}px)`;
  // On the next frame do it again
  requestAnimationFrame(function() {
    move(element, x, y, vx, vy);
  });
}

//puts a random line and title for each element
function setupLines(){
  line1P.innerText = random(fiveSyllableLines);
  line2P.innerText = random(sevenSyllableLines);
  line3P.innerText = random(fiveSyllableLines);
  poemTitle.innerText = random(titles);
}


//adds event listeners for changing each line and title of the poem
function addListeners(){
  poemTitle.addEventListener(`click`, lineClicked);
  line1P.addEventListener(`click`, lineClicked);
  line2P.addEventListener(`click`, lineClicked);
  line3P.addEventListener(`click`, lineClicked);
}

function lineClicked(event){
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity){
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0){
    requestAnimationFrame(function(){
      fadeOut(element, opacity);
    });
  }
  else{
    //something to do when its faded out
    setNewLine(element);
    fadeIn(element, 0);
  }
}

function fadeIn(element, opacity){
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if(opacity < 1){
    requestAnimationFrame(function(){
      fadeIn(element, opacity);
    });
  }
}



function setNewLine(element){
  if(element === line1P || element === line3P){
    let a = random(fiveSyllableLines);
    element.innerText = a;
    responsiveVoice.speak(a, "Japanese Female");


  }
  else if(element === line2P){
    let b = random(sevenSyllableLines);
    element.innerText =  b;
    responsiveVoice.speak(b, "Japanese Female");

  }
  else if(element === poemTitle){
    let p = random(titles);
    element.innerText =  p;
    responsiveVoice.speak(p, "Japanese Female");

  }

}


function random(array){
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
