//Write a function "allConstruct(target, wordBank)" that accepts a target string and an array of strings.
//The function should return a 2D array containing all of the ways that the "target" can be constructed
//by concatenating elements of the "wordBank" array.
//Each element of the 2D array should represent one combination that constructs the "target".
//Yoy may reuse elements of the "wardBank" as many times as needed

// classic recursion

const allConstruct = (target, wordBank) => {
    if (target === "") return [[]];

    const totalWays = [];

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const suffixWays = allConstruct(suffix, wordBank);
            const targetWays = suffixWays.map(way => [word, ...way]);
            totalWays.push(...targetWays);
        }
    }

    return totalWays;
}
console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));
console.log(allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(allConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // N/A

//time:O(n^m)
//space:O(m)

// memoized recursion

const allConstruct1 = (target, wordBank, memo = {}) => {
    if (target in memo) return memo[target];
    if (target === "") return [[]];

    const allWays = [];

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const suffixWays = allConstruct1(suffix, wordBank, memo);
            const targetWays = suffixWays.map(way => [word, ...way]);
            allWays.push(...targetWays);
        }
    }

    memo[target = allWays]
    return allWays;
}
console.log(allConstruct1("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(allConstruct1("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));
console.log(allConstruct1("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(allConstruct1("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // N/A

//time:O(n^m)
//space:O(m)

// tabulation solution

const allConstruct2 = (target, wordBank) => {
    const table = Array(target.length + 1).fill().map(() => []);
    table[0] = [[]];

    for (let i = 0; i <= target.length; i++) {
        for (let word of wordBank) {
            if (target.slice(i, i + word.length) === word) {
                const newCombos = table[i].map((subArray) => [...subArray, word]);
                table[i + word.length].push(...newCombos)
            }
        }

    }
    return table[target.length]
}
console.log(allConstruct2("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(allConstruct2("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));
console.log(allConstruct2("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(allConstruct2("eeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // 0.083 sec but max call stack exeeded if 50 'e's as before

//time:~O(n^m)
//space:~O(n^m)