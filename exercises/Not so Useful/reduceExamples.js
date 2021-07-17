// The general effect of reduce    "how to reduce without reduce :D"

// let array = [5, 4, 2, 1, 2, 9];
// let acc = 0;
// let sum = 0;
// for (let val of array) {
//     return acc + val;
// }
// console.log(sum);


let array = [5, 4, 1, 2, 9];                 //   \/ this is the initial acc value |  if skipped it will start with the first array item
let sum = array.reduce((acc, val) => acc + val, 0)
console.log(sum);


let array2 = [5, 4, 1, 2, 9];
let biggest = array2.reduce((acc, val) => acc > val ? acc : val);  //find the largest value in an array
console.log(biggest);


let array3 = [5, 4, 1, 2, 9];
let result = array3.reduce((acc, val) => acc > val ? acc : val, 20);  //check if anything in the array is larger that a number
console.log(result);

