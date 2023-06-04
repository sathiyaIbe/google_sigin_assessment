import axios from "axios"

const authuser=async(data)=>{
    console.log(data)
    return await axios.post("http://localhost:5050/authentication/api/authuser", data)
}

export {authuser};