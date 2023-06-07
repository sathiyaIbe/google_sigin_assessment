import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'
import { get_user_detail } from '../../Service/api.user';
import { saveAs } from 'file-saver';
const Home = () => {
  const location = useLocation()
  const [fileData, setFileData] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileArray, setFileArray] = useState(location.state?.files ? location.state?.files : [])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const checkToken = token === null
  useEffect(() => {
    if (checkToken) {
      navigate('/login')
    }
    async function getDetails() {
      const data = await get_user_detail(location.state?.userId)
      setFileArray(data.data?.files)
    }
    getDetails()
  }, [checkToken])
  function updateImage(e) {
    const data = (e.target.files[0])
    setFileData(data)
  }
  function download(file, filename) {
    saveAs(file, filename)
  }
  async function onSubmit() {
    async function funcs() {
      const form = new FormData();
      form.append('my_file', fileData);
      form.append("filename", fileName)
      form.append("userId", location.state?.userId)
      console.log(token)
      const value = await fetch("http://localhost:5050/authentication/api/addfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: form,
      }).then(res => res.json());
      setFileArray(value.files)
    }
    funcs()
  }
  function onLogout() {
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div data-testid="Home" className='home-bg'>
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
          <div className='col-md-12 '>
            <h4 className="form-label">File Name</h4>
            <div className="input-group text-center">
              <input type="text" placeholder='Enter File Name' value={fileName} className="form-control col-md-4 mb-4" onChange={(e) => setFileName(e.target.value)} />
            </div>
            <h4 className="form-label">File Upload</h4>
            <div className="input-group ">
              <input type="file" placeholder='' className="form-control col-md-4 mb-4 " onChange={updateImage} />
            </div>
            <button className='btn btn-primary' type="button" onClick={() => onSubmit()} >Submit</button>
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
                      <td>{data[1]}</td>
                      <td><button onClick={() => download(data[0], data[1])} type='button' className='btn btn-primary'>Download</button> </td>
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
