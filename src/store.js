const ALWAYS_NOTIFY_KEY = '_(:з」∠)_';

class Store {
	constructor() {
		this._models = {};
		this._modelArray = [];
		this._state = {};
		this._subscribers = {};
		this._subscribers[ ALWAYS_NOTIFY_KEY ] = [];
	}
	getState() {
		return this._state;
	}
	add( model ) {
		const name = model.name;

		this._models[ name ] = model;
		this._modelArray.push( model );
		this._state[ name ] = model.state;

		// auto subscribe model changes when added
		model.subscribe( ( type, payload ) => {
			this.notify( name, type, payload );
		} );
	}
	_callModel( fnName, type, payload ) {
		const parts = type.split( '/' );
		const [ name, truetype ] = parts;

		const model = this._models[ name ];
		if( model ) {
			return model[ fnName ]( truetype, payload );
		}
	}
	commit( type, payload ) {
		return this._callModel( 'commit', type, payload );
	}
	dispatch( type, payload ) {
		return this._callModel( 'dispatch', type, payload );
	}
	notify( name, type, payload ) {
		const cbs = ( this._subscribers[ name ] || [] ).concat( this._subscribers[ ALWAYS_NOTIFY_KEY ] );
		const state = this._state;
		for ( let i = 0, len = cbs.length; i < len; i++ ) {
			const cb = cbs[ i ];
			cb( { type: `${name}/${type}`, payload }, this._state );
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
