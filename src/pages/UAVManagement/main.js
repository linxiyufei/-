
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
	data () {
		return {
			map: null,
			nameed:'',
			rwname:'',
			rwnames:'',
			remark:'',
			remarks:'',
			uodateid:'',
			usudv:[],
			executionCycle:'',
			executionCycles:'',
			executionCyclearr:[],
			executionCyclearrs:[],
			executionTime:'',
			executionTimes:'',
			executionTimearr:[],
			executionTimearrs:[],
			drawAreaData: [],
			drawAreaDatas: [],
			drawsline:[],
			mapHeight: 250,
			data1: [],
			targetKeys1: [],
			addTaskHandler: [],
			social: [],
			modal1: false,
			updatamodal:false,
			ajaxHistoryData:[],
			// 初始化信息总条数
			dataCount:0,
			// 每页显示多少条
			pageSize:9,
			historyColumns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '任务名称',
					key: 'name'
				},
				{
					title: '执行频率',
					key: 'range'
				},
				{
					title: '执行时间',
					key: 'time'
				},
				{
					title: '提交时间',
					key: 'address'
				},
				{
					title: '提交人',
					key: 'grade'
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
									   this.uodateid=this.historyData[params.index].id
									  axios.get('/uavMissionManage/uavMission/findUavMissionById.action?id='+this.historyData[params.index].id)
                                      .then(res=>{
										  this.drawsline=[];
										  var points=[];
										  var lines='';
										  console.log(res.data.uavCoordinates)
										  for(var d=0;d<res.data.uavCoordinates.length;d++){
											   
												var centerLat=res.data.uavCoordinates[d].centerLat;
												var centerLon=res.data.uavCoordinates[d].centerLon;
												points.push([centerLat,centerLon])	
										  }
										  this.drawsline.push(points);
										  console.log(this.drawsline)
										//   this.drawAreaDatas.push()
										//   this.drawAreaDatas=res.uavCoordinates;
										  console.log(res.data.executionTime+res.data.remarks)
										   this.rwnames=res.data.name;
										   this.executionCycles=res.data.executionCycle.id;
										   this.executionTimes=res.data.executionTime;
										   this.remarks=res.data.remark;                                        
									  })
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
										
										fetch('/uavMissionManage/uavMission/deleteUavMissions.action?uavMissionIds='+this.historyData[params.index].id,
									  {	method: 'post',
										headers: {
											'Content-Type': 'application/json',
											'Accept': 'application/json'
										}
									})
									.then(res => res.json())
										.then(res=>{
											console.log(res)
											if(res==true){
												this.$Message.success('删除成功');
												// console.log(this.historyData)
												fetch('/uavMissionManage/uavMission/findUavMissionsList.action', {
													method: 'GET',
													headers: {
														'Content-Type': 'application/json',
														'Accept': 'application/json'
													}
												})
												.then(res => res.json())
												.then(res => {
													
												   this.pageList=res.rows;		  
												   let _data = [];
												   this.pageList.map( (item, index) => {
													   _data.push({
														   id:item.id,
														   name:item.name,
														   range:item.executionCycle.displayName,
														   time:item.executionTime+'点',
														   address:item.createDate,
														   grade:item.createUserName,
														   action:''
													   })
												   });
												   this.dataCount = this.pageList.length;
												   this.pageSize = 9;
												   this.historyData =  _data;		  
												})
											}else{
												this.$Message.error(res.message);
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
			timeList: [
				{
					value: 'day',
					label: '一天'
				},
				{
					value: 'week',
					label: '一周'
				}
			],
			model1: '',
			timeList2: [
				{
					value: 'one',
					label: '一点'
				},
				{
					value: 'two',
					label: '二点'
				}
			],
		}
	},
	watch: {
		modal1 (newVal) {
			if (newVal && !this.map) {
				const HEIGHT = document.body.clientHeight;
				console.log(HEIGHT);
				this.mapHeight = HEIGHT - 450;
				setTimeout(() => {
					this.initMap();

				}, 1500)
			}
		},
		updatamodal (newVal) {
			if (newVal && !this.map) {
				const HEIGHT = document.body.clientHeight;
				console.log(HEIGHT);
				this.mapHeight = HEIGHT - 450;
				setTimeout(() => {
					this.initMaps();

				}, 1500)
			}
		}
	},
	methods:{
		//双击查看

		dbClick (params) {
			this.updatamodal=true;
		   axios.get('/uavMissionManage/uavMission/findUavMissionById.action?id='+params.id)
		   .then(res=>{
			   console.log(res.data.executionTime+res.data.remarks)
				this.rwnames=res.data.name;
				this.executionCycles=res.data.executionCycle.id;
				this.executionTimes=res.data.executionTime
				this.remarks=res.data.remark
			 
		   })
		},

		getListData () {
			axios.get('/fightOnMap/infoManage/findPersonCoordinateByPersonId.action?fightOnMapInfo.person.id=3')
				.then(res => {
					console.log(res.data)
				})
		},
	  
		addwurenji(){
		  var _this=this;
		  if(_this.rwname==""||_this.executionTime==""||_this.remark==""||_this.uavCoordinatesArray==""){
			  this.$Message.error("请填写完整信息")
		  }else{
			let uavMission={
				name:_this.rwname, 
				
				executionCycle:_this.executionCycle,
				executionTime:_this.executionTime,
				remark:_this.remark
			  }
			 var objlist=[];
			  
			   for(var d=0;d<_this.drawAreaData.length;d++){
					//objlist[d][1]=_this.drawAreaData[d]
					var obj={centerLon:_this.drawAreaData[d][0],centerlat:_this.drawAreaData[d][1]};
					var list=_this.drawAreaData[d][0]+" "+_this.drawAreaData[d][1]
					//objlist[d]=obj
					objlist.push(list);
			   }
			  axios({
				  method:'post',
				  headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				 },
	
				  url:'/uavMissionManage/uavMission/maintainUavMission.action',
					params:{'uavMission.name':uavMission.name,
					'uavMission.executionCycle.id':uavMission.executionCycle,
					'uavMission.executionTime':uavMission.executionTime,
					'uavMission.remark':uavMission.remark,
					'uavCoordinatesArray': '[' + objlist.join(',') + ']'
					
					}
					
				  })
				.then(res=>{
					var objlist=[];
					for(var d=0;d<_this.drawAreaData.length;d++){
						//objlist[d][1]=_this.drawAreaData[d]
						var obj={centerLon:_this.drawAreaData[d][0],centerlat:_this.drawAreaData[d][1]};
						var list=_this.drawAreaData[d][0]+" "+_this.drawAreaData[d][1]
						//objlist[d]=obj
						objlist.push(list);
				   }
					this.rode = objlist;
					if(res.data==true){
						fetch('/uavMissionManage/uavMission/findUavMissionsList.action', {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json'
							}
						})
						.then(res => res.json())
						.then(res => {
							
						   this.pageList=res.rows;		  
						   let _data = [];
						   this.pageList.map( (item, index) => {
							   _data.push({
								   id:item.id,
								   name:item.name,
								   range:item.executionCycle.displayName,
								   time:item.executionTime+'点',
								   address:item.createDate,
								   grade:item.createUserName,
								   action:''
							   })
						   });
						   this.dataCount = this.pageList.length;
						   this.pageSize = 9;
						   this.historyData =  _data;		  
						})
					}else{
						this.$Message.error('新增失败!')
					}
				})
		  }
		  
		},

		allsearch(ids){
            fetch('/uavMissionManage/uavMission/findUavMissionsList.action?name='+ids, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				
			   this.pageList=res.rows;		  
			   let _data = [];
			   this.pageList.map( (item, index) => {
				   _data.push({
					id:item.id,
					name:item.name,
					range:item.executionCycle.displayName,
					time:item.executionTime+'点',
					address:item.createDate,
					grade:item.createUserName,
					action:''
				   })
			   });
			   this.dataCount = this.pageList.length;
			   this.pageSize = 9;
			   this.historyData =  _data;		  
			})
	
		},
		addwurenjis(){
			var _this=this;
			console.log(_this.usudv)
			if(_this.rwnames==""||_this.executionTimes==""||_this.remarks==""||_this.uavCoordinatesArrays==""){
				this.$Message.error("请填写完整信息")
			}else{
				let uavMission={
					name:_this.rwnames, 
					
					executionCycle:_this.executionCycles,
					executionTime:_this.executionTimes,
					remark:_this.remarks
				  }
				  console.log(uavMission)
				
				  axios({
					  method:'post',
					  headers: {
						'Content-type': 'application/x-www-form-urlencoded'
					 },
		
					  url:'/uavMissionManage/uavMission/maintainUavMission.action',
						params:{'uavMission.name':uavMission.name,
						'uavMission.executionCycle.id':uavMission.executionCycle,
						'uavMission.id':this.uodateid,
						'uavMission.executionTime':uavMission.executionTime,
						'uavMission.remark':uavMission.remark,
						'uavCoordinatesArray': '[' +_this.usudv.join(',') + ']'
						
						}
				  
					  })
					.then(res=>{
						console.log((res))
						if(res.data==true){
							fetch('/uavMissionManage/uavMission/findUavMissionsList.action', {
								method: 'GET',
								headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json'
								}
							})
							.then(res => res.json())
							.then(res => {
								
							   this.pageList=res.rows;		  
							   let _data = [];
							   this.pageList.map( (item, index) => {
								   _data.push({
									   id:item.id,
									   name:item.name,
									   range:item.executionCycle.displayName,
									   time:item.executionTime+'点',
									   address:item.createDate,
									   grade:item.createUserName,
									   action:''
								   })
							   });
							   this.dataCount = this.pageList.length;
							   this.pageSize = 9;
							   this.historyData =  _data;		  
							})
						}else{
							this.$Message.error('新增失败!')
						}
					})
			}
			
		  },
  
  
  
		  allsearch(ids){
			  fetch('/uavMissionManage/uavMission/findUavMissionsList.action?name='+ids, {
				  method: 'GET',
				  headers: {
					  'Content-Type': 'application/json',
					  'Accept': 'application/json'
				  }
			  })
			  .then(res => res.json())
			  .then(res => {
				  
				 this.pageList=res.rows;		  
				 let _data = [];
				 this.pageList.map( (item, index) => {
					 _data.push({
					  id:item.id,
					  name:item.name,
					  range:item.executionCycle.displayName,
					  time:item.executionTime+'点',
					  address:item.createDate,
					  grade:item.createUserName,
					  action:''
					 })
				 });
				 this.dataCount = this.pageList.length;
				 this.pageSize = 9;
				 this.historyData =  _data;		  
			  })
	  
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
		
		changepage(index){
			var _start = ( index - 1 ) * this.pageSize;
			var _end = index * this.pageSize;
			this.historyData = this.ajaxHistoryData.slice(_start,_end);
		},
		initMap () {
			let _this = this;
			var projection = ol.proj.get("EPSG:4326");
			var projectionExtent = projection.getExtent();

			var res = [
				1.40625,
				0.703125,
				0.3515625,
				0.17578125,
				0.087890625,
				0.0439453125,
				0.02197265625,
				0.010986328125,
				0.0054931640625,
				0.00274658203125,
				0.001373291015625,
				0.0006866455078125,
				0.00034332275390625,
				0.000171661376953125,
				0.0000858306884765625,
				0.00004291534423828125,
				0.000021457672119140625,
				0.000010728836059570312
			];

			var map = new ol.Map({
				layers: [
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "中国矢量1-4级",
							url: "http://t{0-6}.tianditu.com/vec_c/wmts",
							layer: "vec",
							style: "default",
							matrixSet: "c",
							format: "tiles",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(0, 15),
								matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
							})
						}),
						minResolution: 0.00004291534423828125,
						maxResolution: 1.40625
					}),
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "中国矢量注记1-4级",
							url: "http://t{0-6}.tianditu.com/cva_c/wmts",
							layer: "cva",
							style: "default",
							matrixSet: "c",
							format: "tiles",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(0, 15),
								matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
							})
						}),
						minResolution: 0.00004291534423828125,
						maxResolution: 1.40625
					}),
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "浙江矢量15-17级",
							url: "http://srv{0-6}.zjditu.cn/ZJEMAP_2D/wmts",
							layer: "TDT_ZJEMAP",
							style: "default",
							matrixSet: "TileMatrixSet0",
							format: "image/png",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(15, 18),
								matrixIds: [15, 16, 17]
							})
						}),
						minResolution: 0.000005364418029785156,
						maxResolution: 0.0000858306884765625
					}),
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "浙江矢量注记15-17级",
							url: "http://srv{0-6}.zjditu.cn/ZJEMAPANNO_2D/wmts",
							layer: "ZJEMAPANNO",
							style: "default",
							matrixSet: "TileMatrixSet0",
							format: "image/png",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(15, 18),
								matrixIds: [15, 16, 17]
							})
						}),
						minResolution: 0.000005364418029785156,
						maxResolution: 0.0000858306884765625
					})
				],
				target: "map-cont",
				view: new ol.View({
					center: [118.86961, 28.97073],
					projection: projection,
					zoom: 14,
					maxZoom: 17,
					minZoom: 1
				})
			}); 


			//geojson marker样式定义
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					src: 'static/img/video-icon.png'
				}))
			});

			//加载geojson数据
			var geoJsonLayer = new ol.layer.Vector({
				title: 'add Layer',
				source: new ol.source.Vector({
					projection: 'EPSG:4326',
					url: '/cameraInfosmanagment/getInfoForGIS.action?page=1&rows=15',
					format: new ol.format.GeoJSON()
				}),
				style: iconStyle
			});
			map.addLayer(geoJsonLayer);

			var raster = new ol.layer.Tile({
					source: new ol.source.OSM()
			});

			var source = new ol.source.Vector({ projection: 'EPSG:4326' });
			var vector = new ol.layer.Vector({
					source: source,
					style: new ol.style.Style({
							fill: new ol.style.Fill({
									color: 'rgba(255, 255, 255, 0.2)'
							}),
							stroke: new ol.style.Stroke({
									color: '#ffcc33',
									width: 2
							}),
							image: new ol.style.Circle({
									radius: 7,
									fill: new ol.style.Fill({
											color: '#ffcc33'
									})
							})
					})
			});
			map.addLayer(vector);

			var modify = new ol.interaction.Modify({ source: source });
			map.addInteraction(modify);

			var draw, snap, data; // global so we can remove them later

			function addInteractions() {
				draw = new ol.interaction.Draw({
						source: source,
						type: 'LineString'
				});
				map.addInteraction(draw);
				draw.on('drawstart', function(event) {
				vector.getSource().clear(true);
				})
				//获取绘制图形坐标点
				draw.on('drawend', function(event) {
					var format = new ol.format['GeoJSON']();
					var feature=event.feature.clone();
					// feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
					data = format.writeFeatures([feature]);
					// console.log(JSON.stringify(data, null, 4));
					_this.drawAreaData = JSON.parse(data).features[0].geometry.coordinates;
					// console.log(data)
					console.log(_this.drawAreaData)
				});
				snap = new ol.interaction.Snap({ source: source });
				map.addInteraction(snap);
			}


			addInteractions();
			_this.map = map;
		},
		initMaps () {
			let _this = this;
			var projection = ol.proj.get("EPSG:4326");
			var projectionExtent = projection.getExtent();

			var res = [
				1.40625,
				0.703125,
				0.3515625,
				0.17578125,
				0.087890625,
				0.0439453125,
				0.02197265625,
				0.010986328125,
				0.0054931640625,
				0.00274658203125,
				0.001373291015625,
				0.0006866455078125,
				0.00034332275390625,
				0.000171661376953125,
				0.0000858306884765625,
				0.00004291534423828125,
				0.000021457672119140625,
				0.000010728836059570312
			];

			var map = new ol.Map({
				layers: [
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "中国矢量1-4级",
							url: "http://t{0-6}.tianditu.com/vec_c/wmts",
							layer: "vec",
							style: "default",
							matrixSet: "c",
							format: "tiles",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(0, 15),
								matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
							})
						}),
						minResolution: 0.00004291534423828125,
						maxResolution: 1.40625
					}),
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "中国矢量注记1-4级",
							url: "http://t{0-6}.tianditu.com/cva_c/wmts",
							layer: "cva",
							style: "default",
							matrixSet: "c",
							format: "tiles",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(0, 15),
								matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
							})
						}),
						minResolution: 0.00004291534423828125,
						maxResolution: 1.40625
					}),
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "浙江矢量15-17级",
							url: "http://srv{0-6}.zjditu.cn/ZJEMAP_2D/wmts",
							layer: "TDT_ZJEMAP",
							style: "default",
							matrixSet: "TileMatrixSet0",
							format: "image/png",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(15, 18),
								matrixIds: [15, 16, 17]
							})
						}),
						minResolution: 0.000005364418029785156,
						maxResolution: 0.0000858306884765625
					}),
					new ol.layer.Tile({
						source: new ol.source.WMTS({
							name: "浙江矢量注记15-17级",
							url: "http://srv{0-6}.zjditu.cn/ZJEMAPANNO_2D/wmts",
							layer: "ZJEMAPANNO",
							style: "default",
							matrixSet: "TileMatrixSet0",
							format: "image/png",
							wrapX: true,
							tileGrid: new ol.tilegrid.WMTS({
								origin: ol.extent.getTopLeft(projectionExtent),
								resolutions: res.slice(15, 18),
								matrixIds: [15, 16, 17]
							})
						}),
						minResolution: 0.000005364418029785156,
						maxResolution: 0.0000858306884765625
					})
				],
				target: "map-conts",
				view: new ol.View({
					center: [120.14805, 30.26971],
					projection: projection,
					zoom: 14,
					maxZoom: 17,
					minZoom: 1
				})
			}); 


			//geojson marker样式定义
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					src: 'static/img/video-icon.png'
				}))
			});
		  

			var points = [
				[120.06923675537108, 30.18223150997541],
				[120.16056060791016, 30.167391455120708],
				[120.23746490478514, 30.1620484883354],
				[120.31024932861328, 30.1590800483346],
				[120.31299591064455, 30.115730650183096],
				[120.23128509521483, 30.098504373221672],
				[120.1179885864258, 30.10800889740291]
			];

			var route = new ol.geom.LineString(points);
			//route.transform('EPSG:4326', 'EPSG:3857');
			var routeCoords = route.getCoordinates();
			var routeLength = routeCoords.length;
		
			var routeFeature = new ol.Feature({
				type: 'route',
				geometry: route
			});

			var style = new ol.style.Style({
					stroke: new ol.style.Stroke({
						width: 6,
						color: [237, 212, 0, 0.8]
					})
				})

              
				var source = new ol.source.Vector({
					features: [routeFeature]
				});
			
				var vectorLayer = new ol.layer.Vector({
					source: source,
					style: style
				});
				map.addLayer(vectorLayer);

			

			// var source = new ol.source.Vector({ projection: 'EPSG:4326' });
			// var vector = new ol.layer.Vector({
			// 		source: source,
			// 		style: new ol.style.Style({
			// 				fill: new ol.style.Fill({
			// 						color: 'rgba(255, 255, 255, 0.2)'
			// 				}),
			// 				stroke: new ol.style.Stroke({
			// 						color: '#ffcc33',
			// 						width: 2
			// 				}),
			// 				image: new ol.style.Circle({
			// 						radius: 7,
			// 						fill: new ol.style.Fill({
			// 								color: '#ffcc33'
			// 						})
			// 				})
			// 		})
			// });
			// map.addLayer(vector);

			var modify = new ol.interaction.Modify({ source: source });
			map.addInteraction(modify);

			modify.on('modifyend',function(event){
				var fet=event.features.getArray()[0]
				let usually=fet.getGeometry().getCoordinates();
				this.drawAreaDatas=usually;
				console.log(this.drawAreaDatas)
				var objlist=[];
				for(var d=0;d<this.drawAreaDatas.length;d++){
					//objlist[d][1]=_this.drawAreaData[d]
					var obj={centerLon:this.drawAreaDatas[d][0],centerlat:this.drawAreaDatas[d][1]};
					var list=this.drawAreaDatas[d][0]+" "+this.drawAreaDatas[d][1]
					//objlist[d]=obj
					objlist.push(list);
			   }
			   console.log(objlist)
               this.usudv=objlist;
				console.log(this.usudv)
					// console.log(event.features[0])
			})
			// var draw, snap, data; // global so we can remove them later

			// function addInteractions() {
			// 	draw = new ol.interaction.Draw({
			// 			source: source,
			// 			type: 'LineString'
			// 	});
			// 	map.addInteraction(draw);
			// 	draw.on('drawstart', function(event) {
			// 	vector.getSource().clear(true);
			// 	})
			// 	//获取绘制图形坐标点;
			// 	draw.on('drawend', function(event) {
			// 		var format = new ol.format['GeoJSON']();
			// 		var feature=event.feature.clone();
			// 		// feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
			// 		data = format.writeFeatures([feature]);
			// 		// console.log(JSON.stringify(data, null, 4));
			// 		_this.drawAreaData = JSON.parse(data).features[0].geometry.coordinates;
			// 		// console.log(data)
			// 		console.log(_this.drawAreaData)
			// 	});
			// 	snap = new ol.interaction.Snap({ source: source });
			// 	map.addInteraction(snap);
			// }


			addInteractions();
			_this.map = map;
		}
	},
	
	created(){
		this.getListData()
		
	},
	mounted () {
		
		fetch('/uavMissionManage/uavMission/findUavMissionsList.action', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			
		   this.pageList=res.rows;		  
		   let _data = [];
		   this.pageList.map( (item, index) => {
			   _data.push({
				   id:item.id,
				   name:item.name,
				   range:item.executionCycle.displayName,
				   time:item.executionTime+'点',
				   address:item.createDate,
				   grade:item.createUserName,
				   action:''
			   })
		   });
		   this.dataCount = this.pageList.length;
		   this.pageSize = 9;
		   this.historyData =  _data;		  
		})

		fetch('/uavMissionManage/uavMission/getUavDicts.action?domainName=执行周期', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.executionCyclearr=res
			this.executionCyclearrs=res
		   
		})
		  this.executionTimearr=[];
		for(var s=1;s<=24;s++){
			// s++;
			let obj={};
			obj.displayName=s+'点';
			obj.id=s;
			this.executionTimearr.push(obj)
		}
		
		this.executionTimearrs=[];
		for(var s=1;s<=24;s++){
			// s++;
			let obj={};
			obj.displayName=s+'点';
			obj.id=s;
			this.executionTimearrs.push(obj)
		}


	}
}