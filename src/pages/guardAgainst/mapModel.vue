<template>
  <Row :style="{height: '250px'}">
    <Col span="8">
      <Table 
        :data="pointList"
        :columns="pointColumns"
        height="270"
      >

      </Table>
    </Col>
    <Col span="16">
			<div class="point-list" id="point-list" v-show="pointListData.length > 0">
				<div class="point-list-item" v-for="(point, index) in pointListData" :key="index">
					<Row>
						<Col span="18">
							<p>{{point.properties.name}}</p>
						</Col>
						<Col span="6">
							<Button 
								type="primary"
								@click="addPointFromMapHandler(point)"
								:style="{position: 'absolute', right: '5px'}"
								size="small">+</Button>
						</Col>
					</Row>
					
				</div>
			</div>
      <div class="map-cont" id="map-cont" style="height: 270px">

      </div>
    </Col>
    
  </Row>
</template>
<script>
import axios from 'axios'
  export default {
		props: {
			updateVideoPointList: {type: Function}
		},
    data () {
      return {
        pointList: [],
        pointColumns: [{
          title: '走访点',
          key: 'placeName'
        }, {
          title: '任务要点',
          key: 'sketch'
        }, {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h,params) => {
						const _this = this;
            return h('div', [
              h('Button', {
                props: {type: 'text', size: 'small'},
                style: {marginRight: '5px'},
                on: {
                  click: () => {
										console.log(params)
										let _tempSketch = params.row.sketch
										this.$Modal.confirm({
											title: '编辑',
											render: (h) => {
												return h('div', [
													h('Input', {
														props: {
															value: params.row.placeName,
															disabled: true
														},
														style: {
															marginBottom: '10px'
														}
													}),
													h('Input', {
														props: {
															value: params.row.sketch,
															placeholder: '请输入任务要点'
														},
														on: {
															input: (val) => {
																_tempSketch = val
															}
														}
													})
												])
											},
											onOk: () => {
												params.row.sketch = _tempSketch
											}
										})
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {type: 'text', size: 'small'},
                on: {
                  click: () => {
										console.log(params)
										console.log(_this.pointList)
										_this.pointList.map((i, index) => {
											if (params.row.placeName == i.placeName) {
												_this.pointList.splice(index, 1)
												console.log(_this.pointList)
											}
										})
                  }
                }
              }, '删除')
            ])
					}
				}],
				pointListData: [],
				map: null,
				center: [], // 绘制中心点
				radius: 0, // 绘制半径
      }
    },
		watch: {
			pointList (newVal) {
				console.log('pointList', newVal)
				this.$emit('updateVideoPointList', newVal)
			}
		},
    methods: {
      initMap () {
        const _this = this;
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

				// //加载geojson数据
				// var geoJsonLayer = new ol.layer.Vector({
				// 	title: 'add Layer',
				// 	source: new ol.source.Vector({
				// 		projection: 'EPSG:4326',
				// 		url: '/cameraInfosmanagment/getInfoForGIS.action?page=1&rows=15',
				// 		// url: '/static/data/test.geojson',
				// 		format: new ol.format.GeoJSON()
				// 	}),
				// 	style: iconStyle
				// });
				// map.addLayer(geoJsonLayer);

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
        _this.vector = vector;

				var modify = new ol.interaction.Modify({ source: source });
				map.addInteraction(modify);

				var draw, snap, data, geoJsonLayer; // global so we can remove them later

				function addInteractions() {
						draw = new ol.interaction.Draw({
								source: source,
								type: 'Circle'
						});
            map.addInteraction(draw);
            draw.on('drawstart', function(event) {
							map.removeLayer(geoJsonLayer)
              vector.getSource().clear(true);
            })
            //获取绘制图形坐标点
						draw.on('drawend', function(event) {
							_this.getPointListData();
							var format = new ol.format['GeoJSON']();
							var feature = event.feature.clone();
							// console.log(feature.getGeometry().getCenter())
							_this.center = feature.getGeometry().getCenter();
							feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
							data = format.writeFeatures([feature]);
							// console.log(JSON.stringify(data, null, 4));
							_this.drawAreaData = JSON.parse(data);
							// console.log('featur:', feature)
							// var meterPerUnit = map.getView().getProjection().getMetersPerUnit();
							// console.log( feature.getGeometry().getRadius())
							_this.radius = feature.getGeometry().getRadius();
							//加载geojson数据
							geoJsonLayer = new ol.layer.Vector({
								title: 'add Layer',
								source: new ol.source.Vector({
									projection: 'EPSG:4326',
									url: '/patrolManage/inPoints.action?lon='+_this.center[0]+'&lat='+_this.center[0]+'&r='+_this.radius,
									// url: '/static/data/test.geojson',
									format: new ol.format.GeoJSON()
								}),
								style: iconStyle
							});
							map.addLayer(geoJsonLayer);
						});
						snap = new ol.interaction.Snap({ source: source });
						map.addInteraction(snap);
				}


				addInteractions();
				_this.map = map;
			},
			getPointListData () {
				const _this = this;
				axios.get('/patrolManage/inPoints.action?lon='+_this.center[0]+'&lat='+_this.center[0]+'&r='+_this.radius)
				// axios.get('/static/data/test.geojson')
					.then(res => {
						console.log(res)
						if (res.data && res.data.features) {
							_this.pointListData = res.data.features
						}
					})
			},
			addPointFromMapHandler (point) {
				console.log(point)
				const _placeName = point.properties.name
				let _sketch = ''
				this.$Modal.confirm({
					title: '添加监控点',
					render: (h) => {
						return h('div', [
							h('Input', {
								props: {
									value: _placeName,
									disabled: true
								},
								style: {
									marginBottom: '10px'
								}
							}),
							h('Input', {
								props: {
									value: _sketch,
									placeholder: '请输入任务要点'
								},
								on: {
									input: (val) => {
										_sketch = val
									}
								}
							})
						])
					},
					onOk: () => {
						this.pointList.push({
							placeName: _placeName,
							sketch: _sketch
						})
					}
				})
			}
    },
    mounted () {
      this.initMap()
    }
  }    
</script>
<style>
	.point-list{
		width: 180px;
		height: 80%;
		position: absolute;
		left: 0;
		top: 0;
		background: #f1f1f1;
		z-index: 10001;
		overflow-y: auto;
		border-top: 1px solid #f1f1f1;
	}
	.point-list-item{
		position: relative;
		background: #fff;
		box-shadow: 1px 1px 3px #ccc;
		margin-bottom: 5px;
		padding: 10px 0 10px 5px;
	}
</style>

