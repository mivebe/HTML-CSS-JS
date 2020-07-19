let test = [
    4, 3,
    "3 2 4",
    "2 0 3",
    "1 1 5",
    "2 2 5"
];
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

function createField(test) {
    let field = [];
    let container = [];
    //create field from input
    for (let i = 0; i < test[0]; i++) {
        field.push([]);
        container = test[i + 2].split(" ");
        for (let j = 0; j < test[1]; j++) {
            field[i].push(Number(container[j]));
        }
    }
    return field;
}
let field = createField(test);
let start = [];

//determine starting position
for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] == 0) {
            start = [(field.indexOf(field[i])) + 1, (field[i].indexOf(field[i][j])) + 1];
        }
    }
}

//pad the field with zeros to skip array out of bonds check
for (let k = 0; k < field.length; k++) {
    field[k].push(0);
    field[k].unshift(0);
}
field.push([]);
field.unshift([]);
for (let l = 0; l < field[1].length; l++) {
    field[(field.length) - 1].push(0);
    field[0].push(0);
}


//function move(field, start) {
//take adjacent values
let left, right, up, down, currentX = start[0], currentY = start[1];
left = field[currentX - 1][currentY];
right = field[currentX + 1][currentY];
up = field[currentX][currentY - 1];
down = field[currentX][currentY + 1];
//sort them
let arr = [left, right, up, down];
highest = Math.max(left, right, up, down);
arr.filter((x) => { return x = highest });
asd = [];
choices = arr.map((value, index, arr) => {
    return asd = [index, value];
})
print(choices);
//check for duplicates
//move by order if duplicate or move to highest if none
//record actions
//}


/*spot = field.map((value, indexR, arr) => {
    let indexC = arr.map((value, indexC, arr) => {
        if (value === 0) {
            return indexC;
        }
    }, "fail");
    let container = [indexR, indexC];
    return container;
}, "fail");
*/

/*
spot = field.filter((value, index, arr) => {
    if (value === 0) {
        let container = [field.indexOf(arr), index];
        return container;
    } else {
        return NaN;
    }
}, "");
*/


print(field);
//print(spot);
print(start);