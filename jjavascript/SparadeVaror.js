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
    if (sparadeVaror != null){
    sparadeVaror.forEach(sparad => {
        if (sparad.nameElement == obj.nameElement){
            hasCopy = true;
            const index = sparadeVaror.indexOf(sparad);
            sparadeVaror.splice(index, 1);
            productArray.button.src = "../favoritKnapp/tomFavorit.png"
        }
    });
    }
    if (hasCopy == false){
        sparadeVaror.push(obj);
        productArray.button.src = "../favoritKnapp/fylldFavorit.png"
    }
    const serialized = JSON.stringify(sparadeVaror);
    localStorage.setItem("sparadeVaror", serialized);
    sparadeVarorCounter.innerText = sparadeVaror.length;
}

function drawSparadeVaror(){
    const searchWrapper = document.createElement("div");
    document.body.appendChild(searchWrapper);
    searchWrapper.classList.add("searchWrapper");
    searchWrapper.style.display = "flex";
    sparadeVaror.forEach(element => {
        const searchOption = document.createElement("article");
        searchWrapper.appendChild(searchOption);
        searchOption.classList.add("searchOption");
        searchOption.style.display = 'flex';

        const image = document.createElement("img");
        searchOption.appendChild(image);
        image.classList.add("image");
        image.src = element.imageElement;

        const searchProductInfo = document.createElement("div");
        searchOption.appendChild(searchProductInfo);
        image.classList.add("searchProductInfo");

        const name = document.createElement("a");
        name.innerText = element.nameElement;
        searchProductInfo.appendChild(name);
        image.classList.add("name");

        const description = document.createElement("p");
        description.innerText = element.descriptionElement;
        searchProductInfo.appendChild(description);
        image.classList.add("description");

        const cost = document.createElement("p");
        cost.innerText = element.costElement;
        searchProductInfo.appendChild(cost);
        image.classList.add("cost");
    });
}

document.addEventListener('DOMContentLoaded', function () {
    sparadeVarorCounter = document.getElementById('sparadeVarorCounter');
    
    const localStorageSave = localStorage.getItem("sparadeVaror");
    if (localStorageSave != null){
        sparadeVaror = JSON.parse(localStorageSave);
        sparadeVarorCounter.innerText = sparadeVaror.length;
    }
    const elements = document.querySelectorAll(".favoriteButton");
    elements.forEach(element => {
        element.addEventListener('click', function() {
            let parentOfClickedItem = this.parentNode;
                const obj = {
                    imageElement: parentOfClickedItem.querySelector('.image'),
                    nameElement: parentOfClickedItem.querySelector('.name'),
                    descriptionElement: parentOfClickedItem.querySelector('.description'),
                    costElement: parentOfClickedItem.querySelector('.cost'),
                    button: element
                }
                addSparadeVaror(obj);
        });
    });
    drawSparadeVaror();
});