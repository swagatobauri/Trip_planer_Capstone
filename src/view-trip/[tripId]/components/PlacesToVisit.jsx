import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.tripData?.itinerary;



  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return <p className='text-red-600'>No places to visit available.</p>; 
  }

  return (
    <div>
      <h2 className="font-bold text-xl my-5">📍 Places to Visit</h2>

      {itinerary.map((item, idx) => (
        <div key={item.day || idx} className="mt-5">
          <h2 className="font-semibold text-lg text-violet-700 mb-2">Day {item?.day}</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {item?.plan?.map((place, pidx) => (
              <PlaceCardItem
                key={`${place?.placeName}-${pidx}`}
                place={place}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesToVisit;
