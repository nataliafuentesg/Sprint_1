console.log([document])
console.log(location);
console.log(location.search);

// let id = location.search
// console.log(id);

// let idDetail = new URLSearchParams(id)
// console.log(idDetail);
// let sku = idDetail.get('id')
// console.log(sku);
let containerDetail = document.getElementById('detailCard')
console.log(containerDetail);

let detail = {};
let currentDate;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then( data => {
    events = data.events;    
    let id = location.search; 
    let idDetail = new URLSearchParams(id);  
    let sku = idDetail.get('id');   
    detail = events.find( event =>  event._id == sku);  
    currentDate = data.currentDate;        
    createCardDetails(detailCard, detail)
    
})

function createCardDetails(elementoHTML, objectEvent){

    if(detail.date > currentDate){
        elementoHTML.innerHTML +=  `
        <div class="card mb-3 h-100" style="width:auto">
                    <div class="detail g-3">
                        <div class="d-flex p-4 justify-content-center"
                            style="padding: 1rem; padding-top: 6rem;">
                            <img src="${objectEvent.image}" class="img-fluid object-fit-cover" style="width: 28rem" alt="img">
                        </div>
                        <div class="col-md-8" style="width: 25rem; margin: 0;">
                            <div class="card-body" style="width: auto;">
                                <h5 class="card-title">${objectEvent.name}</h5>
                                <h6 class="justify-content-left">Description</h6>
                                <p class="justify-content-left">${objectEvent.description}</p>
                                <h6 class="justify-content-left">Category</h6>
                                <p class="justify-content-left">${objectEvent.category}</p>
                                <h6 class="justify-content-left">Place</h6>
                                <p class="justify-content-left">${objectEvent.place}</p>
                                <h6 class="justify-content-left">Capacity</h6>
                                <p class="justify-content-left">${objectEvent.capacity}</p>
                                <h6 class="justify-content-left">Estimate</h6>
                                <p class="justify-content-left">${objectEvent.estimate}</p>
                                <h6 class="justify-content-left">Price</h6>
                                <p class="justify-content-left">$${objectEvent.price}</p>
    
                            </div>
                        </div>
                    </div>
    
                </div>
        `
    } else{  
    elementoHTML.innerHTML +=  `
    <div class="card mb-3 h-100" style="width:auto">
                <div class="detail g-3">
                    <div class="d-flex p-4 justify-content-center"
                        style="padding: 1rem; padding-top: 6rem;">
                        <img src="${objectEvent.image}" class="img-fluid object-fit-cover" style="width: 28rem" alt="img">
                    </div>
                    <div class="col-md-8" style="width: 25rem; margin: 0;">
                        <div class="card-body" style="width: auto;">
                            <h5 class="card-title">${objectEvent.name}</h5>
                            <h6 class="justify-content-left">Description</h6>
                            <p class="justify-content-left">${objectEvent.description}</p>
                            <h6 class="justify-content-left">Category</h6>
                            <p class="justify-content-left">${objectEvent.category}</p>
                            <h6 class="justify-content-left">Place</h6>
                            <p class="justify-content-left">${objectEvent.place}</p>
                            <h6 class="justify-content-left">Capacity</h6>
                            <p class="justify-content-left">${objectEvent.capacity}</p>
                            <h6 class="justify-content-left">Assistance</h6>
                            <p class="justify-content-left">${objectEvent.assistance}</p>
                            <h6 class="justify-content-left">Price</h6>
                            <p class="justify-content-left">$${objectEvent.price}</p>

                        </div>
                    </div>
                </div>

            </div>
    `
}}
