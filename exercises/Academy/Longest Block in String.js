// Longest Block in String

// Description

// A block in a string is a run of adjacent chars that are the same.
// Given a string, return the first substring that is with the length of the largest "block" in the string.

// Input

// Read from the standart input:
// string to search in -> hoopla

// Output

// Print to the standart output:

// One line of output - the first block with maximum length in the given array -> oo
// please note that it is case sensitive.

// Sample Tests

// Input

// hoopla

// Output

// oo
let test = "hooopla";

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

let arr = test.split("");
let counter = 0;
let container = NaN;
let highest = "letter";
let sequence = 1;

arr.forEach((value) => {
    if (container == NaN || container !== value) {
        container = value;
        counter = 1;
    } else if (container == value) {
        counter++;
        if (sequence < counter) { sequence = counter; }
        highest = value;
    } else {
        console.log("fail");
    }
});
if (highest == "letter") {
    highest = arr[0];
    print(highest);
} else {
    let block = highest.repeat(sequence);
    print(block);
}
