import React from 'react'

const VehiclePanel = ({setVehiclePanel, setConfirmRidePanel}) => {
  return (
    <div>
        <div className='flex justify-between items-center mx-4'>
            <h3 className='text-3xl mb-3 font-bold'>Choose Vehicle Mode</h3>
            <h3 onClick={()=>{
              setVehiclePanel(false)
            }} className='text-xl mb-3 font-bold  cursor-pointer bg-gray-900  text-white rounded-full p-3 px-5'>
              <i className="ri-close-line"></i>
            </h3>
          </div>

          <div onClick={()=>{
            setConfirmRidePanel(true)
            setVehiclePanel(false)
          }} className='flex items-center justify-between border-4 active:border-gray-900 w-full px-8 py-4 my-4 rounded-xl'>
            <img className=' h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
            <div className='w-1/2'>
              <h4 className='text-2xl font-bold'>Uber Go <span><i class="ri-user-3-fill">4</i></span></h4>
              <h5 className='text-xl font-semibold'>2 mins away</h5>
              <p className='text-lg text-gray-500 font-semibold'>Affordable, Comfortable, Safe</p>
            </div>
            <h2 className='text-2xl font-bold'>₹193.20</h2>
          </div>
          <div onClick={()=>{
            setConfirmRidePanel(true)
            setVehiclePanel(false)
          }} className='flex items-center justify-between border-4 active:border-gray-900 w-full px-8 py-4 my-4 rounded-xl'>
            <img className=' h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div className='w-1/2'>
              <h4 className='text-2xl font-bold'>Uber Auto <span><i class="ri-user-3-fill">3</i></span></h4>
              <h5 className='text-xl font-semibold'>3 mins away</h5>
              <p className='text-lg text-gray-500 font-semibold'>Affordable auto ride</p>
            </div>
            <h2 className='text-2xl font-bold'>₹118</h2>
          </div>
          <div onClick={()=>{
            setConfirmRidePanel(true)
            setVehiclePanel(false)
          }} className='flex items-center justify-between  border-4 active:border-gray-900 w-full px-8 py-4 my-4 rounded-xl'>
            <img className=' h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
            <div className='w-1/2'>
              <h4 className='text-2xl font-bold'>Uber Bike <span><i class="ri-user-3-fill">4</i></span></h4>
              <h5 className='text-xl font-semibold'>1 mins away</h5>
              <p className='text-lg text-gray-500 font-semibold'>Affordable bike ride</p>
            </div>
            <h2 className='text-2xl font-bold'>₹69</h2>
          </div>
    </div>
  )
}

export default VehiclePanel