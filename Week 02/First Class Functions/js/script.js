/**
2.3 First Class Functions
Ines Pioselli


*/

"use strict";

let addingFunction = add;

let result = addingFunction(1,10);

//alert(`The result is ${result}`);

// function hello(){
//   alert(`Hello!`);
// }

// let hello = function(){
//   alert(`Hello!`);
// };

setTimeout(function(){  //adds a delay
  alert(`Hello!`);
}, 5000);



function setup() {

}


function draw() {

}

function add(a,b){
  return a + b;
}
