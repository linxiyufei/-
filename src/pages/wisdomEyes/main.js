
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
					name: '权限管理',
					icon: '/static/img/wisdomEyes/userPower.png',
					to: '/wisdomEyes/userPower'
				},
				{
					name: '点位浏览',
					icon: '/static/img/wisdomEyes/pointBrowse.png',
					to: '/wisdomEyes/pointBrowse'
				},
				{
					name: '临时授权',
					icon: '/static/img/wisdomEyes/temAuthorization.png',
					to: '/wisdomEyes/temAuthorization'
				},
				{
					name: '点位锁定',
					icon: '/static/img/wisdomEyes/lockPoint.png',
					to: '/wisdomEyes/lockPoint'
				},
				{
					name: '视频通话',
					icon: '/static/img/wisdomEyes/videoChat.png',
					to: '/wisdomEyes/videoChat'
				},
				{
					name: '点位管理',
					icon: '/static/img/wisdomEyes/managementPoint.png',
					to: '/wisdomEyes/managementPoint'
				},
				{
					name: '人员管理',
					icon: '/static/img/wisdomEyes/managementUser.png',
					to: '/wisdomEyes/managementUser'
				},
				{
					name: '车辆管理',
					icon: '/static/img/wisdomEyes/managementCar.png',
					to: '/wisdomEyes/managementCar'
				},
				{
					name: '黑名单管理',
					icon: '/static/img/wisdomEyes/blacklist.png',
					to: '/wisdomEyes/blacklist'
				},
				{
					name: '身份比对',
					icon: '/static/img/wisdomEyes/identityComparison.png',
					to: '/wisdomEyes/identityComparison'
				},
				{
					name: '图片搜索',
					icon: '/static/img/wisdomEyes/picSearch.png',
					to: '/wisdomEyes/picSearch'
				},
				{
					name: '特征搜人',
					icon: '/static/img/wisdomEyes/searchPeople.png',
					to: '/wisdomEyes/searchPeople'
				},
				{
					name: '场所管理',
					icon: '/static/img/wisdomEyes/siteManagement.png',
					to: '/wisdomEyes/siteManagement'
				},
				{
					name: '无人机管理',
					icon: '/static/img/wisdomEyes/UAVManagement.png',
					to: '/wisdomEyes/UAVManagement'
				},
				{
					name: '巡防管理',
					icon: '/static/img/wisdomEyes/UAVManagement.png',
					to: '/wisdomEyes/guardAgainst'
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