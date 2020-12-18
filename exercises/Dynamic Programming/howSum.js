const howSum1 = (targetSum, numbers) => {
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderResult = howSum1(remainder, numbers);
        if (remainderResult !== null) {
            return [...remainderResult, num];
        }
    }
    return null;
}
console.log(howSum1(7, [2, 3]));
console.log(howSum1(7, [5, 3, 4, 7]));
console.log(howSum1(7, [2, 4]));
console.log(howSum1(8, [2, 3, 5]));
//console.log(howSum(300, [7, 14])); // 12.647 sec

//time:O(n^m*m) exponential
//space:O(m)

const howSum = (targetSum, numbers, memo = {}) => {
    if (targetSum in memo) return memo[targetSum]
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderResult = howSum(remainder, numbers, memo);
        if (remainderResult !== null) {
            memo[targetSum] = [...remainderResult, num];
            return memo[targetSum];
        }
    }
    memo[targetSum] = null
    return null;
}
console.log(howSum(7, [2, 3]));
console.log(howSum(7, [5, 3, 4, 7]));
console.log(howSum(7, [2, 4]));
console.log(howSum(8, [2, 3, 5]));
console.log(howSum(300, [7, 14])); // 0.163 sec

// time: O(n*m^2) polynomial
//space O(m^2)