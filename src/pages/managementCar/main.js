import axios from 'axios'
export default {
	data () {
		return {
			viewcar: false,
			//图片上传
			defaultList: [
			],
			imgName: '',
			visible: false,
			uploadList: [],
			//
			modal1: false,
			nameed:'',
			updatamodal:false,
			usuallyid:'',
			pageSize: 10,
			ajaxHistoryData:[],
			cardtype:[],
			cardtypes:[],
			cardtypev:[],
			cardtypeid:'',
			cardtypeids:'',
			cardtypeidv:'',
			brand:[],
			brands:[],
			brandv:[],
			brandid:'',
			cardid:'',
			brandids:'',
			brandidv:'',
			cardids:'',
			cardidv:'',
			idcolor:[],
			idcolors:[],
			idcolorv:[],
			checkedid:'',
			ip: 'http://192.168.10.229:8086',
			cardobj:{
				'number':'',
				'name': '',
				'phone': '',
				'belongingPlace': '',
				'colorst': ''
			},
			cardobjs:{},
			cardobjv:{},
			iscard: false,
			iscar: false,
			iscolor: false,
			car:{
				name: '',
				phone: '',
				idNum: ''
			},
			colorid:'',
			colorids:'',
			coloridv:'',
			modal2:false,
			personname:[],
			// 初始化信息总条数
			dataCount:1,
			pageList:[],
			historyColumns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '车牌',
					key: 'plate'
				},
				{
					title: '车主姓名',
					key: 'nameCar'
				},
				{
					title: '车主电话',
					key: 'phoneCar'
				},
				{
					title: '车型',
					key: 'typeCar'
				},
				{
					title: '属地',
					key: 'areaCar'
				},
				{
					title: '车身颜色',
					key: 'colorCar'
				},
				{
					title: '号牌类型',
					key: 'typePlate'
				},
				{
					title: '号牌颜色',
					key: 'colorPlate'
				},
				{
					title: '更新时间',
					key: 'upTime'
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
										this.updatamodal=true;
										this.usuallyid=this.historyData[params.index].id
										axios.get(this.ip+'/vehicleManage/vehicle/findVehicleById.action?id='+this.historyData[params.index].id)
										.then(res => {
											if(res.data){
												console.log(res.data)
											  this.cardobjs.number=res.data.licensePlateColor.id;
											  this.brandids=res.data.brand.id;
											  this.cardobjs.phone=res.data.ownerPhone;
											  this.cardobjs.colorst=res.data.bodyColor;
											  this.cardobjs.belongingPlace=res.data.belongingPlace;
											  this.colorids=res.data.licensePlateColor.id;
											  this.cardtypeids=res.data.licensePlateType.id;
											  this.cardobjs.name=res.data.ownerName;
											  this.cardobjs.id=res.data.ownerId
                                              this.cardids=res.data.ownerIdCardNo

											}
											
										  
										})
									},
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
									click: () => {
										console.log(this.historyData[params.index].id)
										
										// axios.post('/vehicleManage/vehicle/deleteVehicles.action', {
										// 	vehicleIds:this.historyData[params.index].id
										//   })
										//   .then(function (response) {
										// 	  console.log(response)
										// 	//   if(response.)
										// 	this.$Message.success('删除成功');
										//   })
										//   .catch(function (error) {
											  
										//   });
										
										axios.get(this.ip+'/vehicleManage/vehicle/deleteVehicles.action?vehicleIds='+this.historyData[params.index].id)
										.then(res => {
											console.log(res)
											if(res.data==true){
												this.$Message.success('删除成功');
												// console.log(this.historyData)
												axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action')
												.then(res => {
												   this.pageList=res.data.rows;		  
												   let _data = [];
												   this.pageList.map( (item, index) => {
													   _data.push({
														   id:item.id,
														   plate:item.licensePlateNumber,
														   nameCar:item.ownerName,
														   phoneCar:item.ownerPhone,
														   typeCar:item.brand.displayName,
														   areaCar:item.belongingPlace,
														   colorCar:item.bodyColor,
														   typePlate:item.licensePlateType.displayName,
														   colorPlate:item.licensePlateColor.displayName,
														   upTime:item.createDate,
														   person:item.createUser,
														   action:''
													   })
												   });
												   this.dataCount = this.pageList.length;
												   this.pageSize = 9;
												   this.historyData =  _data;		  
												})
											}else{
												this.$Message.error(res.data.message);
											}
										})
									}
								}
							}, '删除')
						]);
					}
				}

			],
			historyData: [],
			msg: '',
			cityList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			model1: '',
			imgUrlArr:[],
			imgnameArr:[]
		}
	},
	methods:{
		//图片上传

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
			
			//res.uploadFileFileName = this.imgUrl;
			this.name = res.url;
			file.url = res.fullUrl;
			file.name = res.url;
			//console.log(file);

			this.uploadList = this.$refs.upload.fileList;

			//this.imgUrlArr.push(this.imgUrl)
			this.imgname = res.url;
			//this.imgnameArr.push(this.imagename)

			var fileName = res.uploadFileFileName;

			var s = res.fullUrl;
			var startIndex = s.indexOf("tmp");
			var endIndex = s.indexOf("?");
			var url = s.substring(startIndex,endIndex);

			this.imgUrlArr.push(","+fileName);
			this.imgnameArr.push(url+"!"+fileName+"!0");
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
		},

		//双击查看
		dbClick (params) {
			var _this = this;
			_this.viewcar=true;
			$(".edit input").attr("disabled","true")
			axios.get(this.ip+'/vehicleManage/vehicle/findVehicleById.action?id='+params.id)

			axios.get(this.ip+'/vehicleManage/vehicle/findVehicleById.action?id='+params.id)

			.then(res => {
				if(res){
          		  res = res.data;
				  _this.cardobjv.number=res.licensePlateColor.id;
				  _this.brandidv=res.brand.id;
				  _this.cardobjv.phone=res.ownerPhone;
				  _this.cardobjv.colorst=res.bodyColor;
				  _this.cardobjv.belongingPlace=res.belongingPlace;
				  _this.coloridv=res.licensePlateColor.id;
				  _this.cardtypeidv=res.licensePlateType.id;
				  _this.cardobjv.name=res.ownerName;
				  _this.cardobjv.id=res.ownerId
				  _this.cardidv=res.ownerIdCardNo

				}
			})
		},
		cardCheck(){			
			let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
			let isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

			if (this.cardid){
				var result = isIDCard1.test(this.cardid) || isIDCard2.test(this.cardid)
				if(result){
					this.iscard = false
					return
				}else {
					this.iscard = true
					
				}
			}
			if (!this.cardid) {
				this.iscard = false
			}

		},
		isnumber(){
			let carnumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
			if(this.cardobj.number){
				var result = carnumber.test(this.cardobj.number)
				if(result){
					this.iscar = false
					return
				}else {
					this.iscar = true
					this.$Message.error("该车牌号不合法,请重新输入!");
				}
			}
		},
		isnumbers(){
			let carnumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
			if(this.cardobjs.number){
				var result = carnumber.test(this.cardobjs.number)
				if(result){
					this.iscar = false
				}else {
					this.iscar = true
					this.$Message.error("该车牌号不合法,请重新输入!");
				}
			}
		},
		checkColor(){
			
			var length = this.cardobj.colorst.length;
			if(this.cardobj.colorst){
				if(length>32){
					this.iscolor = true
				}else{
					this.iscolor = false
				}
			}
		},
		handleListApproveHistory(){
			axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action?page=1&rows='+this.pageSize)
			.then(res => {
			   this.pageList=res.data.rows;		  
			   
			   let _data = [];
			   this.pageList.map( (item, index) => {
				   _data.push({
					   id:item.id,
					   plate:item.licensePlateNumber,
					   nameCar:item.ownerName,
					   phoneCar:item.ownerPhone,
					   typeCar:item.brand.displayName,
					   areaCar:item.belongingPlace,
					   colorCar:item.bodyColor,
					   typePlate:item.licensePlateType.displayName,
					   colorPlate:item.licensePlateColor.displayName,
					   upTime:item.createDate,
					   person:item.createUser,
					   action:''
				   })
			   });
			   this.historyData =  _data;
			   this.ajaxHistoryData = res.data.rows;
			   this.dataCount = res.data.records;
			   if(res.data.records < this.pageSize){
					res.data.rows = this.ajaxHistoryData;
			   }else{
					res.data.rows = this.ajaxHistoryData.slice(0,this.pageSize);
			   }		  
			})
			// .catch(err => console.error(err))
		},
		adds(){
			this.modal1=true;
			console.log(this.modal1)
		},
		addcar(){
		   
				if(this.cardobj.number==""||this.brandid==""||this.colorid==""||this.cardobj.colorst==""||this.cardtypeid==""||this.cardobj.belongingPlace==""){
					this.$Message.error("请填写完整信息!")
			 }else{

				axios.post(this.ip+'/vehicleManage/vehicle/countVehiclesByNoAndType.action?vehicle.licensePlateNumber='+this.cardobj.number+'&vehicle.licensePlateType.id='+this.cardtypeid)
					.then(function(response){
						if(response.data> 0){
							this.$Message.error("已存在相同类型的车牌号!")
							return
						}else{
							var files = '';
							for(var i =0; i<this.imgUrlArr.length;i++ ){
								files += this.imgUrlArr[i]+'|';
							}
		
						axios.post(this.ip+'/vehicleManage/vehicle/maintainVehicle.action?vehicle.ownerId='+
						this.cardobj.id+'&vehicle.licensePlateNumber='+this.cardobj.number+'&vehicle.brand.id='+this.brandid+
						'&vehicle.licensePlateColor.id='+this.colorid+'&vehicle.bodyColor='+this.cardobj.colorst+'&vehicle.licensePlateType.id='+
						this.cardtypeid+'&vehicle.belongingPlace='+this.cardobj.belongingPlace+"&attachFileUrls="+this.imgnameArr+"&files="+files)
						.then(res => {
							this.$Message.success('新增成功!');
							axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action')
							.then(res => {
							   this.pageList=res.data.rows;		  
							   let _data = [];
							   this.pageList.map( (item, index) => {
								   _data.push({
									   id:item.id,
									   plate:item.licensePlateNumber,
									   nameCar:item.ownerName,
									   phoneCar:item.ownerPhone,
									   typeCar:item.brand.displayName,
									   areaCar:item.belongingPlace,
									   colorCar:item.bodyColor,
									   typePlate:item.licensePlateType.displayName,
									   colorPlate:item.licensePlateColor.displayName,
									   upTime:item.createDate,
									   person:item.createUser,
									   action:''
								   })
							   });
							   this.dataCount = this.pageList.length;
							   this.historyData =  _data;		  
							})
						})
		
						}
					})
					
			 }

			
		},
		addcars(){
    if(this.cardobjs.numbers==""||this.cardobjs.id==""||this.brandids==""||this.colorids==""||this.cardobjs.colorst==""||this.cardtypeids==""||this.usuallyid==""||this.cardobjs.belongingPlace==""){
           this.$Message.error("请填写完整信息!")
	}else{
		axios.get(this.ip+'/vehicleManage/vehicle/maintainVehicle.action?vehicle.ownerId='+
		this.cardobjs.id+'&vehicle.licensePlateNumber='+this.cardobjs.number+'&vehicle.brand.id='+this.brandids+
		'&vehicle.licensePlateColor.id='+this.colorids+'&vehicle.bodyColor='+this.cardobjs.colorst+'&vehicle.licensePlateType.id='+
		this.cardtypeids+'&vehicle.id='+this.usuallyid+'&vehicle.belongingPlace='+this.cardobjs.belongingPlace)
		.then(res => {
			this.$Message.success('修改成功!');
			axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action')
			.then(res => {
			   this.pageList=res.data.rows;		  
			   let _data = [];
			   this.pageList.map( (item, index) => {
				   _data.push({
					   id:item.id,
					   plate:item.licensePlateNumber,
					   nameCar:item.ownerName,
					   phoneCar:item.ownerPhone,
					   typeCar:item.brand.displayName,
					   areaCar:item.belongingPlace,
					   colorCar:item.bodyColor,
					   typePlate:item.licensePlateType.displayName,
					   colorPlate:item.licensePlateColor.displayName,
					   upTime:item.createDate,
					   person:item.createUser,
					   action:''
				   })
			   });
			   this.dataCount = this.pageList.length;
			   this.historyData =  _data;		  
			})
			
		  
		})
	}

		
	  },
		searchpersonid(index){
			this.checkedid=index;	 
		},
		allsearch(ids){
            axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action?searchValue='+ids)
			.then(res => {
			   this.pageList=res.data.rows;		  
			   let _data = [];
			   this.pageList.map( (item, index) => {
				   _data.push({
					   id:item.id,
					   plate:item.licensePlateNumber,
					   nameCar:item.ownerName,
					   phoneCar:item.ownerPhone,
					   typeCar:item.brand.displayName,
					   areaCar:item.belongingPlace,
					   colorCar:item.bodyColor,
					   typePlate:item.licensePlateType.displayName,
					   colorPlate:item.licensePlateColor.displayName,
					   upTime:item.createDate,
					   person:item.createUser,
					   action:''
				   })
			   });
			   this.dataCount = this.pageList.length;
			   this.historyData =  _data;		  
			})
	
		},
       searchmessage(){
		// //    alert(this.checkedid);
		//    let id=this.checkedid
		  
		//    fetch('/personnel/getPersonnelById.action?person.id='+id, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Accept': 'application/json'
		// 	}
	 	// })
		// .then(res => res.json())
		// .then(res => {
		// 	alert(res)		
		// })
        let _this=this;
		let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(reg.test(_this.cardid)){
			// alert('ss')
			fetch(this.ip+'/personnel/personnelList.action?person.idcardNo='+_this.cardid, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				if(res.rows.length==0){
					this.$Message.error('该人员不存在!');
					this.cardid=''
				}else{
					_this.cardobj=res.rows[0];
					// this.$Message.success('新增成功!');
					_this.cardobj.name =res.rows[0].name;
					_this.cardobj.phone = res.rows[0].phone;
				}			  
			})
		}



	   },

		changepage(index){
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
			axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action?page='+index+'&rows='+this.pageSize)
			.then(res => {
			   this.pageList=res.data.rows;		  
			   
			   let _data = [];
			   this.pageList.map( (item, index) => {
				   _data.push({
					   id:item.id,
					   plate:item.licensePlateNumber,
					   nameCar:item.ownerName,
					   phoneCar:item.ownerPhone,
					   typeCar:item.brand.displayName,
					   areaCar:item.belongingPlace,
					   colorCar:item.bodyColor,
					   typePlate:item.licensePlateType.displayName,
					   colorPlate:item.licensePlateColor.displayName,
					   upTime:item.createDate,
					   person:item.createUser,
					   action:''
				   })
			   });
			   this.historyData =  _data;
			   this.ajaxHistoryData = res.data.rows;
			   this.dataCount = res.data.records;
			   if(res.records < this.pageSize){
					res.data.rows = this.ajaxHistoryData;
			   }else{
					res.data.rows = this.ajaxHistoryData.slice(0,this.pageSize);
			   }		  
			})
			.catch(err => console.error(err))
		}
	},
	created(){
		 this.handleListApproveHistory();
	},
	mounted: function() {
		this.uploadList = this.$refs.upload.fileList;
		axios.get(this.ip+'/vehicleManage/vehicle/getVehicleDicts.action?domainName=号牌类型')
		.then(res => {
		   this.cardtype=res.data;
		}),
		axios.get(this.ip+'/vehicleManage/vehicle/getVehicleDicts.action?domainName=车辆品牌')
		.then(res => {
			console.log(res)
		   this.brand=res.data;
		}),
		axios.get(this.ip+'/vehicleManage/vehicle/getVehicleDicts.action?domainName=号牌颜色')
		.then(res => {
			console.log(res)
		   this.idcolor=res.data;
		}),
		
		axios.get(this.ip+'/vehicleManage/vehicle/findVehiclesList.action?page=1&rows='+this.pageSize)
		.then(res => {
		   this.pageList=res.data.rows;		  
		   
		   let _data = [];
		   this.pageList.map( (item, index) => {
			   _data.push({
				   id:item.id,
				   plate:item.licensePlateNumber,
				   nameCar:item.ownerName,
				   phoneCar:item.ownerPhone,
				   typeCar:item.brand.displayName,
				   areaCar:item.belongingPlace,
				   colorCar:item.bodyColor,
				   typePlate:item.licensePlateType.displayName,
				   colorPlate:item.licensePlateColor.displayName,
				   upTime:item.createDate,
				   person:item.createUser,
				   action:''
			   })
		   });
		   this.dataCount = res.data.records;
		})


 

	}
}