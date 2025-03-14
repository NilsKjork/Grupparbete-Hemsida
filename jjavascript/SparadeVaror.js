let sparadeVaror = [];
let sparadeVarorCounter = null;

function addSparadeVaror(productArray){
    sparadeVaror.push(productArray);
    localStorage.setItem("sparadeVaror", sparadeVaror);
    sparadeVarorCounter.innerText = sparadeVaror.length;
}

document.addEventListener('DOMContentLoaded', function () {

    sparadeVarorCounter = document.getElementById('sparadeVarorCounter');

});