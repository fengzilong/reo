/* eslint-disable guard-for-in */

import Router from 'regular-router';
import registerGetters from './register-getters';

export default class RouterManager {
	constructor( app ) {
		this._app = app;

		const Base = app._Base;
		Base.use( Router );

		app.emitter.once( 'before-start', () => {
			const { routes } = this._options || {};

			if ( !routes ) {
				return;
			}

			const getters = app._getters || {};
			const store = app._store;

			walk( routes, definition => {
				registerGetters( definition, {
					store, getters
				} );
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
