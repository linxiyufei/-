<template>
	<section>
		<div class="map_div">
			<header class="map_header">
				<div class="fl input_div">
                 <Icon type="reply"></Icon>
				 <a href="#/mapEvt">返回</a>
				</div>
			
				<div class="tools_icon">
                    <div class="tools_ic fl">
                     <RadioGroup v-model="compans">
						<Checkbox><span>监测点</span></Checkbox>
						<Checkbox><span>网格员</span></Checkbox>
						<Checkbox><span>组织机构</span></Checkbox>				
					</RadioGroup>
					
					</div>
					<div class="mes_cion fl">
						<Dropdown trigger="click">
							 <Icon type="navicon-round"></Icon>
							 <span class="more_tools">更多工具</span>
							    <Dropdown-menu  slot="list">
								<Dropdown-item> 
									<Checkbox value="twitter"><span>关系亲密度</span></Checkbox>
								</Dropdown-item>
								<Dropdown-item>
									<Checkbox value="twitter">
										<span>历史轨迹信息</span>
									</Checkbox>
								</Dropdown-item>
								<Dropdown-item>
									<Checkbox value="twitter">
										<span>精密布控</span>
									</Checkbox>
								</Dropdown-item>								
							</Dropdown-menu>
						</Dropdown>
					</div>
				</div>
			</header>
          	<div class="containers">
                <div class="fl wid30">
                    <div class="selct_top">
                        <Tabs value="name1">
													
								<TabPane label="预警详情" name="name1">
                                    <ul class="solve_status">
										<li>
											<h3>预警事件信息</h3>
											<div class="containsv">
												<p><span class="now_type">类型</span><span class="things_div" id="things">暂无</span></p>
												<p><span class="now_type">时间</span><span class="things_div" id="thtime">暂无</span></p>
												<p><span class="now_type">地点</span><span class="things_div" id="locations">暂无</span></p>
												<p><span class="now_type">监测点</span><span class="things_div" id="viewpointer" >暂无</span></p>
											</div>
											  
										</li>
										<li>
											<h3>人员信息</h3>
											<div class="containsv">
												<div class="positionimg">
                                                    <img id="fileActualUrl" src="static/img/person.png" alt="">
												</div>
												<p><span class="now_type">姓名</span><span class="things_div" id="name">暂无</span></p>
												<p><span class="now_type">性别</span><span class="things_div" id="sex">暂无</span></p>
												<p><span class="now_type">年龄</span><span class="things_div" id="age">暂无</span></p>
												<p><span class="now_type">类型</span><span class="things_div" id="people">暂无</span></p>
												<p><span class="now_type">身份证号</span><span class="things_div" id="card">暂无</span></p>
												<p><span class="now_type">住址</span><span class="things_div" title="浙江省杭州市西湖区街心花园" id="adress">暂无</span></p>
												<p><span class="now_type">关联车辆</span><span class="things_div" id="pie">暂无</span></p>
											</div>
										</li>
										<li>
											<h3>预警视频/图片</h3>
											<div class="video_div">
												<img id="bbb" src="" alt="">
											</div>
										  </li>
									  </ul>
								</TabPane>
								<TabPane label="处置状态" name="name2">
								<div class="timer_div">
									<Timeline>
										<TimelineItem>
											<p class="time">预警上报</p>
											<p class="content">2017/11/29 15:40:36</p>
										</TimelineItem>
										<TimelineItem>
											<p class="time">处置中</p>
											<p class="content">2017/11/29 15:40:36</p>
										</TimelineItem>
										<TimelineItem>
											<p class="time">下发协办<span class="blues">网格员李哈哈</span></p>
											<p class="content">2017/11/29 15:40:36</p>
										</TimelineItem>
										<TimelineItem>
											<p class="time">反馈消息<span class="blues">网格员李哈哈</span></p>
											
											<p class="content normal_div">"无异常"</p>
											<p class="content">2017/11/29 15:40:36</p>
										</TimelineItem>
									</Timeline>
								</div>		
								</TabPane>		
							</Tabs>
					  	</div>
				 	</div>
					<div class="fl wid70">
                     	<div class="map_div">
							<div id="map" class="map"></div>
							<div id="popup" class="ol-popup">
								<a href="javascript:;" id="popup-closer" class="ol-popup-closer"></a>
								<div id="popup-content" class="popup-content">
									 <p id="top_name" style="width: 100%;text-indent:10px; height: 34px;line-height: 34px;border-bottom: 2px solid #6e6e6f;color: #fff;font-size: 16px;font-weight: bold;" class="top_name">
										 柯城区司法行政法律服务中心
									 </p>
                                    <div class="bnc">
                                     <p class="time">负责人: <span id="personto"></span></p>
									 <p class="time">联系方式: <span id="tosolve"></span></p>
									 <button id="tosolves" class="timepp" @click="gettoslovess" style="padding:5px 12px;cursor:pointer; color:#fff;text-align:center;">下发办理</button>
									</div>

								</div>
							</div>
					 	</div>
					</div>
				</div>
			</div>
  		</div>
	</section>
</template>

<style lang="scss" scoped>
@import "./layout.scss";
</style>

<style>
.ivu-row {
  height: 100%;
}
.timepp {
  display: block;
  margin: o auto;
  margin-left: 107px;
  padding: 5px 12px;
  color: #fff;
  text-align: center;
  background: #5dd178;
  outline: none;
  border: none;
  border-radius: 19px;
}
.time {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
.map_div>i{
	display:none!important;
}
.time-item{
	border-left: 2px solid #dedede;
}
.ol-popup{
	height: auto!important;
	padding-bottom: 10px!important;
}
.bnc p.time{
    text-indent: 10px;
}
.ivu-tabs-bar{
	margin-bottom: 0!important;
}
</style>


<script>
import main from "./main.js";
export default main;
</script>