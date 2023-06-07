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
    var token=localStorage.getItem("token");

     //return await axios.post("http://localhost:5050/authentication/api/addfile", data)
    return await fetch("http://localhost:5050/authentication/api/addfile", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then(response => response.json());
    
}
const get_user_detail = async (id) => {
    return await axios.get(`http://localhost:5050/authentication/api/getuser/${id}`)
}
export { auth_user, store_user, add_file, get_user_detail };


// const PostServices = async (url,data) =>{
//     return await fetch(url, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accesstoken.gettoken()}`,
//       },
//       body: JSON.stringify(data),
//     }).then(response => response.json());
//   }