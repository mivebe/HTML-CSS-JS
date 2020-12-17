

// classic recursion  

const fib1 = (n) => {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2)
}
console.log(fib1(1));
console.log(fib1(6));
console.log(fib1(8));
console.log(fib1(10));
console.log(fib1(50)); //85.932 sec

// dynamic programming recursion

const fib = (n, memo = {}) => {
    if (n in memo) return memo[n]
    if (n <= 2) return 1;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
}
console.log(fib(1));
console.log(fib(6));
console.log(fib(8));
console.log(fib(10));
console.log(fib(50)); //0.091 sec
