import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"
import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate, handleHttpErrors
  } from "./utils.js"

  //import { initUsersModal } from "./pages/users-modal/users-modal.js"
  import {initGetAllCars} from "./pages/getAllCars/getAllCars.js"
  import { initGetOneCar } from "./pages/getOneCar/getOneCar.js";
  
  //const cars = await fetch("https://danielcars.azurewebsites.net/api/cars").then(handleHttpErrors)
  window.addEventListener("load", async () => {

    //const templateUsersModal = await loadTemplate("./pages/users-modal/users-modal.html")'
    const templateGetAllCars = await loadTemplate("./pages/getAllCars/getAllCars.html")
    const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")
    const templateGetOneCar = await loadTemplate("./pages/getOneCar/getOneCar.html")
    
  
    adjustForMissingHash()
  
    const router = new Navigo("/", { hash: true });
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router
   
  
    router
      .hooks({
        before(done, match) {
          setActiveLink("menu", match.url)
          done()
        }
      })
      .on({ "/": () => document.getElementById("content").innerHTML =
      `<h2>Home</h2>
    <p style='margin-top:2em'>
    This is the content of the Home Route <br/>
    Observe that this is so simple that all HTML is added in the on-handler for the route. 
    </p>
   `,
    "/get-all-cars": () => {
        renderTemplate(templateGetAllCars,"content")
        initGetAllCars()
    },
    "/get-one-car": (match) => {
        renderTemplate(templateGetOneCar,"content")
        initGetOneCar()
    }
      })
      .notFound(() => {
        renderTemplate(templateNotFound, "content")
      })
      .resolve()
  });

  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' + errorObj);
  }

  export function getCars(){
    return cars
  }
  
