let input = [
    '5 3',
    'Gosho Tosho Penka Miro Stanka',
    'Miro Gosho',
    'Gosho Stanka',
    'Stanka Miro'
];

// Custom implementation of read and print. Do not touch : )
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(input, 0);

const firstLine = gets().split(' ');
const numberOfPeople = +firstLine[0];
const numberOfSwaps = +firstLine[1];
const secondLine = gets().split(' ');

const peoplesMap = new Map();
let startingPerson = secondLine[0];

for (let i = 0; i < numberOfPeople / 2; i++) {
    peoplesMap.set(secondLine[i], [secondLine[i - 1] || null, secondLine[i + 1] || null]);
    peoplesMap.set(secondLine[numberOfPeople - i - 1], [secondLine[numberOfPeople - i - 2] || null, secondLine[numberOfPeople - i] || null]);
}
for (let i = 0; i < numberOfSwaps; i++) {
    const double = gets().split(' ');
    const first = double[0];
    const second = double[1];
    const firstRel = peoplesMap.get(first);
    const secondRel = peoplesMap.get(second);
    if (firstRel[1] === second || first === second) {
        continue;
    }
    if (firstRel[0]) {
        peoplesMap.set(firstRel[0], [peoplesMap.get(firstRel[0])[0], firstRel[1]]);
    }
    else {
        startingPerson = firstRel[1];
    }
    if (firstRel[1]) {
        peoplesMap.set(firstRel[1], [firstRel[0], peoplesMap.get(firstRel[1])[1]]);
    }
    peoplesMap.set(first, [secondRel[0], second]);
    peoplesMap.set(second, [first, peoplesMap.get(second)[1]]);
    if (secondRel[0]) {
        peoplesMap.set(secondRel[0], [peoplesMap.get(secondRel[0])[0], first]);
    }
    else {
        startingPerson = first;
    }

}
const toPrint = [];
for (let i = 0; i < numberOfPeople; i++) {
    toPrint.push(startingPerson);
    startingPerson = peoplesMap.get(startingPerson)[1];
}
print(toPrint.join(' '));

const test = '{Welectric Scooter 2000Z;Rayko Petrov;3500.05}';
const test2 = '{Fortnite Skin;Rayko Petrov;3000.00}';
console.log(test <= test2);
