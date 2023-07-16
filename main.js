// console.log([document])

let container = document.getElementById("homeCards");
let checkboxContainer = document.getElementById("checkboxContainer")
let searchBar = document.getElementById("searchBar")

let events;
let category;
let categoryNoRepeat; 
let categoryArray; 
let selectedCategories = [];
let mapCategories = [];
let checkboxesArray = [];



fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(answer => answer.json())
.then( data => {
    events = data.events;
    printTemplate(events, container);
    category = events.map(event => event.category);
    categoryNoRepeat = new Set(category);
    categoryArray = Array.from(categoryNoRepeat);
    console.log(categoryArray);
    showCheckbox(categoryArray, checkboxContainer); 

    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes)  
    checkboxesArray = Array.from(checkboxes);
    console.log(checkboxesArray);      
    
})
.catch(error => console.log(error))


function createCard(object) {
    return `<div class="col">
            <div class="card h-100" style="width: 17rem!important">
            <img src="${object.image}" class="card-img-top object-fit-cover" alt="img">
            <div class="card-body">
                <h5 class="card-title">${object.name}</h5>
                <p class="card-text">${object.description}</p>
                <div class="info">
                    <p>$${object.price}</p>
                    <a href="./assets/pages/details.html?id=${object._id}" class="details">Details</a>
                </div>
            </div>
            </div>
            </div>`
}

function printTemplate(array, elementoHTML) {
    let template = ""
    for (let event of array) {
        template += createCard(event)
    }

    elementoHTML.innerHTML += template
}

function createCheckbox(category) {
    return ` <label for="${category}">${category}</label>
            <input type="checkbox" name="category" id="${category}" value="${category}">
            `
}

function showCheckbox(array, elementoHTML) {

    for (let category of array) {
        elementoHTML.innerHTML += createCheckbox(category)
    }

}

checkboxContainer.addEventListener("change", () => {
    selectedCategories = checkboxesArray.filter(checkboxAr => checkboxAr.checked);    
    mapCategories = selectedCategories.map(checkboxMap => checkboxMap.value);    
    let searchedInput = searchBar.value.toLowerCase();
    let filteredCards = events.filter(event =>
        (mapCategories.length === 0 || mapCategories.includes(event.category))
        && event.name.toLowerCase().includes(searchedInput)
    );   
    if (filteredCards.length === 0) {
        displayError(container);
    } else {
        clear(container);       
        printTemplate(filteredCards, container);
    }
}
);

function clear(elementoHTML) {
    elementoHTML.innerHTML = ""
}

function displayError(elementoHTML) {
    elementoHTML.innerHTML = `<H5>There Are No Coincidences</H5>`
}

searchBar.addEventListener("keyup", (e) => {
    let searchedInput = e.target.value.toLowerCase();
    let filteredCards = events.filter(event =>
        (mapCategories.length === 0 || mapCategories.includes(event.category)) 
        && event.name.toLowerCase().includes(searchedInput));

    if (filteredCards.length == 0) {
        displayError(container);
    } else {
        console.log(filteredCards);
        clear(container);
        printTemplate(filteredCards, container);
    }
})













