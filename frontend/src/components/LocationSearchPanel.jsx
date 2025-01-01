import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex items-center gap-3 justify-start bg-[#eee] px-8 py-4 my-4 rounded-lg border-2 active:border-black'>
                        <h4 className='text-2xl font-semibold'><i className="ri-map-pin-fill"></i></h4>
                        <div className='text-xl font-bold'>{elem}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel