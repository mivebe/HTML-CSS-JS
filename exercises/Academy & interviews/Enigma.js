// Enigma
// Description
// You need to encode the information that you send to your teammates so that other people don't understand it.

// The information that you need to encode is a sequence of numbers.

// Here is the algorithm for encoding:

// You get a sequence of numbers
// 28, 1, 45, 255
// Convert each number into its binary representation and pad it with zeros to 8 symbols
// 28 = 00011100
// 1 = 00000001
// 45 = 00101101
// 255 = 11111111
// If the number is on odd position remove all the bits on odd positions and vice versa
// 28 is on even position = 0 0 0 1 1 1 0 0 = 0110
// 1 is on odd position = 0 0 0 0 0 0 0 1 = 0000
// 45 is on even position = 0 0 1 0 1 1 0 1 = 0011
// 255 is on odd position = 1 1 1 1 1 1 1 1 = 1111
// Concatenate all the encoded numbers
// 0110 0000 0011 1111
// Input
// Read from the standard input
// The only input line contains a sequence of integers separated by a comma.
// The input data will always be valid and in the format described. There is no need to check it explicitly.
// Output
// Print to the standard output
// The output consists of one line. On this output line, you must print the result after encoding.
// Constraints
// The numbers in the array will be in the range 0;255
// The array length will be between 4 and 400 numbers
// Sample Tests
// Input
// 28,1,45,255
// Output
// 0110000000111111
// Input
// 2,1,0,2
// Output
// 0000000000000001
let test = [
    28, 1, 45, 255
];

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

function toBinaryCode(decimal) {
    let binary = (decimal >>> 0).toString(2);
    binary = binary.padStart(8, 0);

    const array = binary.split("");
    let newArray;

    if (decimal % 2 == 0) {
        newArray = array.filter((bit, index) => { return (index + 1) % 2 == 0 });
    } else {
        newArray = array.filter((bit, index) => { return (index + 1) % 2 !== 0 });
    }

    return newArray;
}
function Encrypt(arr) {
    arr = arr.map(toBinaryCode);
    const result = arr.join();
    return result;
}

print(Encrypt(test));