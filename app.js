$(() => {


console.log('loaded bro');

// SOME GLOBAL VARIABLES

let i=0;
let strict = false;
let round = '';
let simonArray = [];
let playerArray = [];
let setSimonPlay;





// GAME LOGIC



const checkWinner = (e) => {
  playerArray.push(e.currentTarget);
  let counter = 0;
  if (playerArray.length < i) {
    return;
  }
  else if (playerArray.length === round) {
    for (let x = 0; x < playerArray.length; x++) {
      console.log(playerArray[x], simonArray[x]);
      if (playerArray[x] !== simonArray[x]) {
        if (!strict) { //player can try again
          i = 0;
          //display a wrong error message on the scoreboard and play a "razz" buzzer sound
          playerArray = []; //reset player array so they can try again
          i = 0;
          setSimonPlay = undefined;
          setSimonPlay = setInterval(simonPlay, 2500);
          return;
        } else if (strict) {
          i = 0;
          //display a losing message on the scoreboard and play a "razz" buzzer sound
          playerArray = [];
          simonArray= [];
          round = 0;
          return;
        }
      } else if (playerArray[x] === simonArray[x]) {
          counter++
          if (counter === 20) {
            //display winning message to scoreboard
            playerArray = [];
            simonArray = [];
            round = 0;
            i = 0;
            return;
          }
          else if (counter === round) {
            round++;
            //display round to scoreboard
            i = 0;
            setSimonPlay = undefined;
            setSimonPlay = setInterval(simonPlay, 2500);
            return;
          }
      }
    }
  }
}        
 
const simonPlay = () => {
	// checkWinner();
//display round text to screen here when create scoreboard
  if (simonArray[i] === "top-diamond") {
  	$('#top-sound')[0].play();
  	$('#top-diamond').addClass("active")
  	setInterval(function(){
    	$('#top-diamond').removeClass("active");
	}, 2000);
  }
  else if (simonArray[i] === "right-diamond") {
  		//look into making this a function since you repeat this later in the code
  	$('#right-sound')[0].play();
  	$('#right-diamond').addClass("active")
  	setInterval(function(){
    	$('#right-diamond').removeClass("active");
	}, 2000);
  }
  else if (simonArray[i] === "left-diamond") {
  	$('#left-sound')[0].play();
  	$('#left-diamond').addClass("active")
  	setInterval(function(){
    	$('#left-diamond').removeClass("active");
	}, 2000);
  }
  else if (simonArray[i] === "bottom-diamond") {
  	$('#bottom-sound')[0].play();
  	$('#bottom-diamond').addClass("active")
  	setInterval(function(){
    	$('#bottom-diamond').removeClass("active");
	}, 2000);
  }
  i++;
}


const startGame = () => {
    //computer selects 20 random colors
    let gemArray = ["top-diamond", "right-diamond", "left-diamond", "bottom-diamond"];
    for (let g = 0; g < 20; g++) {
      simonArray.push(gemArray[Math.floor(Math.random() * gemArray.length)]);
    }
    round = 1;
    //display round text to screen here when create scoreboard
    setSimonPlay = setInterval(simonPlay, 2500);
}


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
  	$('#top-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
})

$('#right-diamond').on('click', () =>{
	console.log('right diamond clicked');
  	$('#right-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
})

$('#left-diamond').on('click', () =>{
	console.log('left diamond clicked');
  	$('#left-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
})

$('#bottom-diamond').on('click', () =>{
	console.log('bottom diamond clicked');
  	$('#bottom-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
})



// START BUTTON EVENT LISTENER

$('#start').on('click', () => {
	console.log('start button clicked');
	$('#start-sound')[0].play();
	startGame();
})

// STEVEN SAYS EVENT LISTENER

$('img').on('click', () => {
	console.log("hi! i'm steven");
	$('#steven-sound')[0].play();
})























})