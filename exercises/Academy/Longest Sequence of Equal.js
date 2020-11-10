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

