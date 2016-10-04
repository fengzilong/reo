import Router from 'regular-router';

export default class RouterManager {
	constructor( app ) {
		const Base = app._Base;
		Base.use( Router );
		app.once( 'before-start', () => {
			const getters = app._getters;
			const options = this._options || {};
			const { routes } = options;
			walkRoutes( routes, route => {
				const components = route.components || {};
				if ( route.component ) {
					components[ 'default' ] = route.component;
				}
				for ( let i in components ) {
					const Component = components[ i ];
					const computed = Component.computed;
					const cps = Component.components;
					for ( let j in computed ) {
						const c = computed[ j ];
						if ( typeof c === 'string' ) {
							if ( getters[ c ] ) {
								computed[ j ] = () => getters[ c ]( app._store.getState() );
							} else {
								delete computed[ j ];
							}
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
		router.start();
	}
}

function walkRoutes( routes, fn ) {
	for ( let i = 0, len = routes.length; i < len; i++ ) {
		const route = routes[ i ];
		fn( route );
		if ( route.children ) {
			walkRoutes( route.children, fn );
		}
	}
}
