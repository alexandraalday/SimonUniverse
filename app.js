$(() => {
// console.log('loaded bro');


/********************************
 // SAY HELLO, STEVEN
********************************/

    $('#steven-says').typewrite({
        'delay': 100
    });



/********************************
// SOME GLOBAL VARIABLES MY DUDE
********************************/
let started = false;
let hero = false; //mode is 'normal' by default
let currentGame = {
  "round": 1,
  "userGuess": 0
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

Diamond.prototype.glow = function(){ // inherited by ALL diamond instances;
    this.glowOff(); // make sure it's not glowing first, this causes it to not glow on future instances
    this.diamond.classList.add("active");
    var glowing = this; // variable so we can pass to the timeout function
    setTimeout(function() {
      glowing.glowOff()
    }, 1500); // remove the glowing class after a lil bit
  };

//hi ho hi ho
const topDiamond =  new Diamond("top-diamond", "top");
const rightDiamond = new Diamond("right-diamond", "right");
const leftDiamond = new Diamond("left-diamond", "left");
const bottomDiamond = new Diamond("bottom-diamond", "bottom");
const allDiamonds = [topDiamond, rightDiamond, leftDiamond, rightDiamond];


/***************
// GAME OBJECT
***************/

const gameElements = { 
  "round"     : document.getElementById("round"),    
  "diamonds"  : document.getElementById("diamonds"),  
  "normal" : document.getElementById("normal"), 
  "hero"    : document.getElementById("hero")     
}

/*************************
// SIMON SEQUENCE OBJECT
*************************/

let simonSequence  = { 
  "current" : [], 
  "playing" : false,         
  "index"   : 0,           
  "play"    : function(){  
                this.playing = true;        // currently playing (user cannot guess during this time)
                currentGame.userGuess = 0; // set the user's input back to zero
                let tempSequenceVariable =  this; // so we can pass to timeout function
    
                setTimeout(function() {// wait and then play sequence
                  let currentDiamond = tempSequenceVariable.current[tempSequenceVariable.index];
                  currentDiamond.glow();   
                  currentDiamond.chime();
                  tempSequenceVariable.index++;             //  increment the counter
                  if (tempSequenceVariable.index < currentGame.round) { //  if the counter < the current round, call the loop function
                    tempSequenceVariable.play();           //  again which will trigger another sequence play
                  } else {
                    tempSequenceVariable.playing = false; // when sequence isn't playing, the user can now guess
                  }                   
                }, 2000) // speed of the timeout
              },
  "generate": function(){ // Generate a random sequence
                this.index = 0;   // Play sequence from the beginning
                this.current = [];// Empty the previous sequence
                let currentSequence = this.current; // in order to pass through for loop
                for (let g = 0; g < 3; g++) {  //resetting to only 3 levels for presentation purposes. normally will be 20 levels. 
                    let randomGem = allDiamonds[Math.floor(Math.random() * allDiamonds.length)]
                    //create a new array of these 20 random gems
                    currentSequence.push(randomGem);
                    console.log(currentSequence[g].diamond); // so we can cheat :) 
                  }
            }
};

/****************
// UPDATE ROUND
****************/

function updateRound() { // display current round on page
    gameElements.round.innerHTML = currentGame.round; 
}


/****************
// RESTART GAME
****************/

const restartGame = () => { // new game
  if(started === false){ // if this is the first game played set started to true
    started = true; 
    } // else it's been started
    currentGame =  { // reset values
    "round": 1,
    "userGuess": 0
  }
  updateRound();       // update round
  allGlow();
  simonSequence.generate(); // new sequence
  simonSequence.play();     // play sequence
}

/*******************
// CHANGE GAME MODE
*******************/

function setMode(mode){ // Sets the game mode to the mode passed (Either crystal gem or normal)
 if (mode === '#hero'){
  hero = true; //game mode is now crystal gem hero mode 
 }
 else if (mode === '#normal') {
  hero = false; // game mode is now in normal mode
 }
};



/***********************
// SPIN ME RIGHT ROUND
***********************/

const spinMoves = () => {
  $('#diamonds').velocity({rotateZ: "+=405" }); //because it is already rotated +45deg
}


/********************
// CHECK FOR WINNER
********************/

const checkWin = () => {
  if(currentGame.userGuess >= simonSequence.current.length){
    allGlow();
    spinMoves(); 
    youWin(); //call the winning modal
    setTimeout(function() {
      restartGame();
      }, 5000); // Wait a bit, then restart the game
  } else if(currentGame.userGuess >= currentGame.round){ // player cleared round, but not completed all levels
      currentGame.round++; // move to next round
      updateRound();      
      simonSequence.index = 0;  // reset the sequence index to the beginning
      simonSequence.play();     // play the sequence
  }
}

/***************
// PLAYER GUESS
***************/

const guess = (diamond) => { // checks a users guess (diamond clicked on)
  if(simonSequence.current.length === 0){ 
    diamond.chime(); //ding dong ding
  }
    if(simonSequence.playing || !started){ 
      return; // don't do anything if sequence is currently playing
    } 
    if(simonSequence.current[currentGame.userGuess] === diamond){ // incorrect guess
      currentGame.userGuess++; // increase input
      diamond.chime(); 
      diamond.glow();
      checkWin(); // did they win?
    } 
  else { // they guessed incorrectly
      if(hero === true){ 
        youLose();
        setTimeout(() => {
          $('#loseModal').fadeOut();
         restartGame(); 
         }, 4000); // wait a bit for modal to be read, then restart the game
      } 
      else {
        currentGame.userGuess = 0; // reset player's guess input
        simonSequence.index = 0;         // restart current sequence
        $('#oops-sound')[0].play();
        $('#steven-says').html('Ooops! Try again.').typewrite({
          'delay': 100
        });
        setTimeout(() => {  // wait for the error sound to finish, then replay sequence
        $('#steven-says').html('You can do it!').typewrite({
          'delay': 100
        });
          simonSequence.playing = false; 
          simonSequence.play(); 
        }, 1800);
      }
  }
}

/***********************************
// ALL GLOW FOR FUTURE WIN SEQUENCE
***********************************/

const allGlow = () => { 
    topDiamond.glow();
    leftDiamond.glow();
    rightDiamond.glow();
    bottomDiamond.glow();
}


/********************************
// INSTRUCTIONS BUTTON AND MODAL
********************************/

const $instructionsModal = $('#instructionsModal');
const $button = $('#instructions');
const $close = $('.close');

// when the user clicks on the button, open the modal
// added button sound via help from stack overflow
$button.on('click', () => {
	$instructionsModal.fadeIn();
    let $audioElement = $('<audio>');
    $audioElement.attr('src', 'https://s3-us-west-2.amazonaws.com/simonuniversesounds/220173__gameaudio__spacey-1up-power-up.wav');
    $button.append($audioElement);
	$audioElement[0].play();
});

// when the user clicks on <span> (x), close the modal
$close.on('click', () => {
    $instructionsModal.fadeOut();
});

/********************************
// WIN MODAL
********************************/

const youWin = () => {
// when the user wins, open the modal
  $('#winModal').fadeIn();
  $('#win-sound')[0].play();
}
// when the user clicks on <span> (x), close the modal
$close.on('click', () => {
    $('#winModal').fadeOut();
});

/********************************
// LOSE MODAL
********************************/

const youLose = () => {
// when the user loses, open the modal
  $('#loseModal').fadeIn();
  $('#lose-sound')[0].play();
}
// when the user clicks on <span> (x), close the modal
$close.on('click', () => {
    $('#loseModal').fadeOut();
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

document.onkeydown = (e) => { 
    e = e || window.event;
    if(simonSequence.playing){
      return;  // don't do anything if the sequence is playing
    }
    if (e.keyCode == 38) { // up 
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
	$('#start-sound')[0].play();
  $('#steven-says').html('Woah, that was so coooool!').typewrite({
    'delay': 100
  });
  restartGame();
})


/******************************
// STEVEN SAYS EVENT LISTENER
******************************/

$('#steven').on('click', () => {
	$('#steven-sound')[0].play();
})


/******************************
// RESTART BUTTON EVENT LISTENER
******************************/

$('#replay').on('click', () => {
  $('#restart-sound')[0].play();
  restartGame();
})



 /******************************
// GAME MODE EVENT LISTENERS
******************************/

//toggles active to display which mode the player is currently on

$('#hero').on('click', () => {
  $('#mode-sound')[0].play();
  $('#hero').toggleClass("active");
  $('#normal').toggleClass("active");
  setMode('#hero');
})

$('#normal').on('click', () => {
  $('#mode-sound')[0].play();
  $('#hero').toggleClass("active");
  $('#normal').toggleClass("active");
  setMode('#normal');
})




})