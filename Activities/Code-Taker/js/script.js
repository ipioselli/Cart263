/**
Exercise 7:  Code Taker
Ines Pioselli

Brief:
- rework html and class
- change the text and message
- add a model instructions dialog when the page loads
- play a sound when the user gets the message right

*/

"use strict";

let message = `Theremin`;

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know,": function(){
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
    //adds it to the letter
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    //check if its right
    if($(this).text() === message){
      $(`#solved-dialog`).dialog(`open`);

    }
  }
});
