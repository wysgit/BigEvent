$(function () {
    getUserInfo();
    outOnline();
})

//--------------------| 获取登录信息 |---------------------//
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            } else {
                // 获取用户信息成功后渲染头像
                reavatar(res.data);
            }
        },
        // complete函数，不管请求成功还是失败都会执行，利用它控制用户登录
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.清空token
        //         localStorage.removeItem('token');
        //         // 2.跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}
//-------------------------------------------------------------//

//--------------------| 渲染用户头像 |---------------------//
function reavatar(data) {
    // 1.获取用户名或昵称
    var name = data.nickname || data.username;
    console.log(name);
    // 2.
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.渲染头像
    if (data.user_pic == null) {
        // 3.1 文字头像
        var first_word = name[0].toUpperCase();
        $('.text-avatar').html(first_word).show();
        $('.layui-nav-img').hide();
    } else {
        // 3.2 图片头像
        $('.text-avatar').hide();
        $('.layui-nav-img').attr("src", data.user_pic).show();
    }
}
//-------------------------------------------------------------//

//--------------------| 退出登录 |---------------------//
function outOnline() {
    $('#out').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1.清空 localStorage 存储的 token
            localStorage.removeItem('token');
            // 2. 跳转到登录页面
            location.href = '/login.html';
            // 3.关闭弹出的提示框
            layer.close(index);
        });
    })
}

//-------------------------------------------------------------//

