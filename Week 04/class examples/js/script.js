/**
Class 4: In class examples
Ines Pioselli

*/

"use strict";

let countries = undefined;

let fav = undefined;

const FAVOURITE_COUNTRY_KEY = `country-data`;



function preload() {

countries = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries_with_capitals.json`); //load data from the raw file
}


/**
Description of setup
*/
function setup() {
  createCanvas(500,500);

  let data = JSON.parse(localStorage.getItem(FAVOURITE_COUNTRY_KEY)); //should be really specific

  //checks if there is data already there
  if(data){
    fav = data;
  }
  else{
    fav = random(countries.countries);
    localStorage.setItem(FAVOURITE_COUNTRY_KEY, JSON.stringify(fav)); //needs to convert fav into a string
  }

  if(annyang){
    let commands = {
      "My favourite country is *countryName*": saveFavouriteCountry
    };
    annyang.addCommands(commands);
    annyang.start();
  }

}

function saveFavouriteCountry(countryName){
  fav = countryName;
  localStorage.setItem(FAVOURITE_COUNTRY_KEY, JSON.stringify(fav));
}

function draw() {

  background(200);
  if(fav !== undefined){
    push();
    fill(0);
    textSize(24);
    text(`Your favourite Country is ${fav.name}`, 100, 100);
    text(`Its capital is ${fav.capital}`, 100, 150);
    pop();
  }


}

function mousePressed(){
  if(mouseX < 10){
    localStorage.removeItem(FAVOURITE_COUNTRY_KEY); //removes the stored data
    fav = undefined;
  }
}
