let EZ = 9;  //10
let Medium = 16;  //40
let Hard = 24;  //99

let dimension = 6;
let minesPerDifficulty = 8;

let field = [];                              //create a field to hold the mines and numbers
for (let i = 0; i < dimension; i++) {
    field.push([]);
    for (let j = 0; j < dimension; j++) {
        field[i].push("");
    }
}

let startX = 2;
let startY = 4;
let mines = [];

let placed = 0;
while (placed < minesPerDifficulty) { //while there are less than the indicated number of mines 

    let tileX = Math.floor(Math.random() * dimension); // ranndom pick a row
    let tileY = Math.floor(Math.random() * dimension); // random pick a column
    mines.push(tileX, tileY);                          //save mine location for later

    if (field[tileX][tileY] != "X" && tileX != startX && tileY != startY) { //if it is not a mine already and not out of bonds
        field[tileX][tileY] = "X";                                          // place a mine
        placed++;                                                           //increment the bombs placed
    }
}
console.log(field);

function check(x, y) {

    if ((x >= 0) && (y >= 0) && (x < dimension) && (y < dimension)) //Check for out of bounds
        return field[x][y];
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
//console.log(field);

let board = [];                                    //create the visible play board to hold covered and uncovered tiles
for (let k = 0; k < dimension; k++) {
    board.push([]);
    for (let l = 0; l < dimension; l++) {
        board[k].push("-");
    }
}

let uncoveredTiles = 0;

function step(x, y) {
    board[x][y] = field[x][y];
    uncoveredTiles++;

    if (field[x][y] == "X") {                                                         // if the tile is a mine
        for (i = 0; i < (dimension * 2); i + 2) {
            board[mines[i]][mines[i + 1]] = field[mines[i]][mines[i + 1]];           //Show all mines
        }
        return console.log("You LOSE");
    }

    if (field[x][y] == 0) {                                                           // If the value of the current tile is zero, check all the neighboring tiles
        reveal(x, y);
    }

    if (uncoveredTiles == ((dimension * dimension) - minesPerDifficulty)) {
        return console.log("You WIN");
    }
}


function reveal(x, y) {
    board[x][y] = 0;
    uncoveredTiles++;
    if (check(x - 1, y) == 0 && (board[x - 1][y] == "-")) reveal(x - 1, y);                                        // left

    if (check(x + 1, y) == 0 && (board[x + 1][y] == "-")) reveal(x + 1, y);                                // right

    if (check(x, y + 1) == 0 && (board[x][y + 1] == "-")) reveal(x, y + 1);                        // down

    if (check(x, y - 1) == 0 && (board[x][y - 1] == "-")) reveal(x, y - 1);                                // up

    if (check(x - 1, y - 1) == 0 && (board[x - 1][y - 1] == "-")) reveal(x - 1, y - 1);                        // up & left

    if (check(x + 1, y + 1) == 0 && (board[x + 1][y + 1] == "-")) reveal(x + 1, y + 1);        // down & right

    if (check(x - 1, y + 1) == 0 && (board[x - 1][y + 1] == "-")) reveal(x - 1, y + 1);                // down & left

    if (check(x + 1, y - 1) == 0 && (board[x + 1][y - 1] == "-")) reveal(x + 1, y - 1);                // up & right
    return false;
}

console.log(field);
console.log(board);
step(startX, startY);
