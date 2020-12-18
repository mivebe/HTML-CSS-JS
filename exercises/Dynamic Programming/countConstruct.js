const countConstruct1 = (target, wordBank) => {
    if (target === "") return 1;

    let totalCount = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const curCount = countConstruct1(suffix, wordBank);
            totalCount += curCount;
        }
    }

    return totalCount
}
console.log(countConstruct1("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(countConstruct1("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(countConstruct1("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(countConstruct1("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
//console.log(countConstruct1("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // N/A

//time:O()
//space:O()

const countConstruct = (target, wordBank, memo = {}) => {
    if (target in memo) return memo[target]
    if (target === "") return 1;

    let totalCount = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const curCount = countConstruct(suffix, wordBank, memo);
            memo[target] == curCount;
            totalCount += curCount;
        }
    }

    memo[target] = totalCount
    return totalCount
}
console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));
console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeee", "eeeee"])); // 0.071 sec

//time:O()
//space:O()
