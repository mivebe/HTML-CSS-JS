$(function () {

    $(".tab-panels .tabs li").on("click", function () {
        var $tabPanel = $(this).closest(".tab-panels");

        $tabPanel.find(".tabs li.active").removeClass("active")
        $(this).addClass("active");

        var visiblePanel = $(this).attr("rel");

        $tabPanel.find(".panel.active").slideUp(300, showNextPanel);

        function showNextPanel() {
            $(this).removeClass("active");

            $("#" + visiblePanel).slideDown(300, function () {
                $(this).addClass("active");
            });
        }
    });

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
            $slideContainer.animate({ "margin-left": "-=" + width }, animationSpeed, function () {
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