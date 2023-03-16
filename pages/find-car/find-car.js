import { handleHttpErrors } from "../../utils.js";
import { API_URL,getHeaders } from "../../settings.js";

const URL = API_URL+"cars/"
let headers = getHeaders()

const navigoRoute = "find-car"
let carID

export async function initFindCar(match) {
document.getElementById("btn-fetch-car").onclick = fetchCarData
document.getElementById("btn-edit-car").onclick = putCarData
    if (match?.params?.id) {
      const id = match.params.id
      carID=id
      try {
        renderCar(id)
      } catch (err) {
        document.getElementById("error").innerText = "Could not find user: " + id
      }
    }
  }
  async function fetchCarData() {
    document.getElementById("error").innerText = ""
    const id = document.getElementById("fetch-car-input").value
    carID=id
    if (!id) {
      document.getElementById("error").innerText = "Please provide an id"
      return
    }
    try {
      renderCar(id)
      const queryString = "?id=" + id
      //@ts-ignore  
      window.router.navigate(`/${navigoRoute}${queryString}`, { callHandler: false, updateBrowserURL: true })
    } catch (err) {
      console.log("UPS " + err.message)
    }
  }

  async function renderCar(id){
    try{
        //const car = await fetch("https://danielcars.azurewebsites.net/api/cars/"+id).then(handleHttpErrors)
        const car = await fetch(URL+id,{
          headers:headers
        }).then(handleHttpErrors)
        document.getElementById("fetch-car-input").value = ""

        if(car === undefined){
            throw new Error ("No car found on id: "+id)
        }

        document.getElementById("id").innerText=car.id
        document.getElementById("brand").value=car.brand
        document.getElementById("model").value=car.model
        if(car.bestDiscount===undefined){
          document.getElementById("bestDiscount").value="0"
        }else {
          document.getElementById("bestDiscount").value=car.bestDiscount
        }
        document.getElementById("pricePrDay").value=car.pricePrDay
        document.getElementById("fields").removeAttribute("hidden")
    }catch (err) {
        document.getElementById("id").innerText=""
        document.getElementById("brand").innerText=""
        document.getElementById("model").innerText=""
        document.getElementById("bestDiscount").innerText=""
        document.getElementById("pricePrDay").innerText=""
        document.getElementById("reservations").innerText=""
        document.getElementById("error").innerText = err
      }
  }
  async function putCarData(){

  try{
    let editCar = {}
    editCar.brand= document.getElementById("brand").value
    editCar.model= document.getElementById("model").value
    editCar.pricePrDay= document.getElementById("pricePrDay").value
    editCar.bestDiscount= document.getElementById("bestDiscount").value
    //const answer = await fetch("https://danielcars.azurewebsites.net/api/cars/"+id)
    const answer = await fetch(URL+carID,{
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body: JSON.stringify(editCar)
    }).then(handleHttpErrors)
    document.getElementById("success").innerHTML=answer
  } catch (err){
    document.getElementById("error").innerText=err
  }
  }


  