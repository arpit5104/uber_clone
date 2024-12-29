import React from 'react'

function LocationSearchPanel({setPanelOpen, setVehiclePanel}) {
    const samplelocations = [
        {
            name: "C21 Mall, Indore (M.P)",
            icon: "ri-focus-3-line"
        },
        {
            name: "Radisson Blu, Indore (M.P)",
            icon: "ri-focus-3-line"
        },
        {
            name: "A.I.R.M. College, Indore (M.P)",
            icon: "ri-focus-3-line"
        },
        {
            name: "Sayaji Hotel, Indore (M.P)",
            icon: "ri-focus-3-line"
        },
    ]


  return (
    <>
    
            <h4 className='text-3xl font-bold px-5 py-4'>Most Visited</h4>

            {samplelocations.map((location, index) => (
                <div key={index} onClick={()=>{
                    setVehiclePanel(true)
                    setPanelOpen(false)
                }} className='flex items-center gap-3 justify-start bg-[#eee] px-8 py-4 my-4 rounded-lg border-2 active:border-black'>
                    <h4 className='text-2xl font-semibold'><i className={location.icon}></i></h4>
                    <div className='text-2xl font-bold'>{location.name}</div>
                </div>
            ))}
           
    </>
  )
}

export default LocationSearchPanel