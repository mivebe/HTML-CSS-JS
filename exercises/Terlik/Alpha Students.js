test = [7, 4,
    "Emo Misho Ivanka Ginka 3324   [];'/./, Vancho Stancho Sashka",
    "Emo Misho",
    "Misho Emo",
    "Misho Sashka",
    "Sashka Stancho"];
const isLetters = (inputtxt) => {
    let letters = /^[A-Za-z]+$/;
    return (inputtxt.match(letters) ? true : false);
};
const people = test[2].split(" ").filter((el) => {
    if (isLetters(el)) {
        return el;
    }
});
class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    };
};
let map = new Map();
for (let i = 0; i < people.length; i++) {
    const curNode = new Node(people[i], people[i - 1] || null, people[i + 1] || null);
    map.set(people[i], curNode);
};
for (let i = 3; i < test.length; i++) {
    let swap = test[i].split(" ").filter((el) => {
        if (isLetters(el)) {
            return el;
        };
    });
    let first = map.get(swap[0]);
    let secound = map.get(swap[1]);

    let firstLeft = map.get(first.prev) || null;
    let firstRight = map.get(first.next) || null;
    let secoundLeft = map.get(secound.prev) || null;

    if (firstLeft != null && firstRight != null) {
        firstLeft.next = firstRight.value;
        firstRight.prev = firstLeft.value;
    } else if (firstLeft == null && firstRight != null) {
        firstRight.prev = null;
    } else if (firstRight == null && firstLeft != null) {
        firstLeft.next = null;
    };

    if (secoundLeft != null) {
        secoundLeft.next = first.value;
        first.prev = secoundLeft.value;
        if (first.prev == first.value) { first.prev = null };
    } else {
        first.prev = null;
    };
    first.next = secound.value;
    secound.prev = first.value;
};
const findFirst = (node) => {
    return (node.prev == null) ? node.value : false;
};
let firstNode = "";
allValues = map.values();
for (let node of allValues) {
    if (findFirst(node)) {
        firstNode = findFirst(node);
        break;
    };
};
const recPrint = (firstNode) => {
    curFirst = map.get(firstNode);
    if (curFirst.next == null) {
        console.log(curFirst.value);
    } else {
        console.log(curFirst.value);
        recPrint(curFirst.next);
    };
};
recPrint(firstNode);