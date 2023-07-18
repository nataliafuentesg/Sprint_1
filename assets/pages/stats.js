let highAssistance = document.getElementById("highestAssistance");
let lowAssistance = document.getElementById("lowestAssistance");
let largerCapacity = document.getElementById("largerCapacity");
let upComingTable = document.getElementById("upComingData");
let pastTable = document.getElementById("pastData");
let events;
let upComingDates;
let pastDates;



fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(data => {
        events = data.events;
        console.log(events)
        pastDates = events.filter(upComingD => upComingD.date <= data.currentDate)
        console.log(pastDates)
        upComingDates = events.filter(upComingD => upComingD.date >= data.currentDate)
        console.log(upComingDates)

        highestPercentAssistance(pastDates, highAssistance)
        lowestPercentAssistance(pastDates, lowAssistance)
        largerCapacityEvent(events, largerCapacity)
        revenuesAndAssistanceUpComing(upComingDates, upComingTable)
        revenuesAndAssistancePast(pastDates, pastTable)


    })
    .catch(error => console.log(error))



function highestPercentAssistance(array, htmlElement) {
    let mapByAssistance = array.map(({ assistance, capacity, name }) =>
        ({ assistance, capacity, name }));
    console.log(mapByAssistance)

    mapByAssistance.forEach(element => {
        element.percentage = ((element.assistance * 100) / element.capacity)
    });
    console.log(mapByAssistance)

    let sortAssistance = mapByAssistance.sort((a, b) => {
        if (a.percentage > b.percentage) {
            return -1;
        }
        if (a.percentage < b.percentage) {
            return 1;
        }
    })
    console.log(sortAssistance)
    let highAssistancePer = sortAssistance[0].name;
    console.log(highAssistancePer)

    htmlElement.innerHTML += highAssistancePer


}

function lowestPercentAssistance(array, htmlElement) {
    let mapByAssistance = array.map(({ assistance, capacity, name }) =>
        ({ assistance, capacity, name }));
    console.log(mapByAssistance)

    mapByAssistance.forEach(element => {
        element.percentage = ((element.assistance * 100) / element.capacity)
    });
    console.log(mapByAssistance)

    let sortAssistance = mapByAssistance.sort((a, b) => {
        if (a.percentage > b.percentage) {
            return 1;
        }
        if (a.percentage < b.percentage) {
            return -1;
        }
    })
    console.log(sortAssistance)
    let lowAssistancePer = sortAssistance[0].name;
    console.log(lowAssistancePer)

    htmlElement.innerHTML += lowAssistancePer
}

function largerCapacityEvent(array, htmlElement) {
    let mapByCapacity = array.map(({ capacity, name }) =>
        ({ capacity, name }));
    console.log(mapByCapacity)
    let sortCapacity = mapByCapacity.sort((a, b) => {
        if (a.capacity > b.capacity) {
            return -1;
        }
        if (a.capacity < b.capacity) {
            return 1;
        }
    })
    console.log(sortCapacity)
    let lCapacity = sortCapacity[0].name;
    console.log(lCapacity)
    htmlElement.innerHTML += lCapacity

}

function revenuesAndAssistanceUpComing(array, htmlElement) {

    let mapByCategory = array.map(({ estimate, capacity, name, category, price }) => ({
        estimate, capacity, name, category,price}));
    console.log(mapByCategory)
    let categoryData = [];
    console.log(categoryData)

    for (let i = 0; i < mapByCategory.length; i++) {
        let event = mapByCategory[i];
        console.log(event)
        if (!categoryData[event.category]) {
            categoryData[event.category] = {
                revenue: 0,
                totalCapacity: 0,
                totalEstimate: 0,               
            };
            console.log(categoryData)
        }
        console.log(categoryData)
        categoryData[event.category].revenue += event.price * event.estimate;
        categoryData[event.category].totalCapacity += event.capacity;
        categoryData[event.category].totalEstimate += event.estimate;
    }

    
    let category = mapByCategory.map(event => event.category);
    let categoryNoRepeat = new Set(category);
    let categoryArray = Array.from(categoryNoRepeat);
    console.log(categoryArray)

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    for (let i = 0; i < categoryArray.length; i++) {
        let category = categoryArray[i];
        let { revenue, totalCapacity, totalEstimate } = categoryData[category];
        let percentage = (totalEstimate * 100) / totalCapacity;

        htmlElement.innerHTML +=  `<tr><td>${category}</td>
                                   <td>${USDollar.format(revenue)}</td>
                                   <td> ${percentage.toFixed(1)}%</td></tr>`;
    }  

    
}

function revenuesAndAssistancePast(array, htmlElement){
    let mapByCategory = array.map(({ assistance, capacity, name, category, price }) => ({
        assistance, capacity, name, category,price}));
    console.log(mapByCategory)
    let categoryData = [];
    console.log(categoryData)
    for (let i = 0; i < mapByCategory.length; i++) {
        let event = mapByCategory[i];
        console.log(event)
        if (!categoryData[event.category]) {
            categoryData[event.category] = {
                revenue: 0,
                totalCapacity: 0,
                totalAssistance: 0,
            };
        }
        categoryData[event.category].revenue += event.price * event.assistance;
        categoryData[event.category].totalCapacity += event.capacity;
        categoryData[event.category].totalAssistance += event.assistance;

        console.log(categoryData)
    }

    
    let category = mapByCategory.map(event => event.category);
    let categoryNoRepeat = new Set(category);
    let categoryArray = Array.from(categoryNoRepeat);
    console.log(categoryArray)

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    for (let i = 0; i < categoryArray.length; i++) {
        let category = categoryArray[i];
        let {revenue, totalCapacity, totalAssistance} = categoryData[category];
        let percentage = (totalAssistance * 100) / totalCapacity;

        htmlElement.innerHTML +=  `<tr><td>${category}</td>
                                   <td>${USDollar.format(revenue)}</td>
                                   <td> ${percentage.toFixed(1)}%</td></tr>`;
    }  
}
