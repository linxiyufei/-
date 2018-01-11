
export default {
	name: '',
	data () {
		return {
			seen: ''
		}
	},
	methods:{
		visible(index){
			this.seen = index
		},
		hidden(){
			this.seen = false
		},
		picWorkFn(){
			window.location.hash="#/mapEvt/"
		},
		videoStaFn(){
			window.location.hash="#/wisdomEyes/pointBrowse"
		},
		videoSmaFn(){
			window.location.hash="#/wisdomEyes/managementCar"
		},
		videoManFn(){
			window.location.hash="#/wisdomEyes/managementUser"
		},
		videoIndFn(){
			window.location.hash="#/wisdomEyes/UAVManagement"			
		}
		
	},
	mounted:function(){
	}
}