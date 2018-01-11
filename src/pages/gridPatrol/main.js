
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
					name: '任务管理',
					icon: '/static/img/mapEvt/line.png',
					to: '/gridPatrol/form'
				},
				{
					name: '新建任务',
					icon: '/static/img/mapEvt/line.png',
					to: '/gridPatrol/helloworld'
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