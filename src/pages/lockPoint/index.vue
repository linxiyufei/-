<template>
	<section>
		<div class="lock-point-cont">
			<div id="map" class="map"></div>
			<div id="popup" class="ol-popup">
				<a href="javascript:;" id="popup-closer" class="ol-popup-closer"></a>
				<div id="popup-content" class="popup-content">
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@import './layout.scss';
	.lock-point-cont{
        width: 100%;
		height: 100%;
		position: relative;
    }
    #map{
        width: 100%;
        height: 100%;
	}
	.ol-popup-closer:after{
		color: #fff;
	}
	.ol-popup{
		overflow-y: auto;
		display: flex;
		background: rgba(0, 0, 0, .7);
	}
	.popup-content{
		width: 100%;
		height: 100%;
	}
</style>

<script>
	import main from './main.js'
	export default main
</script>