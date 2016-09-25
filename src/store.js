const ALWAYS_NOTIFY_KEY = '_(:з」∠)_';

class Store {
	constructor() {
		this._models = {};
		this._modelArray = [];
		this._state = {};
		this._subscribers = {};
		this._subscribers[ ALWAYS_NOTIFY_KEY ] = [];
	}
	get state() {
		return this._state;
	}
	set state( v ) {
		throw new Error( 'cannot replace state directly' );
	}
	add( model ) {
		this._models[ model.name ] = model;
		this._modelArray.push( model );
		this._state[ model.name ] = model.state;

		// auto subscribe model changes when added
		model.subscribe( ( action, ...params ) => {
			this.notify( model.name, action, ...params );
		} );
	}
	get( name ) {
		return this._models[ name ];
	}
	dispatch( name, key, ...params ) {
		const model = this._models[ name ];
		if( model ) {
			model.put( key, ...params );
		}
	}
	notify( name, action, ...params ) {
		const cbs = ( this._subscribers[ name ] || [] ).concat( this._subscribers[ ALWAYS_NOTIFY_KEY ] );
		const state = this._state;
		for ( let i = 0, len = cbs.length; i < len; i++ ) {
			const cb = cbs[ i ];
			cb( {
				type: action,
				payload: params,
				meta: {
					namespace: name
				}
			}, this._state );
		}
	}
	subscribe( fn, names ) {
		if ( !names ) {
			this._subscribers[ ALWAYS_NOTIFY_KEY ].push( fn );
			return;
		}

		for ( let i = 0, len = names.length; i < len; i++ ) {
			const name = names[ i ];
			this._subscribers[ name ] = this._subscribers[ name ] || [];
			this._subscribers[ name ].push( fn );
		}
	}
	toArray() {
		return this._modelArray;
	}
}

export default Store;
