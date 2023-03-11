import { handleHttpErrors,sanitizeStringWithTableRows } from "../../utils.js";

let cars=[]

export async function initGetAllCars(){
    
     cars = await fetch("https://danielcars.azurewebsites.net/api/cars").then(handleHttpErrors)
    const tableRows = cars.map(car=>`
    <tr>
    <td>${car.id}</td>
    <td>${car.brand}</td>
    <td>${car.model}</td>
    <td>${car.bestDicsount}</td>
    <td>${car.pricePrDay}</td>`).join("")

    document.getElementById("table-body").innerHTML=sanitizeStringWithTableRows(tableRows)
}

//keeping the cars as an in memory array since the api is so slow, so i figured its quicker to use this array as a base instead of filtering through our slow api service
//I guess the "correct" way would be to use the api filter api/cars/id ex.
export function getCars(){
    return cars
}