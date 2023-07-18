//console.log([document])
import {printTemplate , showCheckbox, clear, displayError} from '../module/functions.js'


let container = document.getElementById("pastEventsCards");
let checkboxContainer = document.getElementById("checkboxContainer");
let searchBar = document.getElementById("searchBar");

let findDate;
let events;
let category;
let categoryNoRepeat; 
let categoryArray; 
let selectedCategories = [];
let mapCategories = [];
let checkboxesArray = [];



fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then( data => {
    events = data.events;
    console.log(data);
    findDate = events.filter(upComingD => upComingD.date <= data.currentDate)
    printTemplate(findDate, container);
    category = findDate.map(event => event.category);
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



checkboxContainer.addEventListener("change", () => {
    selectedCategories = checkboxesArray.filter(checkboxAr => checkboxAr.checked);
    
    mapCategories = selectedCategories.map(checkboxMap => checkboxMap.value);
    
    let searchedInput = searchBar.value.toLowerCase();
    let filteredCards = findDate.filter(event =>
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

searchBar.addEventListener("keyup", (e) => {
    let searchedInput = e.target.value.toLowerCase();
    let filteredCards = findDate.filter(event =>
        (mapCategories.length === 0 || mapCategories.includes(event.category)) //will filter just the events checked AND tht include what the sear bar has
        && event.name.toLowerCase().includes(searchedInput));

    if (filteredCards.length == 0) {
        displayError(container);
    } else {
        clear(container);
        printTemplate(filteredCards, container);
    }
})

