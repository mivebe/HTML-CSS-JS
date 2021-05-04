function subsetSum(numbers, target, partial) {
    var sum, n, remaining;

    partial = partial || [];
    let combos = [];

    // sum partial
    sum = partial.reduce(function (a, b) {
        return a + b;
    }, 0);

    // check if the partial sum is equals to target
    if (sum === target) {
        console.log("%s=%s", partial.join("+"), target);
    }

    if (sum >= target) {
        return;  // if we reach the number why bother to continue
    }

    for (var i = 0; i < numbers.length; i++) {
        n = numbers[i];
        remaining = numbers.slice(i + 1);
        subsetSum(remaining, target, partial.concat([n]));
    }
}
// subsetSum([1, 2, 3, 4], 5)

function sums(input) {
    for (let i = 1; i <= input; i++) {  //iterate through numbers
        const mySet = new Set();  //make set

        for (let j = 1; j < i; j++) {  // iterate from 1 to current number
            mySet.add(j);               // add single digit to the set

        }
        let tempArray = []
        for (let [key, value] of mySet.entries()) tempArray.push(key);   //print the set
        subsetSum(tempArray, i)
    }
}
sums(7)

