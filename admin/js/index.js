$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/login',
    headers: {
        'Authorization': localStorage.getItem('token')
    },
    success: function (res) {
        if (res.code == 200) {
            $('.user_info span i').text(res.data.nickname)
            $('.user_info img').attr('str', res.data.userPic)
            $('.user_center_link img').attr('src', res.data.userPic)
        }
    }
})
// 退出功能
$('.logout').on('click', function () {
    localStorage.removeItem('token')
    window.location.href = './login.html'
})