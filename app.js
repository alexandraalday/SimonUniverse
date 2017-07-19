$(() => {


console.log('loaded bro');



// INSTRUCTIONS BUTTON AND MODAL

const $modal = $('.modal');
const $button = $('#instructions');
const $close = $('.close');


// When the user clicks on the button, open the modal
// added button sound via help from stack overflow
$button.on('click', () => {
	$modal.css('display', "block");
    let $audioElement = $('<audio>');
    $audioElement.attr('src', 'https://s3-us-west-2.amazonaws.com/simonuniversesounds/220173__gameaudio__spacey-1up-power-up.wav');
    $button.append($audioElement);
	$audioElement[0].play();
});


// When the user clicks on <span> (x), close the modal
$close.on('click', () => {
    $modal.css('display', "none");
});




// CRYSTAL GEM EVENT LISTENERS

$('#top-diamond').on('click', () =>{
	console.log('top diamond clicked');
	let $audioElement = $('<audio>');
    $audioElement.attr('src', 'https://s3-us-west-2.amazonaws.com/simonuniversesounds/simonSound1.mp3');
    $button.append($audioElement);
	$audioElement[0].play();
})

$('#right-diamond').on('click', () =>{
	console.log('right diamond clicked');
	let $audioElement = $('<audio>');
    $audioElement.attr('src', 'https://s3-us-west-2.amazonaws.com/simonuniversesounds/simonSound2.mp3');
    $button.append($audioElement);
	$audioElement[0].play();
})

$('#left-diamond').on('click', () =>{
	console.log('left diamond clicked');
    let $audioElement = $('<audio>');
    $audioElement.attr('src', 'https://s3-us-west-2.amazonaws.com/simonuniversesounds/simonSound3.mp3');
    $button.append($audioElement);
	$audioElement[0].play();
})

$('#bottom-diamond').on('click', () =>{
	console.log('bottom diamond clicked');
    let $audioElement = $('<audio>');
    $audioElement.attr('src', 'https://s3-us-west-2.amazonaws.com/simonuniversesounds/simonSound4.mp3');
    $button.append($audioElement);
	$audioElement[0].play();
})


// START BUTTON EVENT LISTENER

$('#start').on('click', () => {
	console.log('start button clicked');
})

















})