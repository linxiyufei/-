
<template>
    <Select v-model="blacklistType" @on-change="change">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import axios from 'axios'

    export default {
		props: ['ParentFunc'],
	data () {
		return {
			ip:'',
        cityList: [
                    
                ],
            }
		},
		methods:{
			change (value) {
				console.log(value)
				this.blackValue = value;
				this.ParentFunc(this.blackValue)
			}
		},
        mounted: function() {

			
            fetch('/propertyDict/Manage/findPropertyDictByDomainName.action?domainName=黑名单类型', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			for(var i = 0; i<res.length;i++){
				var data = {};
				data.value = res[i].id;
				data.label = res[i].displayName
				this.cityList.push(data)
			}
		})

		.catch(err => console.error(err))
        }
    }
</script>

<style>

</style>