let test = [
    "Telerik", "Java", "CSS", "JavaScript", "PHP", "HTML", "CSS", "Spring", "Angular",
    2,
    "CSS"
];
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(test, 0);

let arr = [];

for (let i = 0; i < (test.length - 2); i++) {
    arr.push(test[i]);
}
let wordsPerPage = test[test.length - 2];
let wordPosition = (arr.lastIndexOf(test[test.length - 1])) + 1;
let wordOnPage = Math.ceil(wordPosition / wordsPerPage);
print(wordOnPage);