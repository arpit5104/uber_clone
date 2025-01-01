import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useRef,useState,useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'



const CaptainHome = () => {

    

    const [ridePopupPanel,setRidePopupPanel] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const [confirmRidePanel,setConfirmRidePanel] = useState(false)
    const confirmRidePanelRef = useRef(null)

    const [ride,setRide] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)
    

    useEffect(() => {
        socket.emit('join', {
            userId: captain.captain._id,
            userType: 'captain'
        })
        // console.log(captain?._id)
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    
                    socket.emit('update-location-captain', {
                        userId: captain.captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

    socket.on('new-ride', (data) => {
        console.log(data)
        setRide(data)
        setRidePopupPanel(true)

    })
   

    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            
            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        setRidePopupPanel(false)
        setConfirmRidePanel(true)

    }


    useGSAP(function(){
        if(ridePopupPanel){
            gsap.to(ridePopupPanelRef.current,{
                transform: "translateY(0)",
                duration:1,
                ease:"power1.inOut"
            })
        }
        else{
            gsap.to(ridePopupPanelRef.current,{
                transform: "translateY(100%)",
                duration:1,
                ease:"power1.inOut"
            })
        }
    }, [ridePopupPanel])

    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current,{
                transform: "translateY(0)",
                duration:1,
                ease:"power1.inOut"
            })
        }
        else{
            gsap.to(confirmRidePanelRef.current,{
                transform: "translateY(100%)",
                duration:1,
                ease:"power1.inOut"
            })
        }
    }, [confirmRidePanel])






  return (
    <div className='h-screen'>
        <div className='fixed top-7 left-7 flex justify-between items-center w-screen'>
            <img className='w-16' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
            <Link to="/captain-home" className=' right-5 fixed rounded-full'>
                <i className="ri-login-circle-line text-2xl bg-white text-black font-bold rounded-full p-3"></i>
            </Link>
        </div>

        <div className='h-3/5'>
            <img  className='h-full w-full object-cover' src="https://t4.ftcdn.net/jpg/04/05/13/67/360_F_405136725_ZWTZ6Vt2zRdZSVTkfDnUeBWGe6Xvz3bP.jpg" alt="" />
        </div>

        <div className='h-2/5 p-4 '>
            <CaptainDetails captain={captain.captain}/>
        </div>

        <div ref={ridePopupPanelRef} className='fixed z-10 w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
            <RidePopUp 
            ride={ride}

            setRidePopupPanel={setRidePopupPanel} setConfirmRidePanel={setConfirmRidePanel}
            confirmRide={confirmRide}/>
        </div>

        <div ref={confirmRidePanelRef} className='fixed h-screen z-10 w-full bg-white bottom-0   px-3 py-6 traslate-y-full'>
            <ConfirmRidePopUp 
            ride={ride}
            setConfirmRidePanel={setConfirmRidePanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>


    </div>
  )
}

export default CaptainHome