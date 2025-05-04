const changePreference = document.querySelector( '.preference_text' );
const body = document.querySelector( 'body' );
const icons = document.querySelectorAll( 'button' );
const inputs = document.querySelectorAll( 'input' )


if ( localStorage.getItem( 'darkMode' ) === 'enabled' ) {
  body.classList.add( 'dark' );
  icons.forEach( icon => icon.classList.add( 'icons-dark' ) );
  inputs.forEach( input => input.classList.add( 'input-dark' ) );
}

changePreference.addEventListener( 'click', () => {
  body.classList.toggle( 'dark' );
  icons.forEach( icon => icon.classList.toggle( 'icons-dark' ) );
  inputs.forEach( input => input.classList.toggle( 'input-dark' ) );

  const isDarkMode = body.classList.contains( 'dark' );
  localStorage.setItem( 'darkMode', isDarkMode ? 'enabled' : 'disabled' );
} );


const user = 'Fortune';

localStorage.setItem( 'user', JSON.stringify( user ) );

const storedUSer = JSON.parse( localStorage.getItem( 'user' ) )
console.log( storedUSer );
