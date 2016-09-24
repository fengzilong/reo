import Model from './model';
import View from './view';

class App {
	constructor() {
		this._views = {};
		this._models = {};
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

		// save
		return this._models[ name ] =
			new Model( { name, state, reducers, effects, subscriptions } );
	}
	view( {
		models = [],
		props = {},
		render = () => {}
	} = {} ) {
		if( !this._allModels ) {
			this._allModels = Object.keys( this._models ).map( v => this._models[ v ] );
		}

		return new View( { models: models || this._allModels, props, render } );
	}
	router() {

	}
	start() {

	}
}

export default App;
