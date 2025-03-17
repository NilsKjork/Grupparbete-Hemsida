let sparadeVaror = [];
let sparadeVarorCounter = null;

function addSparadeVaror(productArray){
    let hasCopy = false;
    const obj = {
        imageElement: productArray.imageElement.src,
        nameElement: productArray.nameElement.innerText,
        descriptionElement: productArray.descriptionElement.innerText,
        costElement: productArray.costElement.innerText
    }
    sparadeVaror.forEach(sparad => {
        if (sparad.nameElement == obj.nameElement){
            hasCopy = true;
        }
    });
    if (hasCopy == false){
        sparadeVaror.push(obj);
        localStorage.setItem("sparadeVaror", sparadeVaror);
        sparadeVarorCounter.innerText = sparadeVaror.length;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const elements = document.querySelectorAll(".favoriteButton");
    elements.forEach(element => {
        element.addEventListener('click', function() {
            let parentOfClickedItem = this.parentNode;
                const obj = {
                    imageElement: parentOfClickedItem.querySelector('.image'),
                    nameElement: parentOfClickedItem.querySelector('.name'),
                    descriptionElement: parentOfClickedItem.querySelector('.description'),
                    costElement: parentOfClickedItem.querySelector('.cost')
                }
                addSparadeVaror(obj);
        });
    });

    sparadeVarorCounter = document.getElementById('sparadeVarorCounter');

});