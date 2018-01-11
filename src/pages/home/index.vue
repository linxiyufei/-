<template>
    <div class="bg">
        <header class="header_top"> 
            <div class="in_top overflow">
                <div class="top_left fl top_div">
                    <span>东阿县雪亮工程系统</span>
                </div>
                <!--
                <div class="top_right fr top_div">
                    <div class="fr right_div">
                        <span class="write_icons icons"></span>
                        <span>个人信息</span>
                    </div>
                    <div class="fr right_div ">
                        <span class="person_icons icons"></span>
                        <span>修改密码</span>
                    </div>
                </div>
                -->
            </div>
        </header>

        <div class="contains">
            <div class="triangle1 triangle" v-show="seen=='1'">
                <p>图上作战系统基于GIS地理信息可视化平台的基础应用，为综治部门快速发现并协助处置各类可疑和突发情况的综合指挥调度需求，
      提供人员布控，基于人脸识别系统进行预警、轨迹回放、视频监控、周边人员等进行远程指挥。</p>
            </div>
            <div class="triangle2 triangle" v-show="seen=='2'">
            <p>为各职能部门提供基础视频应用服务的基础平台，各职能部门需要在本部门业务系统中接入视频基础应用的，可提供相关系统接口</p>
            </div>
            <div class="triangle3 triangle" v-show="seen=='3'">
            <p>分析各类相关人员、车辆、行为等视频智能分析结果，为各职能部门的实际业务场景进行结合应用，提供视频智能应用服务基础平台，
      各职能部门需要在本部门业务系统中接入视频智能应用的，可提供相关系统接口。</p>
            </div>
            <div class="triangle4 triangle" v-show="seen=='4'">
            <p>实现综治信息化与视频监控联网应用的融合提升，充分利用各类公共区域视频图像资源的联网共享，通过对视频图像信息的挖掘、
      分析、呈现，为特殊人群、重点青少年、校园周边、护路护线、治安防范等综治业务提供有力支撑。</p>
            </div>
            <div class="triangle5 triangle" v-show="seen=='5'">
            <p>利用视频基础应用服务子系统、视频智能应用服务子系统等能力，结合个别行业部门的视频应用的业务场景，为行业
      	部门提供个性化的界面展示及接口服务</p>
            </div>
        
            <ul>
                <li class="hoverli" @mouseover="visible(1)" @mouseout="hidden" @click="picWorkFn">
                    <img src="/static/img/home/imgdoutting.png" alt="">
                    <p>图上作战</p>
                </li>
                <li class="hoverli" @mouseover="visible(2)" @mouseout="hidden" @click="videoStaFn">
                    <img src="/static/img/home/videoyi.png" alt="">
                    <p>视频基础应用</p>
                </li>
                <li class="hoverli" @mouseover="visible(3)" @mouseout="hidden" @click="videoSmaFn">
                    <img src="/static/img/home/telectole.png" alt="">
                    <p>视频智能应用</p>
                </li>
                <li class="hoverli" @mouseover="visible(4)" @mouseout="hidden" @click="videoManFn">
                    <img src="/static/img/home/temp.png" alt="">
                    <p>视频综治应用</p>
                </li>
                <li class="hoverli" @mouseover="visible(5)" @mouseout="hidden" @click="videoIndFn">
                    <img src="/static/img/home/hang.png" alt="">
                    <p>视频行业应用</p>
                </li>
            </ul>
        </div>
        <div class="foot">
            <p>技术支撑：杭州天阙科技有限公司</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
	@import './layout.scss'
</style>
<style>

.ivu-checkbox-inner{
	width: 20px;
	height: 20px;
}
.ivu-checkbox-checked .ivu-checkbox-inner:after{
	width: 9px;
	height: 12px;
}
</style>

<script>
	import main from './main.js'
	export default main
</script>