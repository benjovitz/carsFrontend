import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"
import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate, handleHttpErrors
  } from "./utils.js"

  //import { initUsersModal } from "./pages/users-modal/users-modal.js"
  import {initGetAllCars} from "./pages/getAllCars/getAllCars.js"
  import { initFindCar } from "./pages/find-car/find-car.js";
  import {showMatchObject} from "./pages/show-match/match.js"
  import { initGetAllMembers } from "./pages/getAllMembers/getAllMembers.js";
  import { initLogin,logout } from "./pages/login/login.js";
  
  //const cars = await fetch("https://danielcars.azurewebsites.net/api/cars").then(handleHttpErrors)
  window.addEventListener("load", async () => {

    //const templateUsersModal = await loadTemplate("./pages/users-modal/users-modal.html")'
    const templateGetAllCars = await loadTemplate("./pages/getAllCars/getAllCars.html")
    const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")
    const templateFindCar = await loadTemplate("./pages/find-car/find-car.html")
    const templateMatch = await loadTemplate ("./pages/show-match/match.html")
    const templateGetAllMembers = await loadTemplate("./pages/getAllMembers/getAllMembers.html")
    const templateLogin = await loadTemplate("./pages/login/login.html")
    
  
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
    "/get-all-cars": async () => {
        renderTemplate(templateGetAllCars,"content")
        initGetAllCars()
    },
    "/find-car": (match) => {
        renderTemplate(templateFindCar,"content")
        initFindCar(match)
    },
    "/show-match": (match) => {
      renderTemplate(templateMatch, "content")
      showMatchObject(match)
    },
    "/get-all-members": () => {
      renderTemplate(templateGetAllMembers, "content")
      initGetAllMembers()
    },
    "/login": () => {
      renderTemplate(templateLogin, "content")
      initLogin()
    },
    "/logout": () => {
      logout()
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
  
