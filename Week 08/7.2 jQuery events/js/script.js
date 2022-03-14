
//removes smtg with a click
// $(`.header`).on(`click`, function(event) {
//   $(this).remove();
// });

// $(`section`).on(`click`, function(event) {
//   $(this).append(`<p>This will be added every click.</p>`)
// });
//
// $(`section`).one(`click`, function(event) {
//   $(this).append(`<p>This will be added once only.</p>`)
// });

// Listen for clicks on the header class
$(`.header`).on(`click`, function(event) {
  // Change the clicked header to red
  $(this).css(`color`, `red`);
  // Stop listening for clicks on the header class
  $(`.header`).off(`click`);
});
