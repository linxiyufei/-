import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			name: '测试人员',
			icon: '/static/img/header/usrDefIco.png'
		},
		nav: [
			{
				name: '智慧云眼',
				to: '/wisdomEyes/userPower/'
			},
			{
				name: '图上作战',
				to: '/mapEvt/'
			},
			// {
			// 	name: '网格巡防',
			// 	to: '/gridPatrol/form/'
			// },
			// {
			// 	name: '雪亮云图',
			// 	to: '/shineCloud/'
			// },
			// {
			// 	name: '考核云图',
			// 	to: '/checkCloud/'
			// }
		]
	}
})

export default store