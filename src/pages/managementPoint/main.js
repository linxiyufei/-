
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
					zoom: 12,
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
					url: 'static/data/test.geojson',
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
								'<div class="info-body" style="color: #fff;">',
									'<p>点位名称' + feature.get('orginternalCode') + '</p>',
									'<p>设备类型： 一体机</p>',
									'<p>状态： 锁定</p>',
									'<p>网格员：'+feature.get('name')+'</p>',
									'<p>联系电话：'+feature.get('mobileNumber')+'</p>',
									'<p>最近查看时间：'+feature.get('originTime').replace('T', ' ')+'</p>',
									'<p style="margin-bottom: 0px;"></p>',
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