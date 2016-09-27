import Store from './store';
import Model from './model';
import View from './view';
import logger from './plugins/logger';

class App {
	constructor() {
		this._viewConfigs = [];
		this._views = [];
		this._store = new Store();
		this._plugins = [];

		this.use( logger() );
	}
	use( plugin ) {
		// to get the correct store._state, execute all plugins until app.start is called
		this._plugins.push( plugin );
	}
	model( {
		name,
		state = {},
		reducers = {}
	} = {} ) {
		if( !name ) {
			throw new Error( 'model must have a name' );
		}

		const model = new Model( { store: this._store, name, state, reducers } );

		this._store.add( model );

		return model;
	}
	view( options ) {
		this._viewConfigs.push( options );
		// TODO: return Component Constructor, used in components later to find registered Component
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
	router() {

	}
	start( selector ) {
		const plugins = this._plugins;
		const store = this._store;
		const getters = this._getters;
		const viewConfigs = this._viewConfigs;

		let i, j, len;

		// register plugins
		for ( i = 0, len = plugins.length; i < len; i++ ) {
			const plugin = plugins[ i ];
			plugin( store );
		}

		// setup views, now getters are newest
		let props = {};
		let computedProps = {};
		for ( i = 0, len = viewConfigs.length; i < len; i++ ) {
			let config = viewConfigs[ i ];
			let { models, computed, template } = config;

			computed = computed || {};

			for ( j in computed ) {
				const key = computed[ j ];
				const getter = this._getters[ key ];
				if ( typeof key === 'string' && getter ) {
					props[ j ] = getter;
				} else {
					computedProps[ j ] = key;
				}
			}

			this._views.push(
				new View( Object.assign(
					config,
					{
						store,
						models,
						props,
						computed: computedProps,
						template
					}
				) )
			);
		}

		for ( i = 0, len = this._views.length; i < len; i++ ) {
			this._views[ i ].inject( document.querySelector( selector ), 'bottom' );
		}
	}
}

export default App;
