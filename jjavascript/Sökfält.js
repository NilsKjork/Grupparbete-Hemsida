import { sparadeVaror } from "./SparadeVaror.js";
import chalk from 'chalk';


let searchResultElementParents = [];
let shadow = undefined;
let searchBar = null;
const products = [
    { href: "products/hylla.html", name: "Hylla", description: "Väldigt cool hylla", cost: "20", image: "bilder/skåp_bil.png", alt: "Bild av hylla"},
    { href: "products/annanHylla.html", name: "Annan hylla", description: "Även väldigt cool hylla", cost: "25" ,image: "bilder/skåp_bil.png", alt: "Bild av annan hylla"},
    { href: "products/hyllBil.html", name: "Hyllbil", description: "Som en skåpbil. Men en hylla", cost: "205" , image: "bilder/skåp_bil.png", alt: "Bild av en hyllbil"},
    { href: "products/hyllo.html", name: "Hyllo", description: "En kvinlig hylla", cost: "25" , image: "bilder/skåp_bil.png", alt: "Bild av en hyllo"},
    { href: "products/skåpBil.html", name: "Skåpbil", description: "Bara en skåpbil", cost: "70" , image: "bilder/skåp_bil.png", alt: "Bild av en skåpbil"},
    { href: "products/coughingBaby.html", name: "Coughing baby", description: "Defeted a atom bomb!", cost: "420" , image: "bilder/baby.png", alt: "Bild av en fight mellan en bäbis och en atombomb"}
];

let searchWrapper = undefined;

function applySearchResult(index, searchResult) {
    if(searchResultElementParents[index] != null){
        console.log(chalk.bgGreen('Grön'));
        if (sparadeVaror.length == 0){
            searchResultElementParents[index].buttonElement.src = "../bilder/icons/favoritKnapp/tomFavorit.png";
        }   
        else {
            let favorite = false;
            sparadeVaror.forEach(element => {
                if (String(searchResult.name).trim().toLowerCase() == String(element.nameElement).trim().toLowerCase()) {
                    searchResultElementParents[index].buttonElement.src = "../bilder/icons/favoritKnapp/fylldFavorit.png";
                    favorite = true;
                } else if (favorite == false) {
                    searchResultElementParents[index].buttonElement.src = "../bilder/icons/favoritKnapp/tomFavorit.png";
                }
            });
        }
        searchWrapper.style.display = "flex";
        searchResultElementParents[index].parent.style.display = 'flex';
        searchResultElementParents[index].imageElement.src = searchResult.image;
        searchResultElementParents[index].imageElement.alt = searchResult.alt;
        searchResultElementParents[index].nameElement.innerText = searchResult.name;
        searchResultElementParents[index].nameElement.href = searchResult.href;
        searchResultElementParents[index].descriptionElement.innerText = searchResult.description;
        searchResultElementParents[index].costElement.innerText = searchResult.cost + " SEK";
    }
}
function hideSearchResult(index) {
    searchResultElementParents[index].parent.style.display = "none";
    if (index == 0) {
        searchWrapper.style.display = "none";
    }
}

function onSearch(event) {
    const query = event.target.value.toLowerCase();
    search(query);
}

function search(query) {
    let foundProducts = [];

    if (query.length > 0) {
        products.forEach(element => {
            let name = element.name.toLowerCase();

            for (let i = 0; i <= name.length - query.length; i++) {
                if (name[i] === query[0]) {
                    let match = true;

                    for (let j = 1; j < query.length; j++) {
                        if (name[i + j] !== query[j]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        foundProducts.push(element);
                        break;
                    }
                }
            }
        });
    }
    if (query.length == 0) {
        for (let i = 0; i < products.length; i++) {
            applySearchResult(i, products[i]);
        }
    }
    else {
        for (let i = 0; i < searchResultElementParents.length; i++) {
            if (i < foundProducts.length) {
                applySearchResult(i, foundProducts[i]);
            } else {
                hideSearchResult(i);
            }
        }
    }
}

function onSearchFocus(event) {
    searchWrapper.style.display = "flex";
    shadow.style.display = "block";
    search(searchBar.value);
}

document.addEventListener('DOMContentLoaded', function () {

    searchWrapper = document.getElementById('searchWrapper');
    shadow = document.getElementById('shadow');
    document.addEventListener('click', (event) => {
        if (!searchWrapper.contains(event.target) && !searchBar.contains(event.target)) {
            searchWrapper.style.display = "none";
            shadow.style.display = "none";
        }
    });

    for (let parent of searchWrapper.children) {
        const obj = {
            parent: parent,
            buttonElement: parent.querySelector('.favoriteButton'),
            imageElement: parent.querySelector('.image'),
            productInfoElement: parent.querySelector('.searchProductInfo'),
            nameElement: parent.querySelector('.name'),
            descriptionElement: parent.querySelector('.description'),
            costElement: parent.querySelector('.cost')
        }
        searchResultElementParents.push(obj);
    }

    searchBar = document.getElementById('search_field');
    searchBar.addEventListener("input", onSearch);
    searchBar.addEventListener("focus", onSearchFocus);

});