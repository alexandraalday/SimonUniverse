$(() => {


console.log('loaded bro');



// INSTRUCTIONS BUTTON AND MODAL

const $modal = $('.modal');
const $button = $('#instructions');
const $close = $('.close');


// When the user clicks on the button, open the modal
$button.on('click', () => {
	$modal.css('display', "block");
});

// When the user clicks on <span> (x), close the modal
$close.on('click', () => {
    $modal.css('display', "none");
});




// CRYSTAL GEM EVENT LISTENERS

$('#top-diamond').on('click', () =>{
	console.log('top diamond clicked');
})

$('#right-diamond').on('click', () =>{
	console.log('right diamond clicked');
})

$('#left-diamond').on('click', () =>{
	console.log('left diamond clicked');
})

$('#bottom-diamond').on('click', () =>{
	console.log('bottom diamond clicked');
})


// START BUTTON EVENT LISTENER

$('#start').on('click', () => {
	console.log('start button clicked');
})

















})