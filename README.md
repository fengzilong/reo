# reo <sup>wip</sup>

inspired by [dva](https://github.com/dvajs/dva) and [vuex](https://github.com/vuejs/vuex)

## Overview

```js
const app = reo()
app.use( plugin )
app.model( ... )
app.actions( ... )
app.getters( ... )
app.router( ... )
app.start( '#app' )
```

## Realworld example

```js
const app = reo()

app.model( {
	name: 'counter',
	state: { count: 0 },
	reducers: {
		add( state ) {
			state.count++
		},
		minus( state ) {
			state.count--
		}
	}
} )

app.getters( {
	count: state => state.counter.count
} )

app.actions( {
	add( { commit } ) {
		commit( 'counter/add' )
	},
	minus( { commit } ) {
		commit( 'counter/minus' )
	}
} )

const Counter = {
	computed: {
		c: 'count'
	},
	template: `
		<button on-click="{ this.dispatch( 'minus' ) }">-</button>
		{ c }
		<button on-click="{ this.dispatch( 'add' ) }">+</button>
	`,
}

app.router( {
	routes: [
		{ url: '', component: Counter }
	]
} )

app.start( '#app' )
```

## License

MIT &copy; [fengzilong](https://github.com/fengzilong)
