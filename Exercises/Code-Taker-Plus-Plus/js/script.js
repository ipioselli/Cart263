/**
Exercise 7: Code Taker
Ines Pioselli

-Program to hover over letters to unlock a secret message
- you must drag the letters into the blue box and if you get the message right
a song will play and a special message will pop up

*/

"use strict";

let message = `sailormoon`; //secret message

let specialSound = new Audio(`assets/sounds/SailorMoon.mp3`); //song to play when you win

//dialog box for when you find the secret message
$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know,": function(){
      $(this).dialog(`close`);
    }
  }
});

//dialog box for the instructions
$(`#instructions`).dialog({
  buttons: {
    "OK": function(){
      $(this).dialog(`close`);
    }
  }
});

//highlight the secret letters
$(`.secret`).on(`mouseover`, function(event){
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`
  });
});

$(`#answer`).droppable({
  accept: ".secret",
  drop: function(event, ui){
    let letter = ui.draggable.text();
    let span = $(`<span class = "answer-letter">${letter}</span>`);
    //adds it to the letter
    $(this).append(span);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    ui.draggable.off(`mouseover`);

    checkAnswer();

  }
});

//checks for the answer
function checkAnswer(){
  console.log("checking")
  //check if its right
  if ($(`#answer`).text() === message){
    //plays a sound when you get the answer right
    specialSound.play();
    //dialog box pops up as well
    $(`#solved-dialog`).dialog(`open`);

  }
}


//allows you to sort the letters and then it checks for the answer
$(`#answer`).sortable({
  update: checkAnswer
});
