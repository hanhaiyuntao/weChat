//联系人列表json
var friendList = {
    'code':'200',
    'msg':'请求成功',
    'data':[
        {
            'group':'新的朋友',
            'friend':[
                {
                    'headImg':'chats/head/1.jpg',
                    'nickName':'新的朋友'
                }
            ]
            },
        {
            'group':'公众号',
            'friend':[
                {
                    'headImg':'chats/head/2.jpg',
                    'nickName':'公众号'
                }
            ]
            },
        {
            'group':'A',
            'friend':[
                {
                    'headImg':'chats/head/3.jpg',
                    'nickName':'马化腾'
                },
                {
                    'headImg':'chats/head/4.jpg',
                    'nickName':'张小龙'
                },
                {
                    'headImg':'chats/head/5.jpg',
                    'nickName':'马云'
                },
            ]
        },
        {
            'group':'B',
            'friend':[
                {
                    'headImg':'chats/head/6.jpg',
                    'nickName':'王健林'
                },
                {
                    'headImg':'chats/head/7.jpg',
                    'nickName':'许家印'
                },
                {
                    'headImg':'chats/head/8.jpg',
                    'nickName':'张一鸣'
                },
            ]
        },
        {
            'group':'C',
            'friend':[
                {
                    'headImg':'chats/head/9.jpg',
                    'nickName':'雷军'
                },
                {
                    'headImg':'chats/head/10.jpg',
                    'nickName':'丁磊'
                },
                {
                    'headImg':'chats/head/11.jpg',
                    'nickName':'刘强东'
                },
            ]
        },
        {
            'group':'D',
            'friend':[
                {
                    'headImg':'chats/head/12.jpg',
                    'nickName':'李彦宏'
                },
                {
                    'headImg':'chats/head/14.jpg',
                    'nickName':'任正非'
                },
                {
                    'headImg':'chats/head/15.jpg',
                    'nickName':'柳传志'
                },
            ]
        }
    ]
};
//程序列表json
var iconList = {
    'code':'200',
    'msg':'请求成功',
    'data':[{
        'icon':'chats/icon/icon.png',
        'text':'全部收藏'
    },{
        'icon':'chats/icon/icon1.png',
        'text':'链接'
    },{
        'icon':'chats/icon/icon2.png',
        'text':'相册'
    },{
        'icon':'chats/icon/icon3.png',
        'text':'笔记'
    }, {
        'icon':'chats/icon/icon4.png',
        'text':'文件'
    },{
        'icon':'chats/icon/icon5.png',
        'text':'音乐'
    },{
        'icon':'chats/icon/icon6.png',
        'text':'标签'
    },
    ]
}



var chatList = [
    {
}
]
//界面初始化
$(function () {
    //初始化新的聊天
    var weChat = new WeChat();
    weChat.init();
    personList();//联系人列表
    programList();//程序列表
    /*
    * 底部扩展备份与恢复
    * */
    $('#doc-dropdown-js').dropdown({ justify: '#doc-dropdown-justify-js' });
    $(".office_text").panel({ iWheelStep: 32 });
});


