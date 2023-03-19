import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"
import { API_URL,getHeaders } from "../../settings.js"

const URL = API_URL + "cars/user"

let headers = getHeaders()
export async function initReservation() {
showAllCars()
}


async function showAllCars(){
    try{
 const cars = await fetch(URL,{
  headers: headers
 }).then(handleHttpErrors)
 const tableRows = cars.map(car=>`
 <tr>
 <td>${car.brand}</td>
 <td>${car.model}</td>
 <td>${car.pricePrDay}</td>
 <td>
 <button id="row-btn_reserve_${car.id}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Reserve</button> 
 </td>    `).join("")

 document.getElementById("table-body").innerHTML=sanitizeStringWithTableRows(tableRows)
  } catch (err){
    document.getElementById("table-body").innerHTML="<p>error loading</p>"
    console.log(err)
  }
}

