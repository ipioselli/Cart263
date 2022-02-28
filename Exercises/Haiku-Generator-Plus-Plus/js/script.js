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

let maxSpeed = 3; //speed for transform animation

let words = `Haiku Generator by Ines Pioselli`; //for main title

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
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

//set up the starting lines and title
setupLines();
//setup the main title
setupMainTitle();
//listen for click events
addListeners();

//splits the characters in the line and makes them move on mouse enter
function setupMainTitle() {
  //text element for the main title
  let text = document.getElementById(`mainTitle`);
  //split characters from the line into individual characters
  let chars = words.split(``);
  //goes through every character in the array
  for (let i = 0; i < chars.length; i++) {
    let span = document.createElement(`span`);
    //if its a space add it to the span's html
    if (chars[i] === ` `) {
      span.innerHTML = `&nbsp`; //space character
    }
    else { //add characters to itself
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

//starts flying the characters
function fly(event) {
  //set the velocity
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
function setupLines() {
  line1P.innerText = random(fiveSyllableLines);
  line2P.innerText = random(sevenSyllableLines);
  line3P.innerText = random(fiveSyllableLines);
  poemTitle.innerText = random(titles);
}


//adds event listeners for changing each line and title of the poem
function addListeners() {
  poemTitle.addEventListener(`click`, lineClicked);
  line1P.addEventListener(`click`, lineClicked);
  line2P.addEventListener(`click`, lineClicked);
  line3P.addEventListener(`click`, lineClicked);
}

//triggers a fade when a line or title is clicked
function lineClicked(event) {
  fadeOut(event.target, 1);
}

//reduces the opacity until it reaches zero and fades in the next element
function fadeOut(element, opacity) {
  //decrease opacity
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0) {
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  } else {
    //if not switch line and fade in
    setNewLine(element);
    //fades in the next text
    fadeIn(element, 0);
  }
}

//increases the opacity to 1
function fadeIn(element, opacity) {
  //increase opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  //check if opacity is less than 1
  if (opacity < 1) {
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  }
}


//set a new line and call responsive voice
function setNewLine(element) {
  if (element === line1P || element === line3P) { //use 5 syllables
    let a = random(fiveSyllableLines);
    element.innerText = a;
    responsiveVoice.speak(a, "Japanese Female");
  } else if (element === line2P) { //use 7 syllables
    let b = random(sevenSyllableLines);
    element.innerText = b;
    responsiveVoice.speak(b, "Japanese Female");

  } else if (element === poemTitle) { //use titles
    let p = random(titles);
    element.innerText = p;
    responsiveVoice.speak(p, "Japanese Female");

  }

}

//function to return random element from the arrays
function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
