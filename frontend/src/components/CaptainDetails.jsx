import React from 'react'

const CaptainDetails = ({captain}) => {

  return (
    <div>
        <div className='flex justify-between items-center p-5  rounded-xl mt-5'>
                <div className='flex items-center gap-2 justify-start'>
                    <img className='w-16 rounded-full h-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" alt="" />
                    <h4 className='text-xl font-bold capitalize'>{captain?.fullname?.firstname + " " + captain?.fullname?.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-bold'>₹367</h4>
                    <p className='text-lg font-semibold'>Earned</p>
                </div>
            </div>
            <div className='flex justify-between items-center p-5 bg-gray-200 rounded-xl mt-5'>
                <div className='text-center'>
                    <i className="text-2xl font-thin  ri-hourglass-line"></i>
                    <h5 className='text-xl font-bold'>100</h5>
                    <p className='text-lg font-semibold'>Hours Worked</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl font-thin  ri-speed-up-line"></i>
                    <h5 className='text-xl font-bold'>100</h5>
                    <p className='text-lg font-semibold'>Km/h</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl font-thin  ri-article-line"></i>
                    <h5 className='text-xl font-bold'>100</h5>
                    <p className='text-lg font-semibold'>Trips Completed</p>
                </div>
            </div>
    </div>
  )
}

export default CaptainDetails