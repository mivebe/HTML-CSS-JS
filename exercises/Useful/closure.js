

// for (let i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i), i * 1000);

// }

const balance = (startingBalance) => {

    let balance = startingBalance;

    const deposit = (money) => {

        balance += money;
        console.log('You deposited ' + money + ' leva');
    }

    const withdraw = (money) => {

        balance -= money;
        console.log('You withdrew ' + money + ' leva');
    }

    const showBalance = () => {

        console.log('Your balance is ' + balance + ' leva');
        return balance;
    }

    return { deposit, withdraw, showBalance };

}


const funnnnnn = (el) => (el2) => el + el2;
funnnnnn(5)(6);





const gosho = balance(1000);
gosho.deposit(122);
gosho.showBalance();
////////////////////////////////////
const pesho = balance(5000);
pesho.withdraw(122);
pesho.showBalance();













