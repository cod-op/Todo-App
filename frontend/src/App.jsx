import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import TodoList from './Todos/TodoList'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify';

function App() {
 

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/todolist' element={<TodoList/>}></Route>
      </Routes>
       <ToastContainer />
    </div>
  )
}

export default App
