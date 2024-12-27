import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const {captain, setCaptain} = useContext(CaptainDataContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const captainData = {
            fullname:{
                firstname:firstName, 
                lastname:lastName, 
            },
            email, 
            password,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
                vehicleType
            }
        }


        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        
        if(response.status === 201){
            setCaptain(response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/captain-home')
        }
        
        
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
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

                <h3 className='text-2xl mb-2 font-bold'>Vehicle Details</h3>
                
                <div className='flex justify-between gap-3 mb-7'>
                    <input 
                        className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-1/2 text-lg placeholder:text-grey'
                        type="text" 
                        required
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        placeholder='Vehicle Color'
                    />

                    <input 
                        className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-1/2 text-lg placeholder:text-grey'
                        type="text"
                        required
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        placeholder='Vehicle Plate Number'
                    />
                </div>

                <div className='flex justify-between gap-3 mb-7'>
                    <select
                        className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-1/2 text-lg text-gray-600'
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                    >
                        <option value="" className="bg-[#eeeeee] text-gray-600">Select Vehicle Type</option>
                        <option value="car" className="bg-[#eeeeee] text-gray-800 font-semibold">Car</option>
                        <option value="auto" className="bg-[#eeeeee] text-gray-800 font-semibold">Auto</option>
                        <option value="bike" className="bg-[#eeeeee] text-gray-800 font-semibold">Bike</option>
                    </select>

                    <input 
                        className='bg-[#eeeeee] px-4 rounded py-2 font-semibold w-1/2 text-lg placeholder:text-grey'
                        type="number"
                        required
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        placeholder='Seating Capacity'
                    />
                </div>

                <button className='bg-black font-bold text-xl text-white w-full p-2 rounded-md mt-5' type='submit'>Sign Up</button>
                <p className='text-lg'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
            </form>
         </div>
         <div>
            <p className="text-sm text-gray-600">By continuing, you agree to receive SMS, WhatsApp messages and emails from Uber and its affiliates. Message frequency varies.</p>
         </div>
    </div>
  )
}

export default CaptainSignup