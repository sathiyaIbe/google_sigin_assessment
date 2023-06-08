import axios from "axios"
const auth_user = async (data) => {
    return await axios.post("http://localhost:5050/authentication/api/authuser", data)
}
const store_user = async (data) => {
    return await axios.post("http://localhost:5050/authentication/api/saveuser", data)
}
const get_user_detail = async (data) => {
    return await axios.post(`http://localhost:5050/authentication/api/getuser`, data)
}
const download_user_files = async (data) => {
    return await axios.post(`http://localhost:5050/authentication/api/downloadfiles`, data, { responseType: "blob" })
}
export { auth_user, store_user, get_user_detail, download_user_files };
