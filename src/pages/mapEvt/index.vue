
<template>
	<section>
		<div class="map_div page_map_evt">
      <Icon></Icon>
      <header class="map_header">
				<div class="fl input_div">
          <Input  icon="ios-search-strong"  style="width:180px"></Input>
				  <Button class="btn_sure" type="primary">定位</Button>
				</div>
				<div class="solve_div fl">
          <div class="fl solve">
            <span>待处理:</span>
            <span class="number_solve">145</span>
            <span>条</span>
          </div>
          <div class="line fl"></div>
          <div class="fl solve fsolve">
            <span>待处理:</span>
            <span class="number_solve">145</span>
            <span>条</span>
          </div>
				</div>
				<div class="fl time_div">
          <span>上报时段:</span>
          <span class="number_solve">2017/12/25</span>
          <span class="number_solve">08:00:00</span>
          <span>-</span>
          <span class="number_solve">当前时间</span>
          <span>条</span>
				</div>
				<div class="tools_icon">
          <div class="tools_ic fl">
            <RadioGroup v-model="compans">
					<Checkbox><span>网格员</span></Checkbox>
					<Checkbox><span>组织机构</span></Checkbox>			
					</RadioGroup>
					
					</div>
					<div class="mes_cion fl">
            <Icon type="android-notifications-none"></Icon>
            <span class="worming_icon">99+</span>
					</div>
				</div>
			</header>
      <div class="containers">
        <div class="map_div">
          <div id="map" class="map"></div>
          <div id="popup" class="ol-popup">
            <a href="javascript:;" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content" class="popup-content"></div>
          </div>
        </div>
        <div class="opacticy_div">
          <div class="header_top">
            <div class="intop">
              <span class="fl select_in">筛选</span>
              <div class="fr error_icon" @click="showMenu = !showMenu">
                <Icon :class="showMenu ? '' : 'hoverrotate'" type="close-circled"></Icon>
              </div>
              <!-- <Button
              @click="clickHandler">aniu</Button>
              <p>{{this.compans}}</p> -->
            </div>
          </div>
          <div class="main_box" v-if="showMenu">
            <div class="header_container">
              <Tabs value="name1" style="color:#fff;height:100%;">
                <TabPane label="预警类型" name="name1">
                  <div class="format_matting">
                    <span>选择你需要监听的预警类型</span>
                  </div>
                  <div class="checkbox_group">
                    <div>
                      <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                  <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox label="特殊人员外出"></Checkbox><br>
                    <Checkbox label="群体聚散"></Checkbox><br>
                    <Checkbox label="特殊人员聚散"></Checkbox><br>
                    <Checkbox label="敏感区域入侵"></Checkbox><br>
                    <Checkbox label="消防出入口堵占"></Checkbox><br>
                    <Checkbox label="报警类型"></Checkbox><br>
                    <Checkbox label="预警类型"></Checkbox><br>											
                  </CheckboxGroup>
                </div>
                </TabPane>
                <TabPane label="监测区域" name="name2">
                  <div class="format_matting">
                    <span>选择你需要监听的区域</span>
                  </div>
                  <div class="checkbox_groups">
                    <Cascader :data="data" v-model="value2" style="margin:15px 0;"></Cascader>
                    <Cascader :data="data" v-model="value3" style="margin:15px 0;"></Cascader>
                    <Cascader :data="data" v-model="value4" style="margin:15px 0;"></Cascader>
                  </div>
                  <p style="text-align:center;">-----------------或------------------</p>
                  <div class="adress_div">
                    <Input v-model="postalcode" placeholder="请输入邮政编码"></Input>
                  </div>
                </TabPane>
                <TabPane label="上报时间" name="name3">
                  <div class="format_matting">
                    <span>选择需要监听的预警时段</span>
                  </div>
                  <div class="checkbox_groups">
                    <RadioGroup v-model="vertical" vertical>
                      <Radio label="apple"><span>24h内</span></Radio>
                      <Radio label="android"><span>3天以内</span></Radio>
                      <Radio label="windows"><span>本周以内</span></Radio>
                      <Radio label="windowsv"><span>本月以内</span></Radio>
                      <Radio label="windowsb"><span>自定义时段</span></Radio>
                    </RadioGroup>
                    <div v-if="vertical=='windowsb'" class="checkbox_groupst" style="color:#000;">
                      <DatePicker v-model="starttime" type="datetime" placeholder="请选择起始时间"></DatePicker>
                    </div>
                    <div v-if="vertical=='windowsb'" class="checkbox_groupst" style="color:#000;">
                      <DatePicker v-model="endtime" type="datetime" placeholder="请选择结束时间"></DatePicker>
                    </div>
                  </div>
                </TabPane>
              </Tabs>   
            </div>
          </div>
          <div class="header_bottom" v-if="showMenu">
            <span>应用</span>
          </div>
        </div>
      </div>
		</div>
	</section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      vertical: "apple",
      compans: "网格员",
      map: null,
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      postalcode: "", //邮政编码
      value1: [],
      starttime: "",
      endtime: "",
      value2: [],
      value3: [],
      value4: [],
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ],
      showMenu: false
    };
  },

  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = [
          "特殊人员外出",
          "群体聚散",
          "特殊人员聚散",
          "敏感区域入侵",
          "消防出入口堵占",
          "报警类型",
          "预警类型"
        ];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    getData() {
      console.log("get data", this.compans);
    },
    clickHandler() {
      this.compans += "!";
    },
    initmap() {
      var _this = this;
      var container = document.getElementById("popup");
      var content = document.getElementById("popup-content");
      var closer = document.getElementById("popup-closer");

      var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      var ids, lat, lon,namev;

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
          zoom: 17,
          maxZoom: 17,
          minZoom: 1
        })
      });
      this.map = map;
      console.log(this.compans);
      //geojson marker样式定义
      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          src: "static/img/things.png"
        })
      });

      //加载geojson数据
      var geoJsonLayer = new ol.layer.Vector({
        title: "add Layer",
        source: new ol.source.Vector({
          projection: "EPSG:4326",
          url: "static/data/test.geojson",
          format: new ol.format.GeoJSON()
        }),
        style: iconStyle
      });
      map.addLayer(geoJsonLayer);

      /**
				 * Add a click handler to the map to render the popup.
				*/
      map.on("singleclick", function(evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var feature = map.forEachFeatureAtPixel(pixel, function(
          feature,
          layer
        ) {
          return feature;
        });
        var coordinate = evt.coordinate;
        //hms;坐标;
        // var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        // coordinate, 'EPSG:3857', 'EPSG:4326'));

        if (feature !== undefined) {
          //  var cameraInfo = feature.get('id');
          ids = feature.get("id");
          
          namev=feature.get('name');
          sessionStorage.setItem('namev',namev);
          console.log(feature.get("name"))

          //  if(_this.starttime==undefined ||_this.endtime==undefined){
          // 	  var starttime='';
          // 	  var endtime=''
          //  }else{
          // 	 var starttime =formatDate(_this.starttime).toString();
          // 	console.log(starttime)
          // 	var endtime =formatDate(_this.endtime).toString();
          //  }
          window.video = "";
          $.ajax({
            type: "get",
            url:
              "/fightOnMap/infoManage/getFightOnMapInfoByPointId.action?cameraInfo.id=" +
              feature.get("id"),
            success: function(data) {
              console.log(data,"vcvc")
              video = path + data.features[0].properties.videosrc;
              $("#bbb").attr("src", video);
              var lat = data.features[0].properties.lat;
              var lon = data.features[0].properties.lon;
              sessionStorage.setItem("lat", lon);
              sessionStorage.setItem("lon", lat);
            }
          });

          sessionStorage.setItem("id", ids);
          /*var point=feature.getGeometry().getCoordinates();
						 var lat=point[0];
						 var lon=point[1];
						 sessionStorage.setItem("id",ids)
						 sessionStorage.setItem("lat",lat)
             sessionStorage.setItem("lon",lon)*/
          const date = new Date(feature.get("createDate"))

          const formatTime = data => {
            return data > 9 ? data : '0' + data
          }
          const time =
            `${date.getFullYear()}/${formatTime(date.getMonth() + 1)}/${formatTime(date.getDate())} 
            ${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`
          content.innerHTML =
            `<p class="top_name">${feature.get("name")}</p>
            <div class="bnc">
              <div class="fl details">
                <p class="time">${time}</p>
                <a href="#/mapEvtInfo?id=${ids}" class="det">>>详情</a>
              </div>
              <div class="fl imgb_div">
                <img id="bbb" src="${video}" />
              </div>
            </div>`
          overlay.setPosition(coordinate);
        } else {
          content.innerHTML = '';
          overlay.setPosition(undefined);
        }
      });

      // function tqGetPointData(cameraInfo,starttime,endtime){
      // 		  sessionStorage.setItem("cameraInfos",cameraInfo)
      // 		  sessionStorage.setItem("starttimes",starttime)
      // 		  sessionStorage.setItem("endtimes",endtime)
      // 		  window.starttime=starttime;
      // 		  console.log(window.starttime)
      // 		  alert( sessionStorage.getItem(starttime))
      // 		//   sessionStorage.setItem("earlyWarningType",earlyWarningType)
      // 	  }
      //  function formatTen(num) {
      // 	return num > 9 ? (num + "") : ("0" + num);
      // 	}
      // function formatDate(date) {
      // var year = date.getFullYear();
      // var month = date.getMonth() + 1;
      // var day = date.getDate();
      // var hour = date.getHours();
      // var minute = date.getMinutes();
      // var second = date.getSeconds();
      // return year + "-" + formatTen(month) + "-" + formatTen(day);
      // }

      /**
				 * 画图代码
				*/
      var path =
        "/xueLiangBigScreen/resource/FOMimage/";
      var fStyle1 = new ol.style.Style({
        //图形样式
        fill: new ol.style.Fill({
          color: "red"
        }),
        stroke: new ol.style.Stroke({
          color: "red",
          width: 2
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: "red"
          })
        })
      });

      var szDrawLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
      });

      var center_x = 160.8683;
      var center_y = 30.9385;
      //圆形,中心点和半径
      var centerPt = [center_x, center_y];
      var cricle = new ol.geom.Circle(centerPt, 0.01);
      console.log(ol);
      var feature = new ol.Feature({
        geometry: cricle,
        labelPoint: centerPt
      });
      var s = new ol.style.Style({
        fill: new ol.style.Fill({
          color: "rgba(0, 0, 255, 0.1)"
        })
      });
      feature.setStyle(s);
      szDrawLayer.getSource().addFeature(feature); //地图添加图形

      map.addLayer(szDrawLayer);
    }
  },
  mounted() {
    const _this = this;
    this.initmap();
    console.log(this.map);
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>

<style>
  .checkbox_groupst {
    margin: 20px 0;
  }
  .top_name {
    text-indent: 18px;
  }
  .ivu-tabs-tab {
    width: 78px;
    margin: 0 !important;
  }
  .bnc {
    height: 66px;
    overflow: hidden;
  }
  .details {
    float: left;
    width: 70%;
    height: 100%;
  }
  .details p.time {
    color: #fff;
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-top: 14px;
  }
  .details a.det {
    color: #4472c6;
    font-size: 15px;
    text-align: left;
    padding-left: 20px;
    cursor: pointer;
  }
  .imgb_div {
    float: left;
    width: 30%;
    height: 100%;
  }
  .imgb_div img {
    width: 90%;
    height: 90%;
    margin: auto;
  }
  .hoverrotate {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
  }
  .ivu-cascader-menu {
    min-width: 0;
  }
</style>

<style lang="scss">
  .page_map_evt{
    .number_solve{
      color: #3e86fa !important;
    }
    .popup-content{
      .top_name{
        width: 100%;
        height: 34px;
        line-height: 34px;
        border-bottom: 2px solid #6e6e6f;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        &:before{
          content: '';
          display: block;
          position: absolute;
          top: 5px;
          left: 0;
          width: 3px;
          height: 22px;
          background-color: #3e86fa;
        }
      }
      .bnc{
        .details{
          .time{
            margin-top: 10px;
            text-align: left;
            margin-left: 15px;
          }
          .det{
            margin-left: 15px;
            padding-left: 0;
            color: #3e86fa;
          }
        }
        .imgb_div{
          padding-top: 4px;
        }
      }
    }
  }
  .map_div>i{
	display:none!important;
}
</style>
