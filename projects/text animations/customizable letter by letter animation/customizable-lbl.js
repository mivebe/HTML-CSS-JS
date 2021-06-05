const text = document.querySelector(".lbl-anim");
const strText = text.textContent;
console.log(strText);
const splitText = strText.split("");
console.log(splitText);
text.textContent = "";

for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>"
}

let char = 0;

const onTick = () => {
    const span = text.querySelectorAll("span")[char];
    span.classList.add("fade");
    span.classList.add("clorize");
    char++;
    if (char === splitText.length) {
        finishEffect();
        return
    }
}

let timer = setInterval(onTick, 50);

const finishEffect = () => {
    clearInterval(timer);
}