//聚焦变色与失焦去色
$("#input_box").focus(function () {
    $('.windows_input').css('background', '#fff');
    $('#input_box').css('background', '#fff');
});
$("#input_box").blur(function () {
    $('.windows_input').css('background', '');
    $('#input_box').css('background', '');
});
//三个图标的显示与隐藏效果
$(".sidestrip_icon a").click(function () {
    $(".sidestrip_icon a").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
    $(".middle").hide().eq($(this).index()).show();
});
//加载联系人列表一级
function personList(){
    var friendUl = '';
    var result = friendList.data;
    for(var i= 0;i<result.length;i++){
            friendUl +=' <li>';
            friendUl +=' <p>'+result[i].group+'</p>';
            friendUl +=childList(result[i].friend)
            friendUl +=' </li>';
    }
    $("#friends_list").append(friendUl);
}
//加载联系人二级
function childList(data){
    var str = ''
    for(var j = 0;j<data.length;j++){
        str +=' <div class="friends_box">';
        str +='<div class="user_head"><img src="'+data[j].headImg+'" /></div>';
        str +='<div class="friends_text">';
        str +='<p class="user_name">'+data[j].nickName+'</p>';
        str +='</div>';
        str +=' </div>';
    }
    return str;
}
//加载程序列表
function  programList(){
    var iconUl = '';
    var result = iconList.data;
    if(result!=null&&result!=''){
        for(var i = 0;i<result.length;i++){
            iconUl+=' <li class="'+(i==0?"icon_active":"")+'">'
            iconUl+=' <div class="icon"><img src="'+result[i].icon+'" alt="" /></div>'
            iconUl+=' <span>'+result[i].text+'</span>'
            iconUl+=' </li>'
        }
    }
    $("#icon_list").append(iconUl);
}
//三个图标切换
$("#si_1").click(function(){
    $("#si_2").css("background","");
    $("#si_3").css("background","");
    $(this).css("background","url(chats/icon/head_2_1.png) no-repeat");
});
$("#si_2").click(function(){
    $("#si_1").css("background","");
    $("#si_3").css("background","");
    $(this).css("background","url(chats/icon/head_3_1.png) no-repeat");
});
$("#si_3").click(function(){
    $("#si_1").css("background","");
    $("#si_2").css("background","");
    $(this).css("background","url(chats/icon/head_4_1.png) no-repeat");
});

