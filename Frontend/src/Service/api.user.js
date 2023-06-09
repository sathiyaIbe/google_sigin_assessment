import axios from "axios"
import { gettoken } from "./token"
const auth_user = async (data) => {
    return await axios.post("http://localhost:5050/authentication/api/authuser", data)
}
const store_user = async (data) => {
    return await axios.post("http://localhost:5050/authentication/api/saveuser", data )
}
const get_user_detail = async () => {
    return await axios.get(`http://localhost:5050/authentication/api/getuser` ,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken()}`,
          },
    })
}
const download_user_files = async (data) => {
    return await axios.post(`http://localhost:5050/authentication/api/downloadfiles`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken()}`,
          },
           responseType: "blob" 
    })
}
export { auth_user, store_user, get_user_detail, download_user_files };
