<template>
	<section>
		<div class="searchBox">
			<span class="searchTitle">{{ msg }}</span>
			<div class="searchFrom">
				<Form :model="formItem" :label-width="80">

					<FormItem label="性别">
			            <RadioGroup v-model="formItem.radio">
			                <Radio label="male">男</Radio>
			                <Radio label="female">女</Radio>
			            </RadioGroup>
			        </FormItem>
	        

			        <FormItem label="年龄范围">
			            <Select v-model="formItem.selectAge" placeholder="请选择" >
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			        </FormItem>

			        <FormItem label="身高范围">
			            <Select v-model="formItem.selectHeight" placeholder="请选择">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			        </FormItem>

			        <FormItem label="衣着特征">
			            <Select v-model="formItem.selectClothing" placeholder="请选择">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			        </FormItem>
	      
	 
			        <FormItem label="交通工具">
			            <Select v-model="formItem.selectTraffic" placeholder="请选择">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			        </FormItem>

			        <FormItem label="区域">
			            <Select v-model="formItem.selectTraffic" placeholder="选择省/市/区县">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			            <Select v-model="formItem.selectTraffic" placeholder="选择社区/街道">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			            <Select v-model="formItem.selectTraffic" placeholder="选择网格">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			        </FormItem>

			        <FormItem>
			        	<Button type="primary" @click="handleSubmit('formInline')">开始搜索</Button>
			        </FormItem>
	    		</Form>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@import './layout.scss';
	.searchBox{
		width: 95%;
    	height: 850px;
    	background-color: #fff;
    	position: absolute;
    	left: 2%;
    	top: 4%;
	}
	.searchTitle{
		font-size: 18px;
		color: #8cb3d4;
		position: absolute;
    	left: 50%;
    	top: 118px;
    	margin-left: -77px;
	}
	.searchFrom{
		width: 700px;
		position: absolute;
		top: 185px;
    	left: 50%;
    	margin-left: -350px;
	}
	.searchFrom > form > div{
		width: 50%;
		float: left;
	}
	.searchFrom > form > div:first-child,
	.searchFrom > form > div:nth-child(6),
	.searchFrom > form > div:last-child{
		width: 100%;
	}
	.searchFrom > form > div:last-child{
		text-align: center;
	}
	.searchFrom > form > div:nth-child(6)  div{
		width: 32%;
		margin-right: 5px;
	}
	.searchFrom > form > div:nth-child(6)  div:last-child{
		width: 33%;
		margin-right: 0;
	}
	.searchFrom > form > div:last-child button{
		width: 90px;
	}
</style>

<script>
	import main from './main.js'
	export default main
</script>
