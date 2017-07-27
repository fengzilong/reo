/* eslint-disable guard-for-in */

import Router from 'regular-router';

export default class RouterManager {
	constructor( app ) {
		this._app = app;

		const Base = app._Base;
		Base.use( Router );

		app.emitter.once( 'before-start', () => {
			const getters = app._getters;
			const options = this._options || {};
			const { routes } = options;
			walk( routes, definition => {
				const scopedGetters = definition.getters || {};

				if ( !definition.computed ) {
					definition.computed = {};
				}

				for ( let i in scopedGetters ) {
					const c = scopedGetters[ i ];
					if ( typeof c === 'string' ) {
						if ( getters[ c ] ) {
							definition.computed[ i ] = () => {
								// replaceState will replace state reference
								// so get state reference when computes
								const state = app._store.getState();
								if ( getters && typeof getters[ c ] === 'function' ) {
									return getters[ c ]( state );
								}

								console.warn( `getters[ '${ c }' ] is not defined or not valid` );
							};
						}
					}
				}
			} );
		} );
	}
	set( options ) {
		this._options = options;
	}
	start( selector ) {
		const router = new Router( this._options );
		this._app.$router = router;
		router.start( selector );
	}
}

function walk( routes, fn ) {
	for ( let i = 0, len = routes.length; i < len; i++ ) {
		const route = routes[ i ];

		const definitions = route.components || {};
		if ( route.component ) {
			definitions.default = route.component;
		}
		walkDefinitions( definitions, fn );
		if ( route.children ) {
			walk( route.children, fn );
		}
	}
}

function walkDefinitions( definitions, fn ) {
	for ( let i in definitions ) {
		const definition = definitions[ i ];
		fn( definition );
		if ( definition.components ) {
			walkDefinitions( definition.components, fn );
		}
	}
}
