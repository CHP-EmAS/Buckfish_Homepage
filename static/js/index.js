$(function () {
    var isMobile;
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        isMobile = true;

        // Mobile height fix
        $('.height-fix').each(function () {
            var h = $(this).height();
            $(this).height(h);
        });
    }

    // RESIZE RESETS
    $(window).resize(function () {
        posFilterBar($('.filter').first());
    });

    // Sticky Nav on Mobile
    if (isMobile) {
        $('nav').addClass('fixed');
    } else {
        $('nav').addClass('desk');
    }

    // NAV POSITION
    var navPos = $('nav').position().top;
    var lastPos = 0;
    var lockTimer;

    $(window).on('scroll', function () {
        var pos = $(window).scrollTop();
        var pos2 = pos + 50;
        var scrollBottom = pos + $(window).height();

        if (!isMobile) {
            if (pos >= navPos + $('nav').height() && lastPos < pos) {
                $('nav').addClass('fixed');
            }
            if (pos < navPos && lastPos > pos) {
                $('nav').removeClass('fixed');
            }
            lastPos = pos;
        }

        // Link Highlighting
        if (pos2 > $('#home').offset().top) {
            highlightLink('home');
        }
        if (pos2 > $('#about').offset().top) {
            highlightLink('about');
        }
        if (pos2 > $('#team').offset().top) {
            highlightLink('team');
        }

        // Prevent Hover on Scroll
        clearTimeout(lockTimer);
        if (!$('body').hasClass('disable-hover')) {
            $('body').addClass('disable-hover');
        }

        lockTimer = setTimeout(function () {
            $('body').removeClass('disable-hover');
        }, 500);
    });

    function highlightLink(anchor) {
        $('nav .active').removeClass('active');
        $('nav')
            .find('[dest="' + anchor + '"]')
            .addClass('active');
    }

    // EVENT HANDLERS
    $('.page-link').click(function () {
        var anchor = $(this).attr('dest');
        $('.link-wrap').removeClass('visible');

        $('nav span').removeClass('active');
        $('nav')
            .find('[dest="' + anchor + '"]')
            .addClass('active');

        $('html, body').animate(
            {
                scrollTop: $('#' + anchor).offset().top
            },
            400
        );
    });

    $('.mdi-menu').click(function () {
        $('.link-wrap').toggleClass('visible');
        $('.language-selection').toggleClass('visible');
    });

    posFilterBar($('.filter').first());

    $('.filter').click(function () {
        posFilterBar(this);
    });

    function posFilterBar(elem) {
        var origin = $(elem)
            .parent()
            .offset().left;
        var pos = $(elem).offset().left;
        $('.float-bar').css({
            left: pos - origin,
            width: $(elem).innerWidth()
        });
        $('.float-bar .row').css('left', (pos - origin) * -1);
    }

    $('.language-selection').click(function () {
        toggleLanguage();
    });


    // GALLERY
    $('#gallery').mixItUp({});

    function mixClear() {
        setTimeout(function () {
            $('#gallery').removeClass('waypoint');
        }, 2000);
    }

    // SCROLL ANIMATIONS
    function onScrollInit(items, elemTrigger) {
        var offset = $(window).height() / 3;
        items.each(function () {
            var elem = $(this),
                animationClass = elem.attr('data-animation'),
                animationDelay = elem.attr('data-delay');

            elem.css({
                '-webkit-animation-delay': animationDelay,
                '-moz-animation-delay': animationDelay,
                'animation-delay': animationDelay
            });

            var trigger = elemTrigger ? trigger : elem;

            trigger.waypoint(
                function () {
                    elem.addClass('animated').addClass(animationClass);
                    if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
                },
                {
                    triggerOnce: true,
                    offset: offset
                }
            );
        });
    }

    setTimeout(function () {
        onScrollInit($('.waypoint'));
    }, 10);

    $('#gallery .button').on('click', function () {
        if (this.id == "leanderPieters") {
            window.open('https://www.linkedin.com/in/leander-pieters', '_blank');
        } else if (this.id == "clemensHuebner") {
            window.open('https://clemens-huebner.dev/', '_blank');
        } else if (this.id == "rouvenCabanis") {
            window.open('https://www.linkedin.com/in/rouven-cabanis-b8408a215/', '_blank');
        } else if (this.id == "adrianHense") {
            window.open('https://www.linkedin.com/in/adrian-hense-5a1343337/', '_blank');
        }
    });


    //languages
    // Function to update content based on selected language
    function updateContent(langData) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.innerHTML = langData[key];
        });
    }

    // Function to set the language preference
    function setLanguagePreference(lang) {
        localStorage.setItem('language', lang);
        location.reload();
    }

    // Function to fetch language data
    async function fetchLanguageData(lang) {
        const response = await fetch(`languages/${lang}.json`);
        return response.json();
    }

    async function toggleLanguage() {
        const currLanguage = localStorage.getItem('language') || 'de';
        if (currLanguage == 'de') changeLanguage('en');
        else changeLanguage('de');
    }

    // Function to change language
    async function changeLanguage(lang) {
        await setLanguagePreference(lang);

        const langData = await fetchLanguageData(lang);
        updateContent(langData);
    }

    // Call updateContent() on page load
    window.addEventListener('DOMContentLoaded', async () => {
        const userPreferredLanguage = localStorage.getItem('language') || 'de';
        const langData = await fetchLanguageData(userPreferredLanguage);
        updateContent(langData);
        posFilterBar($('.filter').first());
    });
});