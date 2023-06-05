import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin, } from '@react-oauth/google';
import { auth_user, store_user } from '../../Service/api.user';
import jwt_decode from "jwt-decode"
import "./Login.css"
const Login = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const checkToken = token === null
  useEffect(() => {
    if (!checkToken) {
      return navigate('/')
    }
  }, [checkToken])
  function login() {
    return (
      <GoogleOAuthProvider clientId="294463467504-bnndpl3sff1i5bkdctfukudlq83nv127.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            async function checkUser() {
              const decode_data = jwt_decode(credentialResponse.credential)
              const data = {
                name: decode_data.name,
                email: decode_data.email,
                image_url: decode_data.picture
              }
              const checkUser = await auth_user(data)
              console.log(checkUser.data)
              if (checkUser.data === null) {
                console.log("empty")
                const store = await store_user(data)
                const values = store.data.data
                if (store.status === 200) {
                  localStorage.setItem('token', store.data.token)
                  navigate('/', { state: { ...values } })
                }
              } else {
                const value = checkUser.data.data
                localStorage.setItem('token', checkUser.data.token)
                navigate('/', { state: { ...value } })
              }
            }
            checkUser()
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
  return (
    <div data-testid="Login" className=' main-login-container'>
      <div className=' card-container  '>
        <h1 className='heading text-center pt-5 '>File Upload using Google sigin </h1>
        <div className='cons'>
          <div className="card-containers ">
            <div className="img-containers">
              <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-12.jpg" className="img-fluid rounded-start" alt="img" />
            </div>
            <div className='body-containers text-start  '>
              {login()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Login.propTypes = {};
Login.defaultProps = {};
export default Login;
