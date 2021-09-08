// Задача 2:
// Имаме система, която следи работата по дадени задачи.
// Имаме задача (пр: провеждане на обучение), която е започната на дата X. Системата игнорира неработните дни, съответно ако датата X е почивен ден искаме да покажем, че задачата е започнала в първия работен ден след X.
// Всеки клиент може да си конфигурира от кога започва и кога свършва работната седмица.
// Напишете функция, която по посочени първи и последен работен ден от седмицата и дата, връща първия работен ден спрямо тази дата.
// Пример: 
// enum WeekDays {
//     Monday = 1,
//     Tuesday,
//     Wednesday,
//     Thursday,
//     Friday,
//     Saturday,
//     Sunday
// }

// getWorkday(firstWorkday: number, lastWorkday: number, date: Date): Date

// const firstWorkday = getWorkday(WeekDays.Monday, WeekDays.Friday, new Date(2021, 5, 5));
// console.log(firstWorkday); // Mon Jun 07 2021 00:00:00

// const firstWorkday = getWorkday(WeekDays.Thursday, WeekDays.Monday, new Date(2021, 5, 5));
// console.log(firstWorkday); // Mon Jun 05 2021 00:00:00

enum WeekDays {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

function getNextWorkDay(start, end, date) {

    // check whether date is within given week

    //if not skip weekend

    if (date.getDay() == 2) // sunday
        date.setDate(date.getDate() + 1);
    else if (date.getDay() == 1) // saturday
        date.setDate(date.getDate() + 2);
    return date.getDate();
}
console.log(getNextWorkDay(WeekDays.Monday, WeekDays.Friday, new Date(2021, 9, 5, 12, 0, 0, 0)));

