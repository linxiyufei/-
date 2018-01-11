
export default {
	name: '',
	data () {
		return {
			isnamechecked:false,
			ispasswordchecked:false,
			user:'',
			password:'',
			single:false,
			error:false,
			errortip:'',
			count:false,
			passwordCheck:false,
			nameselect:false,
			passwordselect:false
		}
	},
	methods:{
		ischecked(){
			this.isnamechecked=true;
		},
		ischeckedfl(){
			this.isnamechecked=false;
			if(this.user ==''){
				this.count = true
				this.nameselect = true
			}else{
				this.count = false
				this.nameselect = false
			}
		},
		ispasschecked(){
			this.ispasswordchecked=true;
		},
		ispasscheckedfl(){
			this.ispasswordchecked=false;
			if(this.password ==''){
				this.passwordCheck = true
				this.passwordselect = true
			}else{
				this.passwordCheck = false
				this.passwordselect = false
			}
		},
		bbb(val){
			this.single = val
		},
		changetip(){
           this.error=false;
		},
		setCookie(cname,cvalue)
		{
		  var d = new Date();
		  d.setTime(d.getTime()+(30*60*1000));
		  var expires = "expires="+d.toGMTString();
		  document.cookie = cname + "=" + cvalue + "; " + expires;
		},
		loginsend(){
			const _this = this;
			if(this.user==""){
				this.$Message.error('用户名不能为空!');
			}else if(this.password==""){
				this.$Message.error('密码不能为空!');
			}else{
				 
				 let user=this.user;
				 let password=this.password;
				 if(this.single==true){
					
					localStorage.setItem("user",user)
					localStorage.setItem("password",password)
					localStorage.setItem("single",this.single)
				  }
				 

				fetch('/sessionManage/login.action?userName='+user+'&password='+password+'', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				})
				.then(res => res.json())
				.then(res =>{
					console.log(res)
                     if(res.data){
						_this.error=false;
						  let jsonmes=JSON.stringify(res.data);
						 sessionStorage.setItem("usermessage",jsonmes);
						 _this.setCookie('sid',res.data.SESSION.sessionId)
						  console.log(sessionStorage.getItem("usermessage"))
						 window.location.hash="#/home"
					 }else{
						_this.error=true;
						_this.errortip=res.message
						// this.$Message.error(res.message); 
					 }
				})
			} 
		}
	},
	mounted:function(){
		const _this = this;
		if(localStorage.getItem('user')){		   
		  this.user=localStorage.user;
		  this.password=localStorage.password;
		  this.single=localStorage.single
			console.log(this.single)
			
		}
		const _url = location.href;
		// try {
		// 	const _query = _url.split('?')[1]
		// 	fetch('/sessionManage/otherLogin.action?' + _query, {
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			'Accept': 'application/json'
		// 		}
		// 	})
		// 		.then(res => res.json())
		// 		.then(res =>{
		// 			console.log(res)
		// 			if(res.data){
		// 				_this.error=false;
		// 				let jsonmes=JSON.stringify(res.data);
		// 				sessionStorage.setItem("usermessage",jsonmes);
		// 				_this.setCookie('sid',res.data.SESSION.sessionId)
		// 				console.log(sessionStorage.getItem("usermessage"))
		// 				window.location.hash="#/wisdomEyes/userPower"
		// 			}else{
		// 				_this.error = true;
		// 				_this.errortip = res.message
		// 				// this.$Message.error(res.message); 
		// 			}
		// 		})
		// } catch (err) {
		// 	console.log(err)
		// }
		
	}

}