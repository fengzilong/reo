export default class PulginManager {
	constructor( app ) {
		this._app = app;
	}

	register( plugin ) {
		const app = this._app;
		const Base = this._app._Base;
		const store = this._app._store;

		app.emitter.once( 'before-start', () => {
			plugin( Base, store );
		} );
	}
}
