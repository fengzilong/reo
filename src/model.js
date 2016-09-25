class Model {
	constructor( {
		name,
		store,
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
		this._state = state;
		this._store = store;
	}
	get state() {
		return this._state;
	}
	set state( v ) {
		throw new Error( 'cannot replace state directly' );
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
	dispatch( type, payload ) {
		// if dispatch other model, let store do the dispatch
		if( ~type.indexOf( '/' ) ) {
			return this._store.dispatch( type, payload );
		}

		// invalid action
		if( typeof type !== 'string' ) {
			return;
		}

		const effects = this._effects;
		const state = this._state;
		const commit = ( type, payload ) => {
			if ( ~type.indexOf( '/' ) ) {
				throw new Error( 'committing other model is not allowed, you should use dispatch instead' );
			}
			return this.commit( type, payload );
		};
		const dispatch = ( type, payload ) => {
			return this.dispatch( type, payload );
		};

		let tmp;
		for ( let i in effects ) {
			let effect = effects[ i ];
			if( type === i ) {
				tmp = effect( { commit, dispatch }, payload );
				break;
			}
		}
		return tmp;
	}
	notify( type, payload ) {
		const subscribers = this._subscribers;
		for ( let i = 0, len = subscribers.length; i < len; i++ ) {
			subscribers[ i ]( type, payload );
		}
	}
}

export default Model;
