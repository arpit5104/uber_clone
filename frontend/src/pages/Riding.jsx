import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to="/home" className='fixed top-7 right-7 items-center justify-center rounded-full'>
        <i className="ri-home-7-line text-2xl bg-white text-black font-bold rounded-full p-3"></i>
        </Link>
        <div className='h-1/2'>
        <img  className='h-full w-full object-cover' src="https://t4.ftcdn.net/jpg/04/05/13/67/360_F_405136725_ZWTZ6Vt2zRdZSVTkfDnUeBWGe6Xvz3bP.jpg" alt="" />
        </div>
        <div className='h-1/2 p-4 '>
                <div className='flex justify-between items-center mx-8 '>
                <div>
                    <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwgBHqkU9bfCGAwmz34W-dsLKMFVIZb6v_0Q&s" alt="SEARCHING" />
                </div>
                <div className='text-right'>
                <h3 className='text-xl font-semibold '>Arpit</h3>
                <h4 className='text-2xl font-bold'>MP 09 CB 0001</h4>
                <p className='text-lg font-semibold text-gray-500 font-serif'>KIA Seltos</p>
                </div>
                </div>

                <div className='flex flex-col items-center justify-between '>

                    <div className='w-full p-4 flex flex-col justify-between gap-3 '>
                    <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                        <h4 className='text-4xl' ><i class="ri-map-pin-line"></i></h4>
                        <div className='w-3/4 text-2xl flex flex-col font-bold'>Location <span className='text-lg font-semibold text-gray-700'>Destination</span></div>
                    </div>
                    
                    <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                        <h4 className='text-4xl' ><i className="ri-money-rupee-circle-fill"></i></h4>
                        <div className='w-3/4 text-2xl flex flex-col font-bold'>198.20 INR<span className='text-lg font-semibold text-gray-700'>Cash/UPI</span></div>
                    </div>
                    
                    </div>
                    </div>
                    <button className='w-full bg-black text-white py-3 rounded-full font-bold text-2xl'>Pay Now</button>
        </div>
    </div>
  )
}

export default Riding