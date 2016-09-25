import Regular from 'regularjs';

class View {
	constructor( { store, models = [], props = {}, render = '' } ) {
		this._store = store;
		this._props = props;

		const Component = Regular.extend({
			template: render,
			config() {
				const state = store.getState();
				for( let i in props ) {
					const fn = props[ i ];
					this.data[ i ] = fn( state );
				}

				this.dispatch = ( type, payload ) => store.dispatch( type, payload );
			}
		});

		this._view = new Component();

		// view will be updated when model changes
		store.subscribe( this.update.bind( this ), models.length > 0 ? models : void 0 );
	}
	inject( ...args ) {
		this._view.$inject( ...args );
	}
	update() {
		const state = this._store.getState();
		const props = this._props;
		for( let i in props ) {
			const fn = props[ i ];
			this._view.data[ i ] = fn( state );
		}

		// you should know that, data is sync updated, only the view is delayed, and view is also rendered asap( use requestAnimationFrame, ), so the data flow is still in order, and data is always newest and correct

		// TODO: for every view, merge multiple updates into one
		// just send update signal, and gather them in next frame

		setTimeout(() => {
			this._view.$update();
		}, 0);
	}
}

export default View;
