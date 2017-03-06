var sh; 
sh = setInterval("bling()", 500); 
var num = 0;

function bling() {
    num = num + 1;
    if (num % 2 == 1) {
        document.getElementById("666").style.color = "red";
    }else{
        document.getElementById("666").style.color = "black";
    }

}
