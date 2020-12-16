const string = "teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku teacher cheater cheater pen nep gosho tosho npe ooshg prn goshko tosho toshko maimuna munkey laino qnko kura mi im raku";
const words = string.split(" ");
for (let i = 0; i < 300000; i++) {
    words.push(`${i}`)

}
// const sorted = [];
// let container;
// for (let i = 0; i < words.length; i++) {
//     container = words[i].split("");
//     container.sort();
//     sorted.push(container.join(""));
// }

// const result = [];
// result.push(sorted[0]);
// const hui = [];
// hui.push(words[0]);
// let counter = 0;

// for (let j = 1; j < sorted.length; j++) {
//     let switc = false;
//     for (let k = 0; k < result.length; k++) {
//         if (result[k] === sorted[j]) {
//             switc = true;
//             break;
//         }

//     }
//     if (!switc) {
//         hui.push(words[j]);
//         result.push(sorted[j]);
//     }
// }
// console.log(hui.join(' '));

const res2 = [];
const mySet = new Set();


words.map(el => {
    const sorted = el.split('').sort().join('');

    if (!mySet.has(sorted)) {
        mySet.add(sorted);
        res2.push(el);
    }
})

console.log(res2.join(' '));


