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
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'
import PrivateAdminRoute from './components/PrivateAdminRoute'
import ProgressSearch from './pages/ProgressSearch'
import ImageManager from './pages/ImageManager'




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
            <Route path='/recuperar-senha' element={<ForgotPassword />}></Route>

            <Route path='/perfil' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
            <Route path='/acompanhamento' element={<PrivateRoute><ProgressSearch/></PrivateRoute>}></Route>

            <Route path='/register' element={<PrivateLoginAndRegister><Register /></PrivateLoginAndRegister>}></Route>
            <Route path='/login' element={<PrivateLoginAndRegister><Login /></PrivateLoginAndRegister>}></Route>

            <Route path='/dashboard' element={<PrivateAdminRoute><Dashboard /></PrivateAdminRoute>} />
            <Route path='/dashboard/imagens' element={<PrivateAdminRoute><ImageManager /></PrivateAdminRoute>} />
            <Route path='/dashboard/residente/:id/ficha-de-saida' element={<PrivateAdminRoute><ExitPlug /></PrivateAdminRoute>} />
            <Route path='/dashboard/residente/:id/perfil/editar' element={<PrivateAdminRoute><EditInfo /></PrivateAdminRoute>} />
            <Route path='/dashboard/residente/:id/perfil' element={<PrivateAdminRoute><ResidentProfile /></PrivateAdminRoute>} />
            <Route path='/dashboard/residente/novo' element={<PrivateAdminRoute><NewResident /></PrivateAdminRoute>} />
          </Routes>
        </MessageProvider>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
