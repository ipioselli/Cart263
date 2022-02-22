/**
Activity 5: Haiku Generator
Ines Pioselli

Generates a random haiku

Brief:
 - tidy up the program
 - improve html and css
 - add a title for the poem --> check
 - add css animations
 - add synthesized voice read the poem --> check


*/

"use strict";


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

let titles = [
  `Cold Butterfly`,
  `The Invisible Crying`,
  `Ice of Willow`,
  `The Light's Beginning`,
  `Dragon of Doors`,
  `Forgotten Destiny`,

]


let poemTitle = document.getElementById(`title`);
let line1P = document.getElementById(`line-1`);
let line2P =  document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);


setupLines();

addListeners();



function setupLines(){
  line1P.innerText = random(fiveSyllableLines);
  line2P.innerText = random(sevenSyllableLines);
  line3P.innerText = random(fiveSyllableLines);
  poemTitle.innerText = random(titles);
}



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


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {

}


/**
Description of draw()
*/
function draw() {

}
