
<template>
	<nav :class="[{max: hasChild}]">
		<div class="logo-mod">
			<img src="../../../static/img/logo.png">
		</div>

		<!-- 二级目录 -->
		<div :class="['nav-body', { 'has-child': hasChild } ]">
			<template v-if="hasChild">
				<div v-for="(val,index) in nav" class="nav-inner-mod">
					<template v-if="val.children">
						<header @click="openChild">
							<img :src="val.icon">
							<span>{{ val.name }}</span>
						</header>
					</template>
					<router-link 
						v-else
						class="nav-link" 
						:to="val.to"
						:key="index"
					>
						<img :src="val.icon">
						<span>{{ val.name }}</span>
					</router-link>

					<div v-if="val.children" class="main">
						<router-link
							v-for="(cval, cindex) in val.children" 
							class="nav-link" 
							:to="cval.to"
							:key="cindex"
						>
							{{ cval.name }}
						</router-link>
					</div>
				</div>
			</template>
			<!-- 一级目录 -->
			<template v-else>
				<router-link 
					v-for="(val, index) in nav" 
					class="nav-link" 
					:to="val.to"
					:key="index"
				>
					<img :src="val.icon">
				</router-link>
			</template>
		</div>

		<footer :class="{show: hasChild}" @click="changeNavSize">
			<img src="./img/openIcon.png">
			<span>收缩菜单</span>
		</footer>
	</nav>
</template>

<script>
	import main from './main.js'
	export default main
</script>

<style lang="scss" scoped>
	@import './layout.scss'
</style>