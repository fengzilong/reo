import Regular from 'regularjs';

class View {
	constructor( { models = [], props = {}, render = '' } ) {
		this._props = props;

		const Component = Regular.extend({
			template: render,
			config() {
				for( let i in props ) {
					const fn = props[ i ];
					this.data[ i ] = fn();
				}

				this.put = function( actionName = '', ...params ) {
					console.log( 'put', actionName, ...params );

					// find model
					const parts = actionName.split( '/' );
					const [ namespace, key ] = parts;

					// TODO: gen modelMap in constrcutor, for performance
					for ( let i = 0, len = models.length; i < len; i++ ) {
						let model = models[ i ];
						if ( model._name === namespace ) {
							model.put( key, ...params );
							break;
						}
					}
				}
			}
		});

		this._view = new Component();

		// view will be updated when model changes
		for ( let i = 0, len = models.length; i < len; i++ ) {
			const model = models[ i ];
			model.subscribe( this.update.bind( this ) );
		}
	}
	inject( ...args ) {
		this._view.$inject( ...args );
	}
	update() {
		const props = this._props;
		for( let i in props ) {
			const fn = props[ i ];
			this._view.data[ i ] = fn();
		}

		// you should know that, data is sync updated, only the view is delayed, and view is also rendered asap( use requestAnimateFrame, ), so the data flow is still in order, and data is always newest and correct

		// TODO: for every view, merge multiple updates into one
		// just send update signal, and gather them in next frame

		setTimeout(() => {
			this._view.$update();
		}, 0);
	}
}

export default View;
