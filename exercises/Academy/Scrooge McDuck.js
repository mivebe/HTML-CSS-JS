// Scrooge McDuck
// Description
// Scrooge McDuck likes his treasure very much. That is why he likes to play a funny game.

// He builds a labyrinth of coins and tries to escape from it. You can think of the labyrinth as a
//  rectangular field. Each cell of the field contains 0 or more coins.

// When Scrooge McDuck steps on a cell, he can take only a single coin from this cell, and only
//  if there are any coins. Scrooge McDuck can escape the field, only if he is surrounded by empty cells.

// Scrooge McDuck always wants to go to the neighbouring cell with most coins. BUT if there are more than
//  one cells with the same amount of coins (the largest), he chooses a cell (always the largest) from the
//  order left, right, up, down

// If Scrooge McDuck cannot go in any direction, he is out of the labyrinth

// Examples

// Scrooge McDuck is worried, not about his life, but if the coins he collect will be enough. Your task is 
// to tell him how many coins he will collect, following the rules above.

// Input
// Read from the standard input
// On the first line find N and M
// The size of the labyrinth
// On the next N lines find M integer values, separated by a space
// The input data will always be valid and there is no need to check it explicitly
// The starting location of Scrooge McDuck will be marked as the only 0

// Output
// Print to the standard output
// On the single line, print the number of coins Scrooge McDuck can collect, following the rules
// Contraints
// 2 <= N <= 10
// 2 <= M <= 10
// Each cell can contain up to 1024 coins

// Sample tests
// Input
// 4 3
// 3 2 4
// 2 0 3
// 1 1 5
// 2 2 5
// Output
// 22
// Input
// 3 3
// 10 10 0
// 10 10 10
// 10 10 10
// Output
// 78
// Input
// 3 3
// 10 10 10
// 10 0 10
// 10 10 10
// Output
// 80
// Input
// 2 3
// 0 5 2
// 2 5 3
// Output
// 15
let test = [
    '4 3',
    '3 2 4',
    '2 0 3',
    '1 1 5',
    '2 2 5'
];
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

const inRange = (value, max) => { return 0 <= value && value < max; }

const input = gets().split(" ");
const rowsTotal = +input[0];
const colsTotal = +input[1];

const matrix = [];
let row = 0;
let col = 0;

for (let r = 0; r < rowsTotal; r++) {
    matrix.push([]);
    const next = gets().split(" ");
    for (let c = 0; c < colsTotal; c++) {
        matrix[r][c] = Number(next[c])
        if (matrix[r][c] == 0) {
            row = r;
            col = c;
        }
    }
}

let coins = 0;

const dRows = [0, 0, -1, +1];
const dCols = [-1, +1, 0, 0];

while (true) {
    let tempMax = 0;
    let maxNextRow = row;
    let maxNextCol = col;

    for (let dir = 0; dir < dRows.length; dir++) {
        let nextRow = row + dRows[dir];
        let nextCol = col + dCols[dir];

        if (!inRange(nextRow, rowsTotal) || !inRange(nextCol, colsTotal)) {
            continue;
        }

        if (tempMax < matrix[nextRow][nextCol]) {
            tempMax = matrix[nextRow][nextCol];
            maxNextRow = nextRow;
            maxNextCol = nextCol;
        }
    }

    if (tempMax == 0) {
        break;
    }

    row = maxNextRow;
    col = maxNextCol;
    matrix[row][col]--;
    coins++;
};

print(coins);