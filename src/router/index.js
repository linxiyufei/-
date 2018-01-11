import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hello from '@/pages/hello'
import Form from '@/pages/form'
import Login from '@/pages/login'
import Home from '@/pages/home'
import VideoCall from '@/pages/videoCall'

// 图上作战
import Main from '@/pages/main'
import MapEvt from '@/pages/mapEvt'
import MapEvtInfo from '@/pages/mapEvtInfo'
import MapList from '@/pages/mapList'
import MapLine from '@/pages/mapLine'
import GridPatrol from '@/pages/gridPatrol'
import ShineCloud from '@/pages/shineCloud'
import CheckCloud from '@/pages/checkCloud'
import WisdomEyes from '@/pages/wisdomEyes'

// 智慧云眼
import UserPower from '@/pages/userPower'
import PointBrowse from '@/pages/pointBrowse'
import TemAuthorization from '@/pages/temAuthorization'
import LockPoint from '@/pages/lockPoint'
import VideoChat from '@/pages/videoChat'
import ManagementPoint from '@/pages/managementPoint'
import ManagementUser from '@/pages/managementUser'
import ManagementCar from '@/pages/managementCar'
import Blacklist from '@/pages/blacklist'
import IdentityComparison from '@/pages/identityComparison'
import PicSearch from '@/pages/picSearch'
import SearchPeople from '@/pages/searchPeople'
import SiteManagement from '@/pages/siteManagement'
import UAVManagement from '@/pages/UAVManagement'
import GuardAgainst from '@/pages/guardAgainst'

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login,
			
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		},{
		   path:'/map',
		   name:'map',
		   component: Main,
		   children: [
				{
					path: '/mapEvt',
					name: 'mapEvt',
					component: MapEvt
				},
				{
					path: '/mapList',
					name: 'mapList',
					component: MapList
				},
				{
					path: '/mapLine',
					name: 'mapLine',
					component: MapLine
				},
				{
					path: '/videoCall',
					name: 'videoCall',
					component: VideoCall
				},
				{
					path: '/mapEvtInfo',
					name: 'mapEvtInfo',
					component: MapEvtInfo
				}
			]
           
		},{
			path: '/gridPatrol',
			name: 'gridPatrol',
			component: GridPatrol,
			children: [
				{
					path: '/gridPatrol/helloworld',
					name: 'helloworld',
					component: HelloWorld
				},
				{
					path: '/gridPatrol/form/',
					name: '*',
					component: Form
				}
			]
		},
		{
			path: '/shineCloud',
			name: 'shineCloud',
			component: ShineCloud
		},
		{
			path: '/checkCloud',
			name: 'checkCloud',
			component: CheckCloud
		},
		{
			path: '/wisdomEyes',
			name: 'wisdomEyes',
			component: WisdomEyes,
			children: [
				{
					name: 'pointBrowse',
					path: '/wisdomEyes/pointBrowse',
					component: PointBrowse
				},
				{
					name: 'temAuthorization',
					path: '/wisdomEyes/temAuthorization',
					component: TemAuthorization
				},
				{
					name: 'lockPoint',
					path: '/wisdomEyes/lockPoint',
					component: LockPoint
				},
				{
					name: 'videoChat',
					path: '/wisdomEyes/videoChat',
					component: VideoChat
				},
				{
					name: 'managementPoint',
					path: '/wisdomEyes/managementPoint',
					component: ManagementPoint
				},
				{
					name: 'managementUser',
					path: '/wisdomEyes/managementUser',
					component: ManagementUser
				},
				{
					name: 'managementCar',
					path: '/wisdomEyes/managementCar',
					component: ManagementCar
				},
				{
					name: 'blacklist',
					path: '/wisdomEyes/blacklist',
					component: Blacklist
				},
				{
					name: 'identityComparison',
					path: '/wisdomEyes/identityComparison',
					component: IdentityComparison
				},
				{
					name: 'picSearch',
					path: '/wisdomEyes/picSearch',
					component: PicSearch
				},
				{
					name: 'searchPeople',
					path: '/wisdomEyes/searchPeople',
					component: SearchPeople
				},
				{
					name: 'siteManagement',
					path: '/wisdomEyes/siteManagement',
					component: SiteManagement
				},
				{
					name: 'UAVManagement',
					path: '/wisdomEyes/UAVManagement',
					component: UAVManagement
				},
				{
					name: 'guardAgainst',
					path: '/wisdomEyes/guardAgainst',
					component: GuardAgainst
				},
				{
					name: 'userPower',
					path: '/wisdomEyes/userPower',
					component: UserPower
				}
			]
		},
	]
})

export default router