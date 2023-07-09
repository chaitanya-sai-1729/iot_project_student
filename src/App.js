import React from 'react';
import {Routes,Route} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import { SignUp } from './pages/SignUp';
import Front from './pages/Front';


function App(){
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path = '/front' element={<Front/>}/>
    </Routes>
  )
}

export default App;

