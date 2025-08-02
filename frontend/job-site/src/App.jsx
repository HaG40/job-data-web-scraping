import {Routes, Route, Link, Navigate } from 'react-router-dom';
import JobSearch from './components/job_search/JobSearch'
import LoginPage from './components/users/LoginPage'
import RegisterPage from './components/users/RegisterPage'
import UserPage from './components/users/UserPage';
import Logout from './components/users/Logout';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState, createContext } from 'react'

export const AuthContext = createContext();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  useEffect( () => {
  fetch("http://localhost:8888/api/user", { headers: {"Content-Type" : "application/json"} ,credentials: "include" })
      .then( async res => {
      if (res.ok) {
          const data = await res.json()
          setUsername(data.username)
      }else{
          console.log("Failed fetching user data")
      }
      })
  }, []);

  useEffect(() => {
  fetch("http://localhost:8888/api/protected", { credentials: "include" })
    .then(async res => {
      if (res.ok) {
        setIsAuthenticated(true);
        console.log("Authorized")

        if (username != '') {
          toast.success(`ยินดีต้อนรับ ${username}`)
        }      

      } else {
        setIsAuthenticated(false);
        console.log("Unauthorized")
      }

    }
  );
  }, []);
  
  return (
    <>      
    <div id='header' className='bg-green-500 z-100 text-white sticky top-0 w-screen h-15 flex justify-between shadow items-center'>
      <h1 className='flex pl-5 items-center font-bold text-4xl'>JOB.SCRAPER</h1>
      <div className='flex flex-row gap-4 items-center text-lg pr-10' >
        <Link to="/search">ค้นหางาน</Link>
        {isAuthenticated ? (
            <Link to="/user">{username}</Link>
        ) : (
          null
        )}
        {isAuthenticated ? (
          <Link to="/logout">ออกจากระบบ</Link>
        ) : (
          <Link to="/login">เข้าสู่ระบบ</Link>
        )}
      </div>

    </div>

        <AuthContext.Provider value={{ isAuthenticated, username, setIsAuthenticated }}>
          <Routes>
            <Route path="/search" element={<JobSearch />} />   
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/user" element={<UserPage />} /> 
            <Route path="/logout" element={<Logout />} /> 
          </Routes>
        </AuthContext.Provider>


        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          closeOnClick
          pauseOnHover
          theme="light"
        />
    </>
        
  )
}

export default App