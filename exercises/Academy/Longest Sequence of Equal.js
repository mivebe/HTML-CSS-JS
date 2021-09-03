// Longest Sequence of Equal
// Description
// Write a program that finds the length of the maximal sequence of equal elements in an array of N integers.

// Input
// On the first line you will receive the number N
// On the next N lines the numbers of the array will be given
// Output
// Print the length of the maximal sequence
// Constraints
// 1 <= N <= 1024
// Sample tests
// Input
// 10
// 2
// 1
// 1
// 2
// 3
// 3
// 2
// 2
// 2
// 1
// Output
// 3
let test = [
    10,
    2,
    1,
    1,
    2,
    3,
    3,
    2,
    2,
    2,
    1,
];
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

let num = NaN;
let sequence = 0;
let counter;
let container = NaN;
for (let i = 1; i < test.length; i++) {
    if (container == NaN || container !== test[i]) {
        container = test[i];
        counter = 1;
    } else if (container == test[i]) {
        counter++;
        if (sequence < counter) {
            sequence = counter;
        }
        num = test[i];
    } else {
        console.log("fail");
    }
}
if (num == NaN) { num = 1; }

//print(num + " has the highest sequence of " + sequence);
print(sequence)

