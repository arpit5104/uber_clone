import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const CaptainRiding = () => {

    const [finishRidePanel,setFinishRidePanel]=useState(false)
    const finishRidePanelRef=useRef(null)


useGSAP(()=>{
    if(finishRidePanel){
        gsap.to(finishRidePanelRef.current,{
            transform:"translateY(0)",
            duration:0.5
        })
    }
    else{
        gsap.to(finishRidePanelRef.current,{
            transform:"translateY(100%)",
            duration:0.5
        })
    }
}, [finishRidePanel])


  return (
    <div className='h-screen'>
        <div className='fixed top-7 left-7 flex justify-between items-center w-screen'>
            <img className='w-16' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
            <Link to="/captain-home" className=' right-5 fixed rounded-full'>
                <i className="ri-login-circle-line text-2xl bg-white text-black font-bold rounded-full p-3"></i>
            </Link>
        </div>

        <div className='h-4/5'>
        
            <img  className='h-full w-full object-cover' src="https://t4.ftcdn.net/jpg/04/05/13/67/360_F_405136725_ZWTZ6Vt2zRdZSVTkfDnUeBWGe6Xvz3bP.jpg" alt="" />
        </div>

        <div className='h-1/5 relative bg-black rounded-t-3xl p-4 flex justify-between items-center  ' onClick={()=>{
            setFinishRidePanel(true)
        }} >
        <h3 onClick={()=>{
            
            }} className=' absolute top-2 left-5 text-white text-xl mb-3 font-bold  cursor-pointer rounded-full p-3 '>
            <i className="ri-arrow-down-wide-line "></i>
            </h3>
            <h4 className='text-2xl text-white font-bold'>4 KM away</h4>
            <button className='bg-green-600  text-white p-4 text-2xl font-semibold rounded-full '>Ride Complete</button>
            </div>
            
            <div ref={finishRidePanelRef} className='fixed z-10 h-screen w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
            <FinishRide setFinishRidePanel={setFinishRidePanel}/>
        </div>


        


    </div>
  )
}

export default CaptainRiding