import Regular from 'regularjs';

class View {
	constructor( options ) {
		let { store, models, components, props, config } = options;

		delete options.store;
		delete options.models;
		delete options.props;
		delete options.config;
		delete options.components;

		models = models || [];
		props = props || {};
		config = config || function() {};

		this._store = store;
		this._props = props;

		const Component = Regular.extend( Object.assign(
			options,
			{
				config( data ) {
					const state = store.getState();
					for( let i in props ) {
						const fn = props[ i ];
						this.data[ i ] = fn( state );
					}

					this.dispatch = ( type, payload ) => store.dispatch( type, payload );

					config.call( this, data );
				}
			}
		) );

		for ( let i in components ) {
			Component.component( i, components[ i ] );
		}

		// TODO: 返回Component，在start时再生成实例
		this._view = new Component();

		// TODO: $init events中订阅store，$destroy中销毁订阅
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
