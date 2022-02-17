

// let mainHeading = document.getElementById(`main-heading`);
//
// mainHeading.style[`color`] = `#339966`;
// mainHeading.style[`fontSize`] = `4rem`;
// mainHeading.style[`font-family`] = `Courier, monospace`;


// let pronoun = document.getElementById(`pronoun`);

// if(pronoun.innerText === `we`){
//   pronoun.innerText = `you`;
// }

// pronoun.innerHTML = `<strong>you</strong>`;

//changes the clown image to a random image
// let image = document.getElementById(`clown-image`);
//
// image.setAttribute(`src`, `http://loremflickr.com/320/240/clown`);

// let headers = document.getElementsByClassName(`header`);
//
// for(let i = 0; i < headers.length; i++){
//   headers[i].style[`color`] = `#ff0000`;
// }

// //changes h2 to red
// let h2s = document.getElementsByTagName(`h2`);
//
// for(let i = 0; i < h2s.length; i++){
//   h2s[i].style[`color`] = `#ff0000`;
// }

// let headers = document.querySelectorAll(`h2`);
//
// for(let i = 0; i< headers.length; i++){
//   headers[i].style[`color`] = `#ff0000`;
// }

let newP = document.createElement(`p`);
newP.innerText = `Gosh, I sure do like clowns.`;

let clownSection = document.getElementById(`clown-section`);
clownSection.appendChild(newP);
