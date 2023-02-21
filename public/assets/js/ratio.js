// image to background
$(".bg-top").parent().addClass('b-top'); // background postion top
$(".bg-bottom").parent().addClass('b-bottom'); // background postion bottom
$(".bg-center").parent().addClass('b-center'); // background postion center
$(".bg-left").parent().addClass('b-left'); // background postion left
$(".bg-right").parent().addClass('b-right'); // background postion right
$(".bg_size_content").parent().addClass('b_size_content'); // background size content
$(".bg-img").parent().addClass('bg-size');
$(".bg-img.blur-up").parent().addClass('blur-up lazyload');
$('.bg-img').each(function () {

    var el = $(this),
        src = el.attr('src'),
        parent = el.parent();

    parent.css({
        'background-image': 'url(' + src + ')',
        'background-size': 'cover',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'display': 'block'
    });

    el.hide();
});