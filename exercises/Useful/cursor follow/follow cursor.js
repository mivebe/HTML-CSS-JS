window.onload = () => {

    let
        s = !1,
        t = $(".girl").offset().top,
        l = $(".girl").offset().left,
        w = $(".girl").width(),
        h = $(".girl").height(),
        layer3 = $(".girl-layer3");

    $(document).on("mousemove", (e) => {
        let X = e.originalEvent.clientX || e.originalEvent.layerX || e.originalEvent.x;
        let Y = e.originalEvent.clientY || e.originalEvent.layerY || e.originalEvent.y;

        if (Y >= window.innerHeight - 100 ? Y = window.innerHeight - 100 : Y <= 50 && (Y = 50),

            X <= 50 ? X = 50 : X >= window.innerWidth - 50 && (X = window.innerWidth - 50),

            X >= l && X <= l + w && Y >= t && Y <= t + h) {

            let s = X - l - layer3.width() / 1.96;
            n = Y - t - layer3.height() / 1.9;
            layer3.css("top", n + "px");
            layer3.css("left", s + "px");
        } else
            layer3.css({
                top: "-100%",
                left: "-100%"
            });

        $(".lupa").css({
            top: Y - $(".lupa").height() / 2 + "px",
            left: X - $(".lupa").width() / 1.4 + "px"
        });
    });

    setTimeout(() => {
        s = !0;
    }, 1e3);
};
