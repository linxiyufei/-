<template>
  <div class="model-cont">
    <Row :style="{position: 'relative'}">
      <Col span="6" push="18">
        <span>任务编号：{{ taskNum }}</span>
      </Col>
    </Row>
    <Row :style="{marginBottom: '10px'}">
      <Col span="6">
        <span>任务名称：</span>
        <Input 
          v-model="taskName"
          style="width: 150px;"
          placeholder="请输入任务名称"
        ></Input>
      </Col>
      <Col span="6">
        <span>任务类型：</span>
        <Select 
          v-model="taskTypeSel"
          @on-change="taskTypeChangeHandler"
          style="width: 150px;"
        >
          <Option v-for="(item,index) in taskTypeList" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
      
    </Row>
    <Row style="marginBottom: 10px;">
      <Col span="6">
        <span>执行网格：</span>
        <Cascader 
          :data="orgManageList" 
          :load-data="loadOrgManageData"
          v-model="defaultOrgSelId"
          @on-change="chooseOrgManageHandler" 
          change-on-select
          placeholder="请选择执行网格"
          :style="{marginRight: '10px', width: '150px', display: 'inline-block'}"
        ></Cascader>
      </Col>
      <Col span="6">
        <span>执行人：</span>
        <Select 
          v-model="doneManSel"
          @on-change="chooseOrgPersonhandler"
          style="width: 150px;">
          <Option v-for="(item,index) in doneManList" :value="item.key" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <Row style="marginBottom: 10px;">
      <Col span="6">
        <span>执行周期：</span>
        <Select 
          v-model="doneCycleSel"
          @on-change="cycleChangeHandler"
          style="width: 150px;">
          <Option v-for="(item,index) in doneCycleList" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="12" v-if="cycleStatus">
        <span>执行时段：</span>
        <TimePicker 
          type="timerange" 
          placement="bottom-end" 
          placeholder="请选择时段" 
          :value="timerange"
          confirm
          @on-change="chooseTimeRange"
          style="width: 168px"></TimePicker>
      </Col>
      <Col span="6">
        <span>任务提醒：</span>
        <Checkbox v-model="taskRemind">是否提醒</Checkbox>
      </Col>
    </Row>
    <Row type="flex" style="flexWrap: nowrap; marginBottom: 10px;">
      <Col span="18">
        <span>任务描述：</span>
        <Input v-model="taskDetail" :style="{width: '370px'}"></Input>
      </Col>
    </Row>
    <Row type="flex" style="flexWrap: nowrap; marginBottom: 10px;">
      <span style="width: 70px;">任务线路：</span>
      <div style="flex: 1;">
        <p>
          <span v-show="!showMapModal">
            <Button 
              @click="addPatrolPlace"
              v-show="!taskTypeSel" 
              type="text">添加走访点</Button>
            <Button 
              v-show="taskTypeSel" 
              @click="addPatrolPlace"
              type="text">添加监控点</Button>
          </span>
          <Button
            @click="showMapModal = !showMapModal"
            v-show="taskTypeSel"
            type="text">{{ showMapModal ? '切换到列表模式' : '切换到地图模式' }}</Button>
        </p>
        <Table
          v-show="!showMapModal"
          :data="taskLineList"
          :columns="taskLineColumns"
          height="250"
        >
          
        </Table>

        <MapModel 
          v-if="showMapModal"
          @updateVideoPointList="updateVideoPointList"></MapModel>
      </div>
    </Row>
    <Row >
      <Col span="24" style="textAlign: right;">
        <Button
          type="ghost"
          @click="cancelModel"
          style="marginRight: 10px;">取消</Button>
        <Button 
          type="primary"
          @click="addTaskHandler"
          >提交</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import axios from 'axios'
