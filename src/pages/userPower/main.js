import axios from 'axios'
  import PermisionManage from './permission-manage'
  export default {
    data () {
      return {
        tablePage: 1,
        tablePageSize: 10,
        searchForListModel: '',
        userAddable: true,
        orgManageList: [], // 组织机构联动选择数组
        canSearchForList: false, // 是否可搜索
        currOrgManageId:  null, // 当前列表组织机构
        defaultOrgId: 1,
        defaultOrgSelId: [],
        orgManageTableList: [], // 权限列表表单列表
        tableColumns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '角色名称',
          key: 'permissionName'
        }, {
          title: '点位数量',
          key: 'num'
        }, {
          title: '权限描述',
          key: 'permissionSketch'
        }, {
          title: '提交时间',
          key: 'createDate'
        }, {
          title: '提交人',
          key: 'createUser'
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
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
                  click: () => {
                    this.editInfo(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeInfo(params)
                  }
                }
              }, '删除')
            ]);
          }
        }],
        tableListTotal: 0, // 表单数据总条数
        currStatus: '新增权限',
        currUserInfo: null, // 编辑人员信息
      }
    },
    methods: {
      initOrgManageData () {
        const _this = this;
        _this.orgManageList = []; // TODO ?
        const _orgIdDefault = 1;
        _this.defaultOrgId = _orgIdDefault;
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
        this.canSearchForList = false;
        this.currOrgManageId = val[val.length - 1];
        if (!selected[0]) return (this.canSearchForList = true)
        this.getOrgManageTableList()

      },
      getOrgManageTableList () {
        const _this = this;
        axios.get('/cameraPermissionManage/findCameraPermissionPage.action?page='+ _this.tablePage +'&rows='+ _this.tablePageSize +'&cameraPermission.organization.id=' + this.currOrgManageId)
        // axios.get('/static/data/orgManageTableList.json')
          .then(res => {
            if (res.data["rows"] && Object.prototype.toString.call(res.data.rows) == '[object Array]') {
              _this.orgManageTableList = res.data.rows;
              _this.tableListTotal = res.data.total;
            }
          })
      },
      searchForListHandler () {
        const _this = this;
        axios.get('/cameraPermissionManage/findCameraPermissionPage.action?cameraPermission.organization.id='+ this.currOrgManageId +'&page=1&rows=15&cameraPermission.permissionName=' + this.searchForListModel)
          .then(res => {
            if (res.data["rows"] && Object.prototype.toString.call(res.data.rows) == '[object Array]') {
              _this.orgManageTableList = res.data.rows;
              _this.tableListTotal = res.data.total;
            }
          })
      },
      addNewPermissionHandler () {

        this.currStatus = '新增权限';
        this.$refs.PermissionModal.mModel = true;
      },
      closeNewPermissionModal () {
        // console.log(123)
      },
      editInfo (params) {
        this.currStatus = '编辑权限';
        this.$refs.PermissionModal.mModel = true;
        const _id = params.row.id;
        const _this = this;
        axios.get('/cameraPermissionManage/findPermissionById.action?id=' + _id)
          .then(res => {
            console.log('get user data: ', res.data);
            _this.currUserInfo = res.data;
          })
      },
      removeInfo (params) {
        console.log(params)
        const _this = this;
        const _id = params.row.id || null;
        this.$Modal.confirm({
          title: '确认删除？',
          content: '<p>删除操作不可逆，是否继续删除？</p>',
          loading: true,
          onOk: () => {
            axios.get('/cameraPermissionManage/deleteCameraPermissionById.action?id=' + _id)
              .then(res => {
                if (res.data) {
                  _this.$Message.success('删除成功！');
                  _this.orgManageTableList.map((i, index) => {
                    if (i.id == _id) {
                      _this.orgManageTableList.splice(index, 1);
                    }
                  })
                }
              })
              .catch(err => {
                _this.$Message.error('删除失败！')
              })
            _this.$Modal.remove();
          }

        })
	  },
    pageSizeChange (pageSize) {
      this.tablePageSize = pageSize;
      this.getOrgManageTableList()
    },
    pageChange (page) {
      this.tablePage = page;
      this.getOrgManageTableList()
    }
	},
	watch: {
		currOrgManageId (newVal) {
			console.log(newVal)
			if (!newVal) {
				this.userAddable = true;
			} else {
				this.userAddable = false;
			}
		}
	},
    created () {
      
    },
    mounted () {
      const _orgId = this.defaultOrgId
      this.currOrgManageId = _orgId;
      this.defaultOrgSelId = [_orgId];
      this.initOrgManageData();
      this.getOrgManageTableList();
    },
    components: {
      PermisionManage
    }
  }