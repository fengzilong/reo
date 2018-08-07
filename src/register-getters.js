export default function ( definition, { store, getters } ) {
  const scopedGetters = definition.getters || {}

  if ( !definition.computed ) {
    definition.computed = {}
  }

  for ( let i in scopedGetters ) {
    const c = scopedGetters[ i ]
    if ( typeof c === 'string' ) {
      if ( getters[ c ] ) {
        definition.computed[ i ] = () => {
          // replaceState will replace state reference
          // so get state reference when computes
          const state = store.getState()
          if ( getters && typeof getters[ c ] === 'function' ) {
            return getters[ c ]( state )
          }

          console.warn( `getters[ '${ c }' ] is not defined or not valid` )
        }
      }
    }
  }
}