import MapModel from './mapModel'
  export default {
    props: {
      modelFunc: {require: true, type: Function},
      editTaskData: {type: Object},
      currOrgId: {type: Number}
    },
    data () {
      return {
        taskNum: new Date().getTime(),
        taskName: '', // 任务名称
        taskType: '', // 任务类型
        taskDetail: '', // 任务描述
        taskTypeSel: '', 
        taskTypeList: [{
          label: '走访巡防',
          value: 0
        }, {
          label: '远程巡防',
          value: 1
        }],
        gridSel: '', // 执行网格
        gridList: [],
        doneManSel: '', // 执行人
        doneManList: [], 
        doneCycleSel: '', // 执行周期
        cycleStatus: false,
        doneCycleList: [],
        timerange: [], // 执行时断
        taskRemind: false, // 任务提醒
        taskLineList: [], // 任务路线-走访点
        taskVideoLineList: [], // 任务路线-监控点
        taskLineColumns: [{
          title: "序号",
          type: 'index',
          align: 'center'
        }, {
          title: '走访点',
          key: 'placeName'
        }, {
          title: '任务要点',
          key: 'sketch'
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 160,
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
                  click: (item) => {
                    console.log('edit', params)
                    const _this = this;
                    let _placeName = params.row.placeName
                    let _sketch = params.row.sketch
                    this.$Modal.confirm({
                      title: '编辑巡防任务',
                      render: (h) => {
                        return h('div', [
                          '走访点：',
                          h('Input', {
                            props: {
                              value: params.row.placeName,
                            },
                            style: {
                              margin: '10px 0'
                            },
                            on: {
                              input: (val) => {
                                _placeName = val
                              }
                            }
                          }),
                          '任务要点：',
                          h('Input', {
                            props: {
                              value: params.row.sketch
                            },
                            style: {
                              margin: '10px 0'
                            },
                            on: {
                              input: (val) => {
                                _sketch = val
                              }
                            }
                          }),
                        ])
                      },
                      onOk: () => {
                        _this.taskLineList.map((i, index) => {
                          if (i.placeName == params.row.placeName) {
                            i.placeName = _placeName;
                            i.sketch = _sketch;
                          }
                        })
                        params.row.placeName = _placeName
                        params.row.sketch = _sketch
                      }
                    })
                  }
                }
              }, '编辑'),
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
                    const _this = this;
                    console.log('delete', params.row.id)
                    // taskLineList
                    _this.taskLineList.map((i, index) => {
											if (params.row.placeName == i.placeName) {
												_this.taskLineList.splice(index, 1)
												console.log(_this.taskLineList)
											}
										})
                  }
                }
              }, '删除')
            ])
          }
        }],
        orgManageList: [],
        defaultOrgSelId: [],
        showMapModal: false, // 是否显示
        newTaskLine0List: [], // 新增时走访暂储列表
        newTaskLine1List: [], // 新增时监控暂储列表

      }
    },
    watch: {
      editTaskData (newVal) {
        if (newVal) {
          this.initData()
        } else {
          this.taskName = ''
          this.taskDetail = ''
          this.taskTypeSel = 0
          this.taskRemind = false
          this.doneCycleSel = null
          this.timerange = ''
          this.taskLineList = []
          this.taskLine0List = []
          this.taskLine1List = []
        }
      }
    },
    methods: {
      initData () {
        const newVal = this.editTaskData;
        if (this.editTaskData && this.editTaskData.row) {
          try {
            this.taskName = newVal.row.patrolName;
            this.taskDetail = newVal.row.patrolSketch;
            this.taskTypeSel = newVal.row.patrolType ? 1 : 0;
            this.taskRemind = newVal.row.isWarn ? true : false;
            this.doneCycleSel = newVal.row.period ? newVal.row.period * 1 : null;
            this.timerange = [newVal.row.startTime.split('T')[1], newVal.row.endTime.split('T')[1]]
          } catch(err) {
            throw new Error(err)
          }
        }
      },
      cancelModel () {
        this.$emit('modelFunc', {status: false})
      },
      initOrgList () {
        const _this = this;
        const _orgIdDefault = this.currOrgId || 1;
         axios.get('/sysadmin/orgManage/ajaxOrgsForExtTree.action?parentId=' + _orgIdDefault)
        // axios.get('/static/data/orgManageList.json')
          .then(res => {
            if (res.data && Object.prototype.toString.call(res.data) == '[object Array]') {
              res.data.map((i, index) => {
                if (i.leaf == false) {
                  _this.orgManageList.push({
                    value: i.id,
                    label: i.text,
                    children: [],
                    loading: false
                  });
                } else {
                  _this.orgManageList.push({
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
      loadOrgManageData (item, callback) {
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
      chooseOrgManageHandler (val, selected) {
        this.currOrgManageId = val[val.length - 1];
        this.getorgPersonHandler()
      },
      getorgPersonHandler () {
        const _this = this
        axios.get('/patrolManage/findUsers.action?organizationId='+this.currOrgManageId+'&page=1&rows=100')
        // axios.get('./static/data/personList.json')
          .then(res=> {
            _this.doneManList = [];
            if(Object.prototype.toString.call(res.data.rows) == '[object Array]') {
              res.data.rows.map((i, index) => {
                _this.doneManList.push({
                  key: i.id,
                  label: i.name
                })
              });
            }
          })
      },
      chooseOrgPersonhandler (val) {
        // console.log(this.doneManSel)
      },
      getCycleData () {
        const _this = this;
        _this.doneCycleList = [];
        axios.get('/patrolManage/findPeriod.action')
        // axios.get('/static/mock/wisdomEyes/cycle.json')
          .then(res => {
            console.log(res)
            res.data.map(i => {
              _this.doneCycleList.push({
                value: i.displaySeq,
                label: i.displayName
              })
            })
          })
      },
      taskTypeChangeHandler (val) {
        const _this = this;
        if (this.editTaskData) {
          this.getPlaceList()
        } else {
          if (_this.taskTypeSel == 0) {
            _this.taskLineList = _this.newTaskLine0List
          } else if (_this.taskTypeSel == 1) {
            _this.taskLineList = _this.newTaskLine1List
          }
        }
      },
      chooseTimeRange (time) {
        console.log(time)
        this.timerange = time
      },
      cycleChangeHandler (val) {
        if (val == 1 || val == 5) {
          this.cycleStatus = true
        } else {
          this.cycleStatus = false;
        }
      },
      getPlaceList () {
        const _this = this;
        axios.get('/patrolManage/findPatrolPlacePage.action?page=1&rows=100&patrolPlace.status=' + this.taskTypeSel + '&id=' + this.editTaskData.row.id)
        // axios.get('./static/mock/wisdomEyes/place.json')
          .then(res => {
            console.log('get place list data:', res)
            _this.taskLineList = res.data.rows
            if (_this.taskTypeSel == 0) (_this.newTaskLine0List = res.data.rows)
            if (_this.taskTypeSel == 1) (_this.newTaskLine1List = res.data.rows)
          })
      },
      addPatrolPlace () {
        const _this = this;
        let _addPointName = '' // 添加点位名称,
        let _addPointDetail = '' // 添加点位描述
        this.$Modal.confirm({
          title: '添加走访点',
          render: (h) => {
            return h('div', [
              h('Input',{
                props: {
                  value: _addPointName,
                  autofocus: true,
                  placeholder: '请输入走访点名称'
                },
                style: {margin: '10px 0'},
                on: {
                  input: (val) => {
                    _addPointName = val;
                  }
                }
              }),
              h('Input',{
                props: {
                  value: _addPointDetail,
                  autofocus: true,
                  placeholder: '添加任务要点'
                },
                on: {
                  input: (val) => {
                    _addPointDetail = val;
                  }
                }
              })
            ])
          },
          onOk: () => {
            // _this.addPlaceHandler({
            //   placeName: _addPointName,
            //   sketch: _addPointDetail
            // })
            if (_this.taskTypeSel == 0) _this.newTaskLine0List.push({
              placeName: _addPointName,
              sketch: _addPointDetail
            })
            if (_this.taskTypeSel == 1) _this.newTaskLine1List.push({
              placeName: _addPointName,
              sketch: _addPointDetail
            })
          }
        })
      },
      addTaskHandler () {
        const _this = this
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
        // let _params = {
        //   patrol: {
        //     patrolName: _this.taskName,
        //     patrolType: _this.taskTypeSel,
        //     executor: _this.doneManSel,
        //     period: _this.doneCycleSel,
        //     isWarn: _this.taskRemind ? 1 : 0,
        //     patrolSketch: _this.taskDetail,
        //   },
        //   startTime: _this.timerange[0],
        //   endTime: _this.timerange[1],
        //   placeList: _this.taskTypeSel ? _this.taskVideoLineList : _this.taskLineList
        // }
        let _query = [
          'patrol.patrolName=' + _this.taskName,
          'patrol.patrolType=' + _this.taskTypeSel,
          'patrol.executor=' + _this.doneManSel,
          'patrol.period=' + _this.doneCycleSel,
          'patrol.isWarn=' + (_this.taskRemind ? 1 : 0),
          'patrol.patrolSketch=' + _this.taskDetail
        ];
        if (_this.doneCycleSel === 1) {
          _query.push('startTime=' + _this.timerange[0]);
          _query.push('endTime=' + _this.timerange[1]);
        }
        if (_this.taskLineList.length > 0) {
          let _index = 0;
          _this.taskLineList.map((i, index) => {
            if (i.placeName && i.sketch) {
              _query.push('placeList[' + _index + '].placeName=' + (i["placeName"] || '') );
              _query.push('placeList[' + _index + '].sketch=' + (i["sketch"] || '') );
              _index++;
            }
            
          })
        } else if (_this.taskTypeSel == 1 && _this.taskVideoLineList.length > 0) {
          let _index = 0;
          _this.taskVideoLineList.map((i, index) => {
            if (i.placeName && i.sketch) {
              _query.push('placeList[' + _index + '].placeName=' + (i["placeName"] || '') );
              _query.push('placeList[' + _index + '].sketch=' + (i["sketch"] || '') );
              _index++;
            }
          })
        }
        if (this.editTaskData) {
          // 提交编辑
          // _params.id = this.editTaskData.id
          _query.push('id=' + this.editTaskData.row.id)
        } else {
          // 新增保存
        }
        let _queryStr = _query.join('&');
        axios.post('/patrolManage/maintainPatrol.action?', _queryStr)
        // console.log(_this.doneCycleSel)
        // axios.post('/patrolManage/maintainPatrol.action', _params)
          .then(res => {
            console.log(res)
            // 成功返回
            _this.$emit('modelFunc', {status: false})
            _this.$Spin.hide()
          })
          .catch(err => {
            _this.$Spin.hide()
          })
      },
      updateVideoPointList (listData) {
        this.taskVideoLineList = listData
      }
    },
    mounted () {
      this.getCycleData()
      this.initData()
      this.initOrgList()
      if (this.editTaskData) {
        this.orgId = this.editTaskData.row.organization.id || this.currOrgId || 1;
        this.initOrgList()
        this.getPlaceList()
      } else {
        this.orgId = 1
      }
    },
    components: {
      MapModel
    }
  }
</script>
<style scoped>
  .model-cont{
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #dddee1;
  }
</style>
