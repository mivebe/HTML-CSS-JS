const eq = "4+4+(223-(13*2/(22/11)))", openings = [];
for (let i = 0; i < eq.length; i++) {
    if (eq[i] == "(") {
        openings.push(i);
    }
    if (eq[i] == ")") {
        console.log(eq.substring(openings[openings.length - 1], i + 1));
        openings.pop();
    }
}