import axios from 'axios'
export default {
	name: '',
	data () {
		return {
			map: null,
			msg: '点位浏览'
		}
	},
	methods: {
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
					console.log(feature.get('id'));
					const _id = feature.get('id');
					localStorage.setItem('videoUserName', feature.get('mobileNumber'));
					// content.innerHTML = '<p style="width: 100%;height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">'+
					// feature.get('name')+'</p><div><div class="fl"></div></div>';
					axios.get('/cameraPermissionManage/lookByUsers.action?id=' + _id)
						.then(res => {

							let userList = '<p class="look-user-list"><span>姓名</span><span>职务</span><span>联系电话</span><span>最近查看时间</span></p>';
							console.log(Object.prototype.toString.call(res))
											if (Object.prototype.toString.call(res.data) == '[object Array]') {
												res.data.map(i => {
								userList += [
									'<p class="look-user-list">',
									'<span>' + i.proposer + '</span>',
									'<span>' + i.position + '</span>',
									'<span>' + i.telephone + '</span>',
									'<span>' + i.updateDate + '</span>',
									'</p>'
								].join('')
								})
							console.log(userList)
							}
              

							content.innerHTML = [
								'<div class="video-chat-cont">',
									'<div class="info-cont">',
										'<div class="info-body" style="color: #fff;">',
											'<p>点位名称:' + feature.get('name') + '</p>',
											'<p>设备类型： 一体机</p>',
											'<p>状态： 锁定</p>',
											userList,
											'<p style="margin-bottom: 0px;"></p>',
										'</div>',
									'</div>',
									'<div class="tools-cont">',
										'<span class="link-video-call-btn">呼叫</span>',
									'</div>',
								'</div>'
		
							].join('');
							$('.ol-popup').show();
							overlay.setPosition(coordinate);
							
						})
				} else {
					// content.innerHTML = '<p style="width: 100%;padding-left: 10px; height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">预警名称</p><div><div class="fl" style="height:64px;"></div></div>';
					content.innerHTML = '';
					$('.ol-popup').hide()
				}
			});
		}
	},
	mounted () {
		this.initMap();
		let _jqueryScript = document.createElement('script');
		let _socketScript = document.createElement('script');
		let _momentScript = document.createElement('script');
		_jqueryScript.src = './static/js/jquery-2.1.3.min.js';
		_socketScript.src = './static/js/socket.io/socket.io.js';
		_momentScript.src = './static/js/moment.min.js';
		document.body.appendChild(_socketScript);
		document.body.appendChild(_momentScript);
		document.body.appendChild(_jqueryScript);
	}
}