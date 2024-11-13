import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import { Row, Col } from 'react-bootstrap'; 
import { registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from '../services/allApi';
import { loginResposeContext } from '../context/Contextshare';
import { useContext } from 'react';
const Auth = ({ register }) => {
const {setLoginResponse} = useContext(loginResposeContext)
const navigate =useNavigate()
const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  });
  console.log(userDetails)

  const handleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info('Please fill the form completely');
    } 
    else {
      const result = await registerApi({ username, email, password });
      console.log(result);
      if (result.status == 200) {
        toast.success("Registration successful");
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setLoginResponse(false)
        navigate('/login')
      }
       else if (result.status === 406) {
        toast.warning(result.response.data);
      } 
      else {
        toast.error('Something went wrong');
      }
    }
  };

  const handleLogin = async()=>{
   const {email, password} = userDetails
    if(!email || !password){
      toast.info('Please fill the form completely')
    }
    else{
      const result = await loginApi({email, password})
      console.log(result);
      if(result.status==200){
        toast.success("Login successful")

        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else{
        toast.error('Something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      
      
    }
  }
  
  return (
   <>
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
        <div className="container w-75">
          <h4>
            <Link to={'/'} className='text-warning' style={{ textDecoration: 'none' }}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back Home
            </Link>
          </h4>
  
          <div className='bg-success p-5 rounded' style={{ marginTop: '20px' }}>
            <Row>
              <Col md={6} className='d-flex justify-content-center align-items-center'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmj6qSm2YR_dDJtYbOOs0Yr492_LQAFBX8EQ&s" alt="Lock Icon" width={'70%'} />
              </Col>
              <Col md={6} className='text-light d-flex flex-column justify-content-center'>
                <form className='w-100'>
                  <h4 className='text-center'>
                    <FontAwesomeIcon icon={faStackOverflow} className='fa-2x' /> Project Fair
                  </h4>
                  <h5 className='text-center mb-4'>{register ? 'Create your account now' : 'Sign into your account now'}</h5>
  
                  {register && (
                    <div className="mb-3">
                      <input type="text" placeholder='Username' value={userDetails.username} className='form-control rounded-0' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                    </div>
                  )}
                  <div className="mb-3">
                    <input type="text" placeholder='Email ID' value={userDetails.email} className='form-control rounded-0' onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <input type="password" placeholder='Password' value={userDetails.password} className='form-control rounded-0' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                  </div>
  
                  <div className='mb-3'>
                    {!register ? (
                      <div>
                        <button type='button' onClick={handleLogin} className='btn btn-warning w-100 rounded-0'>Login</button>
                        <p className='mt-3 text-center'>New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                      </div>
                    ) : (
                      <div>
                        <button type='button' className='btn btn-warning w-100 rounded-0' onClick={handleRegister}>Register</button>
                        <p className='mt-3 text-center'>Already a User? Click here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                      </div>
                    )}
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position='top-center' autoClose={2000} />
   </>
  );
};

export default Auth;
