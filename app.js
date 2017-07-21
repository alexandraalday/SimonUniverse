$(() => {
// console.log('loaded bro');

/********************************
// SOME GLOBAL VARIABLES MY DUDE
********************************/
let started = false;
let strict = false; //mode is 'normal' by default
let currentGame = {
  "round": 1,
  "speed": 2000,
  "userInputs": 0
}


/****************
// PLAY SOUND
****************/
const playSound = (sound) => {
  if (sound === "top"){
    $('#top-sound')[0].play();
  }
  else if (sound === "right"){
    $('#right-sound')[0].play();
  } 
  else if (sound === "left"){
    $('#left-sound')[0].play();
  }
  else if (sound === "bottom"){
    $('#bottom-sound')[0].play();
  }
}

/*************************************************
// DIAMOND CLASS AND METHODS FOR SOUNDS AND GLOW
*************************************************/
class Diamond {
  constructor(diamond, sound) {
    this.diamond = document.getElementById(diamond);
    this.chime = () => {
    playSound(sound);
    }; 
  }
}

Diamond.prototype.glowOff = function(){ // inherited by ALL diamond instances
      this.diamond.classList.remove("active");
}

Diamond.prototype.glow = function(){ // inherited by ALL diamond instances
  let duration = currentGame.speed - 500;
    this.glowOff(); // make sure it's not glowing first, duh!
    this.diamond.classList.add("active");
    var glowing = this; // variable so we can pass through the timeout function
    setTimeout(function() {
      glowing.glowOff()
    }, duration); // After a little bit, remove the glowing class
  };
//hi ho
const topDiamond =  new Diamond("top-diamond", "top");
const rightDiamond = new Diamond("right-diamond", "right");
const leftDiamond = new Diamond("left-diamond", "left");
const bottomDiamond = new Diamond("#bottom-diamond", "bottom");
const allDiamonds = [topDiamond, rightDiamond, leftDiamond, rightDiamond];

/***************
// GAME OBJECT
***************/

const gameElements = { 
  "round"     : document.getElementById("round"),    
  "diamonds"  : document.getElementById("diamonds"),  
  "forgiving" : document.getElementById("forgiving"), 
  "strict"    : document.getElementById("strict")     
}

/*************************
// SIMON SEQUENCE OBJECT
*************************/

let sequence  = { 
  "current" : [], 
  "playing" : false,         
  "index"   : 0,           
  "play"    : function(){  // Play  sequence
                this.playing = true;        // The sequence is currently playing (user cannot guess during this time)
                currentGame.userInputs = 0; // Reset the user's input to the start of the sequence
                let _this =  this; // 'this' will be undefined in the timer function so we're storing it in "_this" 
    
                setTimeout(function() {// Wait a second then loop again, going through the sequence
                  let currentDiamond = _this.current[_this.index];
                  currentDiamond.glow();   
                  currentDiamond.chime();
                  _this.index++;             //  increment the counter
                  if (_this.index < currentGame.round) { //  if the counter < the current round, call the loop function
                    _this.play();           //  again which will trigger another sequence play
                  } else {
                    _this.playing = false; // when sequence isn't playing, the user can now guess
                  }                   
                }, currentGame.speed +500) // The speed of the timer
              },
  "generate": function(){ // Generate a random sequence
                this.index = 0;   // Play sequence from the beginning
                this.current = [];// Empty the previous sequence
                let currentSequence = this.current; // in order to pass through for loop
                for (let g = 0; g < 20; g++) {
                    let randomGem = allDiamonds[Math.floor(Math.random() * allDiamonds.length)]
                    //create a new array of these 20 random gems
                    currentSequence.push(randomGem);
                    console.log(currentSequence[g]); // so we can cheat
                  }
              }
};

/****************
// UPDATE ROUND
****************/

function updateRound() { // display current round on page
    gameElements.round.innerHTML = currentGame.round; 
}

/*******************
// CHANGE GAME MODE
*******************/

function setMode(mode){ // Sets the game mode to the mode passed (Either crystal gem or normal)
  //in progress
}

/****************
// RESTART GAME
****************/

const restart = () => { // Starts a new game
  if(started === false){ // If this is the first game played
    started = true; 
    } // then it's been started
    currentGame =  { // Reset to game defaults
    "round": 1,
    "speed": 1000,
    "userInputs": 0
  }
  updateRound();       // Update the round counter to 1
  sequence.generate(); // Generate a new sequence
  sequence.play();     // Play the new sequence
}

/********************
// CHECK FOR WINNER
********************/

const checkWin = () => {
  if(currentGame.userInputs >= sequence.current.length){ 
    // show winning animation here
    setTimeout(function() {
      restart()
      }, 5000); // Wait a bit, then restart the game
  } else if(currentGame.userInputs >= currentGame.round){ // Else if the player has cleared the current round (but not won the whole game)
      currentGame.round++; // Increase the round
      updateRound();       // Update the round text on screen
      sequence.index = 0;  // Reset the sequence index to the beginning
      sequence.play();     // And play the sequence again
  }
}

/***************
// PLAYER GUESS
***************/

const guess = (diamond) => { // Checks a users guess (diamond clicked on)
  if(sequence.current.length === 0){ 
    diamond.chime(); // If the game hasn't started it acts like a music instrument!
  }
    if(sequence.playing || !started){ 
      return; // If sequence is currently playing, don't do anything
    } 
    if(sequence.current[currentGame.userInputs] === diamond){ // incorrect guess
      currentGame.userInputs++; // Increase the user's input (steps)
      diamond.chime(); 
      diamond.glow();
      checkWin(); // did they win?
    } 
  else { // Otherwise they guessed incorrectly
      // add error chime here
      if(strict === true){ 
        setTimeout(function(){
         restart(); 
         }, 1000); // Wait for the error chime to finish, then restart the game
      } 
      else {
        currentGame.userInputs = 0; // reset player's guess
        sequence.index = 0;         // restart from the beginning 
        //add error chime here
        setTimeout(function(){  // Wait for the error chime to finish, then replay
          sequence.playing = false; 
          sequence.play(); 
        }, 1000);
      }
  }
}

/***********************************
// ALL GLOW FOR FUTURE WIN SEQUENCE
***********************************/

function allGlow(){ 
    topDiamond.glow();
    leftDiamond.glow();
    rightDiamond.glow();
    bottomDiamond.glow();
}


/********************************
// INSTRUCTIONS BUTTON AND MODAL
********************************/

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
    $modal.fadeOut();
});


