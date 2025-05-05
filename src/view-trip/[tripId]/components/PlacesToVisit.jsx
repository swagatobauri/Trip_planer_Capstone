import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary;

  if (!Array.isArray(itinerary)) {
    return <p>No places to visit available.</p>; 
  }

  return (
    <div>
      <h2 className="font-bold text-lg my-3">Places to Visit</h2>

      <div>
        {itinerary.map((item, idx) => (
          <div key={item.day || idx} className="mt-5">
            <h2 className="font-medium text-lg text-red-700">Day {item?.day}</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {item?.plan?.map((place, pidx) => (
                <PlaceCardItem
                  key={place?.placeName || pidx}
                  place={place}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
