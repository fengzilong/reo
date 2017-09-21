import registerGetters from './register-getters';

export default function connect( { Base, store, getters, routes, Component } ) {
	Base.implement( {
		events: {
			$config() {
				// auto-subscribe
				const models = this.models;
				const update = () => this.$update();

				update._isFromView = true;
				store.subscribe( update, models );
			}
		},
		dispatch( ...args ) {
			return store.dispatch( ...args );
		}
	} );

	// start with Component
	if ( Component ) {
		registerGetters( Component, { store, getters } );
	}

	// start with router
	if ( routes ) {
		walk( routes, definition => {
			registerGetters( definition, { store, getters } );
		} );
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
