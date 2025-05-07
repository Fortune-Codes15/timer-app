self.onmessage = ( e ) => {
  const { type, payload } = e.data;

  if ( type === 'PROCESS_DATA' ) {
    const result = payload.map( num => num * 2 );
    self.postMessage( { type: 'RESULT', result } )
  }
}