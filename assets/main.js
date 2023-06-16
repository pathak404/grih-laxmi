
// slider
window.onload = function () {
    var elem1 = document.getElementById("splide");
    var elem2 = document.getElementById("splide2");
    var elem3 = document.getElementById("splide3");
    if ($(window).width() >= 998) {
        elem2.parentNode.removeChild(elem2);
        elem3.parentNode.removeChild(elem3);
    } else if ($(window).width() < 998 && $(window).width() > 700) {
        elem1.parentNode.removeChild(elem1);
        elem3.parentNode.removeChild(elem3);
    } else {
        elem1.parentNode.removeChild(elem1);
        elem2.parentNode.removeChild(elem2);
    }

    window.onscroll = function () {
        if (document.documentElement.scrollTop || document.body.scrollTop > 2000) {
            $("#scrolltoTop").fadeIn();
        } else {
            $("#scrolltoTop").fadeOut();
        }
    };
}







$(document).ready(function () {
    var splide = new Splide('#splide', {
        type: 'loop',
        perPage: 4,
        autoplay: true,
        focus: 'center',
        interval: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        resetProgress: false
    }).mount();

    var splide = new Splide('#splide2', {
        type: 'loop',
        perPage: 3,
        autoplay: true,
        focus: 'center',
        interval: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        resetProgress: false
    }).mount();

    var splide = new Splide('#splide3', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        focus: 'center',
        interval: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        resetProgress: false
    }).mount();





    // mobile menu
    $('.button').click(function () {
        var buttonId = $(this).attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        $(this).toggleClass("is-active");
    })

    $('#modal-container').click(function () {
        $(this).addClass('out');
        $('body').removeClass('modal-active');
    });




    // main
    var text = ["स्वाद में अति उत्तम", "शुदत्ता में सर्वोत्तम"];
    var counter = 0;
    var elem = $("#greeting");
    setInterval(change, 4000);

    function change() {
        elem.fadeOut(function () {
            elem.html(text[counter]);
            counter++;
            if (counter >= text.length) {
                counter = 0;
            }
            elem.fadeIn();
        });
    }




    //   smooth scroll
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                    };
                });
            }
        }
    });


    // gallary modal
    $('.gallary-viewMore').click(function () {
        lazyloadimages();
        var buttonId = $(this).attr('id');
        $('#modal-gallary').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        $(this).toggleClass("is-active");
    })

    $('div#closeGallary').click(function () {
        $('#modal-gallary').addClass('out');
        $('body').removeClass('modal-active');
    });

    function lazyloadimages() {
        var parentelem = document.getElementsByClassName('gallaryContainer')[0].children;
        for (var i = 0; i < parentelem.length; i++) {
            var Childimage = parentelem[i];
            if (Childimage.src == '') {
                Childimage.src = Childimage.getAttribute('lsrc');
            }
        }
    }


    // scroll to top

    $("#scrolltoTop").click(function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });

    $("#scrolltoTop2").click(function () {
        window.open("https://api.whatsapp.com/send?phone=917815023581&text=Hi", '_blank').focus();
    });

});
