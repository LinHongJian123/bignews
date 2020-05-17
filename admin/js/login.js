$(function () {
    $('.login_form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            // url: 'http://localhost:8080/api/v1/admin/user/login',
            url: BigNew.user_login,
            // 将当前数据（账号和密码）以拼接字符串方式放送
            data: $(this).serialize(),
            beforeSend: function () {
                var flag = false;
                $('.login_form input[name]').each(function (index, ele) {
                    if ($.trim($(ele).val()) == '') {
                        flag = true;
                    }
                })
                if (flag) {
                    $('.modal').modal('show')
                    $('.modal-body p').text('输入的用户名或密码不能为空')
                    return false;
                }
            },
            success: function (res) {
                $('.modal').modal('show')
                $('.modal-body p').text(res.msg)
                if (res.code == 200) {
                    $('.modal').on('hidden.bs.modal', function (e) {
                        localStorage.setItem('token', res.token)
                        window.location.href = './index.html'
                    })
                }
            }
        })
    })
})