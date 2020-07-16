let test = 10;

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

const isPrime = num => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 0;
}
const trim = str => {
    return str.replace(/^\s+|\s+$/gm, '');
}

let arr = [];
const printOut = arr => {
    for (let i = 1; i <= test; i++) {
        if (isPrime(i) === true) {
            arr.push([]);
            for (let j = 1; j <= i; j++) {
                isPrime(j) ? arr[i - 1] += "1" : arr[i - 1] += "0";
            }
        }
    }
}
printOut(arr);
result = arr.join("\n");

print(arr);
print(result);