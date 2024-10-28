//import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Signup from './Signup';
import Home from './Home';
import NotFound  from './NotFound';
import './App.css'
import './custom.css'
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/signup' element={<Signup />}></Route>
  <Route path='/login' element={<Login />}></Route>
  <Route path='/home' element={<Home />}></Route>
  <Route path='/' element={<Home />}></Route>
  <Route path="*" element={<NotFound />} />


</Routes>
</BrowserRouter>
  
  )
}

export default App
