<template>
  <div id="videoCall">
    <div id="map" class="map"></div>
	<div id="videoLoadMask">
		<div style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #fff;text-align: center;margin: 30px auto 20px;">
			<Icon type="person" style="fontSize: 70px;color: #fff;"></Icon>
		</div>
		<p style="color: #fff; text-align: center; font-size: 18px;">呼叫中</p>
		<span class="link-close-btn">挂断</span>
	</div>
    <div id="popup" class="ol-popup">
        <a href="javascript:;" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content" class="popup-content">
		</div>
    </div>
	<div class="video-list">
		<div class="video-list-cont">
			<div 
				class="video-item"
				v-for="(item, index) in videoList"
				:key="index"
				style="position: relative;"
			>
				<div class="video-chat-cont">
					<div class="info-cont"  :data-id="'video-cont-'+index">
						<img src="./img/001.png" width="40" height="40" alt="">
						
						<div class="info-body">
							<h3 style="margin-bottom: 15px;">{{ item.name }}</h3>
							<p>经度：{{ item.locationStartCenter }}</p>
							<p>纬度：{{ item.locationEndCenter }}</p>
							<p>电话：{{ item.mobileNumber }}</p>
							<p style="margin-bottom: 10px;">{{ item.username }}</p>
						</div>
					</div>
					<div class="video-chat-tool" :data-id="'video-tool-'+index" v-show="currIndex == index ? true : false">
						<div class="link-phone-call-btn" style="background-image: url(../../../static/img/phone.png) no-repeat center center"></div>
						<div 
							class="link-video-call-btn" 
							@click="callVideoHandler(item)"
						></div>
						<div class="link-video-history-btn"></div>
					</div>
				</div>
				<Button 
					type="text"
					icon="android-more-vertical"
					style="fontSize: 30px; color:#fff; position: absolute; right: 0; top: 0;"
					@click="showToolHandler(index)"
				>
				</Button>
			</div>
		</div>
		<Page 
			:total="videoListTotal" 
			size="small"
			:page-size=15
			simple
			@on-change="pageChangeHandler"
			style="textAlign: center; width: 250px; background: transparent;"	
		></Page>
	</div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
				map: null,
				selfSocket: null,
				videoList: [],
				videoListTotal: 0,
				currIndex: null
            }
        },
        methods: {
			getVideoData (url) {
				return new Promise((resolve, reject) => {
					fetch(url, {
						methods: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						}
					})
						.then(res => res.json())
						.then(res => {
							console.log(res)
							this.videoList = res.rows;
							this.videoListTotal = res.records;
							resolve(res);
						})
						.catch(e => {
							console.log(e)
						})
				})
			},
			showToolHandler (index) {
				console.log(index)
				this.currIndex = index;
			},
			callVideoHandler (item) {
				localStorage.setItem('videoUserName', item.mobileNumber);
				Link.callvideo()
			},
			pageChangeHandler (page) {
				console.log(page);
				let url = '/gridPersonCon/gridPersonList.action?gridPerson.isDeleted=0&page=' + page;
				this.getVideoData(url);
				if (ol) {
					var geoJsonLayer = new ol.layer.Vector({
						title: 'add Layer',
						source: new ol.source.Vector({
							projection: 'EPSG:4326',
							url: '/gridPersonCon/gridPersonVOList.action?gridPerson.isDeleted=0&page=' + page,
							format: new ol.format.GeoJSON()
						}),
						style: new ol.style.Style({
							image: new ol.style.Icon(({
								src: 'static/img/marker.png'
							}))
						})
					});
					this.map.addLayer(geoJsonLayer);
				}
				
			},
            initMap () {
                var container = document.getElementById('popup');
				var content = document.getElementById('popup-content');
				var closer = document.getElementById('popup-closer');

				var overlay = new ol.Overlay({
					element: container,
					autoPan: true,
					autoPanAnimation: {
						duration: 250
					}
				});


				/**
				 * Add a click handler to hide the popup.
				* @return {boolean} Don't follow the href.
				*/
				closer.onclick = function() {
					overlay.setPosition(undefined);
					closer.blur();
					return false;
				};



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
								name: "中国影像1-4级",
								url: "http://t{0-6}.tianditu.com/img_c/wmts",
								layer: "img",
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
								name: "中国影像注记1-4级",
								url: "http://t{0-6}.tianditu.com/cia_c/wmts",
								layer: "cia",
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
								name: "山东影像15-17级",
								url: "http://www.sdmap.gov.cn/tileservice/SdRasterPubMap",
								layer: "sdimg2017",
								style: "default",
								matrixSet: "img2017",
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
								name: "山东影像注记15-17级",
								url: "http://www.sdmap.gov.cn/tileservice/SDRasterPubMapDJ",
								layer: "sdcia",
								style: "default",
								matrixSet: "sdcia",
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
					overlays: [overlay],
					target: "map",
					view: new ol.View({
						center: [116.254637, 36.34119],
						projection: projection,
						zoom: 14,
						maxZoom: 17,
						minZoom: 1
					})
				});
				this.map = map;

				//geojson marker样式定义
				var iconStyle = new ol.style.Style({
					image: new ol.style.Icon(({
						src: 'static/img/marker.png'
					}))
				});

				//加载geojson数据
				var geoJsonLayer = new ol.layer.Vector({
					title: 'add Layer',
					source: new ol.source.Vector({
						projection: 'EPSG:4326',
						url: '/gridPersonCon/gridPersonVOList.action?gridPerson.isDeleted=0',
						format: new ol.format.GeoJSON()
					}),
					style: iconStyle
				});
				map.addLayer(geoJsonLayer);

				/**
				 * Add a click handler to the map to render the popup.
				*/
				map.on('singleclick', function(evt) {
					var pixel = map.getEventPixel(evt.originalEvent);
					var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
						return feature;
					});
					var coordinate = evt.coordinate;
					//hms;坐标;
					var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
						coordinate, 'EPSG:3857', 'EPSG:4326'));

					if (feature !== undefined) {
						$('.ol-popup').show()
						console.log(feature.get('mobileNumber'));
						localStorage.setItem('videoUserName', feature.get('mobileNumber'));
						// content.innerHTML = '<p style="width: 100%;height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">'+
						// feature.get('name')+'</p><div><div class="fl"></div></div>';
						content.innerHTML = [
							'<div class="video-chat-cont">',
								'<div class="info-cont">',
									'<img src="./static/img/001.png" width="50" height="50" ／>',
									'<div class="info-body">',
										'<h3 style="margin-bottom: 15px;">'+feature.get('name')+'</h3>',
										'<p>电话：'+feature.get('mobileNumber')+'</p>',
										'<p style="margin-bottom: 20px;"></p>',
									'</div>',
								'</div>',
								'<div class="tools-cont">',
									'<span class="link-video-call-btn">呼叫</span>',
								'</div>',
							'</div>'

						].join('');
					} else {
						// content.innerHTML = '<p style="width: 100%;padding-left: 10px; height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">预警名称</p><div><div class="fl" style="height:64px;"></div></div>';
						content.innerHTML = '';
						$('.ol-popup').hide()
					}
					overlay.setPosition(coordinate);
				});

				/**
				 * 画图代码
				*/
				var fStyle1 = new ol.style.Style({ //图形样式
					fill: new ol.style.Fill({
						color: 'red'
					}),
					stroke: new ol.style.Stroke({
						color: 'red',
						width: 2
					}),
					image: new ol.style.Circle({
						radius: 7,
						fill: new ol.style.Fill({
							color: 'red'
						})
					})
				});


				var szDrawLayer = new ol.layer.Vector({
					source: new ol.source.Vector()
				});


				var center_x = 118.8683;
				var center_y = 28.9385;
				//圆形,中心点和半径  
				var centerPt = [center_x, center_y];
				var cricle = new ol.geom.Circle(centerPt, 0.01);

				var feature = new ol.Feature({
					geometry: cricle,
					labelPoint: centerPt,
					name: '画了个圆'
				});
				var s = new ol.style.Style({
					fill: new ol.style.Fill({
						color: 'rgba(0, 0, 255, 0.1)'
					}),

				});
				feature.setStyle(s);
				szDrawLayer.getSource().addFeature(feature); //地图添加图形

				map.addLayer(szDrawLayer);



			}
				
        },
        mounted () {
			this.getVideoData('/gridPersonCon/gridPersonList.action?gridPerson.isDeleted=0')
			this.initMap();
			let _jqueryScript = document.createElement('script');
			let _socketScript = document.createElement('script');
			let _momentScript = document.createElement('script');
			let _initVideoChatScript = document.createElement('script');
			_jqueryScript.src = './static/js/jquery-2.1.3.min.js';
			_socketScript.src = './static/js/socket.io/socket.io.js';
			_momentScript.src = './static/js/moment.min.js';
			_initVideoChatScript.src = './static/js/initVideoChat.js';
			document.body.appendChild(_socketScript);
			document.body.appendChild(_momentScript);
			document.body.appendChild(_jqueryScript);
			setTimeout(() => {
				document.body.appendChild(_initVideoChatScript);
			}, 2000)
			
        }
    }
