// console.log([document])

let container = document.getElementById("homeCards")

function createCard(object) {
    return `<div class="col">
            <div class="card h-100" style="width: 17rem!important">
            <img src="${object.image}" class="card-img-top object-fit-cover" alt="img">
            <div class="card-body">
                <h5 class="card-title">${object.name}</h5>
                <p class="card-text">${object.description}</p>
                <div class="info">
                    <p>${object.price}</p>
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

printTemplate(data.events, container)

// console.log(data.events)

let checkboxContainer = document.getElementById("checkboxContainer")
let category = data.events.map(event => event.category) 
let categoryNoRepeat = new Set(category)
console.log(categoryNoRepeat)
let categoryArray = Array.from(categoryNoRepeat)
console.log(categoryArray)

function createCheckbox(category){
    return ` <label for="${category}">${category}</label>
            <input type="checkbox" name="category" id="${category}" value="${category}">
            `
}

function showCheckbox(array, elementoHTML){
   
    for( let category of array){
        elementoHTML.innerHTML += createCheckbox(category)
    }
   
}

showCheckbox(categoryArray, checkboxContainer)
console.log(checkboxContainer)

let checkboxes = document.querySelectorAll("input[type='checkbox']");
console.log(checkboxes)
let checkboxesArray = Array.from(checkboxes);
console.log(checkboxesArray)

let selectedCategories = [];
let mapCategories = [];
console.log(mapCategories)

checkboxContainer.addEventListener("change", () => {    
        
        selectedCategories = checkboxesArray.filter(checkboxAr => checkboxAr.checked);
        console.log(selectedCategories)
        mapCategories = selectedCategories.map(checkboxMap => checkboxMap.value);
        console.log(mapCategories);
        let searchedInput = searchBar.value.toLowerCase();
        let filteredCards = data.events.filter(event =>
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

  
function filterByCategory(events, selectedCategories) {
    return events.filter(event => selectedCategories.includes(event.category));
}


let searchBar = document.getElementById("searchBar");
console.log("searchBar")

function clear(elementoHTML){
    elementoHTML.innerHTML = ""
}

function displayError(elementoHTML){
    elementoHTML.innerHTML = `<H3>There Are No Coincidences</H3>`
}

searchBar.addEventListener("keyup", (e) => {
    let searchedInput = e.target.value.toLowerCase();
    let filteredCards = data.events.filter(event =>
        (mapCategories.length === 0 || mapCategories.includes(event.category))
        && event.name.toLowerCase().includes(searchedInput));

    if(filteredCards.length == 0){
        displayError(container);
    }else{
        clear(container)
        printTemplate(filteredCards, container);
    }
    
})




    






