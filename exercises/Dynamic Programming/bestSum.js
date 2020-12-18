const bestSum1 = (targetSum, numbers) => {
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombo = null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderCombo = bestSum1(remainder, numbers);
        if (remainderCombo !== null) {
            const currentCombo = [...remainderCombo, num];
            if (shortestCombo === null || currentCombo.length < shortestCombo.length) {
                shortestCombo = currentCombo;
            }
        }
    }
    return shortestCombo;
}
console.log(bestSum1(7, [5, 3, 4, 7]));
console.log(bestSum1(8, [2, 3, 5]));
console.log(bestSum1(8, [1, 4, 5]));
console.log(bestSum1(100, [1, 2, 5, 25])); // N/A

//time: O(n^m*m)
//space:O(m)

const bestSum = (targetSum, numbers, memo = {}) => {
    if (targetSum in memo) return memo[targetSum]
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombo = null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderCombo = bestSum(remainder, numbers, memo);
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
console.log(bestSum(7, [5, 3, 4, 7]));
console.log(bestSum(8, [2, 3, 5]));
console.log(bestSum(8, [1, 4, 5]));
console.log(bestSum(100, [1, 2, 5, 25])); // 0.1 sec

//time: O(m*n*m)
//space: O(m^2)