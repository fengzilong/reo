import Store from './store';
import Model from './model';
import View from './view';
import logger from './plugins/logger';

class App {
	constructor() {
		this._views = {};
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
		reducers = {},
		effects = {},
		subscriptions = {}
	} = {} ) {
		if( !name ) {
			throw new Error( 'model must have a name' );
		}

		const model = new Model( { store: this._store, name, state, reducers, effects, subscriptions } );

		this._store.add( model );

		return model;
	}
	view( {
		models = [],
		props = {},
		render = () => {}
	} = {} ) {
		return new View( { store: this._store, models, props, render } );
	}
	router() {

	}
	start() {
		const plugins = this._plugins;
		const store = this._store;
		for ( let i = 0, len = plugins.length; i < len; i++ ) {
			const plugin = plugins[ i ];
			plugin( store );
		}
	}
}

export default App;
