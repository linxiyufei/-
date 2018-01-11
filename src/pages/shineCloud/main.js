
import VMain from '../../components/main'

export default {
	name: 'main',
	components: {
		VMain
	},
	data () {
		return {
			subNav: [
				{
					name: 'map',
					to: 'mapEvt'
				},
				{
					name: 'list',
					to: 'mapList'
				},
				{
					name: 'line',
					to: 'mapLine'
				}
			]
		}
	},
	method: {
		hello: function(i) {
			console.log(i)
		}
	}
}