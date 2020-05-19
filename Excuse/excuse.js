function daysInMonth() {
    var date = new Date();
    month = date.getMonth();
    year = date.getYear();
    return new Date(year, month, 0, 0, 0, 0, 0).getDate();
}
function createPanel(i) {
    let op = document.getElementById("container")
        .appendChild(document.createElement("div"));
    op.setAttribute("class", "outer_panel");

    for (k = 0; k < 3; k++) {
        let opList = document.getElementsByClassName("outer_panel")[i]
            .appendChild(document.createElement("div"));
        opList.setAttribute("class", `inner_panel_${k}`);
    }
}
var daysInMonth = daysInMonth();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
document.getElementById("month")
    .innerText = monthNames[new Date().getMonth()];

for (i = 0; i < (daysInMonth + 1); i++) {
    createPanel(i);
    document.querySelectorAll(".inner_panel_0")[i]
        .appendChild(document.createTextNode("Day " + (i + 1) + " "));
    document.querySelectorAll(".inner_panel_1")[i]
        .appendChild(document.createTextNode("Worker " + (i + 1) + ".1"));
    document.querySelectorAll(".inner_panel_2")[i]
        .appendChild(document.createTextNode("Worker " + (i + 1) + ".2"));
}