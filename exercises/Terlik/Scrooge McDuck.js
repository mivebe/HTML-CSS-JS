let test = [
    4, 3,
    "3 4 4",
    "2 0 3",
    "1 1 5",
    "2 2 5"
];

let print = this.print && console.log;
let gets = this.gets && ((arr, index) => () => arr[index++])(test, 0);

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

//determine starting position
let start = [];
for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] == 0) {
            start = [(field.indexOf(field[i])), (field[i].indexOf(field[i][j]))];
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
//fix starting position
start[0]++; start[1]++;



let left, right, up, down,
    X = start[1],
    Y = start[0];
left = field[X][Y - 1];
right = field[X][Y + 1];
up = field[X - 1][Y];
down = field[X + 1][Y];
let coins = 0;

while ((left + right + up + down) !== 0) {

    if (down == 0) {

    } else if (down > up && down > right && down > left) {
        //go down
        field[X + 1][Y]--;
        coins++;
        X++;
    } else if (down == left && left !== 0) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    } else if (down == right && right !== 0) {
        //go right
        field[X][Y + 1]--;
        coins++;
        Y++;
    } else if (down == up && up !== 0) {
        //go up
        field[X - 1][Y]--;
        coins++;
        X--;
    }

    if (up == 0) {

    } else if (up > down && up > right && up > left) {
        //go up
        field[X - 1][Y]--;
        coins++;
        X--;
    } else if (up == left && left !== 0) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    } else if (up == right && right !== 0) {
        //go right
        field[X][Y + 1]--;
        coins++;
        Y++;
    } else if (up == down && down !== 0) {
        //go up
        field[X - 1][Y]--;
        coins++;
        X--;
    }

    if (right = 0) {

    } else if (right > up && right > down && right > left) {
        //go right
        field[X][Y + 1]--;
        coins++;
        Y++;
    } else if (right == left && left !== 0) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    } else if (right == up && up !== 0) {
        //go right
        field[X][Y + 1]--;
        coins++;
        Y++;
    } else if (right == down && down !== 0) {
        //go right
        field[X][Y + 1]--;
        coins++;
        Y++;
    }

    if (left = 0) {

    } else if (left > up && left > right && left > down) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    } else if (left == right && right !== 0) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    } else if (left == up && up !== 0) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    } else if (left == down && down !== 0) {
        //go left
        field[X][Y - 1]--;
        coins++;
        Y--;
    }
}


console.log(field);
console.log(left, right, up, down);
console.log(start);
console.log(coins);