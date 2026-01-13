import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place.placeName
      }
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 border-violet-200 shadow-2xl transition-all">
        <img
          src={place.placeImageUrl || "/places.jpg"}
          className="w-[130px] h-[130px] rounded-xl"
          alt={place.placeName}
        />

        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-gray-400 text-sm">{place.placeDetails}</p>
          <p className="text-orange-500">⌛ {place.timeToTravel}</p>
          <p className="text-orange-500">🎟️ {place.ticketPricing}</p>

          <Button>
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
