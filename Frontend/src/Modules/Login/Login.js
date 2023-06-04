import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { authuser } from '../../Service/api.user';

const Login = () => {
  const navigate=useNavigate()
  const token=localStorage.getItem('token')
const checkToken=token===null
 useEffect(()=>{
  if (!checkToken){
  return navigate('/')
} 
},[checkToken])
  function login(){
    return(
      <GoogleOAuthProvider clientId="294463467504-bnndpl3sff1i5bkdctfukudlq83nv127.apps.googleusercontent.com">  
      <GoogleLogin
    onSuccess= {credentialResponse => {
      async function checkUser(){
        const value=credentialResponse
        console.log(value)
        const data=authuser(value)
      }
      checkUser()
     
      console.log(credentialResponse);
     // localStorage.setItem("token", credentialResponse.clientId)

      //navigate('/')
    }}
    onError={() => {
      console.log('Login Failed');
    }}
    useOneTap
  />
  </GoogleOAuthProvider>

          )
  }
  return(
  <div data-testid="Login" className='container'>
  <div className='row  '>
    <div className='col-md-4 '>

      <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-12.jpg" className="img-fluid rounded-start" alt="img"/>
   
    </div>
    <div className='col-md-2'>
      {login()}
      <button className='btn btn-primary' type="button">Sign up with Google</button> 
       </div>
    </div>    
    
  </div>
);
}
Login.propTypes = {};

Login.defaultProps = {};

export default Login;
