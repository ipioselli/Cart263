/**
Exercise 6: Raving Redactionist
Ines Pioselli

Brief:
- improve visuals
- find a different text
- animate
- secret message

*/

"use strict";
//i used mostly css animations for this exercise

//fades in the secret document when the button is clicked
$(`#button`).on(`click`, function(event){
  $(`#secret-document`).fadeIn();
});

//fades out text that has been hovered over
$(`.leaving`).one(`mouseover`, function(event) {
  $(this).fadeOut(`leave`) ;
});

//scales the magic letters from the secret message
$(`.grower`).one(`mouseover`, function(event) {
      $(this).addClass(`grow`);
});

//spins the magic word from the secret message
$(`.spinning`).one(`mouseover`, function(event) {
      $(this).addClass(`spin`);
});
