import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import UberLogo from '../components/UberLogo';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

function Home() {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault()
  
  }

  useGSAP(()=>{
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '100%',
        padding: '20px',
        duration: 1,
        ease: 'power1.inOut'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut'
      })
    }
    else{
      gsap.to(panelRef.current, {
        height: '0',
        duration: 1,
        ease: 'power1.inOut'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut'
      })
    }
  },[panelOpen])

  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 1,
        ease: 'power1.inOut'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 1,
        ease: 'power1.inOut'
      })
    }
  },[vehiclePanel])

  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 1,
        ease: 'power1.inOut'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
          duration: 1,
          ease: 'power1.inOut'
        })
      }
  },[confirmRidePanel])

  useGSAP(()=>{
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
          duration: 1,
          ease: 'power1.inOut'
        })
    }
    else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
          duration: 1,
          ease: 'power1.inOut'
        })
    }
  },[vehicleFound])

  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)',
          duration: 1,
          ease: 'power1.inOut'
        })
    }
    else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
          duration: 1,
          ease: 'power1.inOut'
        })
    }
  },[waitingForDriver])



  return (
    <div className= 'relative h-screen overflow-hidden'>
      <UberLogo/>

      <div className='h-screen w-screen'>
        <img  className='h-full w-full object-cover' src="https://t4.ftcdn.net/jpg/04/05/13/67/360_F_405136725_ZWTZ6Vt2zRdZSVTkfDnUeBWGe6Xvz3bP.jpg" alt="" />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full  '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute opacity-0 top-4 right-9 text-2xl font-extrabold bg-gray-900 text-white rounded-full p-3 px-5'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl px-3 font-bold mb-10'>Search a ride</h4>
          <form onSubmit={(e)=>{
                submitHandler(e)
              }} className='flex flex-col gap-4'>
                {/* <div className='line absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full'></div> */}
                <div className='flex items-center gap-3 py-2 px-8 rounded-lg text-2xl font-semibold bg-[#eee]'>
                <i className="ri-user-location-line"></i>
                    <input 
                    value={pickup} 
                    onClick={()=>{
                      setPanelOpen(true)
                    }}
                    onChange={(e)=>{
                      setPickup(e.target.value)
                    }} 
                    className=' text-2xl w-full font-semibold  bg-[#eee]' type="text" 
                    placeholder='Pickup Location' />
                </div>

                <div className='flex items-center gap-3 py-2 px-8 rounded-lg text-2xl font-semibold bg-[#eee]'>
                  <i className="ri-map-pin-2-fill"></i>
                  <input 
                  value={destination} 
                  onClick={()=>{
                    setPanelOpen(true)
                  }}
                  onChange={(e)=>{
                    setDestination(e.target.value)
                  }} 
                  className=' text-2xl w-full font-semibold bg-[#eee]' type="text" 
                  placeholder='Drop Location' />
                </div>

          </form>
        </div>
        <div  ref={panelRef} className=' bg-white h-[0]'>
                <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
        <ConfirmRidePanel setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='fixed z-10 w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
        <LookingForDriver/>
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home