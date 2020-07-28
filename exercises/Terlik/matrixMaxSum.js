let test = [
    5,
    '1 22 3 41 5 2',
    '2 13 4 -5 6 5',
    '-6 5 9 31 2 8',
    '3 14 5 -6 7 4',
    '4 -5 6 -7 8 7',
    '-3 -3 3 3 4 -3 -4 3'
];

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

const size = +gets();
const arr = [];
let size2 = 0;
for (let i = 0; i < size; i++) {
    arr.push([]);
    arr[i] = gets().split(' ').map(x => +x);
    size2 = arr[i].length;
}

const coords = gets().split(' ').map(x => +x);
const arrCoo = [];
for (let i = 0; i < coords.length; i += 2) {
    arrCoo[i / 2] = (coords.slice(i, i + 2));

}

const arrResult = [];
arrCoo.forEach(pair => {
    let current = 0;
    if (pair[0] < 0) {
        for (let i = size2 - 1; i >= Math.abs(pair[1]) - 1; i--) {
            current += arr[Math.abs(pair[0]) - 1][i];
        }
        if (pair[1] < 0) {

            for (let j = Math.abs(pair[0]); j < size; j++) {
                current += arr[j][Math.abs(pair[1]) - 1];
            }

        }
        else {
            for (let j = Math.abs(pair[0]) - 2; j >= 0; j--) {
                current += arr[j][Math.abs(pair[1]) - 1];
            }
        }
    }
    else {
        for (let i = 0; i < Math.abs(pair[1]); i++) {
            current += arr[Math.abs(pair[0]) - 1][i];
        }
        if (pair[1] < 0) {

            for (let j = Math.abs(pair[0]); j < size; j++) {
                current += arr[j][Math.abs(pair[1]) - 1];
            }
        }
        else {
            for (let j = Math.abs(pair[0]) - 2; j >= 0; j--) {
                current += arr[j][Math.abs(pair[1]) - 1];
            }
        }
    }
    arrResult.push(current);

});

let biggest = arrResult[0];

for (let p = 1; p < arrResult.length; p++) {
    if (arrResult[p] > biggest)
        biggest = arrResult[p];
}
print(biggest);


