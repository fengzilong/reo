class Model {
	constructor( {
		state = {},
		reducers = {}
	} = {} ) {
		this._state = state;
		this._reducers = reducers;
		this._subscribers = [];
		this._dispatching = false;
	}
	get state() {
		return this._state;
	}
	set state( v ) {
		throw new Error( 'cannot replace state directly' );
	}
	watch() {

	}
	subscribe( fn ) {
		this._subscribers.push( fn );
	}
	commit( type, payload ) {
		if( this._dispatching ) {
			return;
		}

		// invalid action
		if( typeof type !== 'string' ) {
			return;
		}

		const reducers = this._reducers;
		const state = this._state;

		for ( let i in reducers ) {
			if( type === i ) {
				let reducer = reducers[ i ];
				this._dispatching = true;
				reducer( state, payload );
				this._dispatching = false;
				// notify subscribers
				this.notify( type, payload );
				break;
			}
		}
	}
	notify( type, payload ) {
		const subscribers = this._subscribers;
		for ( let i = 0, len = subscribers.length; i < len; i++ ) {
			subscribers[ i ]( type, payload );
		}
	}
}

export default Model;
