const input = ['3', "X", "Y"];
const z = Number(input[0]), x = input[1], y = input[2], symbols = input.slice(1, 3);
let combo = "", num = "";
/*for (i = 0; i < ((Math.pow(z, 2)) - 1); i++) {
    num = i.toString(2).padEnd(z, 0);
    for (j = 0; j < z; j++) {
        num[j] == 0 ? combo += x : combo += y;
    }
    console.log(combo);
    combo = "";
}*/
const Combine = (symbols, length, current) => {
    if (current.length == length) return [current];
    let result = [];
    for (let i = 0; i < symbols.length; i++) {
        result.push.apply(result, Combine(symbols, length, current + symbols[i]));
    }
    return result;
}
console.log(Combine(symbols, input[0], ""));