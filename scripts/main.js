const audio = document.querySelector( 'audio' )
const minDisplay = document.querySelector( '#min' );
const secInput = document.querySelector( '.seconds' );
const minInput = document.querySelector( '.minutes' )
const btn = document.querySelector( '.button' );
const secDisplay = document.querySelector( '#sec' );
const pauseBtn = document.querySelector( '.pause' );


let timerOn = false; // track timer's state
let paused = false;
let interval;
let min, sec;
pauseBtn.disabled = true;

// function for handling timer logic
function timer() {
  sec = Number( secInput.value );
  min = Number( minInput.value );

  interval = setInterval( () => {
    if ( min <= 0 && sec <= 0 || timerOn === false ) {
      clearInterval( interval );
      btn.disabled = false
      pauseBtn.disabled = true;
      audio.play()
    } else {
      if ( min >= 0 && sec === 0 ) {
        min--;
        sec = 60;
      }
      sec--;
      minDisplay.innerHTML = String( min ).padStart( 2, 0 );
      secDisplay.innerHTML = String( sec ).padStart( 2, 0 );
      pauseBtn.disabled = false
    }
  }, 1000 );
};

// to handle click event
btn.addEventListener( 'click', () => {
  timerOn = true
  if ( timerOn === true ) {
    btn.disabled = true
    minSec()
    timer();
    minInput.value = '';
    secInput.value = '';
  };
  paused = false
} );

// added live changes to display
const allInputs = document.querySelectorAll( 'input' );

allInputs.forEach( ( input ) => {
  input.addEventListener( 'input', () => {
    btn.disabled = false;
    pauseBtn.disabled = true;
    icon.classList.remove( 'ri-play-fill' );
    if ( paused === true ) {
      secDisplay.innerHTML = String( 0 ).padStart( 2, 0 );
      minDisplay.innerHTML = String( 0 ).padStart( 2, 0 );
    }

  } );
} )

secInput.addEventListener( 'input', () => {
  timerOn = false;
  secDisplay.innerHTML = String( secInput.value ).padStart( 2, 0 );
  if ( !Number( secInput.value ) || Number( secInput.value ) < 0 ) {
    secInput.value = '';
    secDisplay.innerHTML = String( secInput.value ).padStart( 2, 0 )
  }

} );
minInput.addEventListener( 'input', () => {
  timerOn = false;
  minDisplay.innerHTML = String( minInput.value ).padStart( 2, 0 );
  if ( !Number( minInput.value ) || Number( minInput.value ) < 0 ) {
    minInput.value = '';
    minDisplay.innerHTML = String( minInput.value ).padStart( 2, 0 )
  }
} );

// function to change the time into a correct time format
function minSec() {
  if ( secInput.value >= 60 ) {
    const changedTime = Math.round( secInput.value / 60 );
    const addedTime = Number( minInput.value ) + changedTime;
    minInput.value = addedTime;

    const remainingTime = ( secInput.value % 60 );
    secInput.value = Number( remainingTime );
  }
};


//pause button functionality
const icon = document.querySelector( '.play' )

pauseBtn.addEventListener( 'click', () => {
  icon.classList.toggle( 'ri-play-fill' );
  paused = !paused;
  if ( paused === true ) {
    clearInterval( interval );
  } else {
    interval = setInterval( () => {
      if ( min <= 0 && sec <= 0 || timerOn === false ) {
        clearInterval( interval );
        btn.disabled = false
        pauseBtn.disabled = false
      } else {
        if ( min >= 0 && sec === 0 ) {
          min--;
          sec = 60;
        }
        sec--;
        minDisplay.innerHTML = String( min ).padStart( 2, 0 );
        secDisplay.innerHTML = String( sec ).padStart( 2, 0 );
        pauseBtn.disabled = false
      }
    }, 1000 );
  }
  console.log( paused )
} );

const resetBtn = document.querySelector( '.reset' )
resetBtn.addEventListener( 'click', () => {
  clearInterval( interval );
  secInput.value = '';
  minInput.value = '';
  minDisplay.innerHTML = String( minInput.value ).padStart( 2, 0 )
  secDisplay.innerHTML = String( secInput.value ).padStart( 2, 0 );
  btn.disabled = false;
  pauseBtn.disabled = true;
  icon.classList.remove( 'ri-play-fill' );
  paused = false;
  audio.currentTime = 0;
  audio.pause()
} );