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