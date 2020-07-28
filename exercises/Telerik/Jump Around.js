let test = [
    '6 7 3',
    '0 0',
    '2 2',
    '-2 2',
    '3 -1'

];
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);