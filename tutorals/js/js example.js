let nameA='gosho';
console.log(nameA);
let firstName;
let lastName;
console.log(firstName,lastName);
let FirstName='mihail';
let LastName='bezev';
console.log(FirstName,LastName);
let hui=1;

let person={
    name:'mivebe',
    age:21
};
console.log(person);
person.name='ivan';
console.log(person.name);

person['name']='pesho';
console.log(person.name);

let selectedColors=['red','green'];
selectedColors[2]='blue';
selectedColors[3]=15;

console.log(selectedColors[0],selectedColors[1],selectedColors[2],selectedColors[3]);
console.log(selectedColors.length);

function greet(name,lastName) {
    console.log('hello'+' '+name+' '+lastName);
}
greet('John');
greet('Peter','smith');

function square(number){
    return number*number;
}
let number=square(3);
console.log(number);

console.log(square(4));


let person={
    name:'ivan',
    age:12
}
console.log(person.name);
console.log(person['age']);