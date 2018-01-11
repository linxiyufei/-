<template>
  <section>
    <div class="container">
      <Row style="marginBottom: 20px;">
        <Col span="10" style="paddingRight: 20px;boxSizing: border-box;">
          <Cascader 
            :data="orgManageList" 
            :load-data="loadOrgManageData"
            v-model="defaultOrgSelId"
            @on-change="chooseOrgManageHandler" 
            change-on-select
            placeholder="请先选择组织机构"
          ></Cascader>
        </Col>
        <Col span="10" style="paddingRight: 20px;boxSizing: border-box;">
          <Input 
            icon="ios-search"
            v-model="searchForListModel" 
            :disabled="canSearchForList"
            @on-click="searchForListHandler"
            placeholder="角色名称/权限描述">
            <span slot="prepend">输入搜索：</span>
          </Input>
        </Col>
        <Col span="4">
          <Button 
            @click="addNewPermissionHandler"
            :disabled="userAddable"
            type="primary">新增权限</Button>
        </Col>
      </Row>
      <Table 
        border 
        :columns="tableColumns" 
        :data="orgManageTableList"
        height="450"
        stripe
      >
        <Page 
          slot="footer" 
          size="small" 
          :current="tablePage"
          :page-size="tablePageSize" 
          :total="tableListTotal" 
          @on-page-size-change="pageSizeChange" 
          @on-change="pageChange" 
          show-total 
          show-sizer
          style="textAlign: center;"></Page>
      </Table>

      <PermisionManage 
        :currStatusTitle="currStatus"
        :closeNewPermissionModal="closeNewPermissionModal"
        :currUserInfo="currUserInfo"
        :currOrgManageId="currOrgManageId"
        @updateList="getOrgManageTableList"
        ref="PermissionModal"></PermisionManage>

    </div>
  </section>

</template>

<script>
  import main from './main.js'
  export default main
</script>

<style lang="scss" scoped>
	@import './layout.scss'
</style>

