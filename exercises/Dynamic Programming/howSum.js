//Write a function "howSum(targetSum, numbers)" that takes in
//a targetSum and an array of numbers as arguments.
//The function should return an array containinng any combination of elements that add up to exactly the targetSum.
//If there is no combination that adds up to the targetSum, then return null.
//If there are multiple combinations possible, you may return any single one.

// classic recursion

const howSum = (targetSum, numbers) => {
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderResult = howSum(remainder, numbers);
        if (remainderResult !== null) {
            return [...remainderResult, num];
        }
    }
    return null;
}
console.log(howSum(7, [2, 3]));
console.log(howSum(7, [5, 3, 4, 7]));
console.log(howSum(7, [2, 4]));
console.log(howSum(8, [2, 3, 5]));
//console.log(howSum(300, [7, 14])); // 12.647 sec

//time:O(n^m*m) exponential
//space:O(m)

// memoized recursion

const howSum1 = (targetSum, numbers, memo = {}) => {
    if (targetSum in memo) return memo[targetSum]
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderResult = howSum1(remainder, numbers, memo);
        if (remainderResult !== null) {
            memo[targetSum] = [...remainderResult, num];
            return memo[targetSum];
        }
    }
    memo[targetSum] = null
    return null;
}
console.log(howSum1(7, [2, 3]));
console.log(howSum1(7, [5, 3, 4, 7]));
console.log(howSum1(7, [2, 4]));
console.log(howSum1(8, [2, 3, 5]));
console.log(howSum1(300, [7, 14])); // 0.163 sec

// time: O(n*m^2) polynomial
//space O(m^2)

//tabulation solution

const howSum2 = (targetSum, numbers) => {
    const table = Array(targetSum + 1).fill(null);
    table[0] = [];

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] !== null) {
            for (let num of numbers) {
                table[i + num] = [...table[i], num]
            }
        }
    }
    return table[targetSum]
}
console.log(howSum2(7, [2, 3]));
console.log(howSum2(7, [5, 3, 4, 7]));
console.log(howSum2(7, [2, 4]));
console.log(howSum2(8, [2, 3, 5]));
console.log(howSum2(300, [7, 14])); // 0.114 sec