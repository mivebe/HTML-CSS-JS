window.onload = function someFunction() {
    document.getElementById("showcase").innerHTML =
        document.getElementById("two").firstChild.nodeValue.replace("592", "hui");
    document.getElementById("two").firstChild.nodeValue = "hui ";
}