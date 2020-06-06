function symbols(e) {
    var text, counter;
    text = document.getElementById("text").value;
    counter = (200 - text.length);
    if (counter === 0) {
        document.getElementById("text").value = text.slice(0, 199);
    }
    document.getElementById("symbolsLeft").textContent = "Symbols left: " + counter;
    document.getElementById("lastKey").textContent = "Code of last keypress: " + event.keyCode;
}
function subscription() {
    var subscription = this.selectedIndex;
    var hui = this.selectedIndex + 1;
    if (subscription == 3) {
        document.getElementById("subMessage").innerHTML = "Best choice!";
    } else {
        document.getElementById("subMessage").innerHTML = "Better offer with " +
            this.options[this.selectedIndex + 1].value + " subscription!";
    }
}
function checkbox(e) {

}
document.getElementById("text").addEventListener("keypress", symbols, false);
document.getElementById("form").addEventListener("submit", checkbox, false);
document.getElementById("sub").addEventListener("change", subscription, false);