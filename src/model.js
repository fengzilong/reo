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
	watch() {

	}
	subscribe( fn ) {
		this._subscribers.push( fn );
	}
	take( type ) {
		// type包含effects?
	}
	put( type, ...params ) {
		// not valid action
		if( typeof type === 'undefined' ) {
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
				// only track this
				reducer( state );
				this.notify();
				break;
			}
		}

		if( !found ) {
			for( let i in effects ) {
				let effect = effects[ i ];
				if( type === i ) {
					var a = effect( { put }, ...params );
					a.next();
					a.next();
				}
			}
		}
	}
	notify() {
		// notify subscribers
		this._subscribers.forEach(subscriber => subscriber());
	}
}

export default Model;
