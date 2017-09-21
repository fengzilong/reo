import Regular from 'regularjs';
import { installSync } from 'regular-router';
import dush from 'dush';
import Store from './store';
import Model from './model';
import PluginManager from './plugin';
import ViewManager from './view';
import RouterManager from './router';
import registerGetters from './register-getters';
import devtoolsPlugin from './plugins/devtools';

class App {
	constructor() {
		this._isRunning = false;
		this.emitter = dush();
		this.$store = this._store = new Store( this );
		// extend from regular, so we can isolate from other apps
		this._Base = Regular.extend();
		this.managers = {
			plugin: new PluginManager( this ),
			view: new ViewManager( this ),
			router: new RouterManager( this )
		};
		this.use( devtoolsPlugin() );
	}
	use( plugin ) {
		this.managers.plugin.register( plugin );
	}
	model( { name, state = {}, reducers = {} } = {} ) {
		if ( !name ) {
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
		if ( this._getters ) {
			throw new Error( 'getters can only be called once' );
		}
		this._getters = getters;
	}
	router( options ) {
		this.managers.router.set( options );
	}
	start( selector, Component ) {
		if ( this._isRunning ) {
			console.warn( 'Cannot start app twice' )
			return;
		}

		this._isRunning = true;

		this.emitter.emit( 'before-start' );
		if ( typeof Component === 'undefined' ) {
			// start with router
			this.managers.router.start( selector );
		} else {
			// start directly
			const getters = this._getters;
			const store = this._store;
			registerGetters( Component, { store, getters } );
			const Ctor = installSync( Component, this._Base );

			let mountNode;
			if ( typeof selector === 'string' ) {
				mountNode = document.querySelector( selector || 'body' );
			} else {
				mountNode = selector
			}
			new Ctor().$inject( mountNode );
		}
		this.emitter.emit( 'after-start' );
	}
}

export default App;
