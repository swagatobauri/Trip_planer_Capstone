import React from 'react'
import { Link } from 'react-router-dom'

const Hotels = ({ trip }) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotels?.map((hotel) => (
                <Link  
                  to={'https://www.google.com/maps/search/?api=1&query=' + hotel.HotelName + "," + hotel["Hotel address"]}  
                  target='_blank'
                  key={hotel.id || hotel.HotelName} // Use hotel.id if available, else fallback to hotel.HotelName
                >
                  <div className='hover:scale-110 transition-all cursor-pointer'>
                      <img src={hotel["Hotel Image Url"] || "/placeholder.jpg"} className='rounded-xl shadow-2xl' alt={hotel.HotelName}/>

                      <div className='my-3 flex flex-col gap-2'>
                          <h2 className='font-medium'>{hotel.HotelName}</h2>
                          <h2 className='text-xs text-gray-500'>📍 {hotel["Hotel address"]}</h2>

                          <h2 className='text-sm'>💸 {hotel.Price}</h2>

                          <h2 className='text-sm'>⭐ {hotel.rating} stars</h2>
                      </div>
                  </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Hotels;