//正确函数
function snackbar(msg) {
    var content = $('<div class="snackbar el-message">' + msg + '</div>');
    if ($('.snackbar').length < 1) {
        content.appendTo($('body'));
        content.animate({
                top: 50,
                opacity: 1,


            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(1500).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    } else {
        $('.snackbar').not($(this)).remove();
        content.appendTo($('body'));
        content.animate({
                top: 50,
                opacity: 1
            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(1000).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    }

}
//错误提示函数
function errorSnackbar(msg) {
    var content = $('<div class="errorbar el-message">' + msg + '</div>');
    if ($('.snackbar').length < 1) {
        content.appendTo($('body'));
        content.animate({
                top: 50,
                //opacity: .8
            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(2000).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    } else {
        $('.snackbar').not($(this)).remove();
        content.appendTo($('body'));
        content.animate({
                top: 50,
                // opacity: .8
            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(1000).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    }

}

/*
* 聊天部分开始
* */
var userInfo = {};
function WeChat(){
    this.socket = null;
};
WeChat.prototype ={
    init:function(){
        console.log('进入');
        var that = this;
        this.socket = io.connect('http://192.168.1.16:8623');
        this.socket.on('connect',function(){
            $("#nickWrapper").css("display","block");
            $("#info").html("起个名字把");
            $("#nicknameInput").focus();
        });
        this.socket.on('nickExisted',function(){
            $("#info").html("名字重复,换一个试试")
        });
        this.socket.on('loginSuccess',function(){
            $(document).attr("title","微聊"+$("#nicknameInput").val());
            $("#loginWrapper").css("display","none");
            snackbar('登录成功')
            $("#input_box").focus();
        });
        this.socket.on('error',function(){
           if($("#loginWrapper").is("display")=='none'){
                $("#info").html("连接失败!!!");
           }else{

           }
        });
        this.socket.on('system', function(userInfo, userCount, status) {
            var msg = userInfo.u_name + (status == 'login' ? ' 在线' : ' 离线');
            that._displayNewMsg('系统 ',userInfo, msg,1);//全局发送消息
            snackbar(msg);
            $("#status").html(userCount + (userCount > 1 ? ' 个用户' : ' 个人') + '在线');
            $("#chatNum").html(userCount);
        });
        this.socket.on('systemExit', function(userName, userId,userCount, status) {
            console.log("用户"+userName+'离开');
            var msg = userName + (status == 'login' ? ' 在线' : ' 离线');
            var liLength = $("#user_list").find("li").length;
            for(var i = 0;i<liLength;i++){
                if(userId==$("#user_list>li").eq(i).attr("data-id")){
                    $("#user_list>li").eq(i).find(".user_message").html(msg);
                }
            }
            snackbar(msg);
            $("#status").html(userCount + (userCount > 1 ? ' 个用户' : ' 个人') + '在线');
            $("#chatNum").html(userCount);
        });
        $("#loginBtn").click(function(){
            var nickName = $("#nicknameInput").val();
            var nickId = Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
            var nickImg = RandomNumBoth(3,16);
            userInfo = {
                'u_name':nickName,
                'u_id':nickId,
                'u_img':nickImg
            }
            if($.trim(nickName).length!=0){
                that.socket.emit("login",userInfo);
            }else{
                $("#nicknameInput").focus();
            }
        });
        $("#nicknameInput").keyup(function(e){
            if(e.keyCode == 13){
                var nickName = $("#nicknameInput").val();
                var nickId = Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
                var nickImg = RandomNumBoth(3,16);
                userInfo = {
                    'u_name':nickName,
                    'u_id':nickId,
                    'u_img':nickImg
                }
                if($.trim(nickName).length!=0){
                    that.socket.emit("login",userInfo);
                }else{
                    $("#nicknameInput").focus();
                }
            }

        });
        $("#send").click(function(){
            var activeId = $(".privateLi").attr("data-id");
            var activeName = $(".privateLi").find(".user_name").html();
            var activeImg = $(".privateLi").find("img").attr("src");
            var msg = $("#input_box").val();
            $("#input_box").val('');
            $("#input_box").focus();
            console.log(activeId+activeName);
            if(activeId!=null&&activeId!=''){
                if($.trim(msg).length!=0){
                    console.log("传送后台");
                    that.socket.emit("postMsg",activeId,activeName,activeImg,msg,2);
                   // that.socket.emit("PrivateMsg",activeId,3);
                    that._displayNewMsg('我',activeImg,msg,3);
                }
            }

        });
        this.socket.on('newMsg',function(nickName,msg,type){
            console.log(nickName)
            that._displayNewMsg('后台',nickName,msg,type)
        });
        $("#user_list").on('click','li',function(){
            console.log('点击')
            $("#user_list>li").removeClass('user_active');
            $(this).addClass('user_active');
            if($(this).hasClass('chatGroup')){//讨论组聊天室

            }
            if($(this).hasClass('privateLi')){//个人对个人
                var userId = $(this).attr("data-id");
                that.socket.emit("PrivateMsg",userId);
            }
        });
        this.socket.on('newPrivateMsg',function(nickName,img,msg,type){
            console.log('私信');
            that._displayNewMsg('私信',nickName,msg,type)
        });
    },
    _displayNewMsg: function(user,userInfo, msg,type) {
        switch(type){
            case 1://聊天人列表
                var date  =  new Date().toTimeString().substr(0, 8);
                var oLi ='';
                oLi += '<li class="privateLi" data-id="'+userInfo.u_id+'">';
                oLi +=' <div class="user_head"><img src="chats/head/'+userInfo.u_img+'.jpg" /></div>';
                oLi +=' <div class="user_text"><p class="user_name">'+msg.substring(0,msg.length-2)+'</p><p class="user_message">'+msg+'</p></div>';
                oLi +='<div class="user_time" >'+date+'</div>'
                oLi +='</li>';
                $("#user_list").append(oLi);
                break;
            case 2://别人
                var oLi = '';
                oLi += '<li class="other">';
                oLi += '<img src="chats/head/'+userInfo+'.jpg">';
                oLi += '<span>'+msg+'</span>';
                oLi +='</li>';
                $("#chatbox").append(oLi);
                $(".windows_body").scrollTop($("#chatbox")[0].scrollHeight);
                break;
            case 3://本人
                var oLi = '';
                oLi += '<li class="me">';
                oLi += '<img src="'+'chats/own_head.jpg'+'">';
                oLi += '<span>'+msg+'</span>';
                oLi +='</li>';
                $("#chatbox").append(oLi);
                $(".windows_body").scrollTop($("#chatbox")[0].scrollHeight);
                break;
        }

    }


};




/*
 * 聊天部分结束
 * */

var userList = {
    'userID':'one',//用户

}




/*生成指定区间随即数(随机头像)*/
function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}



















