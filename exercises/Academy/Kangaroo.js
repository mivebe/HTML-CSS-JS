// Jump Around
// Description
// Pesho is a funny cangaroo. He wants to jump around all day and night. Yet his mom is not so happy about that,
// she doesn't let him out. Of course Pesho tried many times to escape, but his mother used to be the National Cangaroo
// jump champion, so she can jump faster and higher than him. Still she is not that smart, so Pesho decided
// that he can trick her by jumping using a sequence of jumps.

// Your task is to calculate if Pesho can escape from his mother, using the given sequence of jumps.

// You are given a field of size N x M where the values are as follows: On the first row the numbers are from 1 to M
// on the second row – from M+1 to 2*M, on the third – from 2*M +1 to 3*M, etc…

// By given position in the field, and using the patterns given, calculate if Pesho can escape from his mother.

// Examples


// You are also given a sequence of jumps over the field. The jumps are described with change to the row and column,
// i.e. when on position (R, C) with jump (-2, 3), Pesho will go to position (R-2, C+3).
// When the sequence of jumps is over, Pesho must start the same sequence again.

// If Pesho goes outside the field, he has escaped, if Pesho goes to a previously visited position, he is caught.

// Input
// Read from the standard input

// On the first line, find the numbers N, M and J. (J is number of jumps)
// On the second line, find the start position, R and C
// On the next J lines, find the jumps
// Output
// Print on the standard output

// On the single line, print

// "escaped SUM_OF_NUMBERS", if Pesho escapes his mother
// "caught NUMBER_OF_JUMPS", if Pesho is caught
// Constraints
// N and M will always be between 1 and 500
// J will be between 1 and 1000

// Sample tests

// Input
// 6 7 3
// 0 0
// 2 2
// -2 2
// 3 -1

// Output

// escaped 89
let test = [
    '6 7 3',
    '0 0',
    '2 2',
    '-2 2',
    '3 -1'

];
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

const input1 = gets().split(' ').map(x => +x);
const current = gets().split(' ').map(x => +x);

console.log(input1, current)

let counter = 1;
const arr = [];
const cache = [];

for (let i = 0; i < input1[0]; i++) {
    arr.push([]);
    cache.push([]);
    for (let j = 0; j < input1[1]; j++) {
        arr[i][j] = counter;
        cache[i][j] = true;
        counter++;
    }
}

const jumps = [];
for (let i = 0; i < input1[2]; i++) {
    jumps.push(gets().split(' ').map(x => +x))
}
console.log(jumps)

let result = arr[current[0]][[current[1]]];
let check = true;
while (check) {
    let stop = false;
    jumps.forEach(pair => {
        if (stop) { }
        else if (current[0] + pair[0] >= input1[0] || current[0] + pair[0] < 0 || current[1] + pair[1] >= input1[1] || current[1] + pair[1] < 0) {
            check = false;
            stop = true;
            print(`escaped ${result}`);
        }
        else if (cache[current[0] + pair[0]][current[1] + pair[1]] == false) {
            print(`caught ${result}`);
            stop = true;
            check = false;
        }
        else {
            result += arr[current[0] + pair[0]][current[1] + pair[1]];
            cache[current[0] + pair[0]][current[1] + pair[1]] = false;
            current[0] += pair[0];
            current[1] += pair[1];
        };
    });
}