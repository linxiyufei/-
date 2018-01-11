<template>
	<section>
		<div class="container">
			<div class="title">
				<span>输入搜索</span>
				<Input style="width:200px" @on-click="allsearch(nameed)" icon="ios-search" v-model="nameed" placeholder="姓名或身份证"></Input>
				<button @click="modal1 = true,personMessage = '新增人员'">新增人员</button>
				<Modal
					width= "820"
					:visible.sync = "modal1"
					v-model="modal1"
					:title= "personMessage"
					@on-visible-change = "changee"
					>
					<div>
						<span class="infor">基本信息 :</span>
						<label for="">姓名 : <input type="text" :class="{errcon:isname}" v-model="formContent.name" @blur='nameCheck'></label>
						<label for="" style="margin-left: 52px;">身份证 : <input style="margin-left: 9px;" type="text" :class="{errcon:iscard}" v-model="formContent.IdNumber" ref="type3" @blur="cardCheck"></label>
						<label for="" style="margin-left: 178px;">
							民族 :
							<Select v-model="formContent.peoples" style="width:208px;margin-left: 23px;">
								<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</label>
						<label for="" style="margin-left: 52px;">电话 : <input style="margin-left:23px" type="text" :class="{errcon:istel}" v-model="formContent.phone" @blur="telCheck"></label>
						<label for="" style="margin-left: 178px;">毕业学校 : <input style="width: 206px;margin-left: 0;" type="text" v-model="formContent.school"></label>
						<label for="" style="margin-left: 52px;">
							户口性质 :
							<Select v-model="formContent.peoplesType" style="width:208px" id="nature">
								<Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</label>
						<br>
						<label for="" style="margin-left: 178px;">
							性别 :
							<input v-model="formContent.sex" disabled style="width:208px;margin-left: 23px;"></label>
							<!-- <Select v-model="model1" style="width:208px;margin-left: 23px;">
								<Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select> -->
						</label>
						<label for="" style="margin-left: 52px;">
							所属地区 :
							<input v-model="formContent.address" disabled style="width:208px;margin-left: 0;"></label>
							<!-- <Select v-model="model1" style="width:208px">
								<Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select> -->
						</label>
					</div>
					<div class="chart">
						<span class="infor">人员特征 :</span>
						<label for="">
							<input style="position: relative;top: 7px;margin-left: 0;width: 180px;" type="text" v-model="message">
						</label>
						<Button style="margin-left: 10px;" @click='addTag'>添加特征</Button>
						<div class="content">
							<Tag v-show="index !==k" :closable=true color="blue" v-for='(item,index) in messages' :key="index" @on-close="deleteTag(item,index)" >{{item.value}}</Tag>
						</div>
					</div>
					<div class="chart">
						<span class="infor">人员图片 :</span>
						<Button >上传图片</Button>
						<div style="border: 1px solid #ccc;width: 600px;margin: 10px 0 10px 129px; padding: 5px 0 0 10px;">
							<div class="demo-upload-list" v-for="item in uploadList">
								<template v-if="item.status === 'finished'">
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
									</div>
								</template>
								<template v-else>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<Upload
								ref="upload"
								:show-upload-list="false"
								:default-file-list="defaultList"
								:on-success="handleSuccess"
								:format="['jpg','jpeg','png']"
								:max-size="2048"
								:on-format-error="handleFormatError"
								:on-exceeded-size="handleMaxSize"
								:before-upload="handleBeforeUpload"
								multiple
								type="drag"
								name="uploadFile"
								action="/enclosureTQOSS/enclosureTQOSSUpload.action"
								style="display: inline-block;width:58px;">
								<div style="width: 58px;height:58px;line-height: 58px;">
									<Icon type="camera" size="20"></Icon>
								</div>
							</Upload>
							<Modal title="查看图片" v-model="visible">
								<img :src="imgUrl" v-if="visible" style="width: 100%">
							</Modal>
						</div>
					<div class="content"></div>
				</div>
					<div class="chart">
						<span class="infor">黑名单 :</span>
						<RadioGroup v-model="phone" @on-change="yes">
							<Radio label="yes" >
								<span>是</span>
							</Radio>
							<Radio label="no" >
								<span>否</span>
							</Radio>
						</RadioGroup>
					</div>
					<div slot="footer">
						<i-button type="ghost" @click="cal">取消</i-button>
            			<i-button type="primary" @click="sub">确定</i-button>
        			</div>
				</Modal>
			</div>
			<div class="table">
				<Table border ref="selection" :columns="historyColumns" :data="historyData" size="small" @on-row-dblclick="dbClick"></Table>
				<Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin: 10px 10px 0 0;"></Page>
			</div>
			<template>
    			<i-button @click="error">显示错误提示</i-button>
			</template>
			<Modal
				v-model="modal3"
				title=""
				@on-ok="buttonOk"
				@on-cancel="buttonCancel">
				<p>确认删除吗</p>
			</Modal>
		</div>
	</section>
</template>

<style scoped>
	span.infor{
		display: inline-block;
		width: 175px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		position: relative;
		top: 7px;
	}
	.ivu-modal-body{
		padding-left: 0;
	}
	input{
		width: 208px;
    	margin-left: 23px;
		height: 30px;
    	border: 1px solid #dddee1;
    	border-radius: 5px;
	}
	input{
		margin-bottom: 10px;
	}
	div.chart button{
		padding: 0 10px;
		height: 30px;
		border: 1px solid #4786FF;
		color: #FFF;
		background: #4786FF;
		top: 10px;
		right: 20px;
		margin-top: 10px;
		border-radius: 3px;
	}
	div.chart .content{
		min-height: 30px;
		margin-top: 15px;
		padding-left: 178px;
	}
	.demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}
	
	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	
	.ivu-icon {
		line-height: 58px;
	}
	.errcon {
		border-color: red
	}
</style>
<style lang="scss" scoped>
	@import './layout.scss'
</style>

<script>
	import main from './main.js'
	export default main
</script>