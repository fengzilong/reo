// Credits: vue/vuex

export default () => store => {
	const devtools = window.__REO_DEVTOOLS_HOOK__;

	if ( !devtools ) {
		return;
	}

	store._devtools = devtools;

	devtools.emit( 'reo:init', store );
	devtools.on( 'reo:travel-to-state', state => {
		store.replaceState( state );
	} );

	store.subscribe( ( action, state ) => {
		devtools.emit( 'reo:reducer', action, state );
	} );
};
