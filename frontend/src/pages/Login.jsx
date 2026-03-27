import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import './Login.css'
import { Link ,useNavigate} from 'react-router-dom'
import { useState  } from 'react';
import AuthServices from '../Service/AuthService';
import { toast } from 'react-toastify';
import { getErrorMessage } from "../Utils/ErrorMessage";

function Login() {

const[taskData,setTaskData]=useState({
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

  const loginHandler=async (e)=>{
       e.preventDefault();
       try{
        const data = {
         email: taskData.email,
         password: taskData.password};
      const res = await AuthServices.loginUSer(data);
      toast.success(res.data.message);
      navigate("/home");
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

         <div className='user-icon'><FaUserCircle  /></div>

        <div className='input-container'>
         <label> Email</label>
         <input type="email" name="email"  placeholder='Enter your email' value={taskData.email} onChange={changeHandler}/>
        </div>

        <div className='input-container'>
         <label >Password</label>
         <input type="password" name="password" value={taskData.password} placeholder='Enter your password' onChange={changeHandler}/>
        </div>
      
        <button className='login-btn' type='submit' onClick={loginHandler}>Login</button>

       <div><p>not a user ? please <Link to="/register">Signup</Link></p></div>
       </form>
    </div>
  )
}

export default Login