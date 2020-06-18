// $(selector).animate(obj, time, callback)

$(function () {
    var counter = 1;
    var $slider = $("#slider");
    var $slideContainer = $slider.find(".slides");
    var $slides = $slideContainer.find(".slide");
    var interval;
    function playSlider() {
        interval = setInterval(function () {
            $slideContainer.animate({ "margin-left": "-=" + 720 },
                1000, function () {
                    counter++;
                    if (counter === $slides.length) {
                        counter = 1;
                        $slideContainer.css("margin-left", 0);
                    }
                });
        }, 3000);
    }
    function pauseSlider() {
        clearInterval(interval);
    }
    $slider.on("mouseenter", pauseSlider).on("mouseleave", playSlider);
    playSlider();
});