import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { UserDataContext } from './context/UserContext'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
const App = () => {


  const user = useContext(UserDataContext)
  console.log(user)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding/>}/>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path = "/home" element = {
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
      <Route path="/user/logout" element={
        <UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>
      } />
      <Route path="/captain-home" element={
        <CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>
      } />
      </Routes>
    </div>
  )
}

export default App