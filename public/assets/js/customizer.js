if (localStorage.getItem("color"))
    $("#color").attr("href", "assets/css/" + localStorage.getItem("color") + ".css");
if (localStorage.getItem("dark"))
    $("body").attr("class", "dark-only");
$('<div class="customizer-links"><button class="rtl-btn">RTL</button></div>').appendTo($('body'));
(function () {})();
//live customizer js
$(document).ready(function () {

    $('.rtl-btn').on('click', function () {
        $("html").attr("dir", "");
        $(this).toggleClass('rtl');
        if ($('.rtl-btn').hasClass('rtl')) {
            $('.rtl-btn').text('LTR');
            $('body').addClass('rtl');
            $("html").attr("dir", "rtl");
        } else {
            $('.rtl-btn').text('RTL');
            $('body').removeClass('rtl');
            $("html").attr("dir", "");
        }
    });

    return false;
});