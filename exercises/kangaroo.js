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









