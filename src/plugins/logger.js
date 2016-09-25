// Credits: fcomb/redux-logger

function createLogger( {
	collapsed = true,
	transformer = state => state,
	actionTransformer = action => action
} = {} ) {
	return store => {
		let prevState = JSON.parse( JSON.stringify( store.state ) );
		store.subscribe( ( action, state ) => {
			const nextState = JSON.parse( JSON.stringify( state ) );
			const time = new Date();
			const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;
			const message = `action ${ action.meta.namespace  }/${ action.type  }${ formattedTime }`;

			collapsed
				? console.groupCollapsed( message )
				: console.group( message );

			console.log('%c prev model state', 'color: #9E9E9E; font-weight: bold', transformer( prevState[ action.meta.namespace ] ));
			console.log('%c action', 'color: #03A9F4; font-weight: bold', actionTransformer( action ));
			console.log('%c next model state', 'color: #4CAF50; font-weight: bold', transformer( nextState[ action.meta.namespace ] ));

			console.groupEnd( message );

			prevState = nextState;
		} );
	}
}

function repeat (str, times) {
	return (new Array(times + 1)).join(str);
}

function pad (num, maxLength) {
	return repeat('0', maxLength - num.toString().length) + num;
}

export default createLogger;
