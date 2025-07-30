import {Routes, Route, Link } from 'react-router-dom';
import JobSearch from './components/JobSearch'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import UserPage from './components/UserPage';
import { useState } from 'react'



function App() {
  
  return (
    <>      
    <div id='header' className='bg-green-500 text-white sticky top-0 w-screen h-15 flex justify-between shadow items-center'>
      <h1 className='flex pl-5 items-center font-bold text-4xl'>JOB.SCRAPER</h1>
      <div className='flex flex-row gap-4 items-center text-lg pr-10' >
        <Link to="/search">ค้นหางาน</Link>
        <Link to="/login">เข้าสู่ระบบ</Link>
      </div>

    </div>

        <Routes>
          <Route path="/search" element={<JobSearch />} />   
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/user" element={<UserPage />} /> 
        </Routes>
    </>
        
  )
}

export default App
