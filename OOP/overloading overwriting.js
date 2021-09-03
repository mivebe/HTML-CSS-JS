class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayName() {
        console.log(this.name);
        return 5
    }
    sayParam(param) {
        console.log("sayparam1 ", typeof param);
    }
    sayParam(asd, asd2) {
        console.log("sayparam2 ", typeof asd, typeof asd2)
    }
}

const gosho = new Person("Gosho", 12)

// console.log(gosho.sayName());
// console.log(gosho.sayParam("jkl"));
// console.log(gosho.sayParam("jkl", "fgh"));

class Doctor extends Person {
    constructor(name, age) {
        super(name, age)
    }
    sayName() {
        console.log("dr." + this.name);
    }
}
class Janitor extends Person {
    constructor(name, age) {
        super(name, age)
    }
}
class Engineer extends Person {
    constructor(name, age) {
        super(name, age)
    }
    sayName() {
        console.log("az sum enginer putki ");
        super.sayName()
    }
}


const doc = new Doctor("pesho", 30)
const jan = new Janitor("Zhombula", 28)
const eng = new Engineer("marto", 24)

doc.sayName()
jan.sayName()
eng.sayName()