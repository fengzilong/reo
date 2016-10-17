export default class ViewManager {
	constructor( app ) {
		const store = app._store;
		const Base = app._Base;
		Base.implement( {
			events: {
				$config() {
					// auto-subscribe
					const models = this.models;

					const update = () => {
						this.$update();
					};
					update._isFromView = true;

					store.subscribe( update, models );
				}
			},
			dispatch( ...args ) {
				return store.dispatch( ...args );
			}
		} );
	}
}
