import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ConfirmRidePopUp = ({setConfirmRidePanel,setRidePopupPanel,ride,confirmRide}) => {

    const [otp,setOtp]=useState("")
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            setConfirmRidePanel(false)
            setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: ride } })
        }


    }



  return (
    <>
    <div>
        <div className='flex justify-between items-center mx-2'>
            <h3 className='text-3xl mb-3 font-bold'>Confirm Ride to Start</h3>
            <h3 onClick={()=>{
            setRidePopupPanel(false)
            }} className='text-xl mb-3 font-bold  cursor-pointer text-black rounded-full p-3 px-5'>
            <i className="ri-close-line"></i>
            </h3>
        </div>
    </div>

    <div className='p-4 flex justify-between items-center bg-gray-300 rounded-2xl'>
        <div className='flex items-center gap-3 w-full'>
            <img className='w-16 h-16 rounded-full object-cover' src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" alt="" />
            <h4 className='text-xl font-bold'>{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}</h4>
        </div>
        <h5 className='text-2xl font-bold w-[30%]'>2.2 KM</h5>
    </div>


    <div className='flex flex-col items-center justify-between'>

        <div className='w-full p-4 flex flex-col justify-between gap-3 '>
            <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                <h4 className='text-4xl' ><i class="ri-map-pin-line"></i></h4>
                <div className='w-3/4 text-2xl flex flex-col font-bold'>Location <span className='text-lg font-semibold text-gray-700'>{ride?.pickup}</span></div>
            </div>
            <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                <h4 className='text-4xl' ><i class="ri-roadster-fill"></i></h4>
                <div className='w-3/4 text-2xl flex flex-col font-bold'>Uber Go <span className='text-lg font-semibold text-gray-700'>{ride?.destination}</span></div>
            </div>
            <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                <h4 className='text-4xl' ><i className="ri-money-rupee-circle-fill"></i></h4>
                <div className='w-3/4 text-2xl flex flex-col font-bold'>₹{ride?.fare}<span className='text-lg font-semibold text-gray-700'>Cash/UPI</span></div>
            </div>
            
        </div>
        
        <div className='w-full px-4 mt-4 flex gap-3'>
            <form className='w-full font-mono px-1 flex gap-3 flex-col' onSubmit={submitHandler}>
                <input className='w-full p-4 text-2xl font-semibold rounded-md bg-[#eee]' type="text" placeholder='Enter OTP' value={otp} onChange={(e)=>{
                    setOtp(e.target.value)
                }} />
                <button type='submit' className='w-full flex justify-center items-center bg-green-600 text-white p-4 text-2xl font-semibold rounded-md '>Confirm</button>


                <button onClick={()=>{
                    setConfirmRidePanel(false)
                    setRidePopupPanel(false)
                }} className='w-full bg-gray-200 text-black p-4 text-2xl font-semibold rounded-md '>Cancel Ride</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default ConfirmRidePopUp