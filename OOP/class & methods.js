class Tiger {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(this.name);
    }
    sayHui() {
        console.log("hui");
    }
}

const gosho = new Tiger("Gosho", 20)
const pesho = new Tiger("Pesho", 22)
const asd = {
    name: "asd"
}
console.log(pesho);
console.log(gosho);

gosho.sayName()
gosho.sayHui()

const sayHui = gosho.sayHui
sayHui()
console.log(sayHui);

const sayName = gosho.sayName.call(asd)
// sayName()