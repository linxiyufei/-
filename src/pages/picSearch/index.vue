<template>
	<section>
		<div class="pic-search-cont">
			<p>上传图片或者视频进行比对</p>
			<img src="./img/search-bg.png" width="160" height="110" style="margin: 20px 0;" alt="">
			<div>
				<label>执行网格</label>
				<Select v-model="model1" style="width:200px" placeholder="选择省／市／区县">
					<Option v-for="item in gridList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Select v-model="model2" style="width:200px" placeholder="选择社区／街道">
					<Option v-for="item in gridList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Select v-model="model3" style="width:200px" placeholder="选择网格">
					<Option v-for="item in gridList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<div style="margin: 20px 0;">
				<label>拍摄时间</label>
				<DatePicker type="date" placeholder="开始日期" style="width: 200px" placement="top"></DatePicker> - 
				<DatePicker type="date" placeholder="结束日期" style="width: 200px" placement="top"></DatePicker>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@import './layout.scss'
</style>
<style>
	.pic-search-cont{
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.pic-search-cont p {
		font-size: 18px;
		color: #8cb3d4;
	}
</style>

<script>
	import main from './main.js'
	export default main
</script>