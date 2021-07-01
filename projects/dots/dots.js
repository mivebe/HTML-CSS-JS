const wh = window.innerHeight;
const ww = window.innerWidth;
// console.log(wh, ww);

let container = document.querySelector(".dot-container");
var dotsArr = []

const detectCollision = (dot1, arr) => {
    let flag = false;
    let closestTarget = { x: 0, y: 0 };
    let closestDistance = ww + wh;

    for (let i = 0; i < arr.length; i++) {  //for every dot that exists
        if (dot1 === arr[i]) { continue }  //without the dot itself
        let dot2 = arr[i];
        let dx = dot1.position.x - dot2.position.x;
        let dy = dot1.position.y - dot2.position.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        //if its not the placement phase(cuz then roles dont exist) detect clossest dot with different role
        if (!dot1.states.initial && dot1.states.role !== dot2.states.role && dot2.states.role !== "caught" && closestDistance > distance) {
            closestDistance = distance;
            closestTarget = dot2.position;
        }

        if (distance < (dot1.scale / 2) + (dot2.scale / 2)) {
            if (!dot1.states.initial || dot1.states.role != dot2.states.role) {
                dot1.element.style.backgroundColor = "#00ff00";
                dot1.states.role = "caught"
            }

            flag = true;
            break;
        }
        dot1.states.target = closestTarget
    }
    return flag;
}

const updateDot = (dot) => {
    dot.element.style.left = dot.position.x + "px";
    dot.element.style.top = dot.position.y + "px";
}

const moveDot = (dot, x, y) => {
    if (dot.position.x + x >= ww - dot.scale || dot.position.y + y >= wh - dot.scale || dot.position.x + x <= 0 || dot.position.y + y <= 0) { return };
    if (detectCollision(dot, dotsArr)) { return }

    dot.position.x += x
    dot.position.y += y
    updateDot(dot);
}

const teleportDot = (dot, x, y) => {
    dot.position.x = x;
    dot.position.y = y;
    updateDot(dot);
}

//create dots
for (let i = 0; i < 50; i++) {
    let dot = {}
    let div = document.createElement("div");
    dot.element = div
    let diameter = 30
    div.classList.add("dot");

    dot.scale = diameter
    dot.states = { initial: true }

    do {
        dot.position = { x: Math.random() * (ww - diameter), y: Math.random() * (wh - diameter) };
    } while (detectCollision(dot, dotsArr));

    dot.states.initial = false
    updateDot(dot);

    dotsArr.push(dot)
    container.appendChild(div);
}

//randomize roles
dotsArr.map((el) => {
    rng = Math.floor(Math.random() * 1.3)

    if (rng) {
        el.element.classList.add("catcher");
        el.states.role = "catcher";
    } else {
        el.element.classList.add("runner");
        el.states.role = "runner";
    }
})

// const randomize = () => {
//     let dotArr = document.querySelectorAll(".dot")

//     dotArr.forEach(el => {
//         rng = Math.floor(Math.random() * 1.3)
//         if (rng) {
//             el.classList.add("catcher")

//         } else {
//             el.classList.add("runner")
//         }
//     })
// }
// randomize()

// var target = dotsArr[Math.floor(Math.random() * 50)]
// target.element.classList.add("target")

// setInterval(() => {
//     let x = Math.random() * (ww - 30)
//     let y = Math.random() * (wh - 30)
//     teleportDot(target, x, y)
// }, 1000);

// setInterval(() => {
//     for (let i = 0; i < 50; i++) {
//         moveDot(dotsArr[i], 3, 3)
//     }
// }, 200);

let catcherSpeed = 0.5
let runnerSpeed = 0.25

function loop() {
    for (let i = 0; i < dotsArr.length; i++) {
        let directionX = 0;
        let directionY = 0;

        if (dotsArr[i].states.target) {
            dotsArr[i].states.target.x > dotsArr[i].position.x ? directionX = 1 : directionX = -1
            dotsArr[i].states.target.y > dotsArr[i].position.y ? directionY = 1 : directionY = -1
        }

        if (dotsArr[i].states.role === "catcher") {
            moveDot(dotsArr[i], directionX * catcherSpeed, directionY * catcherSpeed)
        } else {
            moveDot(dotsArr[i], directionX * -runnerSpeed, directionY * -runnerSpeed)
        }
    }
    requestAnimationFrame(loop)
}

loop()