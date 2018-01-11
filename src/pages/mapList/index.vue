
<template>
	<section>
		<div class="container">
			<div class="title">
				<Select v-model="model1" style="text-align:left; width:205px;height:30px;margin:10px 10px 0 20px;position: absolute;left: 10px;">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<DatePicker type="date" placeholder="开始日期" style="width: 210px;position:absolute;top: 10px; left: 245px;"></DatePicker>
				<DatePicker type="date" placeholder="结束日期" style="width: 210px;position:absolute;top: 10px;left: 465px;"></DatePicker>
				<button>{{content1}}</button>
				<button class="derivation">{{content2}}</button>
			</div>
			<div class="table">
				<Table :columns="historyColumns" :data="historyData" size="small" ></Table>
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" style="margin-top: 10px;"></Page>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	
	@import './layout.scss'
	
</style>
<style>
	.container{
		overflow-y: auto;
	}
	.ivu-table th{
		background-color: #FFF;
	}
	
</style>

<script>
	import main from './main.js'
	export default main
</script>