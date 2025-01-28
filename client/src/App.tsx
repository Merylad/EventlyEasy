import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import MyEvents from './components/MyEvents'
import EventDetails from './components/EventDetails'
import ContactForm from './components/ContactForm'

function App() {
  

  return (
    <>
    <Navbar />

    <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path = '/myevents' element = {<MyEvents />} />
    <Route path = '/event/:eventId' element = {<EventDetails />} />
    <Route path = '/contact' element = {<ContactForm />}/>

    </Routes>
    </>
  )
}

export default App
