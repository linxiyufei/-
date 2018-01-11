
export default {
	name: '',
	data () {
		return {
			msg: '',
			cityList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			model1: '',
			content: '刷新',
			sites:["预警分级统计柱状图","事件类型比例扇形统计图","当前区划各单位排名"]
		}
	},
	mounted: function(){
		setTimeout(function () {
			var myChart1 = echarts.init(document.querySelector('.chart3-draw'));
			
			var option = {
				color: ['#3398DB'],
				tooltip : {
					trigger: 'axis',
					axisPointer : {            
						type : 'shadow'        
					}
				},
				grid: {
					top: '10%',
					left: '3%',
					right: '4%',
					bottom: '5%',
					containLabel: true
				},
				xAxis : [
					{
						type : 'category',
						data : ['衢江区', '柯城区', '龙游县', '江山市', '常山县', '开化县'],
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						axisLine: {
							show: false
						}
					}
				],
				yAxis : [
					{
						type : 'value',
						min:5,
						max: 15,
						splitNumber: 2,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						}
					}
				],
				series : [
					{
						name:'直接访问',
						type:'bar',
						barWidth: '20%',
						data:[7, 9, 16, 11, 10, 8],
						itemStyle: {
							normal: {
								show: true,
								color: '#4F7EFF',
								barBorderRadius: 50,
								borderWidth: 0,
								borderColor: '#FFF'
							}
						}
					}
				]
			};
			
			myChart1.setOption(option);
			
			var myChart2 = echarts.init(document.querySelector('.chart2-draw'));
			var option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: '70%',
					y: 'center',
					data:['特殊人员外出','群体聚集','特殊人群聚集','敏感区域入侵','消防通道占用'],
					align: 'left'
				},
				series: [{
					name: '',
					type: 'pie',
					radius: ['50%', '70%'],
					center: ['30%', '50%'],
					clockwise: false,
					data: [{
						value: 45,
						name: '特殊人员外出'
					}, {
						value: 25,
						name: '群体聚集'
					}, {
						value: 15,
						name: '特殊人群聚集'
					},{
						value: 10,
						name: '敏感区域入侵'
					}, {
						value: 35,
						name: '消防通道占用'
					}],
					label: {
						normal: {
							show: false,
							textStyle: {
								color: '#999',
								fontSize: 14,
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							borderWidth: 10,
							borderColor: '#ffffff',
						},
						emphasis: {
							borderWidth: 0,
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}],
				color: [
					'#F25F7E',
					'#F8B44D',
					'#4786FF'
				],
				backgroundColor: '#fff'
			};
			
			myChart2.setOption(option);
			window.onresize = function () {
				myChart1.resize();
				myChart2.resize();
			};
			
		},500)
	}
}