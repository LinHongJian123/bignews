$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            console.log(typeof res);

            if (res.code == 200) {
                var htmlStr = template('categoryList', res)
                $('tbody').html(htmlStr)
            }

        }
    })

    $('#xinzengfenlei').on('click', function () {
        $('.modal').modal('show')
    })
})