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
//fades in the secret document when the button is clicked
$(`#button`).on(`click`, function(event){
  $(`#secret-document`).fadeIn();
});

$(`.leaving`).one(`mouseenter`, function(event) {
  $(this).fadeOut(`leave`) ;
});
// $(`.top-secret`).on(`click`, redact);
// setInterval(revelation, 500);

$(`.grower`).one(`mouseover`, function(event) {
      $(this).addClass(`grow`);
});
$(`.spinning`).one(`mouseover`, function(event) {
      $(this).addClass(`spin`);
});

// function redact(event){
//   $(this).removeClass(`revealed`);
//   $(this).addClass(`redacted`);
// }
//
// function revelation(){
//   $(`.redacted`).each(attemptReveal);
// }
//
//
// function attemptReveal(){
//   let r = Math.random();
//   if(r < 0.1){ //10% of the time
//     $(this).removeClass(`redacted`);
//     $(this).addClass(`revealed`);
//   }
// }
