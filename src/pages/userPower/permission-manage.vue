<template>
  <div v-if="mModel">
    <Card
    style="position: fixed; top: 10%; left: 20%; right: 20%; bottom: calc( 10% + 40px ); overflowY: auto;zIndex: 10009;"
  >
    <p slot="title">{{currStatusTitle}}</p>
    <div style="height: auto;">
      <Row style="marginBottom: 15px;">
        <Col span="4" style="lineHeight: 32px;">角色名称:</Col>
        <Col span="16">
          <Input v-model="username"></Input>
        </Col>
      </Row>
      <Row style="marginBottom: 15px;">
        <Col span="4" style="lineHeight: 32px;">选择点位:</Col>
        <Col span="16">
          <Cascader 
            :data="orgManageList2" 
            :load-data="loadOrgManageData2"
            v-model="default1" 
            @on-change="chooseOrgManageHandler2" 
            change-on-select
            placeholder="请先选择组织机构"
          ></Cascader>
        </Col>
        <!-- <Col span="10">
          <Input 
            icon="ios-search"
            v-model="searchForListModel2" 
            :disabled="canSearchForList2"
            @on-click="searchForListHandler2"
            placeholder="点位名称/点位位置">
            <span slot="prepend">输入搜索：</span>
          </Input>
        </Col> -->
      </Row>
      <Row v-show="showManageList" style="marginBottom: 15px;">
        <Col span="20" push="4">
          <Tabs @on-click="changeTabs" v-model="currActiveName">
            <TabPane label="列表模式" name=0 style="height: 250px;">
              <Transfer
                :data="pointList2"
                :target-keys="pointTargetKeys"
                @on-change="pointChangeHandler"></Transfer>
            </TabPane>
            <TabPane label="地图模式" name=1 style="height: 250px;">
              <div id="map-cont" class="map-cont" :style="{'height': mapHeight + 'px'}"></div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row style="marginBottom: 15px;">
        <Col span="4" style="lineHeight: 32px;">选择人员:</Col>
        <Col span="16">
          <Cascader 
            :data="orgManageList3" 
            :load-data="loadOrgManageData2"
            v-model="default2" 
            @on-change="chooseOrgManageHandler3" 
            change-on-select
            placeholder="请先选择组织机构"
          ></Cascader>
        </Col>
        <!-- <Col span="10">
          <Input 
            icon="ios-search"
            v-model="searchForListModel3" 
            :disabled="canSearchForList3"
            @on-click="searchForListHandler3"
            placeholder="输入姓名查询">
            <span slot="prepend">输入搜索：</span>
          </Input>
        </Col> -->
      </Row>
      <Row v-show="showUserList" style="marginBottom: 15px;">
        <Col span="20" push="4">
          <Transfer
            :data="userList"
            :target-keys="userTargetKeys"
            @on-change="userChangeHandler"></Transfer>
        </Col>
      </Row>
      <Row style="marginBottom: 15px;">
        <Col span="4" style="lineHeight: 32px;">点位权限:</Col>
        <Col span="20">
          <RadioGroup 
            v-model="permissionTypeModel"
            style="height: 32px;lineHeight: 32px;">
            <Radio label="实时监控"></Radio>
            <Radio label="视频回放"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row style="marginBottom: 15px;">
        <Col span="4" style="lineHeight: 32px;">描述:</Col>
        <Col span="16">
          <Input v-model="permissionSketch"></Input>
        </Col>
      </Row>
    </div>
    
  </Card>
  <div style="position: fixed;  left: 20%; right: 20%;bottom: 10%;z-index: 10009;height: 50px;background: #fff; text-align: right;">
      <Button 
        @click="cancelHandler"
        style="marginRight: 10px;"
        >取消</Button>
      <Button 
        @click="newPermissionHandler"
        type="primary"
        style="marginRight: 15px;"
        >确认</Button>
    </div>
  <Card 
    style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,.5);zIndex: 10002;border: none;">

  </Card>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: {
      currStatusTitle: {require: true, type: String},
      closeNewPermissionModal: {require: true, type: Function},
      currUserInfo: {type: Object},
      currOrgManageId: {require: true}
    },
    data () {
      return {
        mModel: false,
        currActiveName: 0,
        currUserId: null,
        defaultOrgId2: 1,
        username: '', // 角色名称
        orgManageList2: [], // 组织机构选择列表数据
        currOrgManageId2: null, // 点位-当前选择组织机构ID
        canSearchForList2: true, // 是否可以搜索
        searchForListModel2: '', // 搜索值
        showManageList: false, // 是否显示点位列表穿梭框
        pointList2: [], // 点位穿梭框
        pointTargetKeys: [], // 已选择点位穿梭框
        userList: [], // 人员穿梭框
        userTargetKeys: [], // 已选择人员穿梭框
        orgManageList3: [], // 人员-组织机构选择列表数据
        searchForListModel3: '', // 人员-搜索值
        canSearchForList3: true, // 人员-禁止输入搜索
        showUserList: false, // 人员-穿梭框显示
        currOrgManageId3: null, // 人员-组织机构id
        permissionTypeModel: '',
        permissionType: 0, // 点位权限
        permissionSketch: '', // 描述
        map: null, // 地图
        drawAreaData: null, // 圈选范围对象
        mapHeight: 250,
        default1: null,
        default2: null,
        vector: null // 地图绘制多边形
      }
    },
    watch: {
      permissionTypeModel (newVal, oldVal) {
        console.log(newVal);
        if (newVal == '实时监控') {
          this.permissionType = 0;
        } else if (newVal == '视频回放') {
          this.permissionType = 1;
        }
      },
      currUserInfo (newVal) {
        console.log('currUserInfo', newVal)
        if (newVal) {
          console.log(newVal);
          this.currUserId = newVal.id;
          this.username = newVal.permissionName;
          this.permissionType = newVal.permissionType;
          this.permissionSketch = newVal.permissionSketch;
          this.currOrgManageId3 = newVal["organization"]["id"] || null;
          this.permissionTypeModel = newVal.permissionType == 0 ? '实时监控' : '视频回放';
          this.pointTargetKeys = [];
          this.userTargetKeys = [];
          this.drawAreaData = null;
        }
      },
      mModel (newVal) {
        console.log('currUserInfo', newVal)
        const _this = this;
        // if (newVal == '新增权限') {
          this.currUserId = null;
          this.username = '';
          this.permissionSketch = '';
          this.permissionType = 0;
          this.permissionTypeModel = '实时监控';
          this.drawAreaData = null;
          this.default1 = [_this.currOrgManageId];
          this.default2 = [_this.currOrgManageId];
        // }else {

        // }
        this.currActiveName = 0;
        this.showManageList = false;
        this.showUserList = false;
        this.pointTargetKeys = [];
        this.userTargetKeys = [];
        if (this.vector) {
          this.vector.getSource().clear(true);
        }
      },
      currOrgManageId (newVal) {
          const _this = this;
          _this.orgManageList2 = [];
          _this.orgManageList3 = [];
          if (newVal) {
            axios.get('/sysadmin/orgManage/ajaxOrgsForExtTree.action?parentId=' + newVal )
            // axios.get('/static/data/orgManageList.json')
              .then(res => {
                if (res.data && Object.prototype.toString.call(res.data) == '[object Array]') {
                  res.data.map((i, index) => {
                    if (i.leaf == false) {
                      _this.orgManageList2.push({
                        value: i.id,
                        label: i.text,
                        children: [],
                        loading: false
                      });
                      _this.orgManageList3.push({
                        value: i.id,
                        label: i.text,
                        children: [],
                        loading: false
                      })
                    } else {
                      _this.orgManageList2.push({
                        value: i.id,
                        label: i.text
                      });
                      _this.orgManageList3.push({
                        value: i.id,
                        label: i.text
                      })
                    }
                  })
                } 
              })
              .catch(err => {
                console.log(err);
                _this.$Message.error('获取组织机构列表失败！')
              })
          }
        }
    },
    methods: {
      initOrgManageData () {
        const _this = this;
        _this.orgManageList = []; // TODO ?
        console.log('get org id default:', this.defaultOrgId2)
        console.log('get org id parent:', this.currOrgManageId)
        axios.get('/sysadmin/orgManage/ajaxOrgsForExtTree.action?parentId=' + 1 )
        // axios.get('/static/data/orgManageList.json')
          .then(res => {
            if (res.data && Object.prototype.toString.call(res.data) == '[object Array]') {
              res.data.map((i, index) => {
                if (i.leaf == false) {
                  _this.orgManageList2.push({
                    value: i.id,
                    label: i.text,
                    children: [],
                    loading: false
                  });
                  _this.orgManageList3.push({
                    value: i.id,
                    label: i.text,
                    children: [],
                    loading: false
                  })
                } else {
                  _this.orgManageList2.push({
                    value: i.id,
                    label: i.text
                  });
                  _this.orgManageList3.push({
                    value: i.id,
                    label: i.text
                  })
                }
              })
            } 
          })
          .catch(err => {
            console.log(err);
            _this.$Message.error('获取组织机构列表失败！')
          })
      },
      loadOrgManageData2 (item, callback) {
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
                } else {
                  item.children.push({
                    value: i.id,
                    label: i.text
                  })
                }
              })
              item.loading = false;
              callback();
            }
          })
      },
      chooseOrgManageHandler2 (val, selected) {
        // 点位 穿梭框显示
        this.canSearchForList2 = false;
        this.showManageList = true;
        // 人员 穿梭框隐藏
        this.showUserList = false;
        console.log('test:', val)
        this.currOrgManageId2 = val[val.length - 1];
        if (!selected[0]) {
          this.canSearchForList2 = true;
          this.showManageList = false;
          return;
        }
        // axios.get('/cameraInfosmanagment/getInfo.action?page=1&rows=15&organization=' + val[val.length-1])
        axios.get('/cameraInfosmanagment/getInfo.action?page=1&rows=100&organization=' + val[val.length-1])
          .then(res => {
            console.log('获取摄像头点位列表',res);
            this.pointList2 = [];
            if(Object.prototype.toString.call(res.data) == '[object Array]') {
              res.data.map((i, index) => {
                this.pointList2.push({
                  key: i.id,
                  label: i.name
                })
              });
            }
          })
      },
      newPermissionHandler () {
        const _this = this;
        const _params = {
          permissionName: _this.username,
          permissionSketch: _this.permissionSketch,
          cameras: _this.pointTargetKeys,
          users: _this.userTargetKeys,
          permissionType: _this.permissionType,
          currOrgManageId: _this.currOrgManageId
        };
        let _query = [];
        _query.push( 'cameraPermission.organization.id=' + _this.currOrgManageId);
        _query.push( 'cameraPermission.permissionName=' + _this.username );
        _query.push('cameraPermission.permissionSketch=' + _this.permissionSketch);
        _query.push('cameraPermission.permissionType=0');
        _this.pointTargetKeys.map(i => {
          _query.push('cameraPermission.cameras=' + i);
        });

        _this.userTargetKeys.map(i => {
          _query.push('cameraPermission.users=' + i);
        });

        if (_this.drawAreaData) {
          const _points = _this.drawAreaData["features"][0]["geometry"]["coordinates"][0];
          _points.map(i => {
            _query.push('cameraPermission.cameras=' + i[0] + ' ' + i[1]);
            
          })
        }
        let _queryStr = _query.join('&');
        console.log(_queryStr);
        // return
        if (!this.currUserId) {
          axios.get('/cameraPermissionManage/maintainCameraPermission.action?' + _queryStr)
            .then(res => {
              console.log(res);
              if(res.data.id) {
                //添加到列表中
                _this.$emit('updateList');
                _this.$Message.success('保存成功！');
              }
            })
            .catch(e => {
              console.log(e);
                _this.$Message.error('保存失败！');
              
            })
        } else {
          axios.get('/cameraPermissionManage/maintainCameraPermission.action?' + _queryStr + '&cameraPermission.id='+ _this.currUserId)
            .then(res => {
              console.log(res);
              if(res.data.id) {
                //添加到列表中
                _this.$emit('updateList');
                _this.$Message.success('保存成功！');
                
              }
            })
            .catch(e => {
              console.log(e)
                _this.$Message.error('保存失败！');
              
            })
        }
        this.mModel = false;
        this.map = null;
        if (this.vector) {
          this.vector.getSource().clear(true);
        }

      },
      cancelHandler () {
        this.mModel = false;
        this.map = null;
        if (this.vector) {
          this.vector.getSource().clear(true);
        }
      },
      searchForListHandler2 () {
      },
      pointChangeHandler (newTargetKeys, direction, moveKeys) {
        this.pointTargetKeys = newTargetKeys;
      },
      chooseOrgManageHandler3 (val, selected) {
        const _this = this;
        console.log(val)
        this.canSearchForList3 = false;
        // 点位 穿梭框隐藏
        this.showManageList = false;
        // 人员 穿梭框显示
        this.showUserList = true;
        
        this.currOrgManageId3 = val[val.length - 1];
        if (!selected[0]) {
          this.canSearchForList3 = true;
          this.showUserList = false;
          return;
        }
        axios.get('/patrolManage/findUsers.action?page=1&rows=100&organizationId=' + val[val.length-1])
          // axios.get('./static/data/personList.json')
          .then(res => {
            console.log('获取人员列表',res);
            _this.userList = [];
            if(Object.prototype.toString.call(res.data.rows) == '[object Array]') {
              res.data.rows.map((i, index) => {
                _this.userList.push({
                  key: i.id,
                  label: i.name
                })
              });
            }
          })
      },
      searchForListHandler3 () {
        const _this = this;
        const _queryName = this.searchForListModel3;
        if (_queryName) {
          axios.get('/cameraPermissionManage/findCameraPermissionPage.action?cameraPermission.organization.id=' + _this.currOrgManageId3 + '&page=1&rows=15&cameraPermission.permissionName=' + _queryName)
            .then(res => {
              console.log(res);
              if (res.data.rows) {
                this.userList = res.data.rows;
              }
            })
        } else {
          axios.get('/patrolManage/findUsers.action?page=1&rows=15&organizationId=' + val[val.length-1])
          // axios.get('./static/data/personList.json')
          .then(res => {
            console.log('获取人员列表',res);
            _this.userList = [];
            if(Object.prototype.toString.call(res.data.rows) == '[object Array]') {
              res.data.rows.map((i, index) => {
                _this.userList.push({
                  key: i.id,
                  label: i.name
                })
              });
            }
          })
        }
      },
      userChangeHandler (newTargetKeys, direction, moveKeys) {
        this.userTargetKeys = newTargetKeys;
      },
      changeTabs (name) {
        if (name == 1 && !this.map ) {
          const HEIGHT = document.body.clientHeight;
          this.mapHeight = HEIGHT - 450;
          this.initMap();
          this.pointTargetKeys = [];
        }
        if (name == 0 && this.map) {
          this.drawAreaData = null;
        }
      },
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
        _this.vector = vector;

				var modify = new ol.interaction.Modify({ source: source });
				map.addInteraction(modify);

				var draw, snap, data; // global so we can remove them later

				function addInteractions() {
						draw = new ol.interaction.Draw({
								source: source,
								type: 'Polygon'
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
								console.log(JSON.stringify(data, null, 4));
                _this.drawAreaData = JSON.parse(data);
						});
						snap = new ol.interaction.Snap({ source: source });
						map.addInteraction(snap);
				}


				addInteractions();
				_this.map = map;
      }
    },
    created () {
      const _orgId = this.currOrgManageId;
      this.default1 = [_orgId];
      this.default2 = [_orgId];
      this.currOrgManageId2 = _orgId * 1;
      this.currOrgManageId3 = _orgId * 1;
      this.initOrgManageData()
    },
    mounted () {

    },
    beforeDestroy () {
      if (this.map) {
        this.map = null;
      }
      if (this.vector) {
        this.vector.getSource().clear(true);
      }
    }
  }
</script>

<style lang="scss">
  .map-cont{
    width: 100%;
    height: 100%;

  }
</style>

