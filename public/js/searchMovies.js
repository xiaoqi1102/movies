/**
 * Created by xiaoqi on 16/8/28.
 */
var searchMovies = (function ($) {
    var init,
        bindEvent,
        search;
    init = function () {
        bindEvent()
    };
    bindEvent = function () {
        $('#searchMovies').bind('submit', function (e) {
            e.preventDefault();
            var obj = {};
            var title = $('#title').val();
            obj = {
                'title': title
            };
            console.log(title);
            console.log('search movies submit');
            search(obj);
        })
    };
    search = function (obj) {
        $.ajax({
            url: '/movies/search',
            type: 'get',
            data: obj,
            success: function (res) {
                console.log(res);
                let html = '';
                $.each(res.movies, function (index, content) {
                    html += '<div class="col-md-2">' +
                        '<div class="thumbnail">' +
                        '<a href="/movie/' + content.id + '">' +
                        '<img src="' + content.poster + '" alt="' + content.title + '">' +
                        '</a>' +
                        '<div class="caption">' +
                        '<h3>' + content.title + '</h3>' +
                        '<p>' +
                        '<a href="/movie/' + content.id + '" role="button" class="btn btn-primary">' +
                        '观看影片' +
                        '</a>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                });
                $('#indexMoviesBox').html(html);
            },
            error: function (res) {

            }
        })
    };
    return {
        init: init
    }
})(jQuery);


searchMovies.init();