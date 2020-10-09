adfunc = function () {
    function redirect(href) {
        window.location.href = href;
    }
    function gpbn(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            r = regex.exec(url);
        if (!r) return null;
        if (!r[2]) return '';
        return decodeURIComponent(r[2].replace(/\+/g, " "));
    }
    var ac7 = document.getElementsByClassName('AdWheelClick');
    for (var i = 0; i < ac7.length; i++) {
        var AW = ac7[i];
        AW.addEventListener('click', function (event) {
            event.preventDefault();
            var img = new Image(1, 1);
            var crID = gpbn('crID');
            var self = this;
            if (crID) {
                postback = 'https://warumbistdusoarm.space/trackimage/pixel.jpg?' + crID + '&zID=' + gpbn('zID');
                if (gpbn('linkID')) { postback = postback + '&linkID=' + gpbn('linkID') }
                if (gpbn('utm_content')) { postback = postback + '&ag_custom_domain=' + gpbn('utm_content') }
                img.src = postback;
                img.onload = function () {
                    redirect(self.href);
                }
                img.onerror = function () {
                    redirect(self.href);
                }
            } else {
                redirect(this.href);
            }
        });
        AW = "";
    }
}
window.addEventListener('DOMContentLoaded', adfunc);