import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})


    const handleSubmit = (e) => {
        e.preventDefault()
        setUserData({
            fullname:{
                firstName, 
                lastName, 
            },
            email, 
            password
        })
        
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
         <div>
            <img className='w-32  mb-10 ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />


            <form onSubmit={handleSubmit}>
                <h3 className='text-2xl font-bold mb-2'>What's your Name?</h3>

                <div className='flex justify-between gap-3 mb-7'>
                    <input className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-1/2 text-lg placeholder:text-grey  ' type="text" required  value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />

                    <input className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-1/2 text-lg placeholder:text-grey ' type="text" required  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />  
                </div>

                <h3 className='text-2xl font-bold mb-2'>What's your Email?</h3>
                <input className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-full text-lg placeholder:text-grey mb-7' type="email" required  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' />
                <h3 className='text-2xl mb-2 font-bold'>Enter your password</h3>
                <input className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-full text-lg placeholder:text-grey mb-7' type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' />
                <button className='bg-black font-bold text-xl text-white w-full p-2 rounded-md mt-5' type='submit'>Sign Up</button>
                <p className='text-lg'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
            </form>
         </div>
         <div>
            <p className="text-sm text-gray-600">By continuing, you agree to receive SMS, WhatsApp messages and emails from Uber and its affiliates. Message frequency varies.</p>
         </div>
    </div>
  )
}

export default UserSignup