import axios from 'axios'

export default {
	data () {
		return {
			data1: this.getMockData(),
			targetKeys1: this.getTargetKeys(),
			social: [],
			modal1: false,
			ajaxHistoryData:[],
			// 初始化信息总条数
			dataCount:0,
			// 每页显示多少条
			pageSize:9,

			canSearchForList: true,
			orgManageList: [],
			defaultOrgSelId: [],

			site: [],
			personMessage:'',
			formContent: {
				name: '',
				address:'',
				lon:'',
				lat:'',
				person:'',
				phone:'',
				resPerson:'',
				nature: {
					label:'',
					value: ''
				}
			},
			historyColumns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '场所名称',
					key: 'placeName'
				},
				{
					title: '场所地址',
					key: 'placeAddr'
				},
				{
					title: '联系电话',
					key: 'call'
				},
				{
					title: '联系人',
					key: 'callPerson'
				},
				{
					title:'提交时间',
					key:'time'
				},
				{
					title: '提交人',
					key: 'submitter'
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
										var _this =this;
										_this.modal1 = true;
										_this.personMessage = '编辑场所';
										axios.post('/place/getPlaceById.action?id='+this.site[params.index].id
										
										)
										.then(function(res){
											console.log(res)
											_this.formContent.name = res.data.placeName;
											_this.formContent.address = res.data.address;
											_this.formContent.phone = res.data.phone;
											_this.formContent.lat = res.data.latitude;
											_this.formContent.lon = res.data.longitude;
											_this.formContent.person =res.data.contacter;
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
										console.log(this.site)
										console.log(params.index)
										this.remove(params.index)
										axios.post('/place/delete.action?id='+this.site[params.index].id
										
										)
										.then(function(res){
											
										})
										.catch(function(err){
											console.log(err);
										});
									}
								}
							}, '删除')
						]);
					}
				}

			],
			historyData: [],
			cityList2: [
				{
					value: '1',
					label: '重点场所'
				},
				{
					value: '2',
					label: '政府机构'
				}
			],
			msg: '',
			timeList: [
				{
					value: 'New York',
					label: '一天'
				},
				{
					value: 'London',
					label: '一周'
				}
			],
			model1: '',
			model2: '',
			timeList2: [
				{
					value: 'New York',
					label: '一点'
				},
				{
					value: 'London',
					label: '二点'
				}
			],
		}
	},
	methods:{
		loadOrgManageData (item, callback) {
			const _id = item.value || null;
			item.loading = true;
			axios.get('/sysadmin/orgManage/ajaxOrgsForExtTree.action?parentId=' + item.value)
			// axios.get('/static/data/orgManageList2.json')
			  .then(res => {
				if (res.data && Object.prototype.toString.call(res.data) == '[object Array]') {
				  res.data.map((i, index) => {
					if (i.leaf == false) {
					  item.children.push({
						value: i.id,
						label: i.text,
						children: [],
						loading: false
					  })
					// } else {
				}
					  item.children.push({
						value: i.id,
						label: i.text
					  })
					// }
				  })
				  item.loading = false;
				  callback();
				}
			  })
		  },

		  chooseOrgManageHandler (val, selected) {
			this.canSearchForList = false;
			this.currOrgManageId = val[val.length - 1];
			if (!selected[0]) return (this.canSearchForList = true)
			this.getOrgManageTableList()
	
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
		getMockData () {
			let mockData = [];
			for (let i = 1; i <= 20; i++) {
				mockData.push({
					key: i.toString(),
					label: 'Content ' + i,
					description: 'The desc of content  ' + i,
					disabled: Math.random() * 3 < 1
				});
			}
			return mockData;
		},
		asyncOK(){
			var _this = this;
			this.$Message.info('Clicked ok');
			debugger;
			axios.post('/place/addPlace.action?place.placeName='+_this.formContent.name+
			"&place.address="+_this.formContent.address+"&place.head="+_this.formContent.resPerson+"&place.phone="+_this.formContent.phone+
			"&place.contacter="+_this.formContent.person+"&type"+_this.formContent.nature.value

			)
			.then(function(res){
				let _data = [];
				let data2 = {};
				_data.push({
					placeName: _this.formContent.name,
					address: _this.formContent.address,
					head: _this.formContent.resPerson,
					phone: _this.formContent.phone,
					id: res.data.id,
					contacter: _this.formContent.person
				})
				data2.placeName = _data[0].placeName;
				data2.placeAddr = _data[0].address;
				data2.head = _data[0].resPerson;
				data2.call =_data[0].phone;
				data2.id = _data[0].id;
				data2.callPerson =_data[0].contacter;
				_this.historyData.push(data2);
				_this.site.push(data2);
			})
			.catch(function(err){
				console.log(err);
			});
		},
		getTargetKeys () {
			return this.getMockData()
					.filter(() => Math.random() * 2 > 1)
					.map(item => item.key);
		},
		render1 (item) {
			return item.label;
		},
		handleChange1 (newTargetKeys, direction, moveKeys) {
			console.log(newTargetKeys);
			console.log(direction);
			console.log(moveKeys);
			this.targetKeys1 = newTargetKeys;
		},
		// handleListApproveHistory(){
		// 	this.ajaxHistoryData = testData.histories
		// 	this.dataCount = testData.histories.length;
		// 	if(testData.histories.length < this.pageSize){
		// 		this.historyData = this.ajaxHistoryData;
		// 	}else{
		// 		this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
		// 	}
				
		   
		// },
		changepage(index){
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
			this.historyData = this.ajaxHistoryData.slice(_start,_end);
		}
	},
	created(){
		//  this.handleListApproveHistory();
	},
	mounted: function() {
		const _orgId = this.defaultOrgId
		this.currOrgManageId = _orgId;
		this.defaultOrgSelId = [_orgId];


		fetch('/place/findPlaceByConditionForPage.action?place.orgId=1', {
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
					id: item.id,
					placeName: item.placeName,
					placeAddr: item.address,
					call: item.phone,
					callPerson:item.contacter,
					time: item.createDate,
					submitter: item.commitUser
				})
			});
			this.dataCount = this.site.length;
			this.pageSize = 9;
			this.historyData =  _data;
		})

		.catch(err => console.error(err))
	}
}