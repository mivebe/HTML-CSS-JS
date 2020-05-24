function reverseFunction(num) {
  //document.getElementById("showcase").innerHTML = "reverse";
  num = num.value + "";
  var string = num
    .split("")
    .reverse()
    .join("");
  document.getElementById("showcase").innerHTML = string;
}
function averageFunction(num) {
  //document.getElementById("showcase").innerHTML = "average";
  var digits = ("" + num.value).split("");
  var counter,
    sum = 0;
  for (i of digits) {
    sum += parseInt(i);
    counter++;
  }
  var Number = sum / digits.length;
  document.getElementById("showcase").innerHTML = Number;
}
function squareFunction() {
  var a = parseInt(document.getElementById("a").value),
    b = parseInt(document.getElementById("b").value),
    c = parseInt(document.getElementById("c").value);
  if (isNaN(a)) {
    a = 1;
  }
  if (isNaN(b)) {
    b = 0;
  }
  if (isNaN(c)) {
    c = 0;
  }
  var D = b * b - 4 * a * c;
  var dis = document.getElementById("DIS"),
    nos = document.getElementById("NOS"),
    s1 = document.getElementById("S1"),
    s2 = document.getElementById("S2");
  nos.style.display = "none";
  s1.innerHTML = "";
  s2.innerHTML = "";
  dis.innerHTML = 'Discriminant = <span id="D"></span>';
  var d = document.getElementById("D");
  d.innerHTML = D.toString();
  if (D < 0) {
    nos.style.display = "block";
  } else if (D == 0) {
    var S = -b / (2 * a);
    s1.innerHTML = S.toString();
  } else {
    var S1 = (-b + Math.sqrt(D)) / (2 * a),
      S2 = (-b - Math.sqrt(D)) / (2 * a);
    s1.innerHTML = S1.toString();
    s2.innerHTML = S2.toString();
  }
}
onclick = "squareFunction()";