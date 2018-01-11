<template>
	<section>
		<div class="container">
			<div class="title">
				<span>输入搜索</span>
				
				<Input style="width:200px" @on-click="allsearch(nameed)" icon="ios-search" v-model="nameed" placeholder="车牌或车主姓名"></Input>
				<button @click="adds">新增车辆</button>
				<Modal
				width= "820"
				v-model="modal1"
				title="新增车辆" 
				@on-ok="addcar"
			>
				<div>
					<div>
						<span class="infor">基本信息 :</span>
						<label for="" style="position: relative;left: -10px;" >车主身份证 : <input @change="searchmessage" v-model="cardid" type="text"></label>
						<label for="" style="position: relative;left: 10px;">车牌号码 : <input v-bind:class="{ rederror: iscar }" @change="isnumber" v-model="cardobj.number" type="text" @click="isnumber"></label>
						
						<label for="" style="position: relative;left: 35px;">
							品牌 :
							<i-select :model.sync="brandid" v-model="brandid" style="width:200px">
									<i-option v-for="item in brand" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
							</i-select>
						</label>
						<label for="" style="margin-left: 178px;"  >车主电话 : <input readonly type="text" v-model="cardobj.phone"></label>
						<label for="" style="position: relative;left: 12px;">车身颜色 : <input v-model="cardobj.colorst" type="text"></label>
						<label for="" style="position: relative;left: 12px;">
								车牌颜色 :
									<i-select :model.sync="colorid" v-model="colorid" style="width:200px">
									<i-option v-for="item in idcolor" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
								</i-select>
							<!-- <Select v-model="model1" style="width:200px">
								<Option v-for="item in idcolor" :value="item.id" :key="item.displayName">{{ item.displayName }}</Option>
							</Select> -->
						</label>
						<br>
						<label for="" style="margin-left: 178px;">
							号牌类型 :
							<i-select :model.sync="cardtypeid" v-model="cardtypeid" style="width:200px">
									<i-option v-for="item in cardtype" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
							</i-select>
						</label>
						<label for="">车主姓名 : <input readonly  type="text" v-model="cardobj.name"></label>
						<input type="hidden" v-model="cardobj.id">
						<label for="" style="position: relative;left: 10px;">属地 : <input v-model="cardobj.belongingPlace" type="text"></label>
					</div>
					<span class="infor">车辆图片 :</span>
					<div style="border: 1px solid #ccc;width: 600px;margin: 10px 0 10px 129px; padding: 5px 0 0 10px;">
							<div class="demo-upload-list" v-for="item in uploadList">
								<template v-if="item.status == 'finished'">
									<img :src="item.url" />
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
								action="http://192.168.10.229:8086/enclosureTQOSS/enclosureTQOSSUpload.action"
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
			
			
			</Modal>
			
			
            <Modal
				width= "820"
				v-model="updatamodal"
				title="修改车辆信息"
				@on-ok="addcars"
				>
				<div>
					<span class="infor">基本信息 :</span>
					<label for="" style="position: relative;left: -10px;" >车主身份证 : <input @change="searchmessage" v-model="cardids" type="text"></label>
					<label for="" style="position: relative;left: 10px;">车牌号码 : <input v-bind:class="{ rederror: iscar }" @change="isnumbers" v-model="cardobjs.number" type="text"></label>
					
					<label for="" style="position: relative;left: 35px;">
						品牌 :
						<i-select :model.sync="brandids" v-model="brandids" style="width:200px">
								<i-option v-for="item in brand" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
						</i-select>
					</label>
					<label for="" style="margin-left: 178px;"  >车主电话 : <input readonly type="text" v-model="cardobjs.phone"></label>
					<label for="" style="position: relative;left: 12px;">车身颜色 : <input v-model="cardobjs.colorst" type="text"></label>
					<label for="" style="position: relative;left: 12px;">
							车牌颜色 :
							 <i-select :model.sync="colorids" v-model="colorids" style="width:200px">
								<i-option v-for="item in idcolor" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
							</i-select>
						<!-- <Select v-model="model1" style="width:200px">
							<Option v-for="item in idcolor" :value="item.id" :key="item.displayName">{{ item.displayName }}</Option>
						</Select> -->
					</label>
					<br>
					<label for="" style="margin-left: 178px;">
						号牌类型 :
						<i-select :model.sync="cardtypeids" v-model="cardtypeids" style="width:200px">
								<i-option v-for="item in cardtype" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
					  </i-select>
					</label>
					<label for="">车主姓名 : <input readonly  type="text" v-model="cardobjs.name"></label>
					<input type="hidden" v-model="cardobj.id">
					<label for="" style="position: relative;left: 10px;">属地 : <input v-model="cardobjs.belongingPlace" type="text"></label>
				</div>
				<div class="chart">
					<span class="infor">车辆图片 :</span>
					<button>上传图片</button>
					
					<div class="content"></div>
				</div>
			</Modal>

           <Modal
				width= "820"
				v-model="viewcar"
				title="查看车辆信息">
				<div>
					<span class="infor">基本信息 :</span>
					<label for="" style="position: relative;left: -10px;" >车主身份证 : <input  disabled="disabled" readonly @change="searchmessage" v-model="cardidv" type="text"></label>
					<label for="" style="position: relative;left: 10px;">车牌号码 : <input  disabled="disabled" readonly v-model="cardobjv.number" type="text"></label>
					<label for="" style="position: relative;left: 35px;">
						品牌 :
						<i-select v-model="brandidv" disabled="disabled" style="width:200px">
								<i-option v-for="item in brand" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
						</i-select>
					</label>
					<label for="" style="margin-left: 178px;"  >车主电话 : <input  disabled="disabled" type="text" v-model="cardobjv.phone"></label>
					<label for="" style="position: relative;left: 12px;">车身颜色 : <input  disabled="disabled" v-model="cardobjv.colorst" type="text"></label>
					<label for="" style="position: relative;left: 12px;">
							车牌颜色 :
							 <i-select  disabled="disabled" :model.sync="coloridv" v-model="coloridv" style="width:200px">
								<i-option v-for="item in idcolor" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
							</i-select>
						<!-- <Select v-model="model1" style="width:200px">
							<Option v-for="item in idcolor" :value="item.id" :key="item.displayName">{{ item.displayName }}</Option>
						</Select> -->
					</label>
					<br>
					<label for="" style="margin-left: 178px;">
						号牌类型 :
						<i-select  disabled="disabled" :model.sync="cardtypeidv" v-model="cardtypeidv" style="width:200px" >
								<i-option v-for="item in cardtype" :value="item.id" :key="item.displayName">{{ item.displayName }}</i-option>
					  </i-select>
					</label>
					<label for="">车主姓名 : <input  disabled="disabled" readonly  type="text" v-model="cardobjv.name"></label>
					<input type="hidden" v-model="cardobjv.id">
				</div>
				<div class="chart">
					<span class="infor">车辆图片 :</span>
					<button>上传图片</button>
					
					<div class="content"></div>
				</div>
			</Modal>


			</div>


			  
			<div class="table">
				<Table border ref="selection" :columns="historyColumns" :data="historyData" size="small" @on-row-dblclick="dbClick"></Table>
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" style="margin: 10px 10px 0 0;"></Page>
			</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
/*  */
	.demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;  
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
	}
	/*  */

	span.infor{
		display: inline-block;
		width: 175px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.ivu-modal-body{
		padding-left: 0;
	}
	input{
		width: 100px;
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