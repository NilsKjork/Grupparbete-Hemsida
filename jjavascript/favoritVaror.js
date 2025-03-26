import { draw } from "./SparadeVaror";
import { sparadeVaror } from "./SparadeVaror";
draw(sparadeVaror);

let buyButton = null;

document.addEventListener('DOMContentLoaded', function () {
    buyButton = document.getElementById('buy_button');
    buyButton.addEventListener('click', function(){
        alert("Du köpte" + JSON.stringify(sparadeVaror));
    });
});