import React, { useState } from 'react'
import TwitterImage from '../../assets/images/twitter.jpeg'
import TwitterIcon from '@mui/icons-material/Twitter';
import auth from '../../firebase.init'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from "axios"


const Signup = () => {
    const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('');
  const [name,setName]=useState('');
  const navigate=useNavigate()
  // const [errorMsg,setError]=useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);;

  if(user||googleuser){
    navigate('/')
    console.log(user)
    console.log(googleuser)

  }
  if(error){
    console.log(error.message)
    
  }
  if(loading){
    console.log(loading)
    
  }

  const handleSubmit=e=>{
    e.preventDefault();
    console.log(email,password);
    createUserWithEmailAndPassword(email,password)

    const user={
      username:username,
      name:name,
      email:email,
    }

    const {data} =axios.post('http://localhost:5000/register',user)
    console.log(data)

  }

  const handleGogleSignIn=()=>{
    signInWithGoogle();
  }

  return (
    <div className='login-container'>
    <div className="image-container">
      <img className='image' src={TwitterImage} alt=''/>
    </div>
    <div className="form-container">
      <div className='form-box'>
      <TwitterIcon className='twittericon' style={{color:'skyblue'}}/>
      {/* <h2 className='heading'>Happening now</h2> */}
      <h3 className='heading1'>Join Twitter today</h3>
      <form onSubmit={handleSubmit}>
        <input type='text'
        placeholder='@username'
        className='display-name'
        onChange={(e)=>setUsername(e.target.value)}/>

        <input type='text'
        placeholder='Enter full name'
        className='display-name'
        onChange={(e)=>setName(e.target.value)}/>

        <input type='email'
        className='email'
        placeholder='Email Adress'
        onChange={(e)=>setEmail(e.target.value)}/>

        <input type='password'
        className='password'
        placeholder='Password'
        onChange={(e)=>setPassword(e.target.value)}/>

        <div className='btn-login'>
          <button type='submit' className='btn'>Signup</button>
        </div>
      </form>
      <hr/>
      <div className='google-button'>
        <GoogleButton
        className='g-btn'
        type='light'
        onClick={handleGogleSignIn}/>
      </div>
      <div>
        Already have an account?
        <Link to='/login'
        style={{
          textDecoration:'none',
          color:'skyblue',
          fontWeight:'600',
          marginLeft:'5px'
        }}>
        Login
        </Link>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Signup
