var slideIndex = 1;
var interval = setInterval(() => { }, 3000)
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var squares = document.getElementsByClassName("panel");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < squares.length; i++) {
        squares[i].className = squares[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    squares[slideIndex - 1].className += " active";
}
