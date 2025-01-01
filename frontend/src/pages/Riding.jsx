import React from 'react'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking.jsx'

const Riding = () => {

    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })



  return (
    <div className='h-screen'>
        <Link to="/home" className='fixed top-7 right-7 items-center justify-center rounded-full'>
        <i className="ri-home-7-line text-2xl bg-white text-black font-bold rounded-full p-3"></i>
        </Link>
        <div className='h-1/2'>
            <LiveTracking />
        </div>
        <div className='h-1/2 p-4 '>
                <div className='flex justify-between items-center mx-8 '>
                <div>
                    <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwgBHqkU9bfCGAwmz34W-dsLKMFVIZb6v_0Q&s" alt="SEARCHING" />
                </div>
                <div className='text-right'>
                <h3 className='text-xl font-semibold '>{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h3>
                <h4 className='text-2xl font-bold'>{ride?.captain?.vehicle?.number}</h4>
                <p className='text-lg font-semibold text-gray-500 font-serif'>{ride?.captain?.vehicle?.type}</p>
                </div>
                </div>

                <div className='flex flex-col items-center justify-between '>

                    <div className='w-full p-4 flex flex-col justify-between gap-3 '>
                    <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                        <h4 className='text-4xl' ><i class="ri-map-pin-line"></i></h4>
                        <div className='w-3/4 text-2xl flex flex-col font-bold'>{ride?.destination} <span className='text-lg font-semibold text-gray-700'>{ride?.destination}</span></div>
                    </div>
                    
                    <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                        <h4 className='text-4xl' ><i className="ri-money-rupee-circle-fill"></i></h4>
                        <div className='w-3/4 text-2xl flex flex-col font-bold'>₹{ride?.fare}<span className='text-lg font-semibold text-gray-700'>Cash/UPI</span></div>
                    </div>
                    
                    </div>
                    </div>
                    <button className='w-full bg-black text-white py-3 rounded-full font-bold text-2xl'>Pay Now</button>
        </div>
    </div>
  )
}

export default Riding