<template>
	<section>
		<div class="point-browse-cont">
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
	.point-browse-cont{
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
		width: 400px;
		height: 160px;
		display: flex;
		background: rgba(0, 0, 0, .7);
	}
	.popup-content{
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	
</style>
<style>

.look-user-list{
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
}
.look-user-list span:nth-child(1), .look-user-list span:nth-child(2){
	width: 50px;
	text-align: left;
}
</style>

<script>
	import main from './main.js'
	export default main
</script>