var userInput = window.prompt("Enter a number <= 3000","2948"),
    intNumber = parseInt(userInput),
    key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
    romanNumber = '';
if (intNumber <= 3000 && !isNaN(intNumber)){
    document.write(userInput + " is a valid number" + "<br>");
    for(i in key){
        while(intNumber >= key[i]){
            romanNumber += i;
            intNumber -= key[i];
        }
    }
document.write(romanNumber);
}else{
    document.write("This is not a valid number" + "<br>");
}
