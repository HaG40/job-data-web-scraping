import JobSearch from './components/JobSearch'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { useState } from 'react'



function App() {

  const [activeComponent, setActiveComponent] = useState("search")
  
  return (
    <>
    <div id='header' className='bg-green-500 text-white sticky top-0 w-full h-15 flex justify-between shadow items-center'>
      <h1 className='flex pl-5 items-center font-bold text-4xl'>JOB.SCRAPER</h1>
      <div className='flex flex-row gap-4 items-center text-lg pr-5' >
        <button onClick={() => setActiveComponent('search')} className='cursor-pointer'>ค้นหางาน</button>
        <button onClick={() => setActiveComponent('login')} className='cursor-pointer'>Login</button>
      </div>

    </div>
      {activeComponent === 'search' && <JobSearch />}
      {activeComponent === 'login' && <LoginPage />}
      {activeComponent === 'register' && <RegisterPage />}
    </>
  )
}

export default App
