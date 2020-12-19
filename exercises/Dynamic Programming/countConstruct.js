//Write a function "countConstruct(target,wordBank)"
//that accepts a target and an array of strings.
//The function should return the number of ways that
//the "target" can be constructed by concatenating
//elements of the "wordBank" array.
//You may reuse elements of 'wordBank' as many times as needed.

// classic recursion

const countConstruct = (target, wordBank) => {
    if (target === "") return 1;

    let totalCount = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const curCount = countConstruct(suffix, wordBank);
            totalCount += curCount;
        }
    }

    return totalCount
}
console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
//console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // N/A

//time:O()
//space:O()

// memoized recursion

const countConstruct2 = (target, wordBank, memo = {}) => {
    if (target in memo) return memo[target]
    if (target === "") return 1;

    let totalCount = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const curCount = countConstruct2(suffix, wordBank, memo);
            memo[target] == curCount;
            totalCount += curCount;
        }
    }

    memo[target] = totalCount
    return totalCount
}
console.log(countConstruct2("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(countConstruct2("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(countConstruct2("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(countConstruct2("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
console.log(countConstruct2("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // 0.071 sec

//time:O()
//space:O()

// tabulation solution

const countConstruct2 = (target, wordBank) => {
    const table = Array(target.length + 1).fill(0);
    table[0] = 1;

    for (let i = 0; i <= target.length; i++) {
        for (let word of wordBank) {
            if (target.slice(i, i + word.length) === word) {
                table[i + word.length] += table[i]
            }
        }
    }
    return table[target.length]
}
console.log(countConstruct2("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(countConstruct2("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(countConstruct2("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(countConstruct2("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
console.log(countConstruct2("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // 0.076 sec