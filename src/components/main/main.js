
import AsideNav from '../../components/asideNav'
import VSelect from '../../components/VSelect'

 
export default {
	name: 'main',
	
	props: ['subnav', 'navTitle', 'hasChild'],
	components: {
		AsideNav, 
		VSelect
	},
	data () {
		return {
			// usermessage:'',	
			usermes:''
		}
	},
	computed: {
		nav () { return this.$store.state.nav },
		userInfo () { return this.$store.state.user }
	},
	methods: {
		
	},
	mounted:function(){
		// if(sessionStorage.getItem("usermessage")){
		// 	let usermessage=sessionStorage.getItem("usermessage");
		// 	this.usermes=JSON.parse(usermessage)
		// }else{
		// 	window.location.hash="#/login"
		// }
	
	}
}