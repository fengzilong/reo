export default class PulginManager {
	constructor( app ) {
		this._app = app;
	}
	register( plugin ) {
		this._app.once( 'before-start', () => {
			this.use( plugin );
		} );
	}
	use( plugin ) {
		const Base = this._app._Base;
		const store = this._app._store;
		plugin( Base, store );
	}
}
