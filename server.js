var _ = require('underscore');
var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),

userList = [];
app.use('/', express.static(__dirname+'/'));

server.listen(process.env.PORT || 8623,function(){
    console.log("监控8623");
});//publish to
//emit发送,on接受
//handle the socket
io.sockets.on('connection', function(socket) {
    /**
     * 新用户登录
     */
    socket.on('login', function(userInfo) {
        //判断当前对象是否已经注册
        if(ary_ContinsValue(userList, userInfo.u_name)){
            console.log("名字重复")
            socket.emit('nickExisted');
        }else{
            console.log('注册成功');
            socket.nickname = userInfo.u_name;
            socket.socketId = userInfo.u_id;
            socket.nickImg = userInfo.u_img;
            userList.push(userInfo);
            socket.emit('loginSuccess');
            io.sockets.emit('system',userInfo,userList.length,'login');//全局消息
        }

    });
    /***
     * 用户离线
     */
    socket.on('disconnect', function() {
        if (socket.nickname != null&&socket.socketId!=null) {
            console.log('断掉链接' + socket.nickname);
            userList.splice(ary_ContinsIndex(userList, 'u_name', socket.nickname, 'u_id', socket.socketId), 1);
            socket.broadcast.emit('systemExit', socket.nickname,socket.socketId, userList.length, 'logout');
        }
    });
    /***
     * 发送消息
     */
    socket.on('postMsg', function(userId,nickname,nickImg,msg,type) {
        socket.emit('newMsg', socket.nickname,nickImg, msg,type);
    });
    /***
     * 新的私人消息
     */
    socket.on('PrivateMsg', function(userId,type) {
        console.log(type);
        var toSocket = _.findWhere(userList,{u_id:userId});
        console.log(toSocket);
        socket.emit('newPrivateMsg', socket.nickname,toSocket.u_img,type);
    });
});

/*数组中存在对象的索引*/
function ary_ContinsIndex(ary, d, v, dc, vc) {
    var newIndex= ''
    ary.forEach(function(item,index){
        if(dc!=null){
            if (dc != null) {//条件筛选;
                if (eval((dc != null ? 'item.' : '') + dc) === vc) {
                    if (eval((d != null ? 'item.' : '') + d) === v) {
                        newIndex = index
                    }
                }
            }

        }
    });
    return newIndex;
};
/*数组中的对象是否存在某个值,返回Boolean*/
function  ary_ContinsValue(ary,val){
    var isHave= false;
    if(ary.length>0){
        for(var i=0;i<ary.length;i++){
            if(ary[i].u_name!=null){
                if(ary[i].u_name==val){
                    isHave = true;
                }
            }

        }
    }
    return isHave;
}