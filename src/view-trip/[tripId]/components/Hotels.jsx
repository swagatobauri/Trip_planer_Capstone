import React from 'react'

const Hotels = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recomendations</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotels?.map((hotel,idx)=>(
                <div>
                    <img src="/placeholder.jpg " className='rounded-xl'/>

                    <div className='my-3'>
                        <h2>{hotel.HotelName}</h2>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Hotels