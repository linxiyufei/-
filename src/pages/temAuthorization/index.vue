<template>
	<section class="temAuthorization-app">

		<div id="map-box"></div>

		<!-- 地图弹层信息 -->
		<div class="map-point-info-mod" v-show="showUserInfo">
			<header>点位授权申请</header>
			<div class="main-body">
				<dl>
					<dt>姓名：</dt>
					<dd>{{mapPoint["proposer"]}}</dd>
					<dt>职务：</dt>
					<dd>{{mapPoint["position"]}}</dd>
					<dt>联系方式：</dt>
					<dd>{{mapPoint["telephone"]}}</dd>
					<dt>申请时间：</dt>
					<dd>{{mapPoint["createDate"]}}</dd>
					<dt>浏览时间段：</dt>
					<dd>{{mapPoint["startTime"]}}</dd>
					<dt></dt>
					<dd>{{mapPoint["endTime"]}}</dd>
					<dt>申请理由：</dt>
					<dd>{{mapPoint["auditIdea"]}}</dd>
				</dl>
			</div>
			<!-- <footer>
				<button class="red">驳回申请</button>
				<button class="green">通过授权</button>
			</footer> -->
		</div>

		<!-- 待处理申请 -->
		<div class="pending-application-list-mod" v-show="showUserList">
			<header>待处理申请</header>
			<div class="main-body pending-application-list">
				<div v-for="(list, index) in application" :key="index">
					<dl>
						<dt>申请人</dt>
						<dd>{{ list.proposer }}</dd>
					</dl>
					<dl>
						<dt>申请时间</dt>
						<dd>{{ list.createDate }}</dd>
					</dl>
					<button @click="findPointPosition(list)">》查看处理</button>
				</div>
			</div>
		</div>

	</section>
</template>

<style lang="scss" scoped>
	@import './layout.scss'
</style>

<script>
	import main from './main.js'
	export default main
</script>