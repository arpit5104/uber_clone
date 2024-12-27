import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = {email, password}
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
        
        if(response.status === 200){
            setUser(response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/home')
        }



        setEmail('')
        setPassword('')

    }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
         <div>
            <img className='w-32  mb-10 ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
            <form onSubmit={handleSubmit}>
                <h3 className='text-2xl font-bold mb-2'>What's your email?</h3>
                <input className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-full text-lg placeholder:text-grey mb-7' type="email" required  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' />
                <h3 className='text-2xl mb-2 font-bold'>Enter your password</h3>
                <input className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-full text-lg placeholder:text-grey mb-7' type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' />
                <button className='bg-black font-bold text-xl text-white w-full p-2 rounded-md mt-5' type='submit'>Login</button>
                <p className='text-lg'>New to Uber? <Link to='/signup' className='text-blue-600'>Create an account</Link></p>
            </form>
         </div>
         <div>
            <Link to='/captain-login' className='flex justify-center items-center bg-[#0e0e0f91] font-bold text-xl text-white w-full p-2 rounded-md mt-5'>Sign In as Captain</Link>
         </div>
    </div>
  )
}

export default UserLogin