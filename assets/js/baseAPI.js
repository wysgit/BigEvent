// ajax发起 get 或 post请求时，会先调用 ajaxPrefilter 这个函数，为
$(function () {
    $.ajaxPrefilter(function (options) {
        // 1. 配置url地址
        options.url = 'http://www.liulongbin.top:3007' + options.url;

        // 2. 配置请求头
        if (options.url.includes('/my/')) {
            options.headers = {
                Authorization: localStorage.getItem("token") || ''
            }
        }

        // 3.控制用户登录
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清空token
                localStorage.removeItem('token');
                // 2.跳转到登录页面
                location.href = '/login.html';
            }
        }
    })
})