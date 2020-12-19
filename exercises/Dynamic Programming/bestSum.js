//Write a function "bestSum(targetSum,numbers)" that takes in
//a targetSum and an array of numbers as arguments.
//The function should return an array containing the shortest
//combination of numbers that add up to exactly the targetSum.
//If there is a tie for the shortest combination,
//you may return any on of the shortest.

// classic recursion

const bestSum = (targetSum, numbers) => {
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombo = null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderCombo = bestSum(remainder, numbers);
        if (remainderCombo !== null) {
            const currentCombo = [...remainderCombo, num];
            if (shortestCombo === null || currentCombo.length < shortestCombo.length) {
                shortestCombo = currentCombo;
            }
        }
    }
    return shortestCombo;
}
console.log(bestSum(7, [5, 3, 4, 7]));
console.log(bestSum(8, [2, 3, 5]));
console.log(bestSum(8, [1, 4, 5]));
console.log(bestSum(100, [1, 2, 5, 25])); // N/A

//time: O(n^m*m)
//space:O(m)

//memoized recursion

const bestSum1 = (targetSum, numbers, memo = {}) => {
    if (targetSum in memo) return memo[targetSum]
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombo = null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderCombo = bestSum1(remainder, numbers, memo);
        if (remainderCombo !== null) {
            const currentCombo = [...remainderCombo, num];
            if (shortestCombo === null || currentCombo.length < shortestCombo.length) {
                shortestCombo = currentCombo;
            }
        }
    }
    memo[targetSum] = shortestCombo
    return shortestCombo;
}
console.log(bestSum1(7, [5, 3, 4, 7]));
console.log(bestSum1(8, [2, 3, 5]));
console.log(bestSum1(8, [1, 4, 5]));
console.log(bestSum1(100, [1, 2, 5, 25])); // 0.1 sec

//time: O(m*n*m)
//space: O(m^2)

// tabulation solution

const bestSum2 = (targetSum, numbers, memo = {}) => {
    const table = Array(targetSum + 1).fill(null);
    table[0] = [];

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] !== null) {
            for (let num of numbers) {
                const curCombo = [...table[i], num];
                if (!table[i + num] || table[i + num].length > curCombo.length) {
                    table[i + num] = curCombo;
                }
            }
        }
    }
    return table[targetSum]
}
console.log(bestSum2(7, [5, 3, 4, 7]));
console.log(bestSum2(8, [2, 3, 5]));
console.log(bestSum2(8, [1, 4, 5]));
console.log(bestSum2(100, [1, 2, 5, 25])); // 0.112 sec