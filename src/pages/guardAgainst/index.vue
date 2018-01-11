<template>
  <section>
    <Tabs 
      v-model="activeTab"
      :animated="false"
      type="card"
      style="width: 100%; height: 100%;"
    >
      <TabPane 
        label="全部" name="allStatus">
        <AllStatus
          @modelFunc="toggleModel"
          @updateOrgId="updateOrgId"></AllStatus>
      </TabPane>
      <TabPane label="待执行" name="todo">
        <TodoStatus
          @modelFunc="toggleModel"
          @updateOrgId="updateOrgId"></AllStatus>
        ></TodoStatus>
      </TabPane>
      <TabPane label="执行中" name="doing">
        <DoingStatus
          @modelFunc="toggleModel"
          @updateOrgId="updateOrgId"></AllStatus>
        ></DoingStatus>
      </TabPane>
      <TabPane label="待下发" name="issue">
        <IssueStatus
          @modelFunc="toggleModel"
          @updateOrgId="updateOrgId"></AllStatus>
        ></IssueStatus>
      </TabPane>
      <TabPane
        name="showAddNew"
        v-if="showAddNew"
        :label="currModelTitle"
        style="width: 100%; height: 100%;"
      >
        <AddNewModel
          @modelFunc="toggleModel"
          :editTaskData="editTaskData"
          :currOrgId="currOrgId"
        >
        </AddNewModel>
      </TabPane>
    </Tabs>
    
  </section>
</template>


<script>
	// import main from './main.js'
  // export default main
  import AllStatus from './all-status'
  import TodoStatus from './todo'
  import DoingStatus from './doing'
  import IssueStatus from './issue'
  import AddNewModel from './addNew'
  export default {
    data () {
      return {
        activeTab: 'allStatus',
        currModelTitle: "新增巡防任务",
        showAddNew: false,
        editTaskData: null,
        currOrgId: 1
      }
    },
    methods: {
      toggleModel (data = {status: false}) {
        console.log(data)
        if (data.currModelTitle) {
          this.currModelTitle = data.currModelTitle
        }
        this.showAddNew = data.status
        if (typeof data.status == 'boolean' && data.status) {
          this.activeTab = 'showAddNew'
        } else if (typeof data.status == 'boolean' && !data.status) {
          this.activeTab = 'allStatus'
        }
        if (data.data) {
          this.editTaskData = data.data
        } else {
          this.editTaskData = null
        }
      },
      updateOrgId (id) {
        if (id && typeof id === 'number') (this.currOrgId = id)
      }
    },
    components: {
      AllStatus,
      TodoStatus,
      DoingStatus,
      IssueStatus,
      AddNewModel
    }
  } 
</script>

<style lang="scss" scoped>
	@import './layout.scss';
  
</style>
<style>
  .ivu-tabs-content{
    height: calc( 100% - 52px );
    overflow-y: auto;
  }
</style>