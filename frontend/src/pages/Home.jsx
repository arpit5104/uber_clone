import React, { useState, useRef, useContext, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import UberLogo from '../components/UberLogo';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

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
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)


  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  
  useEffect(() => {
      socket.emit("join", { userType: "user", userId: user.user._id })
  }, [])

  socket.on('ride-confirmed', ride => {


      setVehicleFound(false)
      setWaitingForDriver(true)
      setRide(ride)
  })

  socket.on('ride-started', ride => {
      console.log("ride")
      setWaitingForDriver(false)
      navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })


  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    setActiveField('pickup')
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setPickupSuggestions(response.data)
    } catch (error) {
        console.log("Error fetching pickup suggestions:", error)
    }
}

const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    setActiveField('destination')
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch (error) {
        console.log("Error fetching destination suggestions:", error)
    }
}

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


  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })


    setFare(response.data)


}

async function createRide() {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })


}


  return (
    <div className= 'relative h-screen overflow-hidden'>
      <UberLogo/>

      <div className='h-screen w-screen'>
        <img  className='h-full w-full object-cover' src="https://t4.ftcdn.net/jpg/04/05/13/67/360_F_405136725_ZWTZ6Vt2zRdZSVTkfDnUeBWGe6Xvz3bP.jpg" alt="" />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full  '>
        <div className='h-[30%]  p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
            
          }} className='absolute opacity-0 top-4 right-9 text-2xl font-extrabold bg-gray-900 text-white rounded-full p-3 px-5'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl px-3 font-bold mb-10'>Search a ride</h4>
          <form onSubmit={(e)=>{
                submitHandler(e)
              }} className='flex flex-col gap-4'>
                
                <div className='flex items-center gap-3 py-2 px-8 rounded-lg text-2xl font-semibold bg-[#eee]'>
                <i className="ri-user-location-line"></i>
                    <input 
                    value={pickup} 
                    onClick={() => {
                        setPanelOpen(true)
                        setActiveField('pickup')
                    }}
                    onChange={handlePickupChange} 
                    className='text-2xl w-full font-semibold bg-[#eee]' 
                    type="text" 
                    placeholder='Pickup Location' 
                    />
                </div>

                <div className='flex items-center gap-3 py-2 px-4 rounded-lg text-2xl font-semibold bg-[#eee]'>
                  <i className="ri-map-pin-2-fill"></i>
                  <input 
                  value={destination} 
                  onClick={() => {
                        setPanelOpen(true)
                        setActiveField('destination')
                    }}
                  onChange={handleDestinationChange} 
                  className='text-2xl w-full font-semibold bg-[#eee]' 
                  type="text" 
                  placeholder='Drop Location' 
                  />
                </div>

          </form>
                <button onClick={findTrip} className='bg-black text-white px-3 py-2 rounded-lg text-2xl font-semibold self-start'>Search</button>
        </div>
        <div  ref={panelRef} className=' bg-white h-[0]  overflow-y-auto'>
                <LocationSearchPanel
                  suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                  setPanelOpen={setPanelOpen}
                  setVehiclePanel={setVehiclePanel}
                  setPickup={setPickup}
                  setDestination={setDestination}
                  activeField={activeField}
                />
        </div>
      </div>

      <div  ref={vehiclePanelRef} className='fixed z-10 w-full bg-white bottom-0 px-3 py-6 traslate-y-full'>
        <VehiclePanel selectVehicle={setVehicleType}
                    fare={fare} 
                    setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 w-full bg-white bottom-0 px-3 py-6 traslate-y-full'>
        <ConfirmRidePanel createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                     setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='fixed z-10 w-full bg-white bottom-0 px-3 py-6 traslate-y-full'>
        <LookingForDriver 
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}/>
      </div>
    
      <div ref={waitingForDriverRef} className='fixed  w-full bg-white bottom-0 px-3 py-6 traslate-y-full'>
        <WaitingForDriver ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home