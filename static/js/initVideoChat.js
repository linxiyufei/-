var namespace = 'com.tianque.message.user';
var clientid = 'user5';  
var appId = "1234567890abcdefg";



/*
var socketHost='115.236.101.203:18001';

var callvideoUrl='http://115.236.101.203:18082/callvideo';
var sendMsgUrl='http://115.236.101.203:18082/msg/agent/api/sendMsg';
*/
var ip = "192.168.10.98";
var rIP = "115.236.101.203";
var socketHost='115.236.101.203:18001';

var callvideoUrl='http://115.236.101.203:18082/msg/agent/api/callvideo';
var sendMsgUrl='http://115.236.101.203:18082/msg/agent/api/sendMsg';

var socket =  io.connect('http://'+socketHost+'/'+namespace+'?clientid='+clientid);  
socket.on('connect', function() {  
    // output('<span class="connect-msg">Client has connected to the server!</span>');  
    console.log('Client has connected to the server!')
});  

socket.on('message', function(data) {  
    // output('<span class="username-msg">message:</span> ' + data);  
    console.log('message: ', data)
});  
socket.on('callvideo', function(data) {  
    output('<span class="username-msg">message:</span> ' + data);  
//   alert(data);
    console.log('callvideo :', data);
    try{
        // var obj = eval('('+data+')');
        // // alert(obj.convId);
        // if(obj.status==0){
        //     // doChattingRoomEnter(obj.convId,obj.targetId);
            
        // }else{
        //         if (wd) {
        //             wd.close();
        //     }
        // }
        var obj = eval('('+data+')');
        if(confirm("确定视频通话？")) {
        //   alert(obj.convId);
          sendRespMessage(obj.convId,obj.sourceId,data.appId,0);
          doChattingRoomEnter(obj.convId,obj.targetId, appId);
        }else{
            sendRespMessage(obj.convId,obj.sourceId,data.appId,1);
        }
        
    }catch(e){
        console.log(e);
    }
});  

socket.on('disconnect', function() {  
    output('<span class="disconnect-msg">The client has disconnected!</span>'); 
});  


this.selfSocket = socket;
function sendDisconnect() {  
        socket.disconnect();  
}  

socket.on('callResp', function(data) {  
    output('<span class="username-msg">message:</span> ' + data);  
//   alert(data);
// console.log(data);
try{
    var obj = eval('('+data+')');
    // alert(obj.convId);
    //  alert(obj.status);
    if(obj.status==0){
        $("#videoLoadMask").hide();        
        doChattingRoomEnter(obj.convId,obj.targetId,appId);
        if (wd) {
            wd.focus();
        }
    }else{
        // 提示对方一挂断挂断
        alert('对方已挂断')
        $('#videoLoadMask').hide();
        console.log(wd);
        if (wd) {
            wd.close();
        }
    }
}catch(e){
    console.log(e);
}
});  
function callvideo(status){
    // var targetUser = $('#targetUser').val();  
    // var targetUser = localStorage.getItem('videoUserName') || '123' ;
    var targetUser =  '123' ;
    var jsonObject = {"sourceId": clientid,  
                    "targetId": targetUser,  
                    "namespace": namespace,  
                    "convId": 'aaaaa',  
                    "status": status || '0',
                    "appId": appId};
    setTimeout(function(){
        
        $.ajax({
            url : callvideoUrl,
            contentType: "application/json; charset=utf-8",
            type : "POST",
            data : JSON.stringify(jsonObject),
            async : true,
            success : function(data) {
                
            },
            error : function(er) {
                //swal("请求token失败!");
                //alert(er); 
            }
        });
    },1);
}

window.Link = {};
window.Link.callvideo = callvideo;
function sendMessage() {  
    // var message = $('#msg').val();  
    // $('#msg').val('');  
    
    // var targetUser = $('#targetUser').val();  
    // var targetUsers = targetUser!=''?[targetUser]:'';
    var targetUsers = 'czy';
    var jsonObject = JSON.stringify({
                    "mgsId":"1",
                    "namespace": namespace,  
                    "targetClientId": targetUsers,  
                    "msgContent": message});  
    //alert(JSON.stringify(jsonObject))
    $.ajax({ 
            type: "post", 
            url: sendMsgUrl, 
            contentType: "application/json; charset=utf-8",
            //data: JSON.stringify(jsonObject),
            data: jsonObject,
        //	dataType: "json", 
            success: function (data) { 
                //	alert(data.msg);
            }, 
            error: function (XMLHttpRequest, textStatus, errorThrown) { 
                    alert(errorThrown); 
            } 
    }); 
}  

function sendRespMessage(convId,targetUser,appId,status) {  
    var data = JSON.stringify(
                      {"sourceId": clientid,  
                      "targetId": targetUser,  
                      "convId": convId,  
                      "status": status,
                      "appId": appId});  
    var targetUsers = targetUser!=''?[targetUser]:'';
    var jsonObject = JSON.stringify({
                      "mgsId":"1",
                      "namespace": namespace,  
                      "targetClientId": targetUsers,  
                      "msgType": 'callResp',  
                      "msgContent": data});  
    $.ajax({ 
            type: "post", 
            url: sendMsgUrl, 
            contentType: "application/json; charset=utf-8",
            //data: JSON.stringify(jsonObject),
            data: jsonObject,
        //	dataType: "json", 
            success: function (data) { 
                //	alert(data.msg);
            }, 
            error: function (XMLHttpRequest, textStatus, errorThrown) { 
                    alert(errorThrown); 
            } 
    }); 
    
}  

function output(message) {  
                var currentTime = "<span class='time'>" +  moment().format('HH:mm:ss.SSS') + "</span>";  
                var element = $("<div>" + currentTime + " " + message + "</div>");  
    // $('#console').prepend(element);  
}  

var wd;
function doChattingRoomEnter(id,userid,appId) {
    //console.log("doChattingRoomEnter userid="+userid);
    var height=953;
    var width=1300;
    //获得窗口的垂直位置
    var t = (window.screen.availHeight - 30 - height) / 2;
    //获得窗口的水平位置
    var l = (window.screen.availWidth - 10 - width) / 2;
    wd = window.open ("https://115.236.101.203:14443/web2/singlevideo.html?convId="+id+"&isCameraClose=0&userType=1&resolution=640*480&userId="+userid+"&appId="+appId,
            "newwindow", "height="+height+", width="+width+", top="+t+",left="+l+", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
    
//	console.log("wd="+wd);
}

$('.ol-popup, .video-list').on('click', '.link-video-call-btn', function() {
    // if ($(this).attr('data-status') == 'call') {
    //     return false;
    // }
    // $(this).attr('data-status', 'call')
    callvideo();
    $('#videoLoadMask').show();
    console.log(123)
});

$('#videoLoadMask').on('click', '.link-close-btn', function() {
    sendRespMessage('aaaaa', localStorage.getItem('videoUserName'), appId, 1)
    console.log('挂断');
    $('#videoLoadMask').hide()
})