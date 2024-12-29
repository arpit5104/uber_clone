import React from 'react'

const LookingForDriver = () => {
  return (
    <>
        <div>
            <div className='flex justify-between items-center mx-4'>
                <h3 className='text-3xl mb-3 font-bold'>Looking for a ride</h3>
            </div>
        </div>

        <div className='flex flex-col items-center justify-between'>
            <img className='  ' src="https://st4.depositphotos.com/4433497/38082/v/450/depositphotos_380822386-stock-illustration-public-taxi-mobile-application-modern.jpg" alt="SEARCHING" />

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
           
        </div>
    </>
  )
}

export default LookingForDriver