/**
Exercise 6: Raving Redactionist
Ines Pioselli

This is a destructive reding of the script from twilight breaking down.
You can click on the button to reveal the text and then hover over
the words to reveal the secret message. All letters of the message
are moving in some way.

*/

"use strict";
//i used mostly css animations for this exercise

//fades in the secret document when the button is clicked
$(`#button`).on(`click`, function(event){
  $(`#secret-document`).fadeIn();
});

//fades out text that has been hovered over
$(`.leaving`).one(`mouseover`, function(event) {
  $(this).animate({
    opacity: 0,
  }, 1000) ;
});

//scales the magic letters from the secret message
$(`.grower`).one(`mouseover`, function(event) {
      $(this).addClass(`grow`);
});

//spins the magic word from the secret message
$(`.spinning`).one(`mouseover`, function(event) {
      $(this).addClass(`spin`);
});
