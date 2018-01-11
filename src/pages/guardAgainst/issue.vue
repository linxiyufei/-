<template>
  <Table 
    :height="tableHeight"
    :data="allStatusList"
    :columns="allStatusColumns"
    @on-select="listSelectHandler"
    @on-selection-change="listSelChangeHandler"

  >
    <div slot="header" class="table-title">
      <!-- 搜索 -->
      <Cascader 
        :data="orgManageList" 
        :load-data="loadOrgManageData"
        v-model="defaultOrgSelId"
        @on-change="chooseOrgManageHandler" 
        change-on-select
        placeholder="请先选择组织机构"
        :style="{marginRight: '10px'}"
      ></Cascader>
      <Input 
        v-model="statusSearchValue"
        placeholder="请输入任务名称"
        style="width: 200px;marginRight: 10px;"
      >
        <Button slot="append" @click="searchListDataHandler">搜索</Button>
      </Input>
      <Button 
        type="primary" 
        :disabled="singleChoose"
        @click="deleteTaskHandler"
        style="marginRight: 10px;">删除</Button>
      <Button 
        type="primary" 
        :disabled="singleChoose"
        @click="sendTaskHandler"
        style="marginRight: 10px;">下发</Button>
      <!-- <Button 
        type="primary" 
        :disabled="singleChoose"
        >提醒</Button> -->
    </div>
    <Page 
      :total="listDataTotal"
      :page-size="listPageSize"
      :current="currListPage"
      show-total
      show-sizer
      placement="top"
      slot="footer" 
      style="textAlign: center;"></Page>
  </Table>
