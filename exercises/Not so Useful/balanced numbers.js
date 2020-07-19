let digitSum;
let numberSum = 0;
let userInput;
let a, b, c;

function isBalanced() {
  if (userInput.length == 3 && !isNaN(userInput) && b == a + c) {
    return true;
  } else {
    return false;
  }
}

do {
  userInput = window.prompt("Give me a balanced number", "132");
  a = parseInt(userInput[0]);
  b = parseInt(userInput[1]);
  c = parseInt(userInput[2]);
  if (userInput == null || isBalanced() == false) {
    break;
  } else {
    digitSum = 0;
    for (i = 0; i < 3; i++) {
      digitSum += parseInt(userInput[i]);
    }
    numberSum += parseInt(userInput);
    document.write(userInput + " " + typeof userInput + "<br>");
    document.write("The last digit sum is " + digitSum + "<br>");
    document.write("Total numbers sum is " + numberSum + "<br>");
  }
} while (isBalanced() == true);
document.write("This is not a valid number!" + "<br>");