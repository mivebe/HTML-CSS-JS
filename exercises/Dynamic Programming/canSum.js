//Write a function "canSum(targetSum,numbers)" that takes in
//a targetSum and an array of numbers as arguments.
//The function should return a boolean indication whether or
//not it is possible to generate the targetSum using the numbers from the array.
//You may use an element of the array as many times as needed.
//You may assume all input numbers are nonnegative.

// classic recursion

const canSum = (targetSum, numbers) => {
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of numbers) {
        const remainder = targetSum - num;
        if (canSum(remainder, numbers) === true) {
            return true;
        }
    }
    return false;
};
console.log(canSum(7, [2, 3]));
console.log(canSum(7, [5, 3, 4, 7]));
console.log(canSum(7, [2, 4]));
console.log(canSum(8, [2, 3, 5]));
console.log(canSum(300, [7, 14])); // 13.732 sec

// memoized recursion

const canSum1 = (targetSum, numbers, memo = {}) => {
    if (targetSum in memo) return memo[targetSum]
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of numbers) {
        const remainder = targetSum - num;
        if (canSum1(remainder, numbers, memo) === true) {
            memo[targetSum] = true
            return true;
        }
    }
    memo[targetSum] = false
    return false;
};
console.log(canSum1(7, [2, 3]));
console.log(canSum1(7, [5, 3, 4, 7]));
console.log(canSum1(7, [2, 4]));
console.log(canSum1(8, [2, 3, 5]));
console.log(canSum1(300, [7, 14])); // 0.096 sec

// tabulation solution

const canSum2 = (targetSum, numbers) => {
    table = Array(targetSum + 1).fill(false);
    table[0] = true;

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] === true) {
            for (let num of numbers) {
                table[i + num] = true;
            }
        }
    }

    return table[targetSum];
};
console.log(canSum2(7, [2, 3]));
console.log(canSum2(7, [5, 3, 4, 7]));
console.log(canSum2(7, [2, 4]));
console.log(canSum2(8, [2, 3, 5]));
console.log(canSum2(300, [7, 14])); // 0.115 sec