/******************************
// CRYSTAL GEM EVENT LISTENERS
******************************/

$('#top-diamond').on('click', () =>{
  guess(topDiamond)
});

$('#right-diamond').on('click', () =>{
  guess(rightDiamond)
});

$('#left-diamond').on('click', () =>{
  guess(leftDiamond)
});

$('#bottom-diamond').on('click', () =>{
  guess(bottomDiamond)
});


/*************************
// NOW WITH KEYPRESSES!
*************************/

document.onkeydown = function (e) { 
    e = e || window.event;
    if(sequence.playing){return;}
    if (e.keyCode == 38) { // Up 
        guess(topDiamond);
        topDiamond.glow();
    } else if (e.keyCode == 37) { // left
        guess(leftDiamond);
        leftDiamond.glow();
    } else if (e.keyCode == 39) { // right
        guess(rightDiamond);
        rightDiamond.glow();
    } else if (e.keyCode == 40) { // down 
        guess(bottomDiamond);
        bottomDiamond.glow();
    }
};


/******************************
// START BUTTON EVENT LISTENER
******************************/

$('#start').on('click', () => {
	console.log('start button clicked');
	$('#start-sound')[0].play();
  restart();
})


/******************************
// STEVEN SAYS EVENT LISTENER
******************************/

$('#steven').on('click', () => {
	console.log("hi! i'm steven");
	$('#steven-sound')[0].play();
})







})