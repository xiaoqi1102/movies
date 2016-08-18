/**
 * Created by xiaoqi on 16/8/15.
 */
$(function () {
    $('.del').bind('click',function (e) {
        var target=$(e.target);
        var id =target.data('id');
        var tr=$('.item-id-'+id);
        $.ajax({
            type:'delete',
            url:'/admin/list?id='+id
        })
            .done(function (results) {
                if(results.success===1){
                    if(tr.length>0){
                        tr.remove()
                    }
                }
            })
    })
});