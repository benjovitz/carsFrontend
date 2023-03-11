import { handleHttpErrors,sanitizeStringWithTableRows } from "../../utils.js";

export async function initGetAllCars(){

    document.getElementById("table-body").onclick = editCar
    showAllCars()
}

async function editCar(evt) {
    const target = evt.target
    if (!target.id.startsWith("row-btn_edit")) {
      return
    }
    const id = target.id.replace("row-btn_edit", "")
    window.router.navigate("find-car?id=" + id)
  }

  async function showAllCars(){
 //cars = await fetch("https://danielcars.azurewebsites.net/api/cars").then(handleHttpErrors)
 const cars = await fetch("http://localhost:8080/api/cars").then(handleHttpErrors)
 const tableRows = cars.map(car=>`
 <tr>
 <td>${car.id}</td>
 <td>${car.brand}</td>
 <td>${car.model}</td>
 <td>${car.bestDiscount}</td>
 <td>${car.pricePrDay}</td>
 <td>
 <button id="row-btn_details_${car.id}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
 <button id="row-btn_edit${car.id}" type="button"  class="btn btn-sm btn-secondary">Edit</button>   
 <button id="row-btn_delete_${car.id}" type="button"  class="btn btn-sm btn-danger">Delete</button> 
 </td>    `).join("")

 document.getElementById("table-body").innerHTML=sanitizeStringWithTableRows(tableRows)
  }
  
