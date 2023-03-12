import { handleHttpErrors,sanitizeStringWithTableRows } from "../../utils.js";

//const URL = "http://localhost:8080/api/cars"
const URL = "https://danielcars.azurewebsites.net/api/cars"
export async function initGetAllCars(){
    document.getElementById("table-body").onclick = showCarDetails
    showAllCars()
}
  async function showAllCars(){
 const cars = await fetch(URL).then(handleHttpErrors)
 const tableRows = cars.map(car=>`
 <tr>
 <td>${car.id}</td>
 <td>${car.brand}</td>
 <td>${car.model}</td>
 <td>${car.bestDiscount}</td>
 <td>${car.pricePrDay}</td>
 <td>
 <button id="row-btn_details_${car.id}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
 <button id="row-btn_edit_${car.id}" type="button"  class="btn btn-sm btn-secondary">Edit</button>   
 <button id="row-btn_delete_${car.id}" type="button"  class="btn btn-sm btn-danger">Delete</button> 
 </td>    `).join("")

 document.getElementById("table-body").innerHTML=sanitizeStringWithTableRows(tableRows)
  }

  async function showCarDetails(evt) {
    const target = evt.target
    if (!target.id.startsWith("row-btn_")) {
      return
    }
    
    const parts = target.id.split("_");
    const id = parts[2]
    const btnAction = parts[1]
      if (btnAction === "details") {
        console.log("hej")
        document.getElementById("exampleModalLabel").innerText="Reservations for car: "+id
        const car = await fetch(URL+"/"+id).then(handleHttpErrors)
        if(!car.reservations.length==0){
        document.getElementById("modal-body").innerText=JSON.stringify(car.reservations)
      } 
    }
      else 
      if (btnAction === "delete")  {
          deleteUser(id)
          showAllCars()
      }
      else 
      if(btnAction === "edit"){
        console.log("hej")
        window.router.navigate("find-car?id=" + id)
      }
      
  }

  async function deleteUser(id){
    try{
        fetch(URL+"/"+id,{
            method: "delete"
        }).then(handleHttpErrors)
        showAllCars()

    } catch (err){
        console.log(err)
    }
   
  }
  
