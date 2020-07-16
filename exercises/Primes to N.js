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