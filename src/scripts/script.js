var $window = $(window);

// function to check if any new element should be in view and if so, make it visible
function inView() { 
    let $animateElement = $(".animate-onScroll");
    // get the position of current window
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    if ($animateElement) {
        $.each($animateElement, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
    
            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass("vis");
            }
            else {
                $element.removeClass("vis");
            }
        });
    }
    
}

// handles appearance of back to top button on bottom; if window scrolled to top, back to top is invisible
$window.scroll(function () {
    if ($(this).scrollTop()) {
        $(".back-to-top").removeClass("invisible");
    }

    else {
        $(".back-to-top").addClass("invisible");
    }

})

// handles on click of back to top; scrolls back to top
$(document).on("click",".back-to-top", function (e) {
    e.preventDefault();
    $("html").animate({ scrollTop: 0 }, 500);
})

// handles clicking of links with "load" class to load new content
$(document).on('click', '.load' ,function(e){
    e.preventDefault();

    $("#content").animate({ opacity: 0, 'margin-top': '3em' }, 500, function () {
        $("#content").load(e.target.href, function () {
            $("#content").animate({ opacity: 1, 'margin-top': '.5em' }, 500, inView());

            }).delay(250);
        });
})

$(".links").click(function() {
    // remove active-link from current active-link
    $(".active-link").removeClass("active-link");

    // if name on navbar is clicked, set default projects link to active
    if ($(this).hasClass("name-link")) {
        $(".default-link").addClass("active-link")
    }

    // else, one of the other links were clicked, set that to active
    else {
        $(this).addClass("active-link");
    }
    
})

// continually called to check if new elements should be animated in
$window.on("load", inView);
$window.on('scroll resize', inView);
$window.trigger('scroll');