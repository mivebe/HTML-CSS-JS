var clip = [];
var randomFirst;
var flag;
for (i=0;i<6;i++){
    clip[i] = false;
    document.write(clip[i] + "<br>");
}
clip[Math.floor((Math.random() *6))] = true;

document.write(clip + "<br>");
var randomFirst = Math.floor((Math.random() *2) +1);
if (randomFirst === 1){
    document.write("Player 1 is first!" + "<br>");
    flag = 0;
}else{
    document.write("Player 2 is first" + "<br>");
    flag = 1;
}
for(i=0;i<6;i++){
    if (flag == 0 && clip[i] == false){
        document.write("Player 1 takes a turn!" + "<br>");
        document.write("Player 1 survives his turn!" + "<br>");
        flag = 1;
    }else if (flag == 1 && clip[i] == false){
        document.write("Player 2 takes a turn!" + "<br>");
        document.write("Player 2 survives his turn!" + "<br>");
        flag = 0;
    }else{
        flag == 0 ? document.write("Player 1 se natukna na hui"):document.write("Player 2 se natukna na hui");
        break;
    }
}