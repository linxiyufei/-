export default {
  name: "",
  data() {
    return {
      compans: "监测点",
	  video: "",
	  tosolves:{},
	  path: 'test path'
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
	gettoslovess(){
		var idf = sessionStorage.getItem("id");
        fetch('/fightOnMap/recordManage/addFightOnMapRecords.action?fightOnMapRecord.earlyWarningId='+idf+'&fightOnMapRecord.dealstatus.id=20030223', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
	      console.log(res)
		})
	},
    initmap() {
		
      var idt = sessionStorage.getItem("id");
      var lon = sessionStorage.getItem("lon");
      var lat = sessionStorage.getItem("lat");
      var path = "/xueLiangBigScreen/resource/FOMimage/";
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
        overlays: [overlay],
        target: "map",
        view: new ol.View({
          center: [lat, lon],
          projection: projection,
          zoom: 17,
          maxZoom: 17,
          minZoom: 1
        })
      });
      this.map = map;

      //geojson marker样式定义
      var iconStylet = new ol.style.Style({
        image: new ol.style.Icon({
          src: "static/img/things.png"
        })
      });

      $.ajax({
        type: "get",
        url:
          "/fightOnMap/infoManage/getFightOnMapInfoByPointId.action?cameraInfo.id=" +
          idt,
        success: function(data) {
		    var namet=sessionStorage.getItem('namev')
			let video = path + data.features[0].properties.videosrc;
			console.log(video)
			$("#bbb").attr("src", video);
			console.log(data.features[0].earlyWarningPlace,'bbb')
		   $("#locations").html(data.features[0].properties.earlyWarningPlace).attr("title",data.features[0].properties.earlyWarningPlace)
			$("#name").html(data.features[0].properties.keyPerson);
			  var mm=data.features[0].properties.earlyWarningDate.replace('T',"   ")
             $("#thtime").html(mm)
			 $("#things").html(data.features[0].properties.earlyWarningType.displayName).attr("title",data.features[0].properties.earlyWarningType.displayName)
			 $("#viewpointer").html(namet)
			 $("#viewpointer").attr("title",namet)

		  if(data.features[0].properties.person!=null && data.features[0].properties.person!=undefined){
		  var 	personid=data.features[0].properties.person.id;
			$.ajax({
				type: "get",
				url: `/personnel/getPersonnelById.action?person.id=`+personid,
				success: function(datas) {
					$("#fileActualUrl").attr("src",path+datas.attachs[0].fileActualUrl);
					$('#sex').html(datas.sex)
					$("#card").html(datas.idcardNo);
					$("#adress").html(datas.address)
				}
			});
		  }
         
        }
	  });

	// 下发
	//   $.ajax({
    //     type: "get",
    //     url:"/fightOnMap/recordManage/addFightOnMapRecords.action?fightOnMapRecord.earlyWarningId=111&fightOnMapRecord.dealstatus.id=20030223",
    //     success: function(data) {
    //       console.log(data, 'addFightOnMapRecords');
    //     }
    //   });

      console.log(idt);

      //    $.ajax({
      //      url:"/fightOnMap/infoManage/getFightOnMapInfoByPointId.action?cameraInfo.id=24&startDate=2011-11-11,00:00:00&endDate=2018-11-11,00:00:00&earlyWarningType.id=20029788"

      //    })

      //加载geojson数据
      var geoJsonLayer = new ol.layer.Vector({
        title: "add Layer",
        source: new ol.source.Vector({
          projection: "EPSG:4326",
          url:
            "/fightOnMap/infoManage/getFightOnMapInfoByPointId.action?cameraInfo.id=" +
            idt,
          format: new ol.format.GeoJSON()
        }),
        style: iconStylet
      });
      map.addLayer(geoJsonLayer);
      //加载geojson数据

      /**
       * Add a click handler to the map to render the popup.
       */
      map.on("singleclick", function(evt) {
        console.log(evt, '-----');
        var pixel = map.getEventPixel(evt.originalEvent);
        var feature = map.forEachFeatureAtPixel(pixel, function(
          feature,
          layer
        ) {
          return feature;
        });
        var coordinate = evt.coordinate;
        //hms;坐标;
        var hdms = ol.coordinate.toStringHDMS(
          ol.proj.transform(coordinate, "EPSG:3857", "EPSG:4326")
        );

        if (feature !== undefined) {
		  //var point=feature.getGeometry().getCoordinates();
		  var address= feature.get("address");
		  address==undefined?address="暂无":address=feature.get("address");
		  var name= feature.get("name");
		  name==undefined?name="暂无":name=feature.get("name");
		  var phone= feature.get("phone");
		  phone==undefined?phone="暂无":phone=feature.get("phone");
		  $("#top_name").html(address);
		  $("#personto").html(name)
		  $("#tosolve").html(phone)
        //   content.innerHTML =
        //     '<p style="width: 100%;text-indent:10px; height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">' +
        //     address +
        //     '</p><div class="bnc"><p class="time">负责人:'+name+'</p><p class="time">联系方式:'+phone+'</p><button id="tosolves" @click="vvv" class="timepp" style="padding:5px 12px;cursor:pointer; color:#fff;text-align:center;">下发办理</button></div>';
          if (feature && feature.getGeometry && feature.getGeometry().getCoordinates && feature.getGeometry().getCoordinates() !== undefined) {
            overlay.setPosition(coordinate);
          }

          //if(point!==undefined)drawCircle(coordinate, 500);
          if (feature.get("camera") !== undefined) {
            szDrawLayer.getSource().clear(true);
            drawCircle(coordinate, 500);
          }
          //    if(feature.get(''))

          roundQuery(coordinate, 500);
        } else {
          // content.innerHTML = '<p style="width: 100%;padding-left: 10px; height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">预警名称</p><div><div class="fl" style="height:64px;"></div></div>';
        }
      });
		

      /**
       * 画图代码
       */
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

      function drawCircle(centerPt, radius) {
        //由于使用了4326坐标系，长度单位不是米
        var meterPerUnit = map
          .getView()
          .getProjection()
          .getMetersPerUnit();
        var cricle = new ol.geom.Circle(centerPt, radius / meterPerUnit); //半径500米
        var feature = new ol.Feature({
          geometry: cricle,
          labelPoint: centerPt,
        //   name: "暂无"
        });
        var s = new ol.style.Style({
          fill: new ol.style.Fill({
            color: "rgba(0, 0, 255, 0.1)"
          })
          /*stroke: new ol.style.Stroke({
					color: '#ffcc33',
					width: 0
				}),
				text: new ol.style.Text({
					text: feature.get("name"),
					font: '16px Calibri,sans-serif'
				})*/
        });
        feature.setStyle(s);
        szDrawLayer.getSource().addFeature(feature); //地图添加图形
      }
      var queryResultStyle = new ol.style.Style({
        image: new ol.style.Icon({
          src: "static/img/marker.png"
        })
      });
      function roundQuery(centerPt, r) {
        var x = centerPt[0];
        var y = centerPt[1];
        var queryResultStylet = new ol.style.Style({
          image: new ol.style.Icon({
            src: "static/img/fb.png"
          })
        });
        var queryResultStyleb = new ol.style.Style({
          image: new ol.style.Icon({
            src: "static/img/cv.png"
          })
        });
        var queryResultLayer = new ol.layer.Vector({
          title: "查询结果图层",
          source: new ol.source.Vector({
            projection: "EPSG:4326",
            url:
              "/place/findPlaceByCenterAndRadius.action?lon=" +
              x +
              "&lat=" +
              y +
              "&r=" +
              r +
              "&id=" +
              idt,
            format: new ol.format.GeoJSON()
          }),

          style: queryResultStylet
        });

        map.addLayer(queryResultLayer);

        var geoJsonLayers = new ol.layer.Vector({
          title: "add Layer",
          source: new ol.source.Vector({
            projection: "EPSG:4326",
            url: "/gridPersonCon/gridPersonVOList.action?&gridPerson.isDeleted=0",
            format: new ol.format.GeoJSON()
          }),
          style: queryResultStyleb
        });
        map.addLayer(geoJsonLayers);
      }

      var center_x = lon;
      var center_y = lat;
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
	this.getData();
	  

	// console.log(personid)
	// const personId = this.$route.query.id
	// 获取 用户信息

  }
};
