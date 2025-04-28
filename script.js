const minDisplay = document.querySelector( '#root' );
const secInput = document.querySelector( '.seconds' );
const minInput = document.querySelector( '.minutes' )
const btn = document.querySelector( '.button' );
const secDisplay = document.querySelector( '#topRoot' );

let timerOn = false; // track timer use

// function for handling timer logic
function timer() {
  let sec = Number( secInput.value );
  let min = Number( minInput.value );

  const interval = setInterval( () => {
    if ( min <= 0 && sec <= 0 || timerOn === false ) {
      clearInterval( interval );
    } else {
      if ( min >= 0 && sec === 0 ) {
        min--;
        sec = 60;
      }
      sec--;
      secDisplay.innerHTML = String( min ).padStart( 2, 0 );
      minDisplay.innerHTML = String( sec ).padStart( 2, 0 );
    }
  }, 1000 );
};

// to handle click event
btn.addEventListener( 'click', () => {
  timerOn = true
  if ( timerOn === true ) {
    minSec()
    timer();
    minInput.value = '';
    secInput.value = '';
  }
} );

// added live changes to display
const allInputs = document.querySelectorAll( 'input' );

secInput.addEventListener( 'input', () => {
  timerOn = false
  minDisplay.innerHTML = String( secInput.value ).padStart( 2, 0 );
} );
minInput.addEventListener( 'input', () => {
  timerOn = false
  secDisplay.innerHTML = String( minInput.value ).padStart( 2, 0 )
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