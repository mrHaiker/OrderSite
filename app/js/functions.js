// функция смены иконки меню на 'close'
function changeIconMenu (icon, obj) {
    var $icon = $(icon);
    if ($icon.hasClass(obj)) {
        $icon.removeClass(obj);
        $icon.addClass('fa-times');
    } else {
        $icon.removeClass('fa-times');
        $icon.addClass(obj);
    }
}

function getStars (obj, num) {
    for (var i = 0; i < 5; i++) {
        var $star = $('<i>').addClass('fa fa-star');
        if ( i < num) $star.css('color', '#ffc000');

        obj.append($star);
    }
}
