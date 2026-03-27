import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import './Login.css'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import AuthServices from '../Service/AuthService';
import { toast } from 'react-toastify';
import { getErrorMessage } from "../Utils/ErrorMessage";  

function Register() {

const[taskData,setTaskData]=useState({
    username:"",
    email: "",
    password: ""
  });

  const changeHandler=(e)=>{
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    })
  }
   const navigate = useNavigate();

  const registerHandler=async(e)=>{
       e.preventDefault();
        if (!taskData.username || !taskData.email || !taskData.password) {
          toast.error("All fields are required");
            return;
  }
       try{
        const data = {
         username: taskData.username,
         email: taskData.email,
         password: taskData.password};
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate("/login");
       localStorage.setItem("todoapp", JSON.stringify(res.data));
       console.log(res.data);
    } catch (err) {
     toast.error(getErrorMessage(err));
    console.log(err);
    }
  }

  return (
    <div className='form-container'>
       <form className='form'>

         <div className='user-icon'><FaUserCircle /></div>

         <div className='input-container'>
         <label> Username</label>
         <input type="text" name="username"  placeholder='Enter your username' value={taskData.username} onChange={changeHandler}/>
        </div>
        <div className='input-container'>
         <label> Email</label>
         <input type="email" name="email"  placeholder='Enter your email' value={taskData.email} onChange={changeHandler}/>
        </div>

        <div className='input-container'>
         <label >Password</label>
         <input type="password" name="password" value={taskData.password} placeholder='Enter your password' onChange={changeHandler}/>
        </div>
      
        <button className='login-btn' type='submit' onClick={registerHandler}>Signup</button>

       <div><p>Already user ? please <Link to="/login">Login</Link></p></div>
       </form>
    </div>
  )
}

export default Register