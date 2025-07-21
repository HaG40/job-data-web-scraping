import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JobSearch from './components/JobSearch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JobSearch />
    </>
  )
}

export default App
