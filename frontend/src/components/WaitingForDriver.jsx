import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <>
    <div>
        <div className='flex justify-between items-center mx-4'>
            <h3 className='text-3xl mb-3 font-bold'>Waiting for driver</h3>
            <h3 onClick={()=>{
            props.setWaitingForDriver(false)
            }} className='text-xl mb-3 font-bold  cursor-pointer bg-gray-900  text-white rounded-full p-3 px-5'>
            <i className="ri-close-line"></i>
            </h3>
        </div>
    </div>
    <div className='flex justify-between items-center mx-8'>
      <div>
            <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwgBHqkU9bfCGAwmz34W-dsLKMFVIZb6v_0Q&s" alt="SEARCHING" />
      </div>
      <div className='text-right'>
        <h3 className='text-xl font-semibold '>Arpit</h3>
        <h4 className='text-2xl font-bold'>MP 09 CB 0001</h4>
        <p className='text-lg font-semibold text-gray-500 font-serif'>KIA Seltos</p>
      </div>
    </div>

    <div className='flex flex-col items-center justify-between'>

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

export default WaitingForDriver