import role from './mySelect.vue';
import axios from 'axios'

let testData2 = {
	"histories": [
		{
			name: '201711250331',
			range: 'Mary',
			time: '男',
			address: '汉',
			grade: '中央大学'
		},
		{
			name: '201711250331',
			range: 'Mary',
			time: '男',
			address: '汉',
			grade: '中央大学'
		},
		{
			name: '201711250331',
			range: 'Mary',
			time: '男',
			address: '汉',
			grade: '中央大学'
		},
		{
			name: '201711250331',
			range: 'Mary',
			time: '男',
			address: '汉',
			grade: '中央大学'
		}
	]
}
export default {
	data () {
		return {
			nameed: '',
			ip: '',
			defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
			phone: '是',
			blacklistType: '',
			cityList: [
				{
					value: 'New York',
					label: '1'
				},
				{
					value: 'London',
					label: '2'
				},
				{
					value: 'Sydney',
					label: '3'
				},
				{
					value: 'Ottawa',
					label: '4'
				},
				{
					value: 'Paris',
					label: '5'
				},
				{
					value: 'Canberra',
					label: '6'
				}
			],
			cityList2: [
				{
					value: 'one',
					label: '1'
				},
				{
					value: 'two',
					label: '2'
				},
				{
					value: 'three',
					label: '3'
				},
				{
					value: 'four',
					label: '4'
				},
				{
					value: 'five',
					label: '5'
				},
				{
					value: 'six',
					label: '6'
				}
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
			pageSize:10,
			historyColumns: [
				// {
				// 	type: 'selection',
				// 	width: 60,
				// 	align: 'center'
				// },
				{
					title: '身份证号',
					key: 'id',
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
					title: '联系电话',
					key: 'call'
				},
				{
					title: '户口性质',
					key: 'houseHeld'
				},
				{
					title: '联系电话',
					key: 'phone'
				},
				{
					title: '加入黑名单时间',
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
										console.log(_this.site)
										axios.post(this.ip+'/personnel/updatePersonnel.action?person.status=1&person.id='+_this.site[params.index].id

										)
										.then(function(res){
											console.log(_this.site)
											_this.site.status = 1;
										})
										.catch(function(err){
											console.log(err);
										});

									}
								}
							}, '移除黑名单'),
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {


									}
								}
							}, '展示轨迹')
						]);
					}
				}
			],
			historyColumns2: [
				{
					title: '姓名',
					key: 'name'
				},
				{
					title: '身份证号',
					key: 'id'
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
					title: '联系电话',
					key: 'call'
				},
				{
					title: '人员类型',
					key: 'type',
					width: 140,
					render: (createElement, params) => {
						// role是引入的组件名称
						return createElement(role, {
						  props: {
							dataType: 1,
							userId: params.row.userId,
							width: 30,
							ParentFunc: this.childHandler
						  }
						}, this.$slots.default);
					  }	
				}
						
			], 
			historyData: [],
			historyData2: [],
			msg: '',
			model1: ''
		}
	},
	methods:{
		allsearch(ids){
			fetch(this.ip+'/personnel/personnelList.action?page=1&rows='+this.pageSize+'&person.status=1'+'&person.name='+ids, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site2 = res.rows;
				console.log(res.rows);
				let _data = [];
				this.site2.map( (item, index) => {
					_data.push({
						id: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						call: item.phone,
						houseHeld:item.nature,
						infor:'',
						phone:'',
						time: item.updateDate,
						person: item.updateUser,
						action:''
					})
				});
				this.historyData =  _data;
				this.dataCount = res.records;
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
		//上传
		childHandler (item) {
			console.log(item)
			this.blacklistType = item;
		},
		handleRowChange(currentRow, oldCurrentRow){
			this.currentRowId = currentRow.id;
			console.log(this.currentRowId)
		},
		ok () {
			var _this = this;
			axios.post(this.ip+'/personnel/updatePersonnel.action?person.status=3&person.idcardNo='+_this.currentRowId+'&person.blacklistType.id='+_this.blacklistType

			)
			.then(function(res){
				_this.site.status = 3;
			})
			.catch(function(err){
				console.log(err);
			});
		},
		cancel () {
			this.$Message.info('Clicked cancel');
		},
		show (index) {
			this.$Modal.info({
				title: 'User Info',
				content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
			})
		},
		remove (index) {
			this.data6.splice(index, 1);
		},
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
				this.site2 = res.rows;
				console.log(res.rows);
				let _data = [];
				this.site2.map( (item, index) => {
					_data.push({
						id: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						call: item.phone,
						houseHeld:item.nature,
						infor:'',
						phone:'',
						time: item.updateDate,
						person: item.updateUser,
						action:''
					})
				});
				this.historyData =  _data;
				this.dataCount = res.records;
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
		handleListApproveHistory2(){
			fetch(this.ip+'/personnel/personnelList.action?page=1&rows'+this.pageSize+'&person.status=3', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site = res.rows;
				console.log(this.site);
				let _data = [];
				this.site.map( (item, index) => {
					_data.push({
						id: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						education: item.education,
						call: item.phone,
						infor:item.status==1 ? "否" : "是",
						time: item.updateDate,
						person: item.updateUser,
						action:''
					})
				});
				this.historyData2 =  _data;
				this.dataCount = res.records;
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
		changepage2(index){
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
			this.historyData = this.ajaxHistoryData.slice(_start,_end);

			fetch(this.ip+'/personnel/personnelList.action?page='+index+'&rows='+this.pageSize+'&person.status=1', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site2 = res.rows;
				console.log(res.rows);
				let _data = [];
				this.site2.map( (item, index) => {
					_data.push({
						id: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						call: item.phone,
						houseHeld:item.nature,
						infor:'',
						phone:'',
						time: item.updateDate,
						person: item.updateUser,
						action:''
					})
				});
				this.historyData =  _data;
				this.dataCount = res.records;
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
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
			this.historyData = this.ajaxHistoryData.slice(_start,_end);
			fetch(this.ip+'/personnel/personnelList.action?page='+index+'&rows'+this.pageSize+'&person.status=3', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				this.site = res.rows;
				console.log(this.site);
				let _data = [];
				this.site.map( (item, index) => {
					_data.push({
						id: item.idcardNo,
						name: item.name,
						sex: item.sex,
						peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
						grade: item.school,
						education: item.education,
						call: item.phone,
						infor:item.status==1 ? "否" : "是",
						time: item.updateDate,
						person: item.updateUser,
						action:''
					})
				});
				this.historyData2 =  _data;
				this.dataCount = res.records;
				this.ajaxHistoryData = res.rows;
				this.dataCount = res.records;
				if(res.records < this.pageSize){
					res.rows = this.ajaxHistoryData;
				}else{
					res.rows = this.ajaxHistoryData.slice(0,this.pageSize);
				}
			})
	
			.catch(err => console.error(err))
		}
	},
	created(){
		 this.handleListApproveHistory();
		 this.handleListApproveHistory2();
	},
		mounted: function() {
			// this.uploadList = this.$refs.upload.fileList;
		fetch(this.ip+'/personnel/personnelList.action?page=1&rows=20&person.status=1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.site2 = res.rows;
			console.log(res.rows);
			let _data = [];
			this.site2.map( (item, index) => {
				_data.push({
					id: item.idcardNo,
					name: item.name,
					sex: item.sex,
					peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
					grade: item.school,
					call: item.phone,
					houseHeld:item.nature,
					infor:'',
					phone:'',
					time: item.updateDate,
					person: item.updateUser,
					action:''
				})
			});
			this.dataCount = res.records;
		})

		.catch(err => console.error(err))

		fetch(this.ip+'/personnel/personnelList.action?page=1&rows=20&person.status=3', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.site = res.rows;
			console.log(this.site);
			let _data = [];
			this.site.map( (item, index) => {
				_data.push({
					id: item.idcardNo,
					name: item.name,
					sex: item.sex,
					peoples: item["nation"] ? item["nation"]['displayName'] ? item["nation"]['displayName'] : '' : '',
					grade: item.school,
					education: item.education,
					call: item.phone,
					infor:item.status==1 ? "否" : "是",
					time: item.updateDate,
					person: item.updateUser,
					action:''
				})
			});
			this.dataCount = res.records;
		})

		.catch(err => console.error(err))
	},
}