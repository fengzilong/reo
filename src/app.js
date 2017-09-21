import Regular from 'regularjs';
import dush from 'dush';
import Router, { installSync } from 'regular-router';
import Store from './store';
import Model from './model';
import connect from './connect';
import devtools from './plugins/devtools';

class App {
	constructor() {
		this._isRunning = false;
		this.emitter = dush();
		this.$store = this._store = new Store( this );
		// isolate from other instances
		this._Base = Regular.extend();
		this._Base.use( Router );
		this.use( devtools() );
	}
	use( plugin ) {
		const app = this._app;
		const Base = this._app._Base;
		const store = this._app._store;

		app.emitter.once( 'before-start', () => {
			plugin( Base, store );
		} );
	}
	model( { name, state = {}, reducers = {} } = {} ) {
		if ( !name ) {
			throw new Error( 'Expect a name for model' );
		}

		const model = new Model( { state, reducers } );
		this._store.registerModel( name, model );

		return model;
	}
	actions( actions = {} ) {
		this._store.registerActions( actions );
	}
	getters( getters = {} ) {
		if ( this._getters ) {
			throw new Error( 'getters can only be called once' );
		}
		this._getters = getters;
	}
	router( options = {} ) {
		this._routerOptions = options;
	}
	start( selector, Component ) {
		if ( this._isRunning ) {
			console.warn( 'Cannot start app twice' );
			return;
		}

		this._isRunning = true;

		// connect store and view
		const { routes } = this._routerOptions;
		connect( {
			Base: this._Base,
			store: this._store,
			getters: this._getters,
			routes,
			Component,
		} );

		this.emitter.emit( 'before-start' );

		if ( typeof Component === 'undefined' ) {
			// start with router
			const router = new Router( this._routerOptions );
			this.$router = router;
			router.start( selector );
		} else {
			// start directly
			const Ctor = installSync( Component, this._Base );

			let mountNode;
			if ( typeof selector === 'string' ) {
				mountNode = document.querySelector( selector || 'body' );
			} else {
				mountNode = selector;
			}
			new Ctor().$inject( mountNode );
		}

		this.emitter.emit( 'after-start' );
	}
}

export default App;
