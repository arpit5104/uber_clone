import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between pt-8 flex-col h-screen w-full'>
            <img className='w-32 ml-10 invert' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
            <div className='bg-white pb-3 py-7 px-4'>
                <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                <Link to='/login' className=' flex justify-center items-center w-full bg-black text-2xl text-white font-bold py-5 mt-5 rounded-md'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
