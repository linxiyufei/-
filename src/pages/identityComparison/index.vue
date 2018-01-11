<template>
	<section>
		<div class="identity-cont">
			<p>上传图片或者视频进行身份比对，图片或者视频中</p>
			<p>需包含人脸图像</p>
			<img src="./img/indi-bg.png" width="160" height="110" style="margin: 20px 0;" alt="">
			<Button
				type="primary"
				>上传图片</Button>
		</div>

	</section>
</template>

<style lang="scss" scoped>
	@import './layout.scss'
</style>
<style>

.identity-cont{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.identity-cont p{
	color: #8cb3d4;
	font-size: 18px;
}
</style>

<script>
	import main from './main.js'
	export default main
</script>