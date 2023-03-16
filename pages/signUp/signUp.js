import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";

const URL = API_URL+"members/"
let header = new Headers()

header.append("Content-Type","application/json")

export function initSignUp(){
document.getElementById("btn-register").onclick=createMember
}

async function createMember(){
    let newMember={}
    newMember.username=document.getElementById("input-username").value
    newMember.email=document.getElementById("input-email").value
    newMember.password=document.getElementById("input-password").value
    newMember.firstName=document.getElementById("input-firstname").value
    newMember.lastName=document.getElementById("input-lastname").value
    newMember.street=document.getElementById("input-street").value
    newMember.city=document.getElementById("input-city").value
    newMember.zip=document.getElementById("input-zip").value
    try{
        await fetch(URL,{
            body:JSON.stringify(newMember),
            method: "post",
            headers:header 
        }).then(handleHttpErrors)
    } catch (err){
        console.log(err)
    }
}