export default class ViewManager {
	constructor( app ) {
		const store = app._store;
		const Base = app._Base;
		Base.implement( {
			events: {
				$config() {
					// auto-subscribe
					const models = this.models;
					store.subscribe( this.$update.bind( this ), models );
				}
			},
			dispatch( ...args ) {
				return store.dispatch( ...args );
			}
		} );
	}
};
