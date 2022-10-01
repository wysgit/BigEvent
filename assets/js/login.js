$(window).on('load', function () {
    $(function () {
        //--------------------| 1.跳转到注册页面 |---------------------//
        $('.login-box').on('click', 'a', function () {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //----------------------------------------------------------//

        //--------------------| 2.跳转到登录页面 |---------------------//
        $('.reg-box').on('click', 'a', function () {
            $('.reg-box').hide();
            $('.login-box').show();
        })
        //----------------------------------------------------------//

        //--------------------| 3.自定义验证模式 |---------------------//
        var form = layui.form;
        form.verify(
            {
                username: function (value, item) { //value：表单的值、item：表单的DOM对象
                    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                        return '用户名不能有特殊字符';
                    }
                    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                        return '用户名首尾不能出现下划线\'_\'';
                    }
                    if (/^\d+\d+\d$/.test(value)) {
                        return '用户名不能全为数字';
                    }

                    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
                    if (value === 'xxx') {
                        alert('用户名不能为敏感词');
                        return true;
                    }
                }
                ,
                pwd: [
                    /^[\S]{6,12}$/
                    , '密码必须6到12位，且不能出现空格'
                ],
                repwd: function (value) {
                    var pwd = $('.reg-box [name="password"]').val();
                    if (pwd != value) {
                        return "两次输入的密码不一致";
                    }
                }
            })
        //-------------------------------------------------------------//

        //-----------------| 4.注册，发起POST请求 |------------------//
        var layer = layui.layer;
        $('#form_sub').on('submit', function (e) {
            e.preventDefault();
            $.post('/api/reguser', { username: $('.reg-box [name="username"]').val(), password: $('.reg-box [name="password"]').val() }, function (res) {
                if (res.status != 0) {
                    layer.msg(res.message, {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //do something
                    });
                } else {
                    layer.msg('注册成功，请登录！', {
                        icon: 1,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        $('.reg-box a').click();
                    });
                }
            })
        })
        //-------------------------------------------------------------//

        //--------------------| 5.监听登录事件 |---------------------//
        $('#form-login').on('submit', function (e) {
            e.preventDefault();
            $.post('/api/login', { username: $('.login-box [name="username"]').val(), password: $('.login-box [name="password"]').val() }, function (res) {
                if (res.status != 0) {
                    layer.msg(res.message, {
                        icon: 2,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    });
                } else {
                    layer.msg('登录成功！', {
                        icon: 1,
                        time: 500 //0.5秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        // 登录成功后，保存 token 字符串到 localStorage 中  
                        localStorage.setItem('token', res.token)
                        // 跳转到首页
                        location.assign('/index.html');
                        // location.href = '/index.html';
                    });
                }
            })
        })
        //-------------------------------------------------------------//
    })

})