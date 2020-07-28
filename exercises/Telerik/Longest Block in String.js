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
