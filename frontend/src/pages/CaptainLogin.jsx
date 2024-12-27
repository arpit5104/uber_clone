import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {captain, setCaptain} = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const captainData = {
          email, 
          password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

        console.log(response)
         
        if(response.status === 200){
          setCaptain(response.data)
          localStorage.setItem('token', response.data.token)
          navigate('/captain-home')
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
                <p className='text-lg'>Join Uber as a captain. <Link to='/captain-signup' className='text-blue-600'>Create an account</Link></p>
            </form>
         </div>
         <div>
            <Link to='/login' className='flex justify-center items-center bg-[#530d2b91] font-bold text-xl text-white w-full p-2 rounded-md mt-5'>Sign In as User</Link>
         </div>
    </div>
  )
}

export default CaptainLogin