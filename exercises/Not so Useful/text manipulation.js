var text = "";
function submitInput(text) {
    text = document.getElementById("userInput").value;
    let string = text.slice(text.indexOf("<toUpper>"), (text.indexOf("</toUpper>") + 10));
    let newString = string.slice(9, -10).toUpperCase();
    document.getElementById("userInput").value = text.replace(string, newString);
    document.getElementById("showcase").innerHTML = string;
}
function mostRepetitions(text) {
    let numbers = [];
    let numberArray = [];
    numbers = text.split(" ");

    let counter = 1;
    let container = 0;
    let highest = { digit: 0, reps: 0 };
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = +numbers[i];
    }
    numberArray = numbers.filter(value => !Number.isNaN(value));
    for (let i = 0; i < numberArray.length; i++) {
        if (container === numberArray[i]) {
            counter++;
            highest.digit = container;
            highest.reps = counter;
        } else if (numberArray[0] === 0 || container !== numberArray[i]) {
            container = numberArray[i];
            counter = 1;
        }
    }
    document.getElementById("showcase").innerHTML = highest.digit + " has the most repetitions: " + highest.reps;
}



// 6 f 2  2  * 8 9 , y  4 4 4 7

/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. molestiae dolore
<toUpper>Im gonna slice your eyelids so you can watch the end</toUpper>
consequatur saepe id, esse architecto ipsam rem non necessitatibus accusamus
ad a temporibus soluta voluptas nihil officia consectetur dicta.
*/