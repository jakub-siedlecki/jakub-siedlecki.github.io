$(window).scroll(function() {
    wHeight = $(window).height()
    if ($(document).scrollTop() > wHeight) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
  }
});

$(document).on('click', 'a[href^="#"]', function(e) {
    var id = $(this).attr('href');
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    e.preventDefault();
    var pos = $(id).offset().top;
    $('body, html').animate({scrollTop: pos});
});

$(document).ready(function () {
// burger menu
  menuContent = $('#navbar>li').clone();
  $('.overlay-content>ul').prepend(menuContent);

  menu = $('.menu');
    burger = $("#burger");
    topMenu = $('.menu-top');
    menuMiddle = $('.menu-middle');
    menuBottom = $('.menu-bottom');

    menu.click(function(){
        topMenu.toggleClass('menu-top-click');
        menuMiddle.toggleClass('menu-middle-click');
        menuBottom.toggleClass('menu-bottom-click');
        burger.toggleClass('burger-active');
    });
    $(document).keyup(function(e) {

        if (e.keyCode == 27 && burger.hasClass('burger-active')) {
            burger.removeClass('burger-active');
            topMenu.removeClass('menu-top-click');
            menuMiddle.removeClass('menu-middle-click');
            menuBottom.removeClass('menu-bottom-click');
        }   // esc
    });
});