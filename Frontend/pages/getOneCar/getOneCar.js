import { getCars } from "../getAllCars/getAllCars.js";

let cars =[]
export function initGetOneCar(){
cars = getCars()
console.log(cars)
document.getElementById("btn-fetch-car").onclick = fetchCarData
}
const navigoRoute = "find-car"

export async function initFindCar(match) {
    if (match?.params?.id) {
      const id = match.params.id
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

  function renderCar(id){
    try{
        const car = cars.filter(car=>car.id==id)[0]
        console.log(car)
        document.getElementById("fetch-car-input").value = ""

        if(car === undefined){
            throw new Error ("No car found on id: "+id)
        }

        document.getElementById("id").innerText=car.id
        document.getElementById("brand").innerText=car.brand
        document.getElementById("model").innerText=car.model
        document.getElementById("bestDicsount").innerText=car.bestDicsount
        document.getElementById("pricePrDay").innerText=car.pricePrDay
        document.getElementById("reservations").innerText=car.reservations
    }catch (err) {
        document.getElementById("error").innerText = err
      }
  }
  