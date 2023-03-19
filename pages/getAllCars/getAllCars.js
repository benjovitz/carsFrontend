import { handleHttpErrors,sanitizeStringWithTableRows } from "../../utils.js";
import { API_URL,getHeaders } from "../../settings.js";
const URL = API_URL+"cars/"
let headers = getHeaders()

//const URL = "https://danielcars.azurewebsites.net/api/cars/"
export async function initGetAllCars(){
    document.getElementById("table-body").onclick = showCarDetails
    showAllCars()
}
  async function showAllCars(){
    try{
 const cars = await fetch(URL,{
  headers: headers
 }).then(handleHttpErrors)
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
  } catch (err){
    document.getElementById("table-body").innerHTML="<p>error loading</p>"
    console.log(err)
  }
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
        document.getElementById("exampleModalLabel").innerText="Reservations for car: "+id
        const car = await fetch(URL+id,{
          headers:headers
        }).then(handleHttpErrors)
        if(!car.reservations.length==0){
        document.getElementById("modal-body").innerText=JSON.stringify(car.reservations)
      } else{
        document.getElementById("modal-body").innerText=""
      }
    }
      else 
      if (btnAction === "delete")  {
          deleteCar(id)
          showAllCars()
      }
      else 
      if(btnAction === "edit"){
        console.log("hej")
        window.router.navigate("find-car?id=" + id)
      }
      
  }

  async function deleteCar(id){
    try{
        fetch(URL+id,{
            method: "delete",
            headers: headers
        }).then(handleHttpErrors)
        showAllCars()

    } catch (err){
        console.log(err)
    }
   
  }
  
