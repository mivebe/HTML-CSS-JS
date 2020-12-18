

// classic recursion  

const fib = (n) => {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2)
}
console.log(fib(1));
console.log(fib(6));
console.log(fib(8));
console.log(fib(10));
//console.log(fib(50)); // 85.932 sec



const fib1 = (n, memo = {}) => {
    if (n in memo) return memo[n]
    if (n <= 2) return 1;
    memo[n] = fib1(n - 1, memo) + fib1(n - 2, memo)
    return memo[n]
}
console.log(fib1(1));
console.log(fib1(6));
console.log(fib1(8));
console.log(fib1(10));
console.log(fib1(50)); // 0.091 sec



const fib2 = (n) => {
    const table = Array(n + 1).fill(0);
    table[1] = 1;
    for (let i = 0; i <= n; i++) {
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }
    return table[n]
}
console.log(fib2(1));
console.log(fib2(6));
console.log(fib2(8));
console.log(fib2(10));
console.log(fib2(50)); // 0.091 sec
