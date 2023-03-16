export const API_URL = "http://localhost:8080/api/"
//export const API_URL = "https://danielcars.azurewebsites.net/api/"

let headers = new Headers();

headers.append("Authorization", "Bearer "+localStorage.getItem("token"));

export function getHeaders(){
    return headers
}