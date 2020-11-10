const { log } = require("console");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let dimension = 6;
let minesPerDifficulty = 8;

const field = [];
const board = [];                        //create a field to hold the mines and numbers
for (let i = 0; i < dimension; i++) {
    field.push([]);
    board.push([]);
    for (let j = 0; j < dimension; j++) {
        field[i].push("");
        board[i].push('-');
    }
}

let startX = 2;
let startY = 4;

let placed = 0;
while (placed < minesPerDifficulty) { //while there are less than the indicated number of mines 
    let tileX = Math.floor(Math.random() * dimension); // ranndom pick a row
    let tileY = Math.floor(Math.random() * dimension); // random pick a column

    if (field[tileX][tileY] != "X" && tileX != startX && tileY != startY) { //if it is not a mine already and not out of bonds
        field[tileX][tileY] = "X";                                          // place a mine
        placed++;                                                           //increment the bombs placed
    }
}
function check(x, y) {
    if ((x >= 0) && (y >= 0) && (x < dimension) && (y < dimension)) { //Check for out of bounds
        return field[x][y];
    }
}
for (var i = 0; i < dimension; i++) {        // For each column
    for (j = 0; j < dimension; j++) {        // and each row:

        if (check(i, j) != "X") { //if the cell is not a mine:

            field[i][j] = // the value of the cell is the sum of mines in the eight adjacent tiles:
                ((check(i, j + 1) == "X") | 0)        // down
                + ((check(i - 1, j + 1) == "X") | 0)        // down & left
                + ((check(i + 1, j + 1) == "X") | 0)        // down & right
                + ((check(i, j - 1) == "X") | 0)        // up
                + ((check(i - 1, j - 1) == "X") | 0)        // up & left
                + ((check(i + 1, j - 1) == "X") | 0)        // up & right
                + ((check(i - 1, j) == "X") | 0)        // left
                + ((check(i + 1, j) == "X") | 0);        // right
        }
    }
}
console.log(field.join('\n'));
console.log(board.join('\n'));

let uncoveredTiles = 0;
const reveal = (x, y) => {
    if (check(x, y) === undefined) {
        return;
    }
    if (field[x][y] === 'X') {
        return;
    }
    board[x][y] = field[x][y];
    uncoveredTiles++;

    if (field[x][y] === 0) {
        field[x][y] = 'X';
        reveal(x + 1, y);
        reveal(x + 1, y + 1);
        reveal(x + 1, y - 1);
        reveal(x, y + 1);
        reveal(x - 1, y + 1);
        reveal(x, y - 1);
        reveal(x - 1, y);
        reveal(x - 1, y - 1);
    }
    else {
        return;
    }
}
const takeATurn = () => {
    rl.question("What is x ? ", function (x) {
        rl.question("what is y ? ", function (y) {
            if (field[x][y] === 'X') {
                field.map((el, indexX) => {
                    el.map((innerEl, indexY) => {
                        if (innerEl == "X") {
                            board[indexX][indexY] = "X";
                        }
                    });
                });
                console.log(board.join("\n"));
                console.log('Allahu Akbar');
                rl.close();
            } else if (uncoveredTiles == ((dimension * dimension) - minesPerDifficulty)) {
                console.log(board.join("\n"));
                console.log("You WIN");
                rl.close();
            } else {
                reveal(+x, +y);
                console.log(board.join('\n'));
                takeATurn();
            }

        });
    });
};

const pickDifficulty = () => {
    rl.question("Pick Difficulty from 1 to 3 ? ", function (x) {
        if (x == 1) {
            dimension = 6;
            minesPerDifficulty = 8;
        } else if (x == 2) {
            dimension = 16;
            minesPerDifficulty = 16;
        } else {
            dimension = 26;
            minesPerDifficulty = 24;
        };
        rl.close();
    });
    takeATurn();
};
//takeATurn();
pickDifficulty();