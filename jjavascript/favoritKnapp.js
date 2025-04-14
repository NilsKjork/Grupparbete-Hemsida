import { sparadeVaror } from "./SparadeVaror.js";

document.addEventListener('DOMContentLoaded', function () {
let productWrapper1 = document.getElementById('product_wrapper1');
let productWrapper2 = document.getElementById('product_wrapper2');
let productWrapperElementParents = [];
    for (let parent of productWrapper1.children) {
        const obj = {
            buttonElement: parent.querySelector('.favoriteButton'),
            nameElement: parent.querySelector('.name'),
        }
        obj.buttonElement.style.display = 'flex';
        productWrapperElementParents.push(obj);
    }
    for (let parent of productWrapper2.children) {
        const obj = {
            buttonElement: parent.querySelector('.favoriteButton'),
            nameElement: parent.querySelector('.name'),
        }
        obj.buttonElement.style.display = 'flex';
        productWrapperElementParents.push(obj);
    }
    console.log(productWrapperElementParents);
productWrapperElementParents.forEach(product => {
    let found = false;
    sparadeVaror.forEach(vara => {
        if (vara.nameElement == product.nameElement.innerText){
            found = true;
        }
    });
    if (found){
        product.buttonElement.src = "../bilder/icons/favoritKnapp/fylldFavorit.png"
    }
    else{
        product.buttonElement.src = "../bilder/icons/favoritKnapp/tomFavorit.png"
    }
});
});