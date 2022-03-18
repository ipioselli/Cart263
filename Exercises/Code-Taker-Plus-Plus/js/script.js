/**
Exercise 7: Code Taker
Ines Pioselli

Brief:
- rework the html and class
- add a model instructions dialog
- add a sound

*/

"use strict";

let message = `sailormoon`;

let specialSound = new Audio(`assets/sounds/SailorMoon.mp3`);

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know,": function(){
      $(this).dialog(`close`);
    }
  }
});

$(`#instructions`).dialog({
  buttons: {
    "OK": function(){
      $(this).dialog(`close`);
    }
  }
});

$(`.secret`).one(`mouseover`, function(event){
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`
  });
});

$(`#answer`).droppable({
  drop: function(event, ui){
    let letter = ui.draggable.text();
    let span = $(`<span class = "answer-letter">${letter}</span>`);
    //adds it to the letter
    $(this).append(span);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    ui.draggable.off(`mouseover`);
    //check if its right
    if($(this).text() === message){
      //plays a sound when you get the answer right
      specialSound.play();
      $(`#solved-dialog`).dialog(`open`);

    }
  }
});

$(`answer`).sortable();
