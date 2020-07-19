
var userInput = window.prompt("Input a crooked number","123");
let tempN = 0;
let strContainer;
let sum = 0;

for (i of userInput){
    if(i !== '.'){
    i = parseInt(i);
   // document.write("userInput is:" + " " + tempN+ typeof tempN + "<br>");
    tempN += i;
   // document.write("tempN=" + tempN + "<br>");

    if (tempN > 9){
        strContainer = tempN.toString();
        sum = 0;
        for(j of strContainer){
            sum += parseInt(j); 
        }
        tempN = sum;
    }
    }
}
//   document.write("Sum  is " + sum + "<br>");
     document.write("Final N is " + tempN + "<br>");