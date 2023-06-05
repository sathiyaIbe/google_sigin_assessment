import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'
import { add_file, get_user_detail } from '../../Service/api.user';
import { saveAs } from 'file-saver';
import FileDownload from "js-file-download"
const Home = () => {
  const location=useLocation()
  

  const [fileData,setFileData]=useState("")
  const [fileName,setFileName]=useState("")
  const [fileArray,setFileArray]=useState(location.state?.files)
  const navigate=useNavigate()

  const token=localStorage.getItem('token')
  const checkToken=token===null
   useEffect(()=>{
    if (checkToken){
   navigate('/login')
  } 
  },[checkToken])
//   const token=localStorage.getItem('token')
// const checkToken=token===null
// console.log(checkToken)
 
//    useEffect(()=>{
//     console.log('dssdffdsafdsa')
//     if(token===null){
//    return navigate('/login')
//     }
//    },[checkToken])
  

  function updateImage(e){
    const data=(e.target.files[0])
   
    setFileData(data)
  } 
function download(a,b){
  console.log(a)
  saveAs(a,b)
}

  async function onSubmit(){
  async function funcs(){
    const form = new FormData();
    form.append('my_file', fileData);
    form.append("filename",fileName)
    form.append("userId", location.state.userId)
  const value= await fetch("http://localhost:5050/authentication/api/addfile", {
    method:"POST",
    body:form,
  }).then(res=>res.json());
  console.log(value)
  setFileArray(value.files)

  }
  funcs()
  
  }
  function onLogout(){
    localStorage.removeItem("token")
    navigate('/login')
  }
console.log(fileArray)
  return(
  <div data-testid="Home" className='home-bg'>
    <div className='container'>
    <div className='row'>
    
 
   <h1 className='text-center home-heading '> Welcome <span style={{color:"orange", fontSize:"48px", fontWeight:"bolder"}}>{location.state?.name}</span></h1>
   </div>
   <div className='row'>
   <div className='col-md-6'>
   <input type="text" placeholder='File Name' value={fileName} className="form-control mb-4"  onChange={(e)=>setFileName(e.target.value)} />

   <input type="file" placeholder='' className="form-control mb-4" onChange={updateImage} />
   <button className='btn btn-primary' type="button" onClick={()=>onSubmit()} >Submit</button>
</div>
<div className='col-md-4'>
  <button className='btn btn-danger' onClick={onLogout}>Logout</button>
</div>
</div>
<div className='row'>

{fileArray.length>0?(<div>
  <h3 className='text-center fw-bolder mb-3'>Files List</h3>
                {fileArray.map((data, index) => (
<div>
  <h3>{data[1]}</h3>
  <button onClick={()=>download(data[0],data[1])} type='button' className='btn btn-primary'>Download</button>
  </div>
                ))}
  
</div>):<></>
}

  </div>
  </div>
  </div>
)
  }
Home.propTypes = {};

Home.defaultProps = {};

export default Home;
