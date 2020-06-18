// $(selector).animate(obj, time, callback)

$(function () {
    var width = 720;
    var animationSpeed = 1000;
    var animationInterval = 3000;
    var counter = 1;
    var $slider = $("#slider");
    var $slideContainer = $slider.find(".slides");
    var $slides = $slideContainer.find(".slide");
    var interval;
    function playSlider() {
        interval = setInterval(function () {
            $slideContainer.animate({ "margin-left": "-=" + width },
                animationSpeed, function () {
                    counter++;
                    if (counter === $slides.length) {
                        counter = 1;
                        $slideContainer.css("margin-left", 0);
                    }
                });
        }, animationInterval);
    }
    function pauseSlider() {
        clearInterval(interval);
    }
    $slider.on("mouseenter", pauseSlider).on("mouseleave", playSlider);
    playSlider();
});