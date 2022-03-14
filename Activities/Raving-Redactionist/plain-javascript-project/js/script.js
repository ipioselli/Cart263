/**
Activity 6: Raving Redactionist
Ines Pioselli

*/

"use strict";

$(`.top-secret`).on(`click`, redact);
setInterval(revelation, 500);

function redact(event){
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

function revelation(){
  $(`.redacted`).each(attemptReveal);
}


function attemptReveal(){
  let r = Math.random();
  if(r < 0.1){ //10% of the time
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
