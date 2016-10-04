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
	registerModel( name, model ) {
		this._models[ name ] = model;
		this._modelArray.push( model );
		this._state[ name ] = model.state;

		// auto subscribe model changes when added
		model.subscribe( ( type, payload ) => {
			this.notify( name, type, payload );
		} );
	}
	registerActions( actions ) {
		if( this._actions ) {
			return console.error( 'actions already registered' );
		}
		this._actions = actions;
	}
	_commit( type, payload ) {
		const parts = type.split( '/' );
		const [ name, truetype ] = parts;

		const model = this._models[ name ];
		if( model ) {
			return model.commit( truetype, payload );
		}
	}
	dispatch( type, payload ) {
		if ( !this._actions[ type ] ) {
			return console.error( `action "${ type }" is not found` );
		}
		return this._actions[ type ]( {
			commit: this._commit.bind( this ),
			dispatch: this.dispatch.bind( this )
		}, payload );
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
