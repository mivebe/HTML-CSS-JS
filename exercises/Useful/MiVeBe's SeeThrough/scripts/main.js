"use strict";
window.onload = function () {
    var e = !1
        , i = !1
        , o = !1
        , t = !1
        , n = 0
        , s = $(".girl").offset().top
        , l = $(".girl").offset().left
        , a = $(".girl").width()
        , c = $(".girl").height()
        , r = $(".girl-layer3");
    function d() {
        console.log(n),
            n >= 3 && (t = !1,
                $(".redirect").css("display", "block"),
                setTimeout(function () {
                    $(".button").addClass("button_active"),
                        $(".keys").css("display", "none"),
                        $(".girl-layer2").css("opacity", 1),
                        $(".girl-layer3").css("opacity", 0),
                        $(".notice img").css("opacity", 0)
                }, 800))
    }
    console.log(l),
        $(document).on("mousemove", function (e) {
            var i = e.originalEvent.clientX || e.originalEvent.layerX || e.originalEvent.x
                , o = e.originalEvent.clientY || e.originalEvent.layerY || e.originalEvent.y;
            if (o >= window.innerHeight - 100 ? o = window.innerHeight - 100 : o <= 50 && (o = 50),
                i <= 50 ? i = 50 : i >= window.innerWidth - 50 && (i = window.innerWidth - 50),
                i >= l && i <= l + a && o >= s && o <= s + c) {
                var t = i - l - r.width() / 1.96
                    , n = o - s - r.height() / 1.9;
                r.css("top", n + "px"),
                    r.css("left", t + "px")
            } else
                r.css({
                    top: "-100%",
                    left: "-100%"
                });
            $(".lupa").css({
                top: o - $(".lupa").height() / 2 + "px",
                left: i - $(".lupa").width() / 1.4 + "px"
            })
        }),
        $(".key-field1").on("mouseover", function () {
            t && ($(".keys-block").eq(0).addClass("keys-block_active"),
                0 == e && (e = !0,
                    $(this).addClass("key-field1_active"),
                    n++,
                    d()))
        }),
        $(".key-field2").on("mouseover", function () {
            t && ($(".keys-block").eq(1).addClass("keys-block_active"),
                $(this).addClass("key-field2_active"),
                0 == i && (i = !0,
                    n++,
                    d()))
        }),
        $(".target").on("mouseover", function () {
            t && ($(".keys-block").eq(2).addClass("keys-block_active"),
                0 == o && (o = !0,
                    n++,
                    d()))
        }),
        setTimeout(function () {
            t = !0
        }, 1e3)
}
    ;
