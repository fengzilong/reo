import Router from 'regular-router';

export default class RouterManager {
	constructor( app ) {
		this._app = app;

		const Base = app._Base;
		Base.use( Router );
		app.once( 'before-start', () => {
			const getters = app._getters;
			const options = this._options || {};
			const { routes } = options;
			walk( routes, component => {
				const computed = component.computed;
				for ( let i in computed ) {
					const c = computed[ i ];
					if ( typeof c === 'string' ) {
						if ( getters[ c ] ) {
							computed[ i ] = () => {
								// replaceState will replace state reference
								// so get state in realtime when computes
								const state = app._store.getState();
								return getters[ c ]( state )
							};
						} else {
							delete computed[ i ];
						}
					}
				}
			} );
		} );
	}
	set( options ) {
		this._options = options;
	}
	start() {
		const router = new Router( this._options );
		this._app.$router = router;
		router.start();
	}
}

function walk( routes, fn ) {
	for ( let i = 0, len = routes.length; i < len; i++ ) {
		const route = routes[ i ];

		const components = route.components || {};
		if ( route.component ) {
			components[ 'default' ] = route.component;
		}
		walkComponents( components, fn );
		if ( route.children ) {
			walk( route.children, fn );
		}
	}
}

function walkComponents( components, fn ) {
	for ( let i in components ) {
		const component = components[ i ];
		fn( component );
		if ( component.components ) {
			walkComponents( component.components, fn );
		}
	}
}
