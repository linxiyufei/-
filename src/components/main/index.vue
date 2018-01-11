
<template>
	<section class="app-body">
		
		<!-- 侧边组件 -->
		<AsideNav :nav="subnav" :has-child="hasChild"></AsideNav>

		<main>
			<header>
				<div class="banner-mod">
					<img src="/static/img/proName.png">
				</div>
				<div class="user-info-mod">
					<div class="logo-usr-mod">
						<figure>
							<img :src="userInfo.icon">
						</figure>
						<div>{{ usermes.USER_NAME}}</div>
					</div>

					<div class="news-info-mod">
						<img src="/static/img/header/newsIcon.png">
					</div>
					<div class="set-info-mod">
						<img src="/static/img/header/settingIcon.png">
					</div>
					<div class="exit-info-mod">
						<img src="/static/img/header/exitIco.png">
					</div>
				</div>
				<!-- 主导航 -->
				<VSelect>
					<div class="header">{{ navTitle }}</div>
					<nav class="body">
						<!-- <a href="/login/xueLiang/index.jsp#index" class="router-link-active">返回主页</a> -->
						<a href="#/home" class="router-link-active">返回主页</a>
						<router-link
							v-for="(menu, index) in nav"
							:to="menu.to"
							@click="hello(index)"
							:key="index"
						>{{ menu.name }}</router-link>
					</nav>
				</VSelect>
				<!-- // 主导航 -->

			</header>
			<div class="app-pages">
				<router-view></router-view>
			</div>
		</main>
	</section>
</template>

<style lang="scss" scoped>
	@import './layout.scss'
</style>

<script>
	import main from './main.js'
	export default main
</script>