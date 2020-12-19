// Write a function "canConstruct(target,wordBank)" that accepts a target string and an array of strings.
// The function should return a boolean indication whether or not the "target"can be constructed by concatenating elements from the "wordBank" array.
// You may reuse elements of "wordBank" as many times as needed.

// classic recursion

const canConstruct = (target, wordBank) => {
    if (target === "") return true;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            if (canConstruct(suffix, wordBank) === true) {
                return true
            }
        }
    }
    return false;
}
console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
//console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // N/A

//time:P()
//space:P()

// memoized recursion

const canConstruct1 = (target, wordBank, memo = {}) => {
    if (target in memo) return memo[target];
    if (target === "") return true;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            if (canConstruct1(suffix, wordBank, memo) === true) {
                memo[target] = true;
                return true;
            }
        }
    }
    memo[target] = false;
    return false;
}
console.log(canConstruct1("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(canConstruct1("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(canConstruct1("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
console.log(canConstruct1("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // 0.073 sec

//time:O()
//space:O()

//tabulation solution

const canConstruct2 = (target, wordBank) => {
    const table = Array(target.length + 1).fill(false);
    table[0] = true;

    for (let i = 0; i <= target.length; i++) {
        if (table[i] === true) {
            for (let word of wordBank) {
                //if the word matches the characters starting at position i
                if (target.slice(i, i + word.length) === word) {
                    table[i + word.length] = true;
                }
            }
        }
    }
    return table[target.length]
}
console.log(canConstruct2("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(canConstruct2("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(canConstruct2("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
console.log(canConstruct2("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // N/A

//time:O(n*m^2)
//space:O(m)