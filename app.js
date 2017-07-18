$(() => {


console.log('loaded bro')




// INSTRUCTIONS BUTTON AND MODAL

const $modal = $('.modal')
const $button = $('#instructions')
const $close = $('.close')


// When the user clicks on the button, open the modal
$button.on('click', () => {
	$modal.css('display', "block")
});

// When the user clicks on <span> (x), close the modal
$close.on('click', () => {
    $modal.css('display', "none")
});









})