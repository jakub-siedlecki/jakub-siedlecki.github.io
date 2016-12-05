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
