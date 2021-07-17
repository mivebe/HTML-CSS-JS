const initialArray = [4, 6, 5, 2, 1, 9, 8, 3, 7, 10, -4, -13.5, 4.8,];
//**  Desired result:  [-13.5, 10, -4, 9, 1, 8, 2, 7, 3, 6, 4, 5, 4.8 ] 

// function oddOrEven(x) {
//     return (x & 1) ? "odd" : "even";
// }

// const result = [];

// for (let i = 0; 0 < sortedArray.length; i++) {
//     if (oddOrEven(i) == "even") {
//         result.push(sortedArray[0]);
//         sortedArray.shift();
//     } else {
//         result.push(sortedArray[sortedArray.length - 1]);
//         sortedArray.pop();
//     }
// }

// console.log(result);

const result = initialArray.sort((a, b) => a - b).map((el, i, arr) => {

    // return !(i&1) ? arr[i / 2] : arr[arr.length - (i + 1) / 2];
    return i % 2 === 0 ? arr[i / 2] : arr[arr.length - (i + 1) / 2]
})

console.log(result);