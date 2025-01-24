import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FixedWhatsAppButton from './components/FixedWhatsAppButton'
import ResidentProfile from './pages/ResidentProfile'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateLoginAndRegister from './components/PrivateLoginAndRegister'
import { MessageProvider } from './context/MessageContext'
import NewResident from './pages/NewResident'
import ScrollToTop from './tools/ScrollToTop'
import ExitPlug from './pages/ExitPlug'
import EditInfo from './pages/EditInfo'



function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <MessageProvider>
          <ScrollToTop />
          <Navbar />
          <FixedWhatsAppButton />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/dashboard' element={<Dashboard />}>
            </Route> 
            <Route path='/dashboard/residente/:id/ficha-de-saida' element={<ExitPlug />}></Route>
            <Route path='/dashboard/residente/:id/perfil/editar' element={<EditInfo />}></Route>

            <Route path='/register' element={<PrivateLoginAndRegister><Register /></PrivateLoginAndRegister>}></Route>
            <Route path='/login' element={<PrivateLoginAndRegister><Login /></PrivateLoginAndRegister>}></Route>
            <Route path='/dashboard/residente/:id/perfil' element={<ResidentProfile />}></Route>
            <Route path='/dashboard/residente/novo' element={<NewResident />}></Route>
          </Routes>
        </MessageProvider>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
