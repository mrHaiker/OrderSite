$(function () {
    var $iconMenu =  $('#list-menu i');
    var $iconContact =  $('#list-contact i');
    var $contact = $('#btn-contact');
    var $nav = $('#nav');
    var $listServices = $('#list-services');

    // клик по меню (mobile)
    $('#list-menu').click(function () {

        $iconMenu.toggleClass('close-btn');
        changeIconMenu($iconMenu, 'fa-bars');

        if ($contact.hasClass('open-list-user')) {    // уделение открытого меню
            $contact.removeClass('open-list-user');
            $iconContact.removeClass('close-btn');
            changeIconMenu('#list-contact i', 'fa-user');
        }

        $('#nav').toggleClass('open-list-menu');    // открывает меню
    });

    // клик по контакт-меню (mobile)
    $('#list-contact').click(function () {

        $iconContact.toggleClass('close-btn');
        changeIconMenu($iconContact, 'fa-user');

        if ($nav.hasClass('open-list-menu')) {    // уделение открытого меню
            $nav.removeClass('open-list-menu');
            $iconMenu.removeClass('close-btn');
            changeIconMenu('#list-menu i', 'fa-bars');
        }

        $('#btn-contact').toggleClass('open-list-user');   // открывает меню
    });


    // клик по списку сервисов (mobile)
    $('#list-services li').click(function (e) {
        var width = $(window).width();
        if ($listServices.hasClass('hidden-mobile') && width < 991) e.preventDefault();    // Если список сервисов еще не открыт --> отменяеем переход по ссылке

        $listServices.toggleClass('hidden-mobile');
    });


    // Отслеживаем любые клики по экрану (mobile)
    $(document).click(function (e) {
        var $target = $(e.target);

        // Свертывание списка сервисов
        if (!$target.closest('#list-services').length) {
            $listServices.addClass('hidden-mobile');

            e.stopPropagation();
        }

        // Свертывание открытого меню (mobile)
        if (!$target.closest('#list-menu').length) {
            if ($nav.hasClass('open-list-menu')) {
                $nav.removeClass('open-list-menu');
                $iconMenu.removeClass('close-btn');
                changeIconMenu('#list-menu i', 'fa-bars');
            }
            e.stopPropagation();
        }

        if (!$target.closest('#list-contact').length) {
            if ($contact.hasClass('open-list-user')) {
                $contact.removeClass('open-list-user');
                $iconContact.removeClass('close-btn');
                changeIconMenu('#list-contact i', 'fa-user');
            }
            e.stopPropagation();
        }

    });


    // Slider
    $('#arrow-next').click(function () {
        var currentSlide = $('.active-slide');
        var nextSlide = currentSlide.next();

        if(nextSlide.length === 0) nextSlide = $('.slide').first();

        currentSlide.fadeOut(600).removeClass('active-slide');
        nextSlide.fadeIn(600).addClass('active-slide');
    });
    $('#arrow-prev').click(function() {
        var currentSlide = $('.active-slide');
        var prevSlide = currentSlide.prev();

        if(prevSlide.length === 0) prevSlide = $('.slide').last();

        currentSlide.fadeOut(600).removeClass('active-slide');
        prevSlide.fadeIn(600).addClass('active-slide');
    });

    // Контент слайдера
    $.getJSON('../json/review.json', function (data) {
        console.log(data);
        var $content = $('#review .content');

        for (var i = 0; i < data.length; i++) {
            var temp = data[i];
            var $slide = $('<li>').addClass('slide');
            var $wrapper = $('<div>').addClass('wrapper');
            var $message = $('<p>').addClass('message');
            var $author = $('<p>').addClass('author');
            var $stars = $('<div>').addClass('stars');

            if (i == 0) $slide.addClass('active-slide');

            $wrapper.append($message.text(temp.text));

            $wrapper.append($author.text(temp.name +', '+ temp.country +', '+ temp.city));
            $wrapper.append($stars.append(
                getStars($stars, temp.stars)
            ));


            $slide.append($wrapper);
            $content.append($slide);
        }
    })

});