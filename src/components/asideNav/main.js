
export default {
	name: 'asideNav',
	props: [ 'nav', 'hasChild' ],
	data () {
		return {

		}
	},
	methods: {
		// 打开子菜单
		openChild: function(evt) {
			evt.target.parentElement.classList.toggle('open')
		},

		changeNavSize: function(evt) {
			evt.target.parentElement.classList.toggle('max')
		}
	}
}