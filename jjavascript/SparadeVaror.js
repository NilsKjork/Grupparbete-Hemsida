export let sparadeVaror = [];
let favoritKnappar = [];
let sparadeVarorCounter = null;

function addSparadeVaror(productArray){
    let hasCopy = false;
    const obj = {
        origin: productArray.origin.innerText,
        imageElement: productArray.imageElement.src,
        imageAlt: productArray.imageElement.imageAlt,
        nameElement: productArray.nameElement.innerText,
        descriptionElement: productArray.descriptionElement.innerText,
        costElement: productArray.costElement.innerText,
        button: productArray.button
    }
    if (sparadeVaror != null){
    sparadeVaror.forEach(sparad => {
        if (sparad.nameElement == obj.nameElement){
            hasCopy = true;
            const index = sparadeVaror.indexOf(sparad);
            sparadeVaror.splice(index, 1);
            favoritKnappar.forEach(element => {
                const parentArticle = element.closest("article");
                if (obj.nameElement == parentArticle.querySelector('.name').innerText){
                    element.src = "/bilder/icons/favoritKnapp/tomFavorit.png";
                    if (obj.origin == "javascript"){
                        productArray.origin.parentNode.parentNode.removeChild(productArray.origin.parentNode);
                    }
                }
            });
            productArray.button.src = "/bilder/icons/favoritKnapp/tomFavorit.png"
        }
    });
    }
    if (hasCopy == false){
        sparadeVaror.push(obj);
        favoritKnappar.forEach(element => {
            const parentArticle = element.closest("article");
            if (obj.nameElement == parentArticle.querySelector('.name').innerText){
                element.src = "/bilder/icons/favoritKnapp/fylldFavorit.png"
            }
        });
        productArray.button.src = "/bilder/icons/favoritKnapp/fylldFavorit.png"
    }
    const serialized = JSON.stringify(sparadeVaror);
    localStorage.setItem("sparadeVaror", serialized);
    sparadeVarorCounter.innerText = sparadeVaror.length;
}

export function draw(varor){
    if (varor.length != 0){
        const searchWrapper = document.createElement("div");
        document.body.appendChild(searchWrapper);
        searchWrapper.id = "searchWrapper";
        varor.forEach(element => {
            const searchOption = document.createElement("article");
            searchWrapper.appendChild(searchOption);
            searchOption.classList.add("searchOption");

            const origin = document.createElement("div");
            origin.innerText = "javascript";
            searchOption.appendChild(origin);
            origin.classList.add("origin");

            const favoriteButton = document.createElement("img");
            searchOption.appendChild(favoriteButton);
            favoriteButton.classList.add("favoriteButton");
            favoriteButton.src = "/bilder/icons/minus.png";
            favoriteButton.style.cursor = "pointer";
            favoriteButton.alt = "ta bort från varukorg";

            const image = document.createElement("img");
            searchOption.appendChild(image);
            image.classList.add("image");
            image.src = element.imageElement;
            image.alt = element.imageAlt;

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
        });
            const buy_button = document.createElement("button");
            buy_button.innerText = "KÖP!💰";
            document.body.appendChild(buy_button);
            buy_button.id = "buy_button";
        findButtons();
    }
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
                    const parentArticle = this.closest("article");
                    const obj = {
                        origin: parentArticle.querySelector('.origin'),
                        imageElement: parentArticle.querySelector('.image'),
                        nameElement: parentArticle.querySelector('.name'),
                        descriptionElement: parentArticle.querySelector('.description'),
                        costElement: parentArticle.querySelector('.cost'),
                        button: element1
                    };
                    addSparadeVaror(obj);
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