
<template>
		<section>
			<div class="container">
				<div class="title">
					<Select v-model="model1" style="width:205px;height:30px;margin:10px 10px 0 20px;">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<DatePicker type="date" placeholder="开始日期" style="width: 210px;position:relative;top: 6px;"></DatePicker>
					<DatePicker type="date" placeholder="结束日期" style="width: 210px;position:relative;top: 6px;left: 10px;"></DatePicker>
					<button>{{content}}</button>
				</div>
				<div class="content">
					<div class="leftAside">
						<div class="topAside">
							<div class="chart1">
								<p class="chart-title">{{sites[0]}}</p>
								<div class="chart1-draw">
									<div class="bar1">
										<p class="title">特别重大</p>
										<p class="red">1206</p>
										<span class="bg"></span>
										<span class="red"></span>
										<p class="content">
											<span class="red">12%</span>
											同比上期
										</p>
									</div>
									<div class="bar2">
										<p class="title">重大预警</p>
										<p class="yellow">1206</p>
										<span class="bg"></span>
										<span class="yellow"></span>
										<p class="content">
											<span class="yellow">12%</span>
											同比上期
										</p>
									</div>
									<div class="bar2">
										<p class="title">普通预警</p>
										<p class="yellow" style="color:#4786ff;" >1206</p>
										<span class="bg"></span>
										<span class="yellow" style="background: #4786ff;width: 80%;"></span>
										<p class="content">
											<span class="yellow" style="color:#4786ff;">12%</span>
											同比上期
										</p>
									</div>
									<div class="bar2">
										<p class="title">一般预警</p>
										<p class="yellow" style="color:#5ff29a;">1206</p>
										<span class="bg"></span>
										<span class="yellow"style="background: #5ff29a;width: 10%;"></span>
										<p class="content">
											<span class="yellow" style="color:#5ff29a;">12%</span>
											同比上期
										</p>
									</div>
								</div>
							</div>
							<div class="chart2">
								<p class="chart-title">{{sites[1]}}</p>
								<div class="chart2-draw">
									
								</div>
							</div>
						</div>
						<div class="bottomAside">
							<p class="chart-title">{{sites[2]}}</p>
							<div class="chart3-draw"></div>
						</div>
					</div>
					<div class="rightAside">
					</div>
				</div>
			</div>
		</section>
	</template>
	<style>
		::-webkit-scrollbar{
		width: 3px;
		height: 5px;
		background-color: #f1f1f1;
		}
		/*滚动条的轨道*/
		::-webkit-scrollbar-track{
		box-shadow: inset 0 0 5px rgba(0,0,0,.3);
		background-color: #f1f1f1;
		}
		/*滚动条的滑块按钮*/
		::-webkit-scrollbar-thumb{
		border-radius: 10px;
		background-color: #2d8cf0;
		box-shadow: inset 0 0 5px #ddd;
		}
		/*滚动条的上下两端的按钮*/
		::-webkit-scrollbar-button{
		height: 10px;
		background-color: #B0AEDA;
		}

	</style>
	<style lang="scss" scoped>
		@import './layout.scss'
	</style>
	
	<script>
		import main from './main.js'
		export default main
	</script>

