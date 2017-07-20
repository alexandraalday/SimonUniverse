$(() => {


console.log('loaded bro');

// SOME GLOBAL VARIABLES

let i=0;
let strict = false;
let gameActive = false;
let playerActive = false;
let round = '';
let simonArray = [];
let playerArray = [];
let setSimonPlay;
// Assign the buttons to some variables individually and as a group.
var $topDiamond = $("#top-diamond");
var $rightDiamond = $("#right-diamond");
var $leftDiamond = $("#left-diamond");
var $bottomDiamond = $("#bottom-diamond");
var $allDiamonds = $(".diamond_container");




// GAME RESET

// reset function
function gameReset() {
  simonArray = [];
  round = 0;
  playerArray = [];
  gameActive = false;
}



// GAME LOGIC

// Check for matching arrays
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
          //display a wrong error message on the scoreboard and play a "razz" buzzer sound
          playerArray = []; //reset player array so they can try again
          i = 0;
          setSimonPlay = undefined;
          setSimonPlay = setInterval(simonPlay, 2500);
          return;
        } else if (strict) {
          //display a losing message on the scoreboard and play a "razz" buzzer sound
          gameReset();
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
//display round text to screen here when create scoreboard
let sequencer = setInterval(() => {
  if (simonArray[i] === "top-diamond") {
    $('#top-sound')[0].play();
    $topDiamond.addClass("active")
    setTimeout(() => {
      $topDiamond.removeClass("active");
  }, 1500);
  }
  else if (simonArray[i] === "right-diamond") {
      //look into making this a function since you repeat this later in the code
    $('#right-sound')[0].play();
    $rightDiamond.addClass("active")
    setTimeout(() => {
      $rightDiamond.removeClass("active");
  }, 1500);
  }
  else if (simonArray[i] === "left-diamond") {
    $('#left-sound')[0].play();
    $leftDiamond.addClass("active")
    setTimeout(() => {
      $leftDiamond.removeClass("active");
  }, 1500);
  }
  else if (simonArray[i] === "bottom-diamond") {
    $('#bottom-sound')[0].play();
    $bottomDiamond.addClass("active")
    setTimeout(() => {
      $bottomDiamond.removeClass("active");
  }, 1500);
  }
  setTimeout(() => {
    i++;
  }, 1800);
    if (i + 1 === simonArray.length) {
    clearInterval(simonPlay);
    playerActive = true;
    i = 0;
    }
}, 2000);
};



const startGame = () => {
    //computer selects 20 random colors
    let gemArray = ["top-diamond", "right-diamond", "left-diamond", "bottom-diamond"];
    for (let gem = 0; gem < 20; gem++) {
      //create a new array of these 20 random gems
      simonArray.push(gemArray[Math.floor(Math.random() * gemArray.length)]);
    }
    round = 1;
      // diffCheck();
      // playerSeries = [];
      // seriesLoop();
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
	$modal.fadeIn();
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

$topDiamond.on('click', () =>{
	console.log('top diamond clicked');
  	$('#top-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
    if (playerActive) {
    playerArray.push('e.currentTarget');
    for (let i = 0; i < playerArray.length; i++) {
      if (playerArray[i] != simonArray[i] && strict) {
        round = ":(";
        setTimeout(() => {
          strictReset();
        }, 1000);
      } 
      else if (playerArray[i] != simonArray[i]) {
        playerActive = false;
        count = ":(";
        setTimeout(() => {
          round = series.length;
          seriesLoop();
          playerArray = [];
        }, 1000);
      }
    }
  }
});

$rightDiamond.on('click', () =>{
	console.log('right diamond clicked');
  	$('#right-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
    if (playerActive) {
    playerArray.push('e.currentTarget');
    for (let i = 0; i < playerArray.length; i++) {
      if (playerArray[i] != simonArray[i] && strict) {
        round = ":(";
        setTimeout(() => {
          strictReset();
        }, 1000);
      } 
      else if (playerArray[i] != simonArray[i]) {
        playerActive = false;
        count = ":(";
        setTimeout(() => {
          round = series.length;
          seriesLoop();
          playerArray = [];
        }, 1000);
      }
    }
  }
});

$leftDiamond.on('click', () =>{
	console.log('left diamond clicked');
  	$('#left-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
    if (playerActive) {
    playerArray.push('e.currentTarget');
    for (let i = 0; i < playerArray.length; i++) {
      if (playerArray[i] != simonArray[i] && strict) {
        round = ":(";
        setTimeout(() => {
          strictReset();
        }, 1000);
      } 
      else if (playerArray[i] != simonArray[i]) {
        playerActive = false;
        round = ":(";
        setTimeout(() => {
          round = series.length;
          seriesLoop();
          playerArray = [];
        }, 1000);
      }
    }
  }
});

$bottomDiamond.on('click', () =>{
	console.log('bottom diamond clicked');
  	$('#bottom-sound')[0].play();
    $('e.currentTarget').hover(function() {
      $(this).toggleClass("active")
    });
    if (playerActive) {
    playerArray.push('e.currentTarget');
    for (let i = 0; i < playerArray.length; i++) {
      if (playerArray[i] != simonArray[i] && strict) {
        round = ":(";
        setTimeout(() => {
          strictReset();
        }, 1000);
      } 
      else if (playerArray[i] != simonArray[i]) {
        playerActive = false;
        round = ":(";
        setTimeout(() => {
          round = series.length;
          seriesLoop();
          playerArray = [];
        }, 1000);
      }
    }
  }
});



// START BUTTON EVENT LISTENER

$('#start').on('click', () => {
	console.log('start button clicked');
	$('#start-sound')[0].play();
  gameActive = true;
	startGame();
})



// STEVEN SAYS EVENT LISTENER

$('#steven').on('click', () => {
	console.log("hi! i'm steven");
	$('#steven-sound')[0].play();
})























})