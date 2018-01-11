<template>
	<div class="bigBox">
		<Button type="primary" @click="modal1 = true">新增</Button>
	    <Modal
	        v-model="modal1"
	        title="新增权限"
	        width="820"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <p>
	        	<Form :model="formItem" :label-width="80">
			        <FormItem label="任务名称">
			            <Input v-model="formItem.input" placeholder="输入任务名称"></Input>
			        </FormItem>

			        <FormItem label="任务类型">
			            <RadioGroup v-model="formItem.radio">
			                <Radio label="male">走访巡防</Radio>
			                <Radio label="female">远程巡防</Radio>
			            </RadioGroup>
			        </FormItem>

			        <FormItem label="执行网格">
			            <Select v-model="formItem.select">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>
			        </FormItem>

			        <FormItem label="执行周期">
			            <RadioGroup v-model="formItem.radioCycle">
			                <Radio label="day">每天</Radio>
			                <Radio label="workDay">法定工作日</Radio>
			                <Radio label="weekends">双休日</Radio>
			                <Radio label="week">每周</Radio>
			                <Radio label="months">每月</Radio>
			            </RadioGroup>
			        </FormItem>
					
			        <FormItem label="任务简述">
			            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
			        </FormItem>

					<FormItem style="text-align: right;">
			            <Button icon="loop" size="large" type="primary">切换为地图模式</Button>
			        </FormItem>

			        <FormItem label="任务路线">
			        	<Table :columns="columns1" :data="data1"></Table>
			        </FormItem>
			       
			        <FormItem>
			            <Button icon="plus-round" size="large" type="primary">添加路线</Button>
			        </FormItem>
   				</Form>
	        </p>
	    </Modal>
	</div>
   
</template>

<style lang="scss" scoped>
	@import './layout.scss';
	.ivu-modal{
		width: 820px;
	}
</style>

<script>
	import main from './main.js'
	export default main
</script>

