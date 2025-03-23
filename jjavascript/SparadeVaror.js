import chalk from 'chalk';

export let sparadeVaror = [];
let favoritKnappar = [];
let måladeVaror = [];
let sparadeVarorCounter = null;

function addSparadeVaror(productArray){
    let hasCopy = false;
    const obj = {
        origin: productArray.origin,
        imageElement: productArray.imageElement,
        nameElement: productArray.nameElement,
        descriptionElement: productArray.descriptionElement,
        costElement: productArray.costElement,
        button: productArray.button
    }
    if (sparadeVaror != null){
    sparadeVaror.forEach(sparad => {
        if (sparad.nameElement == obj.nameElement){
            hasCopy = true;
            const index = sparadeVaror.indexOf(sparad);
            sparadeVaror.splice(index, 1);
            favoritKnappar.forEach(element => {
                let parentOfClickedItem = element.parentNode;
                if (obj.nameElement == parentOfClickedItem.querySelector('.name').innerText){
                    element.src = "../favoritKnapp/tomFavorit.png";
                }
            });
            productArray.button.src = "../favoritKnapp/tomFavorit.png"
        }
    });
    }
    if (hasCopy == false){
        sparadeVaror.push(obj);
        favoritKnappar.forEach(element => {
            let parentOfClickedItem = element.parentNode;
            if (obj.nameElement == parentOfClickedItem.querySelector('.name').innerText){
                element.src = "../favoritKnapp/fylldFavorit.png"
            }
        });
        productArray.button.src = "../favoritKnapp/fylldFavorit.png"
    }
    const serialized = JSON.stringify(sparadeVaror);
    localStorage.setItem("sparadeVaror", serialized);
    sparadeVarorCounter.innerText = sparadeVaror.length;
}

export function draw(varor){
    måladeVaror.forEach(element => {
        console.log(chalk.bgRedBright("jag dödade nyss") + element)
        const index = favoritKnappar.indexOf(element.querySelector('.favoriteButton'));
        favoritKnappar.splice(index, 1);
        const indexes = måladeVaror.indexOf(element);
        måladeVaror.splice(indexes, 1);
        element.parentNode.removeChild(element);
    });
    varor.forEach(element => {
        const searchOption = document.createElement("article");
        document.body.appendChild(searchOption);
        searchOption.classList.add("searchOption");
        searchOption.style.display = 'flex';

        const origin = document.createElement("div");
        origin.innerText = "javascript";
        searchOption.appendChild(origin);
        origin.classList.add("origin");

        const favoriteButton = document.createElement("img");
        searchOption.appendChild(favoriteButton);
        favoriteButton.classList.add("favoriteButton");
        favoriteButton.src = "../favoritKnapp/fylldFavorit.png";

        const image = document.createElement("img");
        searchOption.appendChild(image);
        image.classList.add("image");
        image.src = element.imageElement;

        const searchProductInfo = document.createElement("div");
        searchOption.appendChild(searchProductInfo);
        searchProductInfo.classList.add("searchProductInfo");

        const name = document.createElement("a");
        name.innerText = element.nameElement;
        searchProductInfo.appendChild(name);
        name.classList.add("name");

        const description = document.createElement("p");
        description.innerText = element.descriptionElement;
        searchProductInfo.appendChild(description);
        description.classList.add("description");

        const cost = document.createElement("p");
        cost.innerText = element.costElement;
        searchProductInfo.appendChild(cost);
        cost.classList.add("cost");
        måladeVaror.push(searchOption);
    });
    findButtons();
}

function findButtons(){
    const elements = document.querySelectorAll(".favoriteButton");
    elements.forEach(element1 => {
        let newKnap = true;
        favoritKnappar.forEach(element2 => {
            if (element1 == element2){
                newKnap = false;
            }
        });
        if (newKnap){
            favoritKnappar.push(element1);
            element1.addEventListener('click', function() {
                let parentOfClickedItem = this.parentNode;
                const obj = {
                    origin: parentOfClickedItem.querySelector('.origin').innerText,
                    imageElement: parentOfClickedItem.querySelector('.image').src,
                    nameElement: parentOfClickedItem.querySelector('.name').innerText,
                    descriptionElement: parentOfClickedItem.querySelector('.description').innerText,
                    costElement: parentOfClickedItem.querySelector('.cost').innerText,
                    button: element1
                }
                    addSparadeVaror(obj);
                    draw(sparadeVaror);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    sparadeVarorCounter = document.getElementById('sparadeVarorCounter');
    
    const localStorageSave = localStorage.getItem("sparadeVaror");
    if (localStorageSave != null){
        sparadeVaror = JSON.parse(localStorageSave);
        sparadeVarorCounter.innerText = sparadeVaror.length;
    }
    findButtons();
    draw(sparadeVaror);
});