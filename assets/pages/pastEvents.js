console.log([document])

let container = document.getElementById("pastEventsCards")

function createCard(object) {    
        return `<div class="col">
            <div class="card h-100" style="width: 17rem;">
            <img src="${object.image}" class="card-img-top" alt="img">
            <div class="card-body">
                <h5 class="card-title">${object.name}</h5>
                <p class="card-text">${object.description}</p>
                <div class="info">
                    <p>${object.price}</p>
                    <a href="./details.html" class="details">Details</a>
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
        console.log(template)
        elementoHTML.innerHTML += template
    
}


    
let findDate = data.events.filter(upComingD => upComingD.date <= data.currentDate)
console.log(findDate)



printTemplate(findDate, container)

console.log(data.events)

