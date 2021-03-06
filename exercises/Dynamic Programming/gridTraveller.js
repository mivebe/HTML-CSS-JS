//Say that you are a traveller on a 2D grid. You begin in the top-left corner
//and your goal is to travel to the bottom-right corner of the grid.
//You may move only down or right so not diagonally or out of bound moves are allowed.
//Write a function "gridTraveller(m, n)"that calculates in how many ways
//can you travel to the goal on a grid with dimensions M * N. 

// classic recursion    

const gridTraveller = (n, m) => {
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    return gridTraveller(m - 1, n) + gridTraveller(m, n - 1);
}
console.log(gridTraveller(1, 1));
console.log(gridTraveller(4, 2));
console.log(gridTraveller(5, 8));
console.log(gridTraveller(0, 3));
//console.log(gridTraveller(18, 18)); //49.978 sec

// momoized recursion

const gridTraveller1 = (m, n, memo = {}) => {
    const key = m + "," + n;
    if (key in memo) return memo[key]
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    memo[key] = gridTraveller1(m - 1, n, memo) + gridTraveller1(m, n - 1, memo);
    return memo[key]
}
console.log(gridTraveller1(1, 1));
console.log(gridTraveller1(4, 2));
console.log(gridTraveller1(5, 8));
console.log(gridTraveller1(0, 3));
console.log(gridTraveller1(18, 18)); //0.09 sec

// tabulation solution

const gridTraveller2 = (m, n) => {
    if (m === 0 || n === 0) return 0;
    const table = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));

    table[1][1] = 1;

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            const current = table[i][j];
            if (j + 1 <= n) table[i][j + 1] += current;
            if (i + 1 <= m) table[i + 1][j] += current;
        }
    }
    return table[m][n];
}
console.log(gridTraveller2(1, 1));
console.log(gridTraveller2(2, 3));
console.log(gridTraveller2(0, 5));
console.log(gridTraveller2(3, 3));
console.log(gridTraveller2(18, 18)); //0.09 sec