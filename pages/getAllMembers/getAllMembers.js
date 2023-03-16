import { sanitizeStringWithTableRows,handleHttpErrors } from "../../utils.js"
import { API_URL,getHeaders } from "../../settings.js"
const URL = API_URL+"members/"
let headers = getHeaders()

export async function initGetAllMembers(){
    document.getElementById("table-body").onclick = showUserDetails
    getAllMembers()
}

async function getAllMembers(){
    try{
        const users = await fetch(URL,{
            headers:headers
        }).then(handleHttpErrors)
        const tableRows = users.map(user=>`
        <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.city}</td>
       <td><button id="row-btn_details_${user.username}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></td></tr>`).join("")

        document.getElementById("table-body").innerHTML = sanitizeStringWithTableRows(tableRows)
    } catch(err){
        console.log(err)
    }
}
async function showUserDetails(evt) {
    const target = evt.target
    if (!target.id.startsWith("row-btn_")) {
      return
    }
    
    const parts = target.id.split("_");
    const id = parts[2]
    const btnAction = parts[1]
      if (btnAction === "details") {
        document.getElementById("exampleModalLabel").innerText="Details for user: "+id
        const userDetails = await fetch(URL+id,{
            headers:headers
        }).then(handleHttpErrors)
        let data = `<ul>
        <li>Username: ${userDetails.username}</li>
        <li>Full name: ${userDetails.firstName} ${userDetails.lastName}</li>
        <li>Email: ${userDetails.email}</li>
        <li>Adress: ${userDetails.street}, ${userDetails.city} ${userDetails.zip}</li>
        <li>Ranking: ${userDetails.ranking}</li>
        <li>Approved: ${userDetails.approved}</li>`

        if(!Object.keys(userDetails.phones).length==0){
            data+=`
            <li>mobile ${userDetails.phones.mobile}</li>
            <li>work ${userDetails.phones.work}</li>
            <li>home ${userDetails.phones.home}</li>`
        }

        if(!userDetails.reservations.length==0){
            data+=`<table class="table">
            <tr>
            <th>Date</th><th>Car ID</th><th>Brand</th><th>Model</th>
            </tr>`
            data+=userDetails.reservations.map(res=>`
            <tr>
            <td>${res.date}</td>
            <td>${res.carID}</td>
            <td>${res.brand}</td>
            <td>${res.model}</td>`)
        }
        document.getElementById("modal-body").innerHTML=data
      
  }
}