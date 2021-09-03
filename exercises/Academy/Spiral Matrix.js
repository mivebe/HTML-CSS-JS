// Spiral Matrix
// Description
// Write a program that reads from the console a positive integer number N (1 ≤ N ≤ 20)
//  and prints a matrix holding the numbers from 1 to N*N in the form of square spiral like in the examples below.

// Input
// The input will always consist of a single line containing a single number - N.

// Output
// Output a spiral matrix as described below.

// Constraints
// N will always be a valid integer number.
// 1 ≤ N ≤ 20

// Sample tests
// Input
// 2
// Output
// 1 2
// 4 3
// Input
// 3
// Output
// 1 2 3
// 8 9 4
// 7 6 5
// Input
// 4
// Output
// 1 2 3 4
// 12 13 14 5
// 11 16 15 6
// 10 9 8 7
let test = 4;

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

const spiralMatrix = (n) => {

    const result = [];
    for (let m = 0; m < n; m++) {
        result.push([]);
    }

    let counter = 1;
    let startY = 0;
    let endY = n - 1;
    let startX = 0;
    let endX = n - 1;

    while (startY <= endY && startX <= endX) {
        //top
        for (let i = startY; i <= endY; i++) {
            result[startX][i] = counter;
            counter++;
        }
        startX++;
        //right
        for (let j = startX; j <= endX; j++) {
            result[j][endY] = counter;
            counter++;
        }
        endY--;
        //bottom
        for (let k = endY; k >= startY; k--) {
            result[endX][k] = counter;
            counter++;
        }
        endX--;
        //left
        for (let l = endX; l >= startX; l--) {
            result[l][startY] = counter;
            counter++;
        }
        startY++;
    }
    return result;
}
print(spiralMatrix(test));