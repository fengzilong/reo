class Model {
	constructor( {
		name,
		state = {},
		reducers = {},
		effects = {},
		subscriptions = {}
	} = {} ) {
		this._name = name;
		this._reducers = reducers;
		this._effects = effects;
		this._subscribers = [];
		this._dispatching = false;

		// make state available outside
		Object.defineProperty( this, 'state', {
			get() {
				return state;
			},
			set() {
				console.error( 'cannot replace state directly' );
			}
		} );
	}
	get name() {
		return this._name;
	}
	set name( v ) {
		throw new Error( 'cannot change model name directly' );
	}
	watch() {

	}
	subscribe( fn ) {
		this._subscribers.push( fn );
	}
	take( type ) {
		// type包含effects?
	}
	put( type, ...params ) {
		if( this._dispatching ) {
			return;
		}

		// invalid action
		if( typeof type !== 'string' ) {
			return;
		}

		const reducers = this._reducers;
		const effects = this._effects;
		const state = this.state;
		const put = this.put.bind( this );

		let found = false;

		for( let i in reducers ) {
			if( type === i ) {
				found = true;
				let reducer = reducers[ i ];
				this._dispatching = true;
				reducer( state );
				this._dispatching = false;
				// notify subscribers
				this.notify( type, ...params );
				break;
			}
		}

		if( !found ) {
			for( let i in effects ) {
				let effect = effects[ i ];
				if( type === i ) {
					// TODO: yield
					effect( { put }, ...params );
				}
			}
		}
	}
	notify( type, ...params ) {
		const subscribers = this._subscribers;
		for ( let i = 0, len = subscribers.length; i < len; i++ ) {
			subscribers[ i ]( type, ...params );
		}
	}
}

export default Model;
