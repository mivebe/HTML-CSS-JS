let test = [
    4, 3,
    "3 4 4",
    "2 0 3",
    "1 1 5",
    "2 2 5"
];

let print = this.print && console.log;
let gets = this.gets && ((arr, index) => () => arr[index++])(test, 0);


const inRange = (value, max) => {
    return 0 <= value && value < max;
}
const inp = gets().split(" ");
const rows = +inp[0];
const cols = +inp[1];

let startRow = 0;
let startCol = 0;

const matrix = []

for (let r = 0; r < rows; r++) {
    matrix.push([]);
    const next = gets().split(" ");
    for (let c = 0; c < cols; c++) {
        matrix[r][c] = Number(next[c])
        if (matrix[r][c] == 0) {
            startRow = r;
            startCol = c;
        }
    }
}

let coins = 0;
let row = startRow;
let col = startCol;

const dRows = [0, 0, -1, +1];
const dCols = [-1, +1, 0, 0];


while (true) {
    let tempMax = 0;
    let maxNextRow = row;
    let maxNextCol = col;

    for (let dir = 0; dir < dRows.length; dir++) {
        let nextRow = row + dRows[dir];
        let nextCol = col + dCols[dir];

        if (!inRange(nextRow, rows) || !inRange(nextCol, cols)) {
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
}

print(matrix);
print(coins);