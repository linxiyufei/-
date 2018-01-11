<template>
	<section>
		<div class="container">
			<div class="title">
				<span>输入搜索</span>
				<Input style="width:200px" @on-click="allsearch(nameed)" icon="ios-search" v-model="nameed" placeholder="姓名或身份证"></Input>
				<button @click="modal1 = true">新增黑名单</button>
				<Modal
					width= "820"
					v-model="modal1"
					title="新增人员"
					@on-ok="ok"
					@on-cancel="cancel">
					<div class="chart">
						<input type="text" placeholder="输入姓名或身份证号搜索">
						<button>搜索</button>
					</div>
					<div class="chart">
						<Table border highlight-row :columns="historyColumns2" :data="historyData2" size="small" @on-current-change="handleRowChange"></Table>
						<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" style="margin: 10px 10px 0 0;"></Page>
					</div>	
				</Modal>
			</div>
			<div class="table">
				<Table border ref="selection" :columns="historyColumns" :data="historyData" size="small"></Table>
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage2" style="margin: 10px 10px 0 0;"></Page>
			</div>
		</div>
	</section>
</template>

<style>
	span.infor{
		display: inline-block;
		width: 175px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.ivu-modal-body{
		padding-left: 0;
	}
	input{
		width: 200px;
		height: 30px;
    	border: 1px solid #dddee1;
		border-radius: 5px;
		padding-left: 10px;
	}
	input{
		margin-bottom: 10px;
	}
	div.chart{
		text-align: right;
		padding-left: 20px;
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
</style>
<style lang="scss" scoped>
	@import './layout.scss'
</style>

<script>
	import main from './main.js'
	export default main
</script>