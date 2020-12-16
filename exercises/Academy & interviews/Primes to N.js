// Primes to N
// Description
// Print all the prime numbers between 1 and N

// Input
// Read from the standard input

// On the single line, read the number *
// Output
// Print on the standard output

// Print all the prime numbers, separated by a single whitespace
// Constraints
// 1 <= N <= 1024
// 1 is considered prime
// Sample tests
// Input
// 15
// Output
// 1 2 3 5 7 11 13
// Input
// 24
// Output
// 1 2 3 5 7 11 13 17 19 23
let test = 24;

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

const trim = str => {
    return str.replace(/^\s+|\s+$/gm, '');
}

const isPrime = num => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 0;
}

let arr = [];

for (let i = 1; i < test; i++) {
    if (isPrime(i) === true) {
        arr.push(i);
        arr.push(" ");
    }
}
result = arr.toString();
result = trim(result);
print(result);