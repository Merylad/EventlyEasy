import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/HomePage'

function App() {
  

  return (
    <>
    <Navbar />

    <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />

    </Routes>
    </>
  )
}

export default App
