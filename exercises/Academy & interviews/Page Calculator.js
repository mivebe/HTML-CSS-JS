// Page calculator
// Write a program that accepts an array of words, a value representing words per page and a keyword and outputs on which page the keyword can be found. If the word is not in the list print -1.

// Input
// An array with words, separated by commas.
// An integer N - words per page
// A keyword - the word which page number we are looking for
// Output
// The page on which the keyword can be found
// Constrains
// The search is case-sensitive
// Only single-word strings will be given
// If the word appears more than once, return the page of the last one
// Sample Tests
// Input
// Telerik, Java, JavaScript, PHP, HTML, CSS, Spring, Angular
// 2
// CSS
// Output
// 3
// Input
// Telerik, Java, CSS, JavaScript, PHP, HTML, CSS, Spring, Angular
// 2
// CSS
// Output
// 4
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