</template>
<script>
  import axios from 'axios'
  export default {
    props: {
      modelFunc: {type: Function, require: true}
    },
    data () {
      return {
        tableHeight: document.body.clientHeight - 15 - 66 - 52 - 17,
        statusSearchValue: '',
        orgManageList: [],
        orgId: 1,
        defaultOrgSelId: [],
        singleChoose: true,
        multipleChoose: true,
        allStatusList: [],
        allStatusColumns: [{
          type: 'selection',
          align: 'center',
          width: 60
        }, {
          title: '类型',
          key: 'patrolType',
          width: 100,
          filters: [{
            label: '走访巡防',
            value: 0
          }, {
            label: '远程巡防',
            value: 1
          }],
          filterMultiple: false,
          filterMethod (value, row) {
            console.log(value, row.patrolType)
            if (value === 0) {
              return row.patrolType == 0;
            } else if (value === 1) {
              return row.patrolType == 1;
            }
          },
          render: (h, params) => {
            if (params.row && typeof params.row.patrolType == 'number') {
              const _value = params.row.patrolType ? '远程巡防' : '走访巡防' 
              return _value
            } else {
              return ''
            }
            
          }
        }, {
          title: '任务名称',
          key: 'patrolName'
        }, {
          title: '简述',
          key: 'patrolSketch'
        }, {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            if (params.row && typeof params.row.status == 'number') {
              let _status = ''
              switch (params.row.status) {
                case 0:
                  _status = '待下发'
                  break;
                case 1:
                  _status = '待执行'
                  break;
                case 2:
                  _status = '执行中'
                  break;
                case 3:
                  _status = '超期'
                  break;
                case 4:
                  _status = '待审核'
                  break;
                default:
                  _status = '待下发'
                  break;
              }
              return _status
            }
          }
        }, {
          title: '执行轮次',
          key: 'num'
        }, {
          title: '执行人',
          key: 'executor'
        }, {
          title: '所属网格',
          key: 'places',
          width: 100
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {type: 'text', size: 'small'},
                style: {marginRight: '5px'},
                on: {
                  click: () => {
                    console.log(params)
                    this.$emit('modelFunc', {
                      status: true,
                      currModelTitle: '编辑巡防任务',
                      data: params
                    })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {type: 'text', size: 'small'},
                on: {
                  click: () => {
                    console.log(params)
                    const _id = params.row.id;
                    axios.get('/patrolManage/deletePatrolById.action?id=' + _id)
                      .then(res => {
                        console.log('删除任务：', res)
                        this.$Message.success('任务删除成功!')
                      })
                  }
                }
              }, '删除')
            ])
          }
        }],
        listDataTotal: 0,
        listPageSize: 10,
        currListPage: 1,
        selectedTasks: []
      }
    },
    methods: {
      showAddNewModel () {
        this.$emit('modelFunc', {status: true, currModelTitle: '新增巡防任务', data: null})
      },
      getOrgList () {
        const _this = this;
        const _orgIdDefault = this.orgId
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
      searchListDataHandler () {
        const _this = this
        axios.get('/patrolManage/findPatrolPage.action?patrol.organization.id='+this.currOrgManageId+'&page='+_this.currListPage+'&rows='+_this.listPageSize + '&patrol.patrolName=' + _this.statusSearchValue)
        // axios.get('./static/mock/wisdomEyes/allstatus.json')
          .then(res => {
            // console.log(res)
            _this.allStatusList = res.data.rows
            _this.listDataTotal = res.data.records
          })
      },
      chooseOrgManageHandler (val, selected) {
        this.currOrgManageId = val[val.length - 1];
        this.getListData()
      },
      getListData () {
        const _this = this
        axios.get('/patrolManage/findPatrolPage.action?patrol.organization.id='+this.currOrgManageId+'&page='+_this.currListPage+'&rows='+_this.listPageSize+'&patrol.status=0')
        // axios.get('./static/mock/wisdomEyes/allstatus.json')
          .then(res => {
            // console.log(res)
            _this.allStatusList = res.data.rows
            _this.listDataTotal = res.data.records
          })
      },
      listSelectHandler (sel, row) {
        // console.log(sel)
        // console.log(row)
      },
      listSelChangeHandler (sel) {
        this.selectedTasks = sel;
        if (sel.length == 0) {
          this.singleChoose = true;
          this.multipleChoose = true;
        } else {
          this.singleChoose = false;
          this.multipleChoose = false;
        }
      },
      deleteTaskHandler () {
        if (this.selectedTasks.length > 0) {
          this.$Modal.confirm({
            title: '确认删除？',
            content: '<p>删除操作不可逆，是否继续？</p>',
            onOk: () => {
              this.selectedTasks.map(i => {
                axios.get('/patrolManage/deletePatrolById.action?id=' + i.id)
                  .then(res => {
                    console.log('delete task:', res)
                    if (res.data && typeof res.data == 'boolean') {
                      this.$Message.success('删除成功！')
                      this.getListData()
                    } else {
                      this.$Message.success('删除失败！')
                    }
                  })
                  .catch(err => {
                    this.$Message.error('任务删除失败！任务名称：' + i.patrolName)
                  })
              })
            }
          })
        }
      },
      sendTaskHandler () {
        if (this.selectedTasks.length > 0) {
          this.$Modal.confirm({
            title: '确认下发？',
            content: '<p>是否继续？</p>',
            onOk: () => {
              this.selectedTasks.map(i => {
                axios.get('/patrolManage/patrolIssue.action?id=' + i.id)
                  .then(res => {
                    console.log('send task:', res)
                    if (res.data && typeof res.data == 'boolean') {
                      this.$Message.success('下发成功！')
                      this.getListData()
                    } else {
                      this.$Message.success('下发失败！')
                    }
                  })
                  .catch(err => {
                    this.$Message.error('任务下发失败！任务名称：' + i.patrolName)
                  })
              })
            }
          })
        }
      },
      resetTaskHandler () {
        if (this.selectedTasks.length > 0) {
          this.$Modal.confirm({
            title: '确认撤回？',
            content: '<p>是否继续？</p>',
            onOk: () => {
              this.selectedTasks.map(i => {
                axios.get('/patrolManage/backout.action?id=' + i.id)
                  .then(res => {
                    console.log('reset task:', res)
                    if (res.data && typeof res.data == 'boolean') {
                      this.$Message.success('任务撤回成功！')
                      this.getListData()
                    } else {
                      this.$Message.success('任务撤回失败！')
                    }
                  })
                  .catch(err => {
                    this.$Message.error('任务撤回失败！任务名称：' + i.patrolName)
                  })
              })
            }
          })
        }
      }
    },
    mounted () {
      this.currOrgManageId = 1;
      this.getOrgList()
      this.getListData()
    },
    components: {
    }
  }
</script>
<style scoped>
  .table-title{
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
</style>

