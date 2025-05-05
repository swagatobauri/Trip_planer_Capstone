import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg my-3">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary.map((item, idx) => (
          <div key={idx} className="mt-5"> 
            <h2 className="font-medium text-lg text-red-700">Day {item?.day}</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {item?.plan.map((place, idx) => (
                <PlaceCardItem key={place?.placeName || idx} place={place} />  
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
