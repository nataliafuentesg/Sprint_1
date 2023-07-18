// console.log([document])
import {printTemplate , showCheckbox, clear, displayError} from './assets/module/functions.js'

let baseUrl = window.location.href
console.log(baseUrl)
let container = document.getElementById("homeCards");
let checkboxContainer = document.getElementById("checkboxContainer")
let searchBar = document.getElementById("searchBar")

let events;
let category;
let categoryNoRepeat; 
let categoryArray; 
let searchedInput = searchBar.value.toLowerCase();
let selectedCategories = [];
let mapCategories = [];
let checkboxesArray = [];



fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
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

function filterAndDisplayCards(input){
    let filteredCards = events.filter(event =>
        (mapCategories.length === 0 || mapCategories.includes(event.category)) 
        && event.name.toLowerCase().includes(input));

    if (filteredCards.length == 0) {
        displayError(container);
    } else {
        console.log(filteredCards);
        clear(container);
        printTemplate(filteredCards, container);
    }
}

checkboxContainer.addEventListener("change", () => {
    selectedCategories = checkboxesArray.filter(checkboxAr => checkboxAr.checked);    
    mapCategories = selectedCategories.map(checkboxMap => checkboxMap.value);    
    filterAndDisplayCards(searchedInput);    
}
);

searchBar.addEventListener("keyup", (e) => {
    searchedInput = e.target.value.toLowerCase();
    filterAndDisplayCards(searchedInput);    
})

















