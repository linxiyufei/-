
export default {
	data () {
		return {
			histories: [
			],
			site:[],
			ajaxHistoryData:[],
			// 初始化信息总条数
			dataCount:0,
			// 每页显示多少条
			pageSize:9,
			historyColumns: [
				{
					title: '编号',
					key: 'name'
				},
				{
					title: '等级',
					key: 'range'
				},
				{
					title: '预警时间',
					key: 'time'
				},
				{
					title: '预警地点',
					key: 'address'
				},
				{
					title: '类型',
					key: 'grade'
				},
				{
					title: '关键人',
					key: 'people'
				},
				{
					title: '关键车',
					key: 'car'
				},
				{
					title: '消息附件',
					key: 'infor'
				}

			],
			historyData: [],
			msg: '',
			cityList: [
				
			],
			model1: '',
			content1: '刷新',
			content2: '导出',
		}
	},
	methods:{
		handleListApproveHistory(){
			this.ajaxHistoryData = this.histories
			this.dataCount = this.site.length;
			if(this.histories.length < this.pageSize){
				this.historyData = this.ajaxHistoryData;
			}else{
				this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
			}
				
		   
		},
		changepage(index){
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
			this.historyData = this.ajaxHistoryData.slice(_start,_end);
		}
	},
	created(){
		 this.handleListApproveHistory();
	},
	mounted: function() {
		fetch('/fightOnMap/infoManage/findFightOnMapInfoByConditionForPage.action?&orginternalcode=1.1', {
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
					name: item.id,
					range: item.earlyWarningLevel.displayName,
					time: item.earlyWarningDate,
					address: item.earlyWarningPlace || '',
					grade: item.earlyWarningType.displayName,
					people: item.keyPerson || '',
					car: item.keyCar || '',
					infor: item.videosrc 
				})
			});
			this.dataCount = this.site.length;
			this.pageSize = 9;
			this.historyData =  _data;
		})

		.catch(err => console.error(err))
	}
}