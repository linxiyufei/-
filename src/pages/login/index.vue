<template>
	<div class="main_bg">
       <div class="con_div">
           <div class="error_div">
                 <p>用户名或密码错误,请重新输入!</p>
                 <span id="close_error">&times;</span>
           </div>
            <div class="incon_div">
                  <h3>东阿县雪亮工程系统</h3>
                  <div class="input_div" :class="{ 'borbtm': nameselect }">
                        <div class="error_tip" v-if="count">
                                <span>账号不能为空!</span>
                           </div>
                       <div class="fl icon_input">
                            <img src="/static/img/login/name.png" alt="">
                       </div>
                       <div class="input_box">
                            <input type="text" @change="changetip" v-model="user" @focus="ischecked" v-bind:class="{activeinput: isnamechecked}" @blur="ischeckedfl" value="">
                       </div>
                  </div>
                  <div class="input_div" :class="{ 'borbtm': passwordselect }">
                      <div class="error_tip" v-if="passwordCheck">
                           <span>密码不能为空!</span>
                      </div>
                        <div class="fl icon_input">
                             <img src="/static/img/login/password.png" alt="">
                        </div>
                        <div class="input_box">
                        	<input type="password" @change="changetip" v-model="password" @focus="ispasschecked" v-bind:class="{activeinput: ispasswordchecked}" @blur="ispasscheckedfl" value="">
                        </div>
                   </div>
                   
                   <div class="remember_user">
                        <div class="squaredOne">
                                <input type="checkbox" value="None" id="squaredOne" name="check" :checked.sync="single" @on-change="bbb" />
                                <label for="squaredOne"></label>
                        </div>
                        <p class="remembertit">记住用户名</p>
                   </div>

                   <div class="login_div" @click="loginsend" style="user-select:none;">
                        <span class="login_show">登录</span>
                        <span class="login_waiting"></span>
                   </div>
            </div>
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