import axios from 'axios'
export default {
	name: '',
	data () {
		return {
			map: null,
			msg: '点位锁定'
		}
	},
	methods: {
		initMap () {
			const _this = this;
			var _map_center = [116.254637, 36.34119];
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
					center: _map_center,
					projection: projection,
					zoom: 15,
					maxZoom: 17,
					minZoom: 1
				})
			}); 
      

      function getStyle() {
          return function(feature, resolution) {
              var type = feature.get("bind");
              return new ol.style.Style({
                  image: new ol.style.Icon(({
                      src: 'static/img/'+( type == 0 ? 'point-unlock' : 'point-locked' )+'.png'
                  }))
              });
          }
      }


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
        style: getStyle()
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
        var hdms = ol.coordinate.toStringHDMS(coordinate);

        if (feature !== undefined) {   
            //得到要素的点坐标
            console.log('map click')
            console.log(feature.get('type'))
            var coordinate=feature.getGeometry().getCoordinates();       
            // content.innerHTML = '<p>名称:' + feature.get('name') + '</p><p>地址:' + feature.get('address') + '</p><p>placeName:' + feature.get('placeName') + '</p>';
            // overlay.setPosition(coordinate);
            // feature.set('bind', !feature.get('bind'));
            console.log(feature.get('id'))
            console.log(feature.get('bind'))
            var _id = feature.get('id');
            var _bind = feature.get('bind');
            _this.$Modal.confirm({
              title: 'Title',
              content: '<p>确认切换点位解锁／加锁状态？</p>',
              loading: true,
              onOk: () => {
                axios.get('/cameraInfosmanagment/lockCameraInfo.action?cameraInfo.bind=' + (_bind == 1 ? 0 : 1) + '&cameraInfo.id=' + _id)
                  .then(res => {
                    console.log(res);
                    if (!res.data.errorCode) {
                      feature.set('bind', (_bind == 1 ? 0 : 1));
                      _this.$Modal.remove();
                      _this.$Message.success('切换成功!');
                    }else {
                      _this.$Message.error('切换失败!');
                      _this.$Modal.remove();
                    }
                  })
              }
            });
        } else {
          
            //content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code><p>这里是大海！</p>';
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