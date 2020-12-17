const gridTraveller1 = (n, m) => {
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    return gridTraveller1(m - 1, n) + gridTraveller1(m, n - 1);
}
console.log(gridTraveller1(1, 1));
console.log(gridTraveller1(4, 2));
console.log(gridTraveller1(5, 8));
console.log(gridTraveller1(0, 3));
//console.log(gridTraveller1(18, 18)); //49.978 sec

const gridTraveller = (m, n, memo = {}) => {
    const key = m + "," + n;
    if (key in memo) return memo[key]
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    memo[key] = gridTraveller(m - 1, n, memo) + gridTraveller(m, n - 1, memo);
    return memo[key]
}
console.log(gridTraveller(1, 1));
console.log(gridTraveller(4, 2));
console.log(gridTraveller(5, 8));
console.log(gridTraveller(0, 3));
console.log(gridTraveller(18, 18)); //0.09 sec