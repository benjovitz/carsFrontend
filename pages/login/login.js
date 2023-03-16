import {handleHttpErrors} from "../../utils.js"
import { API_URL } from "../../settings.js"

const URL = API_URL+"auth/login"

export function initLogin() {
  document.getElementById("login-btn").onclick = login
}

export function logout(){
  document.getElementById("login-id").style.display="block"
  document.getElementById("logout-id").style.display="none"
  document.getElementById("sign-up-id").style.display="block"
  localStorage.clear()
}


async function login(evt) {
  document.getElementById("error").innerText = ""

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  //const userDto = {username:username,password:password}
  const userDto = { username, password }

  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userDto)
  }
  try {
    const response = await fetch(URL, options).then(res=>handleHttpErrors(res))
    localStorage.setItem("user",response.username)
    localStorage.setItem("token",response.token)
    localStorage.setItem("roles",response.roles)

    document.getElementById("login-id").style.display="none"
    document.getElementById("logout-id").style.display="block"
    document.getElementById("sign-up-id").style.display="none"

    window.router.navigate("")
  } catch (err) {
    document.getElementById("error").innerText = err.message
  }

}