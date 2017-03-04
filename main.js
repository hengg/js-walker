var sh; 
sh = setInterval("bling()", 500); 
var num = 0;

function bling() {
    num = num + 1;
    if (num % 2 == 1) {
        document.getElementById('666').innerHTML = "老铁666！";
    }else{
        document.getElementById('666').innerHTML = "";
    }

}
