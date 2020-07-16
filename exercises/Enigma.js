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