var text = "";
var words = [];

function submitInput(el) {
    var el = document.getElementById("userInput").value;
    if (el == "" && text == "") {
        document.getElementById("showcase").innerHTML = "Please insert TEXT! \n\n";
    } else if (el == "" && text !== "") {
        document.getElementById("showcase").innerHTML = "Please insert WORDS! \n\n";
    } else {
        if (text == "") {
            text = el;
            document.getElementById("showcase").innerHTML = text + "\n";
        } else {
            words = el.split(" ");
            document.getElementById("showcase").innerHTML = "Your words are: " + words + "\n";
        }
        document.getElementById("userInput").value = "";
    }
}
function censoreWord(str) {
    var result = "";
    for (i = 0; i < str.length; i++) {
        result += "*";
    }
    return result;
}
function censoreText(text, words) {
    var result = text;
    var flag = true;
    for (j of words) {
        flag = true;

        while (flag) {
            result = result.replace(j, censoreWord(j));
            flag = result.includes(j);
        }
    }
    document.getElementById("userInput").value = result;
}
function reverseSentence(str) {
    var result = str
        .split(" ")
        .reverse();
    text = result;
    document.getElementById("userInput").value = result;
}


//   Maika ti e muj i ima kur no nqma kurqgata, zashtoto ne vsqka pishka e kur.

//   pishka kur