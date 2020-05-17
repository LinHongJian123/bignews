// $(function () {
//     $.ajax({
//         type: 'get',
//         url: BigNew.user_detail,
//         headers: {
//             'Authorization': localStorage.getItem('token')
//         },
//         success: function (res) {
//             console.log(res);

//             if (res.code == 200) {
//                 // $('#form .username').val(res.data.username)
//                 // $('#form .nickname').val(res.data.nickname)
//                 // $('#form .email').val(res.data.email)
//                 // $('#form .user_pic').attr('sec', res.data.username)
//                 // $('#form .password').val(res.data.password)
//                 for (var key in res.data) {
//                     $('#form .' + key).val(res.data[key])
//                 }
//                 $('#form .user_pic').attr('src', res.data.userPic)


//             }
//         }

//     })
// })

$(function () {
    // 1. 发请求获取数据，渲染到页面上
    // 1.1  向服务器端发送请求
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        // headers: {
        //     'Authorization': localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res);
            // console.log(typeof res);
            // 1.2 获取到数据之后，将数据渲染到页面上
            if (res.code == 200) {
                // $('#form .username').val(res.data.username)
                // $('#form .nickname').val(res.data.nickname)
                // $('#form .email').val(res.data.email)
                // $('#form .password').val(res.data.password)

                for (var key in res.data) {
                    $('#form .' + key).val(res.data[key])
                }
                $('#form .user_pic').attr('src', res.data.userPic)

            }
        }
    })

    // 2.个人中心页面实现图片预览
    $('#exampleInputFile').on('change', function () {
        // 1.获取上传文件
        var file = this.files[0]
        // 2.URL.createObjectURL会将待上传的文件生成一个可预览的链接
        var url = URL.createObjectURL(file)
        // 3.在图片上渲染出来,预览待上传的图片
        $('#form .user_pic').attr('src', url)
    })

    // 3.更新个人中心数据
    $('#form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 准备待发送的数据 对DOM对象中的数据进行转换
        var data = new FormData(this)//将表单中的待上传数据转换为二进制的形式再进行上传
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            contentType: false,//不要进行其他编码 不需要额外编码就是二进制
            processData: false,//不要转换为字符串
            success: function (res) {
                // console.log(res);
                // console.log(typeof res)
                // if (res.code == 200) {
                //     // parent.$('.user_info span i').text(res.data.nickname)
                //     // parent.$('.user_info img').attr('src'.res.data.userPic)
                //     // parent.$('.user_center_link img').attr('src', res.data.userPic)
                //     parent.window.location.reload()
                // }
                if (res.code == 200) {
                    $.ajax({
                        type: 'get',
                        // url:'http://localhost:8080/api/v1/admin/user/info',
                        url: BigNew.user_info,
                        // headers: {
                        //     'Authorization': localStorage.getItem('token')
                        // },
                        success: function (res) {
                            // console.log(res);
                            // 2. 请求回来数据后要渲染到页面
                            if (res.code == 200) {
                                // 显示登陆的用户名 
                                parent.$('.user_info span i').text(res.data.nickname)

                                // 显示登陆的头像
                                parent.$('.user_info img').attr('src', res.data.userPic)

                                // 个人中心的图片也设置一样
                                parent.$('.user_center_link img').attr('src', res.data.userPic)
                            }
                        }
                    })
                }
            }
        })

    })



})