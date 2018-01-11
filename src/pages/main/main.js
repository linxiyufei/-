
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
					to: '/mapEvt/',
					icon: '/static/img/mapEvt/map.png'
				},
				{
					name: 'list',
					to: '/mapList/',
					icon: '/static/img/mapEvt/list.png'
				},
				{
					name: 'line',
					to: '/mapLine/',
					icon: '/static/img/mapEvt/line.png'
				}
			]
		}
	},
	methods: {
		hello: function(i) {
			console.log(i)
		}
	}
}