import axios from 'axios'
import button from './button.vue';

export default {
	data () {
		return {
			modal3: false,
			defaultList: [
				
			],
			ip:'http://192.168.10.229:8086',
			imgName: '',
			pageSize: 10,
			visible: false,
			uploadList: [],
			phone: '是',
			message: '',
			messages: [],
			message1:[],
			personMessage:'',
			site1: {
				address: ""
			},
			isname: false,
			iscard: false,
			istel: false,
			modal1: false,
			formContent: {
				name: '',
				IdNumber:'',
				phone:'',
				school:'',
				peoples:'',
				type3:'',
				peoplesType:'',
				sex:'',
				address:''
			},
			personUrl:"",
			idContent:[],
			k: -1,
			cityList: [
				
			],
			cityList2: [
				
			],
			cityList3: [
				{
					value: 'man',
					label: '男'
				},
				{
					value: 'woman',
					label: '女'
				}
			],
			modal1: false,
			ajaxHistoryData:[],
			// 初始化信息总条数
			dataCount:0,
			// 每页显示多少条
			historyColumns: [
				// {
				// 	title: '编号',
				// 	key: 'id'
				// },
				{
					title: '身份证号',
					key: 'idd',
					width: 160
				},
				{
					title: '姓名',
					key: 'name'
				},
				{
					title: '性别',
					key: 'sex'
				},
				{
					title: '民族',
					key: 'peoples'
				},
				{
					title: '毕业学校',
					key: 'grade'
				},
				{
					title: '文化程度',
					key: 'education'
				},
				{
					title: '联系电话',
					key: 'call'
				},
				{
					title: '是否黑名单',
					key: 'infor'
				},
				{
					title: '更新时间',
					key: 'time'
				},
				{
					title: '提交人',
					key: 'person'
				},
				{
					title: '操作',
					key: 'action',
					width: 150,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										var _this = this;
										_this.modal1 = true;
										_this.personMessage = '编辑人员';
										axios.post(this.ip+'/personnel/getPersonnelById.action?person.id='+this.site[params.index].id
										
										)
										.then(function(res){
											console.log(_this.formContent)
											_this.formContent.name = res.data.name;
											_this.formContent.IdNumber = res.data.idcardNo;
											_this.formContent.phone = res.data.phone;
											_this.formContent.school = res.data.school;
											_this.formContent.sex = res.data.sex;
											_this.formContent.address = res.data.country+res.data.province+res.data.city;
											_this.personUrl = "&person.id="+_this.site[params.index].id;
											_this.formContent.peoplesType = res.data.nature;
											_this.formContent.peoples = res.data.nation.id;
											console.log(_this.personUrl);
											_this.messages = res.data.hasFeatures.features;
											

											_this.defaultList = res.data.pictureVo;
											_this.$refs.upload.fileList = res.data.pictureVo;
											_this.uploadList = _this.$refs.upload.fileList;
											fetch(this.ip+'/personnel/personnelList.action?page=1&rows='+ this.pageSize+'&person.status=1', {
												method: 'GET',
												headers: {
													'Content-Type': 'application/json',
													'Accept': 'application/json'
												}
											})
											.then(res => res.json())
											.then(res => {
												this.site = res.rows;
												let _data = [];
												this.site.map( (item, index) => {
													_data.push({
														id: item.id,
														idd: item.idcardNo,
														name: item.name,
														sex: item.sex,
														peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
														grade: item.school,
														education: item.education,
														call: item.phone,
														infor: item.status==1 ? "否" : "是",
														time: item.updateDate,
														person: item.submitPerson,
														action: ''
													})
												});
												this.dataCount = this.site.length;
												this.historyData =  _data;
											})
												
											})
										.catch(function(err){
											console.log(err);
										});
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {
										var _this = this;
										console.log(this.site)
										this.remove(params.index)
										axios.post(_this.ip+'/personnel/updatePersonnel.action?person.id='+_this.site[params.index].id+'&person.status=2'
										
										)
										.then(function(res){
											fetch(_this.ip+'/personnel/personnelList.action?page=1&rows='+ _this.pageSize+'&person.status=1', {
												method: 'GET',
												headers: {
													'Content-Type': 'application/json',
													'Accept': 'application/json'
												}
											})
											.then(res => res.json())
											.then(res => {
												debugger;
												console.log(1)
												_this.site = res.rows;
												let _data = [];
												_this.site.map( (item, index) => {
													_data.push({
														id: item.id,
														idd: item.idcardNo,
														name: item.name,
														sex: item.sex,
														peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
														grade: item.school,
														education: item.education,
														call: item.phone,
														infor: item.status==1 ? "否" : "是",
														time: item.updateDate,
														person: item.submitPerson,
														action: ''
													})
												});
												_this.dataCount = _this.site.length;
												_this.historyData =  _data;
											})
										})
										.catch(function(err){
											console.log(err);
										});
									}
								}
							}, '删除'),
							h('Button', {
								props: {
									type: '',
									size: 'small'
								},
								on: {
									click: () => {
										this.modal3 = true;
										this.trIndex = params.index;
									}
								}
							}, '测试')
						]);
					}
				}
			],
			historyData: [],
			msg: '',
			model1: '',
			site: [],
			status: "",
			uploadList: [],
			//返回图片地址
			imgUrl: '',
			imagename: 'aa.png',
			imgUrlArr:[],
			imgnameArr:[],
			nameed: ''
		}
	},
	methods:{
		// 确认删除
		buttonOk(){
			var _this = this;
			console.log(_this.trIndex)
			console.log(_this.site[_this.trIndex].id)
			axios.post(_this.ip+'/personnel/updatePersonnel.action?person.id='+_this.site[_this.trIndex].id+'&person.status=2'
			
			)
			.then(function(res){
				fetch(_this.ip+'/personnel/personnelList.action?page=1&rows='+ _this.pageSize+'&person.status=1', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				})
				.then(res => res.json())
				.then(res => {
					_this.site = res.rows;
					let _data = [];
					_this.site.map( (item, index) => {
						_data.push({
							id: item.id,
							idd: item.idcardNo,
							name: item.name,
							sex: item.sex,
							peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
							grade: item.school,
							education: item.education,
							call: item.phone,
							infor: item.status==1 ? "否" : "是",
							time: item.updateDate,
							person: item.submitPerson,
							action: ''
						}) 
					});
				})
			})
			.catch(function(err){
				console.log(err);
			})
		},
		buttonCancel(){
			this.modal3 = false;
		},
		allsearch(ids){
			fetch(this.ip+'/personnel/personnelList.action?page=1&rows='+ this.pageSize+'&person.status=1'+'&person.name='+ids, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site = res.rows;
				let _data = [];
				this.site.map( (item, index) => {
					_data.push({
						id: item.id,
						idd: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						education: item.education,
						call: item.phone,
						infor: item.status==1 ? "否" : "是",
						time: item.updateDate,
						person: item.submitPerson,
						action: ''
					})
				});
				this.dataCount = this.site.length;
				this.pageSize = 2;
				this.historyData =  _data;
			})
	
		},
		nameCheck(){
			var username = /^[\u4E00-\u9FA5A-Za-z]+$/;
			var lenth = this.formContent.name.length;
			if (this.formContent.name){
				var result = username.test(this.formContent.name)
				if(result&&(lenth >= 2 && lenth <= 12)){
					this.isname = false
					return
				}else{
					this.isname = true
				}
			}
			if (!this.formContent.name) {
				this.isname = false
			}
		},
		cardCheck(){
			let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
			let isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

			if (this.formContent.IdNumber){
				var result = isIDCard1.test(this.formContent.IdNumber) || isIDCard2.test(this.formContent.IdNumber)
				if(result){
					this.iscard = false
					return
				}else {
					this.iscard = true
					
				}
			}
			if (!this.formContent.IdNumber) {
				this.iscard = false
			}
		},
		telCheck(){

			let tel1 = /^1[34578]\d{9}$/;
			let tel2 =  /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
			if (this.formContent.phone){
				var result = tel1.test(this.formContent.phone) || tel2.test(this.formContent.phone)
				if(result){
					this.istel = false
					return
				}else {
					this.istel = true
				}
			}
			if (!this.formContent.phone){
				this.istel = false
			}

		},
		dbClick (params) {
			console.log(1)
			var _this =this;
			_this.personMessage = '查看人员'
			_this.modal1 = true;
			axios.post(this.ip+'/personnel/getPersonnelById.action?person.id='+params.id
			
			)
			.then(function(res){
				console.log(_this.formContent)
				_this.formContent.name = res.data.name;
				_this.formContent.IdNumber = res.data.idcardNo;
				_this.formContent.phone = res.data.phone;
				_this.formContent.school = res.data.school;
				_this.site1.sex = res.data.sex;
				_this.site1.address = res.data.country+res.data.province+res.data.city;
				_this.personUrl = "&person.id="+_this.site[params.index].id;
				console.log(_this.personUrl);
				_this.messages = res.data.hasFeatures.features;
				

				_this.defaultList = res.data.pictureVo;
				debugger
				_this.$refs.upload.fileList = res.data.pictureVo;
				_this.uploadList = _this.$refs.upload.fileList;
				
					
				})
			.catch(function(err){
				console.log(err);
			});
			$("input,select,textarea").attr('disabled',true);
		},
		empty () {
			console.log(1) 
		},
		yes (item) {

			if(item == "yes"){
				this.status = 3;
			}else{
				this.status = 1;
			}
			console.log(this.status)
		},	
		error() {
			this.$Message.error('请完善信息');
		},
		sup(){
			cosole.log(1111)
		},
		//新增，编辑
		sub () {
			// debugger;
			var arr = Object.keys(this.formContent)
			var length = arr.length
			for (var k in this.formContent){
				if (!this.formContent[k]){
					if ( k == 'type3'){
						break;
					}
					this.error()
					return
				}
			}
			// if(!this.phone){
			// 	this.error()
			// 	return
			// }
			if(this.isname == false && this.iscard ==false && this.istel == false){
				var str = "";
				var _this = this;
				for (var i = 0; i < this.messages.length; i++) {
					str += this.messages[i].id
				}
				// var params = {"person.name":this.formContent.name,
				// 	    "person.idcardNo":this.formContent.idcardNo,
				// 	     "person.phone":this.formContent.phone,
				// 	     "person.school":this.formContent.school,
				// 		"person.nation":this.formContent.peoples,
				// 		"person.features":str}
				// axios.post('http://192.168.10.174:8080/personnel/addPersonnel.action',params

				// )
				axios.post(this.ip+'/personnel/addPersonnel.action?person.name=' + _this.formContent.name + "person.idcardNo="+ _this.formContent.IdNumber+"&person.phone=" + _this.formContent.phone +
					"&person.school=" + _this.formContent.school + "&person.nation.id=" + _this.formContent.peoples + "&person.features=" + "&person.nature=" + _this.formContent.peoplesType + str + "&person.status=" + _this.status + _this.personUrl +
					"&attachFileUrls=" + _this.imgUrlArr + "&attachFiles=" + _this.imgnameArr
				)
					.then(function (res) {
						debugger;
						_this.formContent.name = '',
						_this.formContent.IdNumber = '',
						_this.formContent.phone = '',
						_this.formContent.school = '',
						_this.formContent.peoples = '',
						_this.formContent.peoplesType = '',
						_this.formContent.sex = '',
						_this.formContent.address = ''
						console.log(res)
						let _data = [];
						let data2 = {};
						_data.push({
							name: _this.formContent.name,
							IdNumber: _this.formContent.idcardNo,
							phone: _this.formContent.phone,
							school: _this.formContent.school,
							peoples: _this.formContent.peoples,
							id: res.data.id
						})
						data2.name = _data[0].name;
						data2.idd = _data[0].IdNumber;
						data2.call = _data[0].phone;
						data2.grade = _data[0].school;
						data2.peoples = _data[0].peoples;
						data2.id = _data[0].id;
						_this.historyData.push(data2);
						_this.site.push(data2);
						console.log(_this.formContent.peoples)
						//location.reload();
					})
					.catch(function (err) {
						console.log(err);
					});
			}else{
				return
			}
			this.modal1 = false
			$("input,select,textarea").attr('disabled',false);
			
		},
		cal () {
			this.$Message.info('Clicked cancel');
			this.modal1 = false			
			$("input,select,textarea").attr('disabled',false);
			$("input").attr('value',' ');
			this.formContent.name = '',
			this.formContent.IdNumber = '',
			this.formContent.phone = '',
			this.formContent.school = '',
			this.formContent.peoples = '',
			this.formContent.peoplesType = '',
			this.formContent.sex = '',
			this.formContent.address = ''
		},
		changee () {
			this.formContent.name = '',
			this.formContent.IdNumber = '',
			this.formContent.phone = '',
			this.formContent.school = '',
			this.formContent.peoples = '',
			this.formContent.peoplesType = '',
			this.formContent.sex = '',
			this.formContent.address = ''
		},
		show (index) {
			this.$Modal.info({
				title: 'User Info',
				content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
			})
		},
		remove (index) {
			this.historyData.splice(index, 1);
		},
		//分页。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
		handleListApproveHistory(){
			fetch(this.ip+'/personnel/personnelList.action?page=1&rows='+this.pageSize+'&person.status=1', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site = res.rows;
				let _data = [];
				this.site.map( (item, index) => {
					_data.push({
						id: item.id,
						idd: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						education: item.education,
						call: item.phone,
						infor: item.status==1 ? "否" : "是",
						time: item.updateDate,
						person: item.submitPerson,
						action: ''
					})
				});
				this.historyData =  _data;
				this.ajaxHistoryData = res.rows;
				this.dataCount = res.records;
				if(res.records < this.pageSize){
					res.rows = this.ajaxHistoryData;
				}else{
					res.rows = this.ajaxHistoryData.slice(0,this.pageSize);
				}	
			})
	
			.catch(err => console.error(err))
					
		},
		changepage(index){


			console.log( this.pageSize);
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
		

			fetch(this.ip+'/personnel/personnelList.action?page='+index+'&rows='+this.pageSize+'&person.status=1', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site = res.rows;
				let _data = [];
				this.site.map( (item, index) => {
					_data.push({
						id: item.id,
						idd: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						education: item.education,
						call: item.phone,
						infor: item.status==1 ? "否" : "是",
						time: item.updateDate,
						person: item.submitPerson,
						action: ''
					})
				});
				this.historyData =  _data;
				this.ajaxHistoryData = res.rows;
				this.dataCount = res.records;
				if(res.records < this.pageSize){
					res.rows = this.ajaxHistoryData;
				}else{
					res.rows = this.ajaxHistoryData.slice(0,this.pageSize);
				}	
			})
	
			.catch(err => console.error(err))

			//this.historyData = this.ajaxHistoryData.slice(_start,_end);
			console.log(index);
		},

		addTag(){
			var _this = this;
			console.log(_this.messages);
			for(var i = 0;i<_this.messages.length;i++){
				if(_this.messages[i].value == _this.message){
					return
				}

			}
			axios.post(this.ip+'/personnel/features/addFeatures.action?features.value='+this.message
			
				)
				.then(function(res){
					var message4 = {};
					message4.id = res.data.id;
					message4.value = res.data.value;
					if (!message4.value){
						return
					}
					_this.message1 = res.data.id;
					_this.messages.push(message4)

					console.log(_this.messages)
				})
				.catch(function(err){
					console.log(err);
				});
			// this.messages.push(this.message)
			

		},
		deleteTag(item,index){

			var _this = this;
			var index1 = ''
			console.log(index)
		    _this.k = index
			// for (var i = 0; i < _this.messages.length; i++) {
    			// if (_this.messages[i] == item){ 
    				// index1 = i
					console.log(item)
    				// var  msg = _this.messages.splice(index1,1);
					console.log(_this.messages)
					axios.post(this.ip+'/personnel/features/deleteFeaturesById.action?id='+_this.messages[index].id

						)
						.then(function(res){
							_this.messages.splice(index,1)
							
						})
						.catch(function(err){
							console.log(err);
					});

		    	// return
 
    			// }
    		// }
			
		},
		handleView (name) {
			this.imgName = name;
			this.visible = true;
		},
		handleRemove (file) {
			// 从 upload 实例删除数据
			const fileList = this.$refs.upload.fileList;
			this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
		},
		handleSuccess (res, file) {			
			this.imgUrl = res.fullUrl;
			console.log(res)
			console.log(file)
			res.fullUrl = this.imgUrl;
			
			this.name = res.url;
			file.url = res.fullUrl;
			file.name = res.url;
			this.imgUrlArr.push(res.fullUrl)
			this.imgname = 'aa.png';
			this.imgnameArr.push(this.imagename)
			console.log(this.imgnameArr)
		},
		handleFormatError (file) {
			this.$Notice.warning({
				title: '文件格式不正确',
				desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
			});
		},
		handleMaxSize (file) {
			this.$Notice.warning({
				title: '超出文件大小限制',
				desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
			});
		},
		handleBeforeUpload () {
			const check = this.uploadList.length < 5;
			if (!check) {
				this.$Notice.warning({
					title: '最多只能上传 5 张图片。'
				});
			}
			return check;
		}	
	},
	created(){
		 this.handleListApproveHistory();
	},
	watch:{
		 formContent:{
			handler:function(val,oldval){
				var _this = this;
				var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(reg.test(this.$refs.type3.value)){
					
					axios.post(this.ip+'/personnel/getNativeAddressAndSexByIdCardNo.action?person.idcardNo='+this.$refs.type3.value
							
					)
					.then(function(res){
						console.log(res.data)
						_this.formContent.sex = res.data.sex;
						_this.formContent.address = res.data.province+res.data.city+res.data.district;
					})
					.catch(function(err){
						console.log(err);
					});
				}else{
				}
			},
			deep:true
		}
	},
	mounted: function() {

		this.uploadList = this.$refs.upload.fileList;	
		console.log(this.pageSize);
		fetch(this.ip+'/personnel/personnelList.action?page=1&rows='+this.pageSize+'&person.status=1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())


		
		.then(res => {
			console.log(this.pageSize)
			this.site = res.rows;
			let _data = [];
			this.site.map( (item, index) => {
				_data.push({
					id: item.id,
					idd: item.idcardNo,
					name: item.name,
					sex: item.sex,
					peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
					grade: item.school,
					education: item.education,
					call: item.phone,
					infor: item.status==1 ? "否" : "是",
					time: item.updateDate,
					person: item.submitPerson,
					action: ''
				})
			});
			this.dataCount = res.records;
			//this.historyData =  res.rows;
			//this.site =  res.rows;
		})

		.catch(err => console.error(err))

		//户口类别
		fetch(this.ip+'/propertyDict/Manage/findPropertyDictByDomainName.action?domainName=户口类别', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			// console.log(res);
			
			for(var i = 0; i<res.length;i++){
				var data = {};
				data.value = res[i].displayName;
				data.label = res[i].displayName
				this.cityList2.push(data)
			}
			// console.log(this.cityList2)
		})

		.catch(err => console.error(err))

		//民族
		fetch(this.ip+'/propertyDict/Manage/findPropertyDictByDomainName.action?domainName=民族', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			// console.log(res);
			
			for(var i = 0; i<res.length;i++){
				var data = {};
				data.value = res[i].id;
				data.label = res[i].displayName
				this.cityList.push(data)
			}
			// console.log(this.cityList2)
			
		})

		.catch(err => console.error(err))
	}
}