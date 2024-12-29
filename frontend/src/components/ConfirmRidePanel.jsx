import React from 'react'
// 5:46

const ConfirmRidePanel = ({setConfirmRidePanel, setVehicleFound}) => {
  return (
    <>
        <div>
            <div className='flex justify-between items-center mx-4'>
                <h3 className='text-3xl mb-3 font-bold'>Confirm your ride</h3>
                <h3 onClick={()=>{
                setConfirmRidePanel(false)
                }} className='text-xl mb-3 font-bold  cursor-pointer bg-gray-900  text-white rounded-full p-3 px-5'>
                <i className="ri-close-line"></i>
                </h3>
            </div>
        </div>

        <div className='flex flex-col items-center justify-between'>
            <img className='bg-white' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwgBHqkU9bfCGAwmz34W-dsLKMFVIZb6v_0Q&s" alt="SEARCHING" />

            <div className='w-full p-4 flex flex-col justify-between gap-3 '>
                <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                    <h4 className='text-4xl' ><i class="ri-map-pin-line"></i></h4>
                    <div className='w-3/4 text-2xl flex flex-col font-bold'>Location <span className='text-lg font-semibold text-gray-700'>Destination</span></div>
                </div>
                <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                    <h4 className='text-4xl' ><i class="ri-roadster-fill"></i></h4>
                    <div className='w-3/4 text-2xl flex flex-col font-bold'>Uber Go <span className='text-lg font-semibold text-gray-700'>Destination</span></div>
                </div>
                <div className='flex gap-9  rounded-md border-b-2 border-black p-3' >
                    <h4 className='text-4xl' ><i className="ri-money-rupee-circle-fill"></i></h4>
                    <div className='w-3/4 text-2xl flex flex-col font-bold'>198.20 INR<span className='text-lg font-semibold text-gray-700'>Cash/UPI</span></div>
                </div>
                
            </div>
            <div className='w-full px-4'>
                <button onClick={()=>{
                    setVehicleFound(true)
                    setConfirmRidePanel(false)
                }} className='w-full bg-green-600 text-white p-4 text-2xl font-semibold rounded-md '>Confirm Ride</button>
            </div>
        </div>
    </>
  )
}

export default ConfirmRidePanel