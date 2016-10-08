import Regular from 'regularjs';
import EventEmitter from 'eventemitter2';
import Store from './store';
import Model from './model';
import PluginManager from './plugin';
import ViewManager from './view';
import RouterManager from './router';

class App extends EventEmitter {
	constructor() {
		this._isRunning = false;
		this.$store = this._store = new Store();
		this._Base = Regular.extend();
		this.managers = {
			plugin: new PluginManager( this ),
			view: new ViewManager( this ),
			router: new RouterManager( this )
		};
	}
	use( plugin ) {
		this.managers.plugin.register( plugin );
	}
	model( { name, state = {}, reducers = {} } = {} ) {
		if( !name ) {
			throw new Error( 'please name your model' );
		}

		const model = new Model( { state, reducers } );
		this._store.registerModel( name, model );

		return model;
	}
	actions( actions ) {
		this._store.registerActions( actions );
	}
	getters( getters = {} ) {
		if( this._getters ) {
			throw new Error( 'getters can only be called one time' );
		}
		this._getters = getters;
	}
	router( options ) {
		this.managers.router.set( options );
	}
	start( selector ) {
		if ( this._isRunning ) {
			return;
		}

		this._isRunning = true;

		this.emit( 'before-start' );
		this.managers.router.start();
		this.emit( 'after-start' );
	}
}

export default App;