</script>
<style scoped>
	@import './layout.scss';
	/*滚动条整体部分,必须要设置*/
	::-webkit-scrollbar{
	width: 3px;
	height: 5px;
	background-color: #f1f1f1;
	}
	/*滚动条的轨道*/
	::-webkit-scrollbar-track{
	box-shadow: inset 0 0 5px rgba(0,0,0,.3);
	background-color: #f1f1f1;
	}
	/*滚动条的滑块按钮*/
	::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background-color: #2d8cf0;
	box-shadow: inset 0 0 5px #ddd;
	}
	/*滚动条的上下两端的按钮*/
	::-webkit-scrollbar-button{
	height: 10px;
	background-color: #B0AEDA;
	}
    #videoCall{
        width: 100%;
		height: 100%;
		position: relative;
    }
    #map{
        width: 100%;
        height: 100%;
	}
	.ol-popup-closer:after{
		color: #fff;
	}
	.ol-popup{
		height: 160px;
		display: flex;
		background: rgba(0, 0, 0, .7);
	}
	.popup-content{
		width: 100%;
		height: 100%;
	}
	.video-list{
		width: 236px;
		height: 500px;
		padding-bottom: 30px;
		position: absolute;
		right: 0px;
		top: 0;
		background: rgba(0, 0, 0, .7);
		color: #ddd;
	}
	.video-list-cont{
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}
	.info-cont img{
		width: 50px;
		margin: 0 10px;
	}
	.info-cont .info-body{
		flex: 1;
	}
	.video-item h3, .video-item p {
		color: #ddd;
	}
	.video-item h3{
		margin: 10px 0 0 !important;
	}
	.video-chat-tool{
		display: flex;
		justify-content: space-around;
		background-color: rgba(0,0,0,.2);
		padding-bottom: 10px;
	}
	.link-phone-call-btn{
		margin-left: 20px;
		border: none;
		background: url(./img/phone.png) no-repeat center center;
		background-color: #19be6b;
	}
	.link-video-history-btn{
		margin-right: 20px;
		background: url(./img/history.png) no-repeat center center;
	}
	.link-video-call-btn{
		background: url(./img/video.png) no-repeat center center;
	}
	.link-video-call-btn, .link-video-history-btn{
		background-color: transparent;
	}
	
</style>
<style>
	.video-chat-cont{
		width: 100%;
		height: 100%;
	}
	.info-cont{
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #fff;
		border-bottom: 1px solid #fff;
	}
	.tools-cont{
		text-align: center;
	}
	.link-video-call-btn, .link-phone-call-btn, .link-video-history-btn{
		margin-top: 10px;
		display: inline-block;
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #fff;
		color: #fff;
		cursor: pointer;
		background: #19be6b;
	}
	#videoLoadMask{
		width: 300px;
		height: 260px;
		background-color: rgba(0, 0, 0, .8);
		position: fixed;
		top: calc( 50% - 130px );
		left: calc( 50% - 150px );
		border-radius: 10px;
		display: none;
	}
	.link-close-btn{
		display: block;
		text-align: center;
		width: 80px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		border-radius: 8px;
		background: red;
		color: #fff;
		margin: 20px auto 0;
		cursor: pointer;
		user-select: none;
	}
</style>


