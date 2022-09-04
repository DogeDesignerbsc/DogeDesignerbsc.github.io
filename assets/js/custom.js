(function($) {
	'use strict';
    // Menu Js Start	 
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.mein-navbar').addClass('menu-shrink');
        } else {
            $('.mein-navbar').removeClass('menu-shrink');
        }
    });			
    
    $('.scroll-btn .navbar .navbar-nav li a').on('click', function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top -50
        }, 100);
        e.preventDefault();
    });
    
    $(document).on('click','.navbar-collapse.show',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });	

    // Popup Video JS 
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 300,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    // Count Time 
    function makeTimer() {
        var endTime = new Date("November 30, 2021 17:00:00 PDT");			
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $("#days").html(days );
        $("#hours").html(hours);
        $("#minutes").html(minutes);
        $("#seconds").html(seconds);
    }
    setInterval(function() { makeTimer(); }, 300);

    // Ico Slider
    $(".ico-slider-wrapper").owlCarousel({
        items: 2,
        nav: false,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            575: {
                items: 2
            },
            758: {
                items: 2
            },
            1200: {
                items: 2
            },
            1824: {
                items: 3
            }
        }
    });

    // Tabs
    $('#tabs li a').on('click', function(e) {
        $('#tabs li, #content .current').removeClass('current').removeClass('fadeInUp');
        $(this).parent().addClass('current');
        var currentTab = $(this).attr('href');
        $(currentTab).addClass('current fadeInUp');
        e.preventDefault();
    });
    
    // Partner
    $(".partner-wrapper").owlCarousel({
        items: 5,
        nav: false,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            575: {
                items: 3
            },
            758: {
                items: 4
            },
            1200: {
                items: 5
            },
        }
    });

    // Back To Top
    $('body').append('<div id="toTop" class="back-to-top"><i class="flaticon-chevron"></i></div>');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    }); 
    $('#toTop').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    // Team Member Wrapper
    $(".team-member-wrapper").owlCarousel({
        items: 2,
        nav: true,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            575: {
                items: 2
            },
            758: {
                items: 2
            },
            1200: {
                items: 2
            },
            1824: {
                items: 3
            }
        }
    });
    
    // Preloader
    jQuery(window).on('load', function() {
        $('.preloader').fadeOut();
    });

    //FAQ Accordion
    $('.accordion').find('.accordion-title').on('click', function() {
        // Adds Active Class
        $(this).toggleClass('active');
        // Expand or Collapse This Panel
        $(this).next().slideToggle('fast');
        // Hide The Other Panels
        $('.accordion-content').not($(this).next()).slideUp('fast');
        // Removes Active Class From Other Titles
        $('.accordion-title').not($(this)).removeClass('active');
    });
    
    // Staph Slider
    (function() {
        // VARIABLES
        const timeline = document.querySelector(".timeline ol"),
        elH = document.querySelectorAll(".timeline li > div"),
        arrows = document.querySelectorAll(".timeline .arrows .arrow"),
        arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
        arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
        firstItem = document.querySelector(".timeline li:first-child"),
        lastItem = document.querySelector(".timeline li:last-child"),
        xScrolling = 280,
        disabledClass = "disabled";
        
        // START
        window.addEventListener("load", init);
        function init() {
            setEqualHeights(elH);
            animateTl(xScrolling, arrows, timeline);
            setSwipeFn(timeline, arrowPrev, arrowNext);
            setKeyboardFn(arrowPrev, arrowNext);
        }
        
        // SET EQUAL HEIGHTS
        function setEqualHeights(el) {
            let counter = 0;
            for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;
                if (counter < singleHeight) {
                counter = singleHeight;
                }
            }
            for (let i = 0; i < el.length; i++) {
                el[i].style.height = `${counter}px`;
            }
        }
        
        // CHECK IF AN ELEMENT IS IN VIEWPORT
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // SET STATE OF PREV/NEXT ARROWS
        function setBtnState(el, flag = true) {
            if (flag) {
                el.classList.add(disabledClass);
            } else {
                if (el.classList.contains(disabledClass)) {
                    el.classList.remove(disabledClass);
                }
                el.disabled = false;
            }
        }
        // ANIMATE TIMELINE
        function animateTl(scrolling, el, tl) {
            let counter = 0;
                for (let i = 0; i < el.length; i++) {
                    el[i].addEventListener("click", function() {
                    if (!arrowPrev.disabled) {
                        arrowPrev.disabled = true;
                    }
                    if (!arrowNext.disabled) {
                        arrowNext.disabled = true;
                    }
                    const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
                    if (counter === 0) {
                        tl.style.transform = `translateX(-${scrolling}px)`;
                    } else {
                        const tlStyle = getComputedStyle(tl);
                        // add more browser prefixes if needed here
                        const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
                        const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
                        tl.style.transform = `translateX(${values}px)`;
                    }
                    setTimeout(() => {
                        isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
                        isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
                    }, 1100);
                    counter++;
                });
            }
        }

        // ADD SWIPE SUPPORT FOR TOUCH DEVICES
        function setSwipeFn(tl, prev, next) {
            const hammer = new Hammer(tl);
            hammer.on("swipeleft", () => next.click());
            hammer.on("swiperight", () => prev.click());
        }
        
        // ADD BASIC KEYBOARD FUNCTIONALITY
        function setKeyboardFn(prev, next) {
            document.addEventListener("keydown", (e) => {
                if ((e.which === 37) || (e.which === 39)) {
                    const timelineOfTop = timeline.offsetTop;
                    const y = window.pageYOffset;
                    if (timelineOfTop !== y) {
                        window.scrollTo(0, timelineOfTop);
                    }
                    if (e.which === 37) {
                        prev.click();
                    } else if (e.which === 39) {
                        next.click();
                    }
                }
            });
        }
    })();
    
    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
        // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            // everything looks good!
            event.preventDefault();
        }
    });
    function callbackFunction (resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub(){
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub(){
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function() {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }
    
    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });
})(jQuery);


  