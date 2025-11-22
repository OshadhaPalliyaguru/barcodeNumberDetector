import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BarcodeScanner from './components/Scanner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BarcodeScanner/>
    </>
  )
}

export default App
