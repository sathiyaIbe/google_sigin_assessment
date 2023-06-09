import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'
import toast, { Toaster } from 'react-hot-toast';
import { get_user_detail, download_user_files } from '../../Service/api.user';
import { gettoken } from '../../Service/token';
const Home = () => {
  const location = useLocation()
  const [fileData, setFileData] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileValue, setFileValue] = useState("")
  const [fileArray, setFileArray] = useState(location.state?.files ? location.state?.files : [])
  const userId = location.state?.userId
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const checkToken = token === null
  async function getDetails() {
    if (checkToken) {
     return navigate('/login')
    }else{
      try {
      const payload = { userId, token }
      const data = await get_user_detail(payload)
      setFileArray(data.data?.files)
    }
    catch (err) {
      return (err)
    }
}
  }
  useEffect(() => {
     getDetails()
  },[])
  function updateFiles(e) {
    const data = (e.target.files[0])
    const size = (data.size / 10000)
    if (size > 500) {
      setFileValue("")
      toast.error("File Size must be less than 5mb")
    } else {
      setFileValue(e.target.value)
      setFileData(data)
    }
  }
  async function download(file) {
    const data = {file}
    try {
      const downloadFile = await download_user_files(data)
      const blob = new Blob([downloadFile.data], { type: downloadFile.data.type });
       const link = document.createElement("a");
       link.href = window.URL.createObjectURL(blob);
       link.download = file;
       link.click();
    }
    catch (err) {
      toast.error("File Not Found");
    }
  }
  async function onSubmit() {
    async function funcs() {
      const form = new FormData();
      form.append('my_file', fileData);
      form.append("filename", fileName)
      try {
        const value = await fetch("http://localhost:5050/authentication/api/addfile", {
          method: "PUT",
          body: form,
          headers: {
            Authorization: `Bearer ${gettoken()}`,
          },
        }).then(res => res.json());
        if (value.message === "Internal Error") {
          toast.error("Not Uploaded")
        } else {
          toast.success("Uploaded Successfully");
          setFileArray(value.files)
        }
      } catch (err) {
        toast.error("Not Uploaded");
      }
    }
    if (!fileName || !fileData) {
      toast.error("Fill the fields")
    } else {
    const checkName=fileArray.map(each=>{
      return each[0]
    })
      if (checkName.includes(fileName)) {
        setFileName("")
        toast.error("File name already exist")
      } else {
        funcs()
      }
    }
  }
  function onLogout() {
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div data-testid="Home" className='home-bg'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='d-flex justify-content-end  p-3'>
        <button className='btn btn-danger' onClick={onLogout}>Logout</button>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10'>
            <h1 className='text-center home-heading '> Welcome <span style={{ color: "orange", fontSize: "48px", fontWeight: "bolder" }}>{location.state?.name}</span></h1>
          </div>
        </div>
        <div className='row align-items-center justify-content-center'>
          <div className='col-md-12  '>
            <h4 className="form-label">File Name</h4>
            <div className="input-group text-center">
              <input type="text" placeholder='Enter File Name' value={fileName} className="form-control col-md-4 mb-4" required onChange={(e) => setFileName(e.target.value)} />
            </div>
            <h4 className="form-label">File Upload</h4>
            <div className="input-group ">
              <input type="file" placeholder='' className="form-control col-md-4 mb-4 " value={fileValue} required onChange={updateFiles} />
            </div>
            <button className='btn btn-primary' type="submit" onClick={() => onSubmit()}>Submit</button>
          </div>
        </div>
        <div className='row'>
          {fileArray?.length > 0 ? (<div>
            <h3 className='text-center fw-bolder mb-3 mt-5'>Files List</h3>
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr className='table-info'>
                    <th scope="col">No</th>
                    <th scope="col">File Name</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {fileArray.map((data, index) => (
                    <tr className='table-warning' key={index}>
                      <td>{index + 1}</td>
                      <td>{data[0]}</td>
                      <td><button onClick={() => download(data[1])} type='button' className='btn btn-primary'>Download</button> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>) : <></>
          }
        </div>
      </div>
    </div>
  )
}
Home.propTypes = {};
Home.defaultProps = {};
export default Home;
