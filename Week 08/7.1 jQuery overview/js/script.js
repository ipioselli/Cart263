
//changes all header colors to green
// $(`.header`).css(`color`, `#339966`);

// let $headers = $(`.header`)
// $headers.css(`color`, `red`);
// $headers.css(`background-color`,`black`);
// $headers.css(`font-size`,`3rem`);

// $(`.header`).css({
//   "color": `blue`,
//   "background-color": `black`,
//   "font-size": `10rem`
// });

// let spanText = $(`example-span`).text();
// let reversedSpanText = spanText.split(``).reverse().join(``);
// $(`#example-span`).text(reversedSpanText);


// let spanHTML= $(`example-span`).html();
// $(`#example-span`).html(`<strong>${spanHTML}</strong>`);


// $(`#main-heading`).attr(`contenteditable`, `true`); //lets you choose what to write

// let $link = $(`#thicc-link`);

// if($link.attr(`href`) === `https://thi.cc`){
//   $link.text(`THICC`);
// }


let $p = $(`<p></p>`);

$p.text(`fresh, fresh paragraph!`);

$(`#second-section`).prepend($p);
