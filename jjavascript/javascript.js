let searchResultElementParents = [];
let shadow = undefined;
let timer = 0;
const products = [
    { href: "products/hylla.html", name: "Hylla", description: "Väldigt cool hylla", cost: "20" },
    { href: "products/annanHylla.html", name: "Annan hylla", description: "Även väldigt cool hylla", cost: "25" },
    { href: "products/hyllBil.html", name: "Hyll Bil", description: "Som en skåp bil. Men en hylla", cost: "205" },
    { href: "products/hyllo.html", name: "Hyllo", description: "En kvinlig hylla", cost: "25" },
    { href: "products/hkåpBil.html", name: "Skåp bil", description: "Bara en skåp bil", cost: "70" },
    { href: "products/coughingBaby.html", name: "Coughing baby", description: "Defeted a atom bomb!", cost: "420" }
];

let searchWrapper = undefined;

function applySearchResult(index, searchResult) {
    if(searchResultElementParents[index] != null){
        searchWrapper.style.display = "flex";
        searchResultElementParents[index].parent.style.display = 'flex';
        searchResultElementParents[index].imageElement.style.background = 'red';
        searchResultElementParents[index].nameElement.innerText = searchResult.name;
        searchResultElementParents[index].nameElement.href = searchResult;
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

            console.log(products[i].href);
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
        console.log(foundProducts);
    }
}

function onSearchFocus(event) {
    searchWrapper.style.display = "flex";
    shadow.style.display = "block";
    for (let i = 0; i < products.length; i++) {
        applySearchResult(i, products[i]);
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Create a new anchor element
const newLink = document.createElement('a');

// Set href and link text
newLink.href = products[0].href;
newLink.textContent = 'Visit Example';

// Add to the DOM
document.body.appendChild(newLink);


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
            imageElement: parent.querySelector('.image'),
            productInfoElement: parent.querySelector('.searchProductInfo'),
            nameElement: parent.querySelector('.name'),
            descriptionElement: parent.querySelector('.description'),
            costElement: parent.querySelector('.cost')
        }
        searchResultElementParents.push(obj);
    }

    const searchBar = document.getElementById('search_field');
    searchBar.addEventListener("input", onSearch);
    searchBar.addEventListener("focus", onSearchFocus);
    searchBar.addEventListener("blur", onSearchBlur);
});