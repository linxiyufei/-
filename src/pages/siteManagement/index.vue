<template>
		<section>
			<div class="container">
				<div class="title">
					<Cascader 
					style="width: 700px; float: left;margin-right: 50px;"
					:data="orgManageList" 
					:load-data="loadOrgManageData"
					v-model="defaultOrgSelId"
					@on-change="chooseOrgManageHandler"
					placeholder="请先选择组织机构"
					></Cascader>
					<Input 
					icon="ios-search"
					placeholder="角色名称/权限描述" style="width: 700px; float: left;">
					</Input>
					<button @click="modal1 = true,personMessage = '新增场所'">新增场所</button>
				</div>	
				<Modal
				width= "820"
				v-model="modal1"
				:title= "personMessage" @on-ok="asyncOK">
					<div class="chart">
						<span class="infor ">所属网格 : </span>
						<!-- <Cascader 
						:data="orgManageList2" 
						:load-data="loadOrgManageData2"
						v-model="default1" 
						@on-change="chooseOrgManageHandler2"
						placeholder="请先选择组织机构"
					  ></Cascader> -->
					</div>
					<div class="chart" style="margin-top: 10px">
						<span class="infor">场所名称 : </span>
						<input type="text" v-model="formContent.name">
					</div>
					<div class="chart">
						<span class="infor">场所地址 : </span>
						<input type="text" v-model="formContent.address">
					</div>
					<div class="chart" style="margin-top: 10px;">
						<span class="infor">经纬度 : </span>
						<input type="text" style="width: 195px;margin-right: 10px;" v-model="formContent.lon">
						<input type="text" style="width: 195px" v-model="formContent.lat">
					</div>
					<div class="chart" style="margin-top: 10px;">
						<span class="infor">联系人 : </span>
						<input type="text" v-model="formContent.person">
					</div>
					<div class="chart" style="margin-top: 10px;">
						<span class="infor">联系电话 : </span>
						<input type="text" v-model="formContent.phone">
					</div>
					<div class="chart" style="margin-top: 10px;">
						<span class="infor">场所负责人 : </span>
						<input type="text" v-model="formContent.resPerson">
					</div>
					<label for="" style="margin-left: 52px;">
						户口性质 :
						<Select style="width:208px; margin-left: 17px" v-model="formContent.nature.label">
							<Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</label>
				</Modal>
				</div>
				<div class="table">
					<Table border ref="selection" :columns="historyColumns" :data="historyData" size="small"></Table>
 				</div>
			</div>
		</section>
	</template>
	
	<style scoped>
		td, th{
			text-align: center !important;
		}
		span.infor{
			display: inline-block;
			width: 125px;
			height: 30px;
			line-height: 30px;
			text-align: center;
		}
		.ivu-modal-body{
			padding-left: 0;
		}
		input{
			width: 400px;
			height: 30px;
			border: 1px solid #dddee1;
			border-radius: 5px;
		}
		input{
			margin-bottom: 10px;
		}
		div.chart button{
			padding: 0 10px;
			height: 30px;
			border: 1px solid #4786FF;
			color: #FFF;
			background: #4786FF;
			top: 10px;
			right: 20px;
			margin-top: 10px;
			border-radius: 3px;
		}
		div.chart .content{
			min-height: 30px;
			margin-top: 15px;
			padding-left: 178px;
		}
		div.map{
			min-height: 100px;
		}
		div.title{
			width: 100%;
			height: 40px;
			position: relative;
		}
		div.table{
			position: absolute;
			top: 60px;
			right: 0;
			left: 0;
			bottom: 0;
			background: #FFF;
			text-align: right;
		}
	</style>
	<style lang="scss" scoped>
		@import './layout.scss'
	</style>
	
	<script>
		import main from './main.js'
		export default main
	</script>