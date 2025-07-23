import JobSearch from './components/JobSearch'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { useState } from 'react'



function App() {

  const [activeComponent, setActiveComponent] = useState("search")
  
  return (
    <>
    <div id='header' className='bg-green-500 text-white mb-5 sticky top-0 w-full h-15 flex justify-between'>
      <h1 className='flex pl-5 items-center font-bold text-4xl'>JOB.SCRAPER</h1>
      <div className='flex gap-4 items-center text-lg pr-5'>
        <div className='h-full border-e-1 opacity-45 content-center relative mx-1'></div>
        <button onClick={() => setActiveComponent('search')}>ค้นหางาน</button>
        <div className='h-full border-e-1 opacity-45 content-center relative mx-1'></div>
        <button onClick={() => setActiveComponent('login')}>Login</button>
      </div>

    </div>
      {activeComponent === 'search' && <JobSearch />}
      {activeComponent === 'login' && <LoginPage />}
      {activeComponent === 'register' && <RegisterPage />}
    </>
  )
}

export default App
