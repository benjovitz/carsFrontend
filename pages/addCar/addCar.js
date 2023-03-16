import {  API_URL,getHeaders } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";

const URL=API_URL+"cars/"
let headers = getHeaders()

headers.append("Content-Type","Application/json")

export function initAddCar(){
document.getElementById("btn-submit-car").onclick = addCar
}

async function addCar(){
    let newCar = {}
    newCar.brand=document.getElementById("brand").value
    newCar.model=document.getElementById("model").value
    newCar.pricePrDay=document.getElementById("price-pr-day").value
    newCar.bestDiscount=document.getElementById("best-discount").value

    const res = await fetch(URL,{
        headers:headers,
        method: "post",
        body: JSON.stringify(newCar),
         
    }).then(handleHttpErrors)
    const id = res.id
    document.getElementById("see-new-car").setAttribute("href","/index.html?#/find-car?id="+id)
    document.getElementById("see-new-car").style="display: block"
}