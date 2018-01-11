<template>
		<section>
			<div class="container">
				<div class="title">
					<span>输入搜索</span>
					<Input style="width:200px" @on-click="allsearch(nameed)" v-model="nameed" icon="ios-search" placeholder="车牌或车主姓名"></Input>
					<button @click="modal1 = true">新增任务</button>
					<Modal
						width= "820"
						v-model="modal1"
						title="新增任务"
						@on-ok="addwurenji">
						<div class="chart">
							<span class="infor">任务名称 : </span>
							<input v-model="rwname" type="text">
						</div>
						<div class="chart">
							<span class="infor">设置飞行路线 : </span>
							<div class="map" id="map-cont" :style="{'height': mapHeight + 'px'}"></div>
						</div>
						<div class="chart">
							<span class="infor">执行周期 : </span>
							<i-select :model.sync="executionCycle" v-model="executionCycle" style="width:200px">
								<i-option v-for="item in executionCyclearr" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
					     </i-select>
						</div>
						<div class="chart" style="margin-top: 10px;">
							<span class="infor">执行时间 : </span>
							<i-select :model.sync="executionTime" v-model="executionTime" style="width:200px">
								<i-option v-for="item in executionTimearr" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
					        </i-select>
						</div>
						<div class="chart" style="margin-top: 10px;">
							<span class="infor">备注 : </span>
							<input v-model="remark" type="text">
						</div>
					</Modal>


                    <Modal
						width= "820"
						v-model="updatamodal"
						title="新增任务"
						@on-ok="addwurenjis">
						<div class="chart">
							<span class="infor">任务名称 : </span>
							<input v-model="rwnames" type="text">
						</div>
						<div class="chart">
							<span class="infor">设置飞行路线 : </span>
							<div class="map" id="map-conts" :style="{'height': mapHeight + 'px'}"></div>
						</div>
						<div class="chart">
							<span class="infor">执行周期 : </span>
							<i-select :model.sync="executionCycles" v-model="executionCycles" style="width:200px">
								<i-option v-for="item in executionCyclearrs" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
					     </i-select>
						</div>
						<div class="chart" style="margin-top: 10px;">
							<span class="infor">执行时间 : </span>
							<i-select :model.sync="executionTimes" v-model="executionTimes" style="width:200px">
								<i-option v-for="item in executionTimearrs" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
					        </i-select>
						</div>
						<div class="chart" style="margin-top: 10px;">
							<span class="infor">备ww注 : </span>
							<input v-model="remarks" type="text">
						</div>
					</Modal>



				</div>
				<div class="table">
					<Table border ref="selection" :columns="historyColumns" :data="historyData" size="small" @on-row-dblclick="dbClick"></Table>
					<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" style="margin: 10px 10px 0 0;"></Page>
				</div>
			</div>
		</section>
	</template>
	
	<style>
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
	</style>
	<style lang="scss" scoped>
		@import './layout.scss'
	</style>
	
	<script>
		import main from './main.js'
		export default main
	</script>