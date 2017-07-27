export default class PulginManager {
	constructor( app ) {
		this._app = app;
	}

	register( plugin ) {
		const Base = this._app._Base;
		const store = this._app._store;

		this._app.once( 'before-start', () => {
			plugin( Base, store );
		} );
	}
}
