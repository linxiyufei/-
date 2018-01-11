<template>
	<section>
		<Table border ref="selection" :columns="columns7" :data="data6"></Table>
	</section>
</template>
<style>
	.ivu-btn-small{
		padding: 0 0;
		margin-right: 0 !important;
	}
	.ivu-table th{
		background-color: #FFF;
	}
</style>
<style lang="scss" scoped>
	@import './layout.scss'
</style>
<script>
	import main from './main.js'
	export default main
</script>