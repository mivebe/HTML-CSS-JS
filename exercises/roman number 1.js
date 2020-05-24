var userInput = window.prompt("Enter a number <= 3000","2948");
var inputAsArray = [];
var romanNumber = '';
var inputAsNumber = parseInt(userInput);
if (inputAsNumber <= 3000 && !isNaN(inputAsNumber)){
        document.write(userInput + " is a valid number" + "<br>");
if (inputAsNumber < 1000){
        inputAsArray.push(0);
        if (inputAsNumber < 100){
            inputAsArray.push(0);
            if (inputAsNumber < 10){
                inputAsArray.push(0);
            }
        }
    }
for (i of userInput){
    i = parseInt(i);
    inputAsArray.push(i);
    document.write(inputAsArray + "<br>");
}
document.write(inputAsArray + " is an " + typeof inputAsArray + "<br>");
        switch (inputAsArray[0]){
            case 0:
                break;
            case 1:
                romanNumber += "M";
                break;
            case 2:
                romanNumber += "MM";
                break;
            case 3:
                romanNumber += "MMM";
                break;
            default:
                document.write("first digit fail <br>");
        }
        switch (inputAsArray[1]){
            case 0:
                break;
            case 1:
                romanNumber += "C";
                break;
            case 2:
                romanNumber += "CC";
                break;
            case 3:
                romanNumber += "CCC";
                break;
            case 4:
                romanNumber += "CD";
                break;
            case 5:
                romanNumber += "D";
                break;
            case 6:
                romanNumber += "DC";
                break;
            case 7:
                romanNumber += "DCC";
                break;
            case 8:
                romanNumber += "DCCC";
                break;
            case 9:
                romanNumber += "CM";
                break;
            default:
                document.write("secound digit fail <br>");
        }
        switch (inputAsArray[2]){
            case 0:
                break;
            case 1:
                romanNumber += "X";
                break;
            case 2:
                romanNumber += "XX";
                break;
            case 3:
                romanNumber += "XXX";
                break;
            case 4:
                romanNumber += "XL";
                break;
            case 5:
                romanNumber += "L";
                break;
            case 6:
                romanNumber += "LX";
                break;
            case 7:
                romanNumber += "LXX";
                break;
            case 8:
                romanNumber += "LXXX";
                break;
            case 9:
                romanNumber += "XC";
                break;
            default:
                document.write("third digit fail <br>");
        }
        switch (inputAsArray[3]){
            case 0:
                break;
            case 1:
                romanNumber += "I";
                break;
            case 2:
                romanNumber += "II";
                break;
            case 3:
                romanNumber += "III";
                break;
            case 4:
                romanNumber += "IV";
                break;
            case 5:
                romanNumber += "V";
                break;
            case 6:
                romanNumber += "VI";
                break;
            case 7:
                romanNumber += "VII";
                break;
            case 8:
                romanNumber += "VIII";
                break;
            case 9:
                romanNumber += "IV";
                break;
            default:
                document.write("last digit fail <br>");
        }
document.write(romanNumber);
}else{
    document.write("This is not a valid number" + "<br>");
}