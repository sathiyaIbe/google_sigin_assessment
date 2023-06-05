import axios from "axios"
const auth_user = async (data) => {
    console.log(data)
    return await axios.post("http://localhost:5050/authentication/api/authuser", data)
}
const store_user = async (data) => {
    console.log(data)
    return await axios.post("http://localhost:5050/authentication/api/saveuser", data)
}
const add_file = async (data) => {
    return await axios.post("http://localhost:5050/authentication/api/addfile", data)
}
const get_user_detail = async (id) => {
    return await axios.get(`http://localhost:5050/authentication/api/getuser/${id}`)
}
export { auth_user, store_user, add_file, get_user_detail };