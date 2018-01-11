<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import '../static/css/reset-1.3.5.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/*滚动条整体部分,必须要设置*/
::-webkit-scrollbar{
	width: 3px;
	height: 5px;
	background-color: transparent;
}
/*滚动条的轨道*/
::-webkit-scrollbar-track{
	box-shadow: inset 0 0 5px rgba(0,0,0,.3);
	background-color: transparent;
}
/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background: #000;
}
/*滚动条的上下两端的按钮*/
::-webkit-scrollbar-button{
	height: 10px;
	background-color: #000;
}
</